<template>
  <nav>
    <div v-if="!token">
      <router-link to="/register">register</router-link>
      -
      <router-link to="/login">login</router-link>
    </div>
    <div v-else>
      <div>
        <button @click="logout">LOGOUT</button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      token: null,
    }
  },
  mounted() {
    this.getToken();
  },
  methods: {
    async getToken() {
      try {
        const token = localStorage.getItem('token');
        this.token = token || null; // Set token to retrieved value or null
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    },
    async logout() {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.token = null;
        this.$router.push('/login');
      } catch (error) {
        console.error("impossibile effettuare il logout:", error)
      } // Redirect to login after logout
    }
  }
}
</script>