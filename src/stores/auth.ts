import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    errorMessage: '',
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        localStorage.setItem('loggedIn', 'true');
        router.push('/homepage');
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Login failed, please try again!';
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      router.push('/');
    },
    isAuthenticated() {
      return !!this.token;
    }
  }
});