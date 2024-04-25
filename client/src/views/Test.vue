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
            <!-- updatePost(post._id) -->

            <li v-for="post in userPosts" :key="post._id">
                <p> {{ post.content }} </p>
                <button @click="updatePost(post._id)">update Post</button>
                <button @click="deletePost(post._id)">delete Post</button>

            </li>

        </ul>
        <p >No posts found.</p>
    </div>

</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            content: '',
            editedContent: '',
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
                const response = await axios.get('/home/post', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update the assignment based on your actual API response structure
                this.userPosts = response.data.posts;

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
                const response = await axios.post('/home/post', { content: this.content }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('Post added:', response.data);

                this.userPosts.push(response.data.post)
                this.content = ''

            } catch (error) {
                console.error(error);
            }
        },
        async updatePost(postId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const editedPostContent = this.editedContent.trim(); // Trim whitespace

                if (!editedPostContent) {
                    console.warn('Empty content. Update cancelled.');
                    return;
                }

                const response = await axios.put(`/home/post/${postId}`, { content: editedPostContent }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('Post updated:', response.data);

                // Update the corresponding post in userPosts (assuming response provides updated data)
                const postIndex = this.userPosts.findIndex(post => post._id === postId);
                if (postIndex !== -1) {
                    this.userPosts.splice(postIndex, 1, response.data.post); // Replace the post with the updated one
                }
                console.log('postindex', postIndex)
                // Reset the edited content for this post
                this.editedContent = '';
            } catch (error) {
                console.error(error);
            }
        },
        async deletePost(postId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`/home/post/${postId}`, {
                    headers: { Authorization: `bearer ${token}` },

                });
                console.log('Post added:', response.data);
                this.userPosts = this.userPosts.filter(post => post._id !== postId);
            } catch (error) {
                console.error(error)
            }
        },
        toggle() {
            this.awesome = !this.awesome
        }

    }
}
</script>