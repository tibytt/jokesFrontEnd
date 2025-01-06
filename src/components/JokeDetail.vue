<template>
    <div class="joke-detail-container">
      <div v-if="loading" class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
  
      <div v-else class="joke-card">
        <div class="card-inner">
          <div class="card-front">
            <div class="joke-number">Joke #{{ joke?.id }}</div>
            <h4>{{ joke?.setup }}</h4>
          </div>
          <div class="card-back"> 
            <h4>{{ joke?.punchline }}</h4>
          </div>
        </div>
      </div>
  
      <router-link to="/jokes" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Joke list</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import jokeService from '../services/jokeService';
  import { Joke } from '../types/jokeTypes';
  
  export default defineComponent({
    name: 'JokeDetail',
    setup() {
      const route = useRoute();
      const joke = ref<Joke | null>(null);
      const loading = ref(true);
      const jokeId = route.params.id as string;
  
      const fetchJokeById = async () => {
        try {
          const response = await jokeService.getJokeById(Number(jokeId));
          joke.value = response;
        } catch (error) {
          console.error('Error fetching joke by ID:', error);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(() => {
        fetchJokeById();
      });
  
      return {
        joke,
        loading,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
    @use '@/assets/styles/joke-detail' as joke-detailStyles;
  </style>