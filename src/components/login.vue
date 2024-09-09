<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <h1>Login</h1>
      <      <ErrorAlert v-if="errorMessage" :message="errorMessage" />
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <button type="submit" class="register-button" @click="handleRegister">You don´t have an Account? register now!</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import router from '../router';
  import ErrorAlert from './erroralert.vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const route = useRoute();

  const handleSubmit = () => {
    // Send the data to the server and save the token
    axios.post('http://localhost:3000/login', {
      username: username.value,
      password: password.value
    }).then((response) => {
      // Save the token in the local storage
      localStorage.setItem('token', response.data.token);
      // Redirect the user to the home page
      router.push('/homepage');
    }).catch((error) => {
      console.error(error);
      errorMessage.value = "Login failed, please try again!";
    });
  };

  const handleRegister = () => {
    // Redirect the user to the register page
    router.push('/register');
    console.log('Register');
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
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #5C6B73;
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

  .register-button {
  background: none;
  color: #5C6B73;
  border: none;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0;
  text-align: center;
  font-size: 0.875rem;
}

.register-button:hover {
  text-decoration: underline;
  background: none;
  color: #5C6B73;
  border: none;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0;
  text-align: center;
  font-size: 0.875rem;
};

  </style>