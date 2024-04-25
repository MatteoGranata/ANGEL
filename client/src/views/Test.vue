<script setup>
</script>

<template>
    <div class="login-form">
        <h2>POST</h2>
        <form @submit.prevent="createPost">
            <div class="form-group">
                <label for="post">content:</label>
                <input type="text" id="post" v-model="content" required />
            </div>
            <button type="submit">add post</button>
        </form>
    </div>
    <div class="post-container">
        <ul v-if="userPosts.length > 0">
            <li v-for="post in userPosts" :key="post._id">
                {{ post.content }}
            </li>
        </ul>
        <p v-else>No posts found.</p>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            content: '',
            newUserPosts: '',
            userPosts: [],
        };
    },
    mounted() {
        this.fetchPosts();
    },
    fetchPosts: {},
    methods: {
        async fetchPosts() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/home/ideas', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update the assignment based on your actual API response structure
                this.userPosts = response.data.posts;

                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        async createPost(content) {
            try {

                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                console.log(token)
                const response = await axios.post('/home/ideas', { content: this.content }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('Post added:', response.data);

                this.userPosts.push(response.data.post)
                this.newUserPosts = '';

            } catch (error) {
                console.error(error);
            }
        },

    }
}
</script>