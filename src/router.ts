// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Homepage from './components/homepage.vue';
import Room from './components/room.vue';
import Profile from './components/profile.vue';
//import App from './App.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: "/homepage", component: Homepage, meta: { requiresAuth: true } },
  {
    path: '/room/:roomName',
    name: 'Room',
    component: Room,
    props: true, // This allows the route params to be passed as props to the component,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    props: true, // This allows the route params to be passed as props to the component,
    meta: { requiresAuth: true },
  },
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