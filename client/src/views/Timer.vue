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
    <div class="timer-container">
        <ul v-if="userTimers">
            <li v-for="timer in userTimers" :key="timer._id">
                for: {{ timer.nome }} <br>
                Tempo: {{ formatTime(timer.tempo) }}
                <button v-if="!timer.attivo" @click="startTimer(timer._id)">Avvia</button>
                <button v-if="timer.attivo" @click="stopTimer(timer._id)">Arresta</button>
                <button @click="delteTimer(timer._id)">Elimina</button>
                <button v-if="timer.tempo != 0" @click="resetTimer(timer._id)">Reset Timer</button>
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
            userTimers: [],
            status: '',
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

            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
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
                this.nome = ''

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
                const timerToUpdate = this.userTimers.find(timer => timer._id === timerId);
                if (!timerToUpdate) {
                    console.error('Timer to start not found');
                    return;
                }

                const response = await axios.patch(`/timer/${timerId}/avvia`, { tempo: timerToUpdate.tempo }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('timer start:', response.data);

                timerToUpdate.attivo = true;
                this.intervalId = setInterval(() => {
                    timerToUpdate.tempo += 1000; // Update in milliseconds
                }, 1000);
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
                const timerToUpdate = this.userTimers.find(timer => timer._id === timerId);
                if (!timerToUpdate) {
                    console.error('Timer to stop not found');
                    return;
                }
                const response = await axios.patch(`/timer/${timerId}/arresta`, { tempo: timerToUpdate.tempo }, {
                    headers: { Authorization: `bearer ${token}` },
                });

                console.log('timer stop:', response.data);
                timerToUpdate.attivo = false;
                this.timerToUpdate = clearInterval(this.intervalId)
                this.intervalId = null;
            } catch (error) {
                console.error(error)
            }
        },
        async resetTimer(timerId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const timerToUpdate = this.userTimers.find(timer => timer._id === timerId);
                if (!timerToUpdate) {
                    console.error('Timer to stop not found');
                    return;
                }
                const response = await axios.put(`/timer/${timerId}/reset`, { tempo: timerToUpdate.tempo }, {
                    headers: { Authorization: `bearer ${token}` },

                });
                timerToUpdate.tempo = 0
                console.log('timer reset:', response.data);

            } catch (error) {
                console.error(error)
            }
        },
        async delteTimer(timerId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`/timer/${timerId}`, {
                    headers: { Authorization: `bearer ${token}` },

                });
                console.log('Timer removed:', response.data);
                this.userTimers = this.userTimers.filter(timer => timer._id !== timerId);
            } catch (error) {
                console.error(error)
            }
        },
    }
}
</script>