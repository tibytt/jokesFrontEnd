<template>
  <div class="jokes-list">
    <div v-if="loading" class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>

    <div class="jokes-controls">
      <div class="controls-group">
        <div class="jokes-count-controls">
          <div class="input-group">
            <label for="jokes-count">Number of Jokes:</label>
            <input 
              type="number" 
              v-model="jokesCount" 
              min="1" 
              :disabled="selectAll" 
            />
          </div>
        </div> 
        <div class="joke-types-filter">
          <label for="type-filter">Type:</label>
          <div class="checkbox-container">
            <input 
              type="checkbox" 
              id="all"
              v-model="selectAll"
              @change="onAllToggle" 
            />
            <label for="all">All</label>
          </div>
          <div v-for="type in jokeTypes" :key="type" class="checkbox-container">
            <input 
              type="checkbox" 
              :id="type" 
              :value="type" 
              v-model="selectedTypes" 
            />
            <label :for="type">{{ type }}</label>
          </div>
        </div>
      </div>

      <button @click="fetchJokes" class="primary-btn">Fetch Jokes</button>
    </div>
    
    <div v-if="deleteSuccessMessage" class="success-banner">
      <p>{{ deleteSuccessMessage }}</p>
    </div>

    <table class="jokes-table">
      <thead>
        <tr>
          <th>Joke List</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(joke, index) in paginatedJokes" :key="joke.id || index">
          <router-link :to="'/joke/' + joke.id" class="joke-link">
            <td>{{ joke.setup }}</td>
          </router-link>
          <td>
            <button v-if="joke.id !== null" @click="deleteJoke(joke.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-controls" v-if="totalPages > 1">
      <button @click="previousPage" :disabled="pageNumber === 1" class="secondary-btn">Previous</button>
      <span class="page-info">Page {{ pageNumber }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="pageNumber === totalPages" class="secondary-btn">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import jokeService from '../services/jokeService';
import { Joke } from '../types/jokeTypes';

export default defineComponent({
  name: 'JokesList',
  setup() {
    const jokes = ref<Joke[]>([]); 
    const jokeTypes = ref<string[]>([]); 
    const selectedTypes = ref<string[]>(['general']);
    const jokesCount = ref(11); 
    const pageNumber = ref(1); 
    const jokesPerPage = 10; 
    const loading = ref(false);
    const deleteSuccessMessage = ref<string | null>(null);
    const selectAll = ref(false);

    const fetchJokeTypes = async () => {
      loading.value = true;
      try {
        jokeTypes.value = await jokeService.getJokeTypes();
      } catch (error) {
        console.error('Error fetching joke types:', error);
      } finally {
        loading.value = false;
      }
    };

    const deleteJoke = async (id: number) => {
      try {
        const response = await jokeService.deleteJoke(id);
        jokes.value = jokes.value.filter(joke => joke.id !== id);
        deleteSuccessMessage.value = 'Joke deleted successfully!';
        setTimeout(() => {
          deleteSuccessMessage.value = null;
        }, 3000);
        await fetchJokes();
      } catch (error) {
        console.error('Error deleting joke:', error);
      }
    };

    const fetchJokes = async () => {
      loading.value = true;
      try {
        if (selectAll.value) {
          const allJokes = await jokeService.getAllJokes();
          jokes.value = allJokes.filter(joke => {
            return selectedTypes.value.length === 0 || selectedTypes.value.includes(joke.type);
          });
          totalPages.value = Math.ceil(jokes.value.length / jokesPerPage);
        } else if (selectedTypes.value.length > 0) {
          const type = selectedTypes.value.join(',');
          jokes.value = await jokeService.getJokesByTypeAndNumber(type, jokesCount.value);
          totalPages.value = Math.ceil(jokes.value.length / jokesPerPage);
        } else {
          jokes.value = await jokeService.getRandomJokes(jokesCount.value);
          totalPages.value = Math.ceil(jokes.value.length / jokesPerPage);
        }
        pageNumber.value = 1;
      } catch (error) {
        console.error('Error fetching jokes:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchJokeTypes();
      fetchJokes();
    });

    watch(selectAll, (newVal) => {
      if (newVal) {
        selectedTypes.value = [];
        jokesCount.value = 0;
      } else {
        jokesCount.value = 11;
      }
    });

    const filteredJokes = computed(() => {
      return jokes.value;
    });

    const totalPages = ref(0);

    const paginatedJokes = computed(() => {
      const startIndex = (pageNumber.value - 1) * jokesPerPage;
      return filteredJokes.value.slice(startIndex, startIndex + jokesPerPage);
    });

    const nextPage = () => {
      if (pageNumber.value < totalPages.value) {
        pageNumber.value++;
      }
    };

    const previousPage = () => {
      if (pageNumber.value > 1) {
        pageNumber.value--;
      }
    };

    const onAllToggle = () => {
      if (selectAll.value) {
        jokesCount.value = 0;
      } else {
        jokesCount.value = 11;
      }
    };

    return {
      jokes,
      jokeTypes,
      selectedTypes,
      jokesCount,
      paginatedJokes,
      pageNumber,
      totalPages,
      nextPage,
      previousPage,
      fetchJokes,
      fetchJokeTypes,
      loading,
      deleteJoke,
      deleteSuccessMessage,
      selectAll,
      onAllToggle,
    };
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/joke-list' as jokeListStyles;
</style>