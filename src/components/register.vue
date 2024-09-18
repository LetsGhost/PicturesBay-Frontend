<template>
<button @click="goBack" class="back-button">Back</button>
  <div class="wrapper">
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

      if(new Date().getFullYear() - new Date(bday.value).getFullYear() < 18) {
        errorMessage.value = 'You must be over 18 to register.';
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

<style scoped lang="scss">
body, html {
  height: 100%;
  margin: 0;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.login-container {
  max-width: 600px;
  padding: 3rem;
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
  padding: 0.75rem; /* Match button padding */
  border: 1px solid #5C6B73;
  border-radius: 4px;
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

.back-button {
  position: fixed;
  top: 0.5rem; /* Stick it closer to the top */
  left: 0.5rem; /* Stick it closer to the left */
  padding: 0.5rem 0.75rem; /* Make the button smaller */
  background-color: #5C6B73;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  display: inline-block; /* Prevent stretching */
  width: auto; /* Ensure it only takes up necessary space */
}

.back-button:hover {
  background-color: #4a5a63; /* Same hover effect */
}

a {
  color: #5C6B73;
  text-decoration: underline;
}

a:hover {
  color: #4a5a63;
}

</style>