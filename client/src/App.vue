<template>
  <Navbar />
  <router-view />
</template>

<script>
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      token: null
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    async getToken() {
      try {
        const token = localStorage.getItem('token')
        this.token = token || false // Set token to retrieved value or null
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    },
    async logout() {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.token = null
        this.$router.push('/')// Redirect to homepage after logout
      } catch (error) {
        console.error(error)
      } 
    }
  }
}
</script>
