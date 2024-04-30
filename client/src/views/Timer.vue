<template>
    <div class="login-form">
        <h2>TIMER</h2>
        <form @submit.prevent="createTimer">
            <div class="form-group">
                <label for="timer">for what:</label>
                <input type="text" id="timer" v-model="nome" required />
            </div>
            <button type="submit">add post</button>
        </form>
    </div>
    <div>
        <!-- <h2>{{ timer.nome }}</h2> -->
        <!-- <p>Tempo: {{ formatTime(timer.tempo) }}</p> -->
        <!-- <button v-if="!timer.attivo" @click="startTimer">Avvia</button> -->
        <!-- <button v-if="timer.attivo" @click="stopTimer">Arresta</button> -->


        <!-- <button @click="resetTimer">Reset</button> -->
        <!-- <button @click="deleteTimer">Elimina</button> -->
    </div>
    <div class="timer-container">
        <ul v-if="userTimers.length > 0">
            <li v-for="timer in userTimers" :key="timer._id">
                for: {{ timer.nome }} <br>
                Tempo: {{ formatTime(timer.tempo) }}
                <button v-if="!timer.attivo" @click="startTimer(timer._id)">Avvia</button>
                <button v-if="timer.attivo" @click="stopTimer(timer._id)">Arresta</button>

            </li>
        </ul>
        <p v-else>No posts found.</p>
    </div>
</template>

<script>

import router from '@/router';
import axios from 'axios';
export default {
    data() {
        return {
            nome: '',
            interval: null,
            userTimers: [],
        };
    },
    mounted() {
        this.fetchPosts();
    },
    fetchPosts: {},
    methods: {
        async formatTime(milliseconds) {
            // Implement logic to format milliseconds to HH:MM:SS format
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        async fetchPosts() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/timer/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Update the assignment based on your actual API response structure
                this.userTimers = response.data.timers;
                console.log('timer:', response.data.timers)
            } catch (error) {
                console.error(error);
            }
        },
        async createTimer() {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/timer', { nome: this.nome }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('timer added:', response.data);

                this.userTimers.push(response.data.timer)
                this.timer = ''

            } catch (error) {
                console.error(error);
            }
        },
        async startTimer(timerId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.put(`timer/${timerId}/avvia/`, { timer: this.timer }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.timer = response.data.timers
                this.intervalId = setInterval(() => {
                    this.timer.tempo += this.timer.intervallo;
                }, this.timer.intervallo);
                console.log('Post updated:', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        // async deletePost(postId) {
        //     try {
        //         const token = localStorage.getItem('token'); // Get token from local storage
        //         if (!token) {
        //             // Handle no token case (e.g., redirect to login)
        //             console.error('No token found');
        //             return;
        //         }
        //         const response = await axios.delete(`/post/${postId}`, {
        //             headers: { Authorization: `bearer ${token}` },

        //         });
        //         console.log('Post removed:', response.data);
        //         this.userPosts = this.userPosts.filter(post => post._id !== postId);
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },


    }
}
</script>