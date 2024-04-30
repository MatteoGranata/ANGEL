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
        <ul v-if="userTimers">
            <li v-for="timer in userTimers" :key="timer._id">
                for: {{ timer.nome }} <br>
                Tempo: {{ formatTime(timer.tempo) }}
                <button v-if="status" @click="startTimer(timer._id)">Avvia</button>
                <button v-else @click="stopTimer(timer._id)">Arresta</button>
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
            nome: '',
            timer: null,
            intervalId: null,
            userTimers: [],
            status: true,
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        formatTime(milliseconds) {
            // Implement logic to format milliseconds to HH:MM:SS format
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

            // Use template literal for cleaner string formatting
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
                this.name = ''

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
                const postToUpdate = this.userTimers.find(timers => timers._id === timerId);
                if (!postToUpdate) {
                    console.error('Post to update not found');
                    return;
                }
                const response = await axios.patch(`timer/${timerId}/avvia`, { tempo: postToUpdate.tempo }, {
                    headers: { Authorization: `bearer ${token}` },
                });

                this.timer = postToUpdate;
                // Start an interval to update the timer display
                this.intervalId = setInterval(() => {
                    this.timer.tempo += this.timer.intervallo;
                }, this.timer.intervallo);

                console.log('timer start:', postToUpdate);
                this.status = false
            } catch (error) {
                console.error(error);
            }
        },
        async stopTimer(timerId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const postToUpdate = this.userTimers.find(timers => timers._id === timerId);
                if (!postToUpdate) {
                    console.error('Post to update not found');
                    return;
                }
                const response = await axios.patch(`/timer/${timerId}/arresta`, { tempo: postToUpdate.tempo }, {
                    headers: { Authorization: `bearer ${token}` },

                });
                this.timer = postToUpdate

                console.log('timer stop:', response.data);
                // Clear the interval to stop updating the timer
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.status = true


            } catch (error) {
                console.error(error)
            }
        },

        startInterval() {
            this.interval = setInterval(() => {
                this.timers.forEach(timer => {
                    if (timer.running) {
                        timer.time++;
                    }
                });
            }, 1000);
        },
    }
}
</script>