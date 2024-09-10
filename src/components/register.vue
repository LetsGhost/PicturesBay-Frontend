<template>
  <div class="login-container">
    <h1>Register</h1>
    <ErrorAlert v-if="errorMessage" :message="errorMessage" />
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="text" id="username" v-model="username" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="date" id="bday" v-model="bday" placeholder="Birthday" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit" class="btn-primary">Register</button>
    </form>
    <button @click="navigateToLogin" class="btn-secondary arrow-button">&larr;</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useRoute } from 'vue-router';
import ErrorAlert from './erroralert.vue';
import axios from 'axios';

const email = ref('');
const username = ref('');
const password = ref('');
const bday = ref('');
const errorMessage = ref('');

const route = useRoute();

const handleSubmit = () => {
  console.log('Username:', username.value);
  console.log('Password:', password.value);

  // Send the data to the server and register the user
  axios.post('http://localhost:3000/user/register', {
    email: email.value,
    username: username.value,
    password: password.value,
    bday: bday.value
  }).then(response => {
    // Handle successful registration
  }).catch(error => {
    errorMessage.value = error.response.data.message;
  });
};

const navigateToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #4a5a63;
}

.form-group {
  margin-bottom: 1rem;
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #5C6B73;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #4a5a63;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  margin-top: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.arrow-button {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 25%;
}
</style>