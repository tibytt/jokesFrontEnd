<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Jokes from './components/Jokes.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Jokes,
    Header,
    Footer
  }
});
</script>

<style>


body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

router-view {
  flex: 1;
}

footer {
  margin-top: auto;
}
</style>