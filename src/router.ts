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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

function isAuthenticated() {
  // Replace with your actual authentication logic
  return !!localStorage.getItem('authToken');
}

export default router;