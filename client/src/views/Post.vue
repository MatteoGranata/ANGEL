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
        <textarea v-model="post.content" name="post" id="post" cols="30" rows="5">{{ post.content }}</textarea>
        <button @click="updatePost(post._id)">update Post</button>
        <button @click="deletePost(post._id)">delete Post</button>
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
        async createPost() {
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

      const postToUpdate = this.userPosts.find(post => post._id === postId);
      if (!postToUpdate) {
        console.error('Post to update not found');
        return;
      }

      const response = await axios.patch(`/home/post/${postId}`, { content: postToUpdate.content }, {
        headers: { Authorization: `bearer ${token}` },
      });

      console.log('Post updated:', response.data);
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
                console.log('Post removed:', response.data);
                this.userPosts = this.userPosts.filter(post => post._id !== postId);
            } catch (error) {
                console.error(error)
            }
        }

    }
}
</script>