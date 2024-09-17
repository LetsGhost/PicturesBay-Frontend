<template>
  <button @click="goBack" class="back-button">Back</button>
  <div class="login-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="bday">Birthday</label>
        <input type="date" id="bday" v-model="bday" required />
      </div>
      <div class="form-group">
        <input type="checkbox" id="privacyPolicy" v-model="privacyPolicyAccepted" required />
        <label for="privacyPolicy">
          I accept the <a href="/privacy-policy" target="_blank">privacy policy</a>
        </label>
      </div>
      <p>You must be over 18 to register.</p>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import router from '../router';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const bday = ref('');
    const privacyPolicyAccepted = ref(false);
    const errorMessage = ref('');
    const email = ref('');

    const register = () => {
      if (!privacyPolicyAccepted.value) {
        errorMessage.value = 'You must accept the privacy policy.';
        return;
      }
      // Registration logic here
      axios.post(import.meta.env.VITE_API_URL + '/user/register', {
        email: email.value,
        username: username.value,
        password: password.value,
        birthdate: bday.value,
        privacyPolicy: privacyPolicyAccepted.value,
      }).then(response => {
        // Handle successful registration
      }).catch(error => {
        errorMessage.value = error.response.data.message;
      });
    };

    const goBack = () => {
      // Navigate back to the login page
      router.push('/');
    };

    return {
      username,
      password,
      bday,
      privacyPolicyAccepted,
      errorMessage,
      register,
      email,
      goBack
    };
  }
});
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

.back-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  background-color: #5C6B73;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #4a5a63;
}
</style>