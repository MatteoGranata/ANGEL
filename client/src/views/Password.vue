<template>
    <div class="login-form">
        <h2>PASSWORD</h2>
        <form @submit.prevent="createPassword">
            <div class="form-group">
                <label for="password">for what:</label>
                <input type="text" id="password" v-model="content" required />
            </div>
            <div class="form-group">
                <label for="password">password:</label>
                <input type="text" id="password" v-model="secret" required />
            </div>
            <button type="submit">add password</button>
        </form>
    </div>
    <div class="password-container">
        <ul v-if="userPasswords.length > 0">
            <li v-for="password in userPasswords" :key="password._id">
                <textarea v-model="password.content" name="password" id="password" cols="30"
                    rows="5">{{ password.content }}</textarea>
                <textarea v-model="password.secret" name="secret" id="secret" cols="30"
                    rows="5">{{ password.secret }}</textarea>
                <button @click="updatePassword(password._id)">update Password</button>
                <button @click="deletePassword(password._id)">delete Password</button>
            </li>

        </ul>
        <p v-else>No password found.</p>
    </div>

</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            content: '',
            secret: '',
            userPasswords: [],
        };
    },
    mounted() {
        this.fetchPassword();
    },
    fetchPassword: {},
    methods: {
        async fetchPassword() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/password/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                // Update the assignment based on your actual API response structure
                this.userPasswords = response.data.passwords;

            } catch (error) {
                console.error(error);
            }
        },
        async createPassword() {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/password', { content: this.content, secret: this.secret }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('Password added:', response.data);

                this.userPasswords.push(response.data.password)
                this.content = ''
                this.secret = ''

            } catch (error) {
                console.error(error);
            }
        },
        async updatePassword(passwordId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const passwordToUpdate = this.userPasswords.find(password => password._id === passwordId);
                if (!passwordToUpdate) {
                    console.error('Password to update not found');
                    return;
                }
                console.log(passwordToUpdate)
                const response = await axios.patch(`/password/${passwordId}`, { content: passwordToUpdate.content, secret: passwordToUpdate.secret }, {
                    headers: { Authorization: `bearer ${token}` },
                });

                console.log('Password updated:', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async deletePassword(passwordId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`/password/${passwordId}`, {
                    headers: { Authorization: `bearer ${token}` },

                });
                console.log('Password removed:', response.data);
                this.userPasswords = this.userPasswords.filter(password => password._id !== passwordId);
            } catch (error) {
                console.error(error)
            }
        },

    }
}
</script>