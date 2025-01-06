<template>
    <nav class="navbar">
      <div class="container">
        <router-link to="/">
          <div class="logo">
            <img src="@/assets/images/JokesAppLogo.png" alt="Joke App Logo" class="static" />
            <img src="@/assets/images/JokesAppLogo.gif" alt="Joke App Logo" class="active" />
          </div>
        </router-link>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/jokes">Jokes</router-link></li>
          <li><router-link to="/create">Create</router-link></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Header',
  });
  </script>
  
  <style scoped lang="scss">
    @use '@/assets/styles/header' as headerStyles;
  </style>