<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Nome utente" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Accedi</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token); // Salvare il token JWT nel localStorage
        this.$router.push('/protected'); // Utilizzare Vue Router per navigare verso '/protected'
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>
