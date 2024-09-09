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
        <button type="submit">Register</button>
      </form>
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
    axios.post('http://localhost:3000/register', {
      email: email.value,
      username: username.value,
      password: password.value,
      bday: bday.value
    }).then((response) => {
      // Redirect the user to the login page
      router.push('/login');
    }).catch((error) => {
      console.error(error);
      errorMessage.value = "Registration failed, please try again!";
    });
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #93A2A3;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #5C6B73;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #5C6B73;
    border-radius: 4px;
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
  </style>