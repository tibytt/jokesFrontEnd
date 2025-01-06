import { createRouter, createWebHistory } from 'vue-router';
import Jokes from '../components/Jokes.vue';
import JokeDetail from '../components/JokeDetail.vue';
import JokeList from '../components/JokeList.vue';
import CreateJoke from '../components/CreateJoke.vue';

const routes = [
    { path: '/', component: Jokes, name: 'Jokes' },
    { path: '/joke/:id', component: JokeDetail, name: 'JokeDetail' },
    { path:  '/jokes', component: JokeList },
    { path:  '/create', component: CreateJoke }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;