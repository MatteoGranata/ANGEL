<template>
  <router-view />
  <Navbar/>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
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
        this.token = token || false; // Set token to retrieved value or null
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    },
    async logout() {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.token = null;
        this.$router.push('/');
      } catch (error) {
        console.error("impossibile effettuare il logout:", error)
      } // Redirect to login after logout
    }
  }
}
</script>