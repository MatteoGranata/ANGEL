<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">LOGIN</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      axios.post("/auth/login", { username: this.username, password: this.password }) // POST request
        .then(response => {
          // Handle successful response
          console.log('User logged');
          this.$router.push('/post');
          localStorage.setItem('token', response.data.data);
          
        })
        .catch(error => {
          console.log(error.response.data.message)
          return console.log(error)
        
    });
    }
  }
}
</script>
