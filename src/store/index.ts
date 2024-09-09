import { createStore, Store } from 'vuex';
import axios from 'axios';
import { InjectionKey } from 'vue';

// Define the state interface
interface State {
  authToken: string;
  user: User | null;
}

// Define the user interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the injection key
export const key: InjectionKey<Store<State>> = Symbol();

// Create the Vuex store
export default createStore<State>({
  state: {
    authToken: localStorage.getItem('authToken') || '',
    user: null,
  },
  mutations: {
    setAuthToken(state, token: string) {
      state.authToken = token;
      localStorage.setItem('authToken', token);
    },
    setUser(state, user: User) {
      state.user = user;
    },
    clearAuthData(state) {
      state.authToken = '';
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
  actions: {
    async login({ commit }, credentials: { email: string; password: string }) {
      try {
        const response = await axios.post('/api/login', credentials);
        commit('setAuthToken', response.data.token);
        commit('setUser', response.data.user);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
    },
    async fetchUser({ commit, state }) {
      if (!state.authToken) return;
      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${state.authToken}` },
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Fetching user failed:', error);
      }
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.authToken;
    },
    getUser(state): User | null {
      return state.user;
    },
  },
});