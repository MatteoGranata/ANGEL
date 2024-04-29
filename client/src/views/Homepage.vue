<template>
    <main>
        <Post />
    </main>
    <div>
        <button @click="logout">LOGOUT</button>
    </div>
</template>

<script setup>
import Post from '../components/Post.vue'


</script>

<script>

export default {
    data() {
        return {
            isLoggedIn: false, // Flag to track login status
            // Other data
        };
    },
    mounted() {
        // Check if user is logged in on page load
        const token = localStorage.getItem('token');
        if (token) {
            this.isLoggedIn = true;
        }
    },
    methods: {
        async logout() {
            sessionStorage.clear('token')
            sessionStorage.clear('username')
            console.log('logout effettuato con successo')
            this.$router.push('/login')
        }
    },
}

</script>
