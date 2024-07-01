<template>
    <div class="bg-neutral-900 min-h-screen h-fit w-full">
        <div class="flex flex-col w-full h-fit mt-10">
            <form @submit.prevent="createTimer" class="h-fit flex justify-center">
                <div class="mt-10 p-5 border-2 border-neutral-600 flex rounded-xl w-80">
                    <div class="sm:col-span-4">
                        <label for="timer" class="block text-sm font-medium leading-6 text-slate-50">FOR
                            WHAT:</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                <input type="text" v-model="nome" required
                                    class="pl-2 outline-none block flex-1 w-60 bg-transparent py-1.5 pl-1 text-slate-50 sm:text-sm sm:leading-6" />
                            </div>
                            <div class="mt-3 text-end">
                                <button type="submit"
                                    class="rounded-md px-1.5 py-0.5 text-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800 text-slate-50">
                                    ADD TIMER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="flex flex-row justify-center h-fit mx-4 mt-10">
                <ul class="grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <li v-for="timer in userTimers" :key="timer._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-[60vw] sm:w-[60vw] md:w-80 lg:w-96 h-fit p-2">
                        <div class="resize-none h-fit w-full">
                            <textarea v-model="timer.nome"
                                class="bg-neutral-800 overflow-hidden rounded-md pl-2 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                        </textarea>
                        </div>
                        <div class="flex rounded-md w-fit bg-neutral-800">
                            <p class="p-3 bg-neutral-800 rounded-lg w-fit"> {{ formatTime(timer.tempo) }}</p>
                        </div>
                        <div class=" flex-wrap flex justify-around mt-4">
                            <button v-if="!timer.attivo" @click="startTimer(timer._id)"
                                class="rounded-md px-1.5 py-0.5 text-sm mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">
                                START
                            </button>
                            <button v-if="timer.attivo" @click="stopTimer(timer._id)"
                                class="rounded-md px-1.5 py-0.5 text-sm mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">
                                STOP
                            </button>
                            <button @click="delteTimer(timer._id)"
                                class="rounded-md px-1.5 py-0.5 text-lg mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">
                                &#128465;
                            </button>
                            <button v-if="timer.tempo != 0" @click="resetTimer(timer._id)"
                                class="rounded-md px-1.5 py-0.5 text-sm mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">
                                RESET TIMER
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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
        this.fetchTimer();
    },
    methods: {
        formatTime(milliseconds) {
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
        },
        async fetchTimer() {
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