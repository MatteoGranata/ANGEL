<template>
  <div class="registration-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
// const API_URL =  "http://localhost:3000"
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      axios.post("/auth/register", { username: this.username, password: this.password }) // POST request
        .then(response => {
          // Handle successful response
          if(response.data.status == 'okay'){
            this.$router.push('/login');
            console.log(response.data);
          }else{
            return console.error(response.data.message)
          }
        })
        .catch(error => {
          // Handle error response
          console.error('Error:', error);
        });
    }
  }
}
</script>