<template>
  <div class="jokes-container">
    <h1>Welcome to the Joke App</h1>

    <div class="buttons">
      <button @click="fetchRandomJoke">
        <i class="fa fa-random"></i> Get Random Joke
      </button>
    </div>

    <div v-if="loading" class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i> 
    </div>

    <div v-if="!loading && joke" class="joke-content" :class="{'slide-in': joke}">
      <router-link :to="'/joke/' + joke.id" class="joke-link">
        <div class="joke-card">
          <div class="card-inner">
            <div class="card-front">
              <h3>{{ joke.setup }}</h3>
            </div>
            <div class="card-back">
              <h4>{{ joke.punchline }}</h4>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <div class="joke-section">
      <router-link to="/jokes"> <i class="fas fa-arrow-right"></i> Go to All Jokes</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import jokeService from '../services/jokeService';
import { Joke, Jokes, JokeTypes } from '../types/jokeTypes';

export default defineComponent({
name: 'Jokes',
setup() {
  const joke = ref<Joke | null>(null);
  const jokes = ref<Jokes>([]);
  const jokeTypes = ref<JokeTypes>([]);
  const loading = ref(false);

  const fetchRandomJoke = async () => {
    loading.value = true;
    joke.value = await jokeService.getRandomJoke();
    jokes.value = [];
    loading.value = false;
  };

  const fetchRandomJokes = async (count: number) => {
    loading.value = true;
    jokes.value = await jokeService.getRandomJokes(count);
    joke.value = null;
    loading.value = false;
  };

  const fetchJokeTypes = async () => {
    jokeTypes.value = await jokeService.getJokeTypes();
  };

  return {
    joke,
    jokes,
    jokeTypes,
    loading,
    fetchRandomJoke,
    fetchRandomJokes,
    fetchJokeTypes,
  };
},
});
</script>

<style scoped lang="scss">
  @use '@/assets/styles/jokes' as jokesStyles;
</style>