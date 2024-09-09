// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Register from './components/register.vue';
//import App from './App.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;