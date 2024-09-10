// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Homepage from './components/homepage.vue';
//import App from './App.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: "/homepage", component: Homepage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;