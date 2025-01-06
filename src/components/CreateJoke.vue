<template>
  <div class="create-joke-container">
    <div class="form-card">
      <div class="card-inner" :class="{ flipped: formSubmitted }">
        <div class="card-front">
          <h1>Create a New Joke</h1>
          <form @submit.prevent="submitJoke">
            <div class="form-group">
              <label for="type">Joke Type</label>
              <select v-model="newJoke.type" id="type" required>
                <option value="" disabled>Select joke type</option>
                <option v-for="type in jokeTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="setup">Setup</label>
              <input
                v-model="newJoke.setup"
                type="text"
                id="setup"
                placeholder="Enter joke setup"
                required
              />
            </div>

            <div class="form-group">
              <label for="punchline">Punchline</label>
              <input
                v-model="newJoke.punchline"
                type="text"
                id="punchline"
                placeholder="Enter punchline"
                required
              />
            </div>

            <button type="submit" :disabled="loading">Submit Joke</button>
          </form>
        </div>

        <div class="card-back">
          <h4>{{ message }}</h4>
          <button @click="addAnotherJoke" class="add-another-btn">Add Another Joke</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i> Adding Joke...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import jokeService from '../services/jokeService';
import { Joke, JokeTypes } from '../types/jokeTypes';  // Import the interfaces

export default defineComponent({
  name: 'CreateJoke',
  setup() {
    const jokeTypes = ref<JokeTypes>([]);
    const newJoke = ref<Joke>({
      id: null, 
      type: '',
      setup: '',
      punchline: ''
    });
    const loading = ref(false);
    const message = ref('');
    const success = ref(false);
    const formSubmitted = ref(false);
    const fetchJokeTypes = async () => {
      try {
        jokeTypes.value = await jokeService.getJokeTypes();
      } catch (error) {
        message.value = 'Failed to load joke types.';
        success.value = false;
      }
    };


    const submitJoke = async () => {
      loading.value = true;
      try {
        const response = await jokeService.addJoke(newJoke.value);
        message.value = 'Joke added successfully!';
        success.value = true;
        formSubmitted.value = true;
        newJoke.value = { id: null, type: '', setup: '', punchline: '' };
      } catch (error) {
        message.value = 'Failed to add the joke.';
        success.value = false;
        formSubmitted.value = true;
      } finally {
        loading.value = false;
      }
    };

    const addAnotherJoke = () => {
      newJoke.value = { id: null, type: '', setup: '', punchline: '' };
      message.value = '';
      success.value = false;
      formSubmitted.value = false;
    };

    onMounted(() => {
      fetchJokeTypes();
    });

    return {
      jokeTypes,
      newJoke,
      loading,
      message,
      success,
      formSubmitted,
      submitJoke,
      addAnotherJoke
    };
  }
});
</script>

<style scoped lang="scss">
  @use '@/assets/styles/create-joke' as createJokeStyles;
</style>