<script>
import axios from 'axios';

export default {
  methods: {
    async register() {
      try {
        const response = await axios.post('localhost:3000/auth/register', {
          username: this.username,
          password: this.password,
        });
        console.log('Registrato con successo!');
        this.$router.push('/login'); // Utilizzare Vue Router per navigare verso '/login'
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>


<template>
  <div>
    <h1>Registrazione</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Nome utente" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Registrati</button>
    </form>
  </div>
</template>

