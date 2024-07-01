<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="flex m-0 w-full h-fit text-slate-50">
        <div class="flex-wrap z-20 pt-16 bg-neutral-800">
            <div class="flex flex-col items-center w-20">
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/homepage">
                        <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/home.png"
                            alt="home" />
                    </RouterLink>
                </div>
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/post">
                        <img width="25" height="25"
                            src="https://img.icons8.com/fluency-systems-filled/96/FFFFFF/note.png" alt="note" />
                    </RouterLink>
                </div>
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/timer">
                        <img width="25" height="25" src="https://img.icons8.com/material-rounded/96/FFFFFF/time.png"
                            alt="time" />
                    </RouterLink>
                </div>
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/password">
                        <img width="25" height="25" src="https://img.icons8.com/metro/104/FFFFFF/password.png"
                            alt="password" />
                    </RouterLink>
                </div>
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/piggybank">
                        <img width="25" height="25" src="https://img.icons8.com/ios-filled/100/FFFFFF/money-box--v1.png"
                            alt="money-box--v1" />
                    </RouterLink>
                </div>
                <div class="flex justify-center border-2 border-neutral-600 rounded-lg m-2 py-2.5 px-3 w-fit">
                    <RouterLink to="/project">
                        P di peoject
                    </RouterLink>
                </div>
            </div>
        </div>
        <RouterView />

        <div v-show="$route.path === '/homepage'"
            class="grid grid-cols-1 gap-3 lg:grid-cols-2 w-full h-fit px-2 pt-16 bg-neutral-900">
            <div
                class="flex justify-center content-center w-full h-[30rem] border-2 border-neutral-600 overflow-hidden p-5 rounded-xl">
                <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 h-fit">
                    <li v-for="post in userPosts" :key="post._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-full h-60 p-1.5">
                        <p class="bg-neutral-800 rounded-md px-1 resize-none h-full w-full overflow-hidden">
                            {{ post.content }}
                        </p>
                    </li>
                </ul>
            </div>
            <div
                class="flex justify-center content-center w-full h-[30rem] border-2 border-neutral-600 overflow-hidden p-5 rounded-xl">
                <ul
                    class="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-fit">
                    <li v-for="timer in userTimers" :key="timer._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-full h-fit p-2">
                        <div class="p-1 resize-none h-fit w-full">
                            <p
                                class="border-2 border-neutral-600 rounded-md px-1 resize-none h-fit w-full mb-5 overflow-hidden">
                                {{ timer.nome }}
                            </p>
                            <p
                                class="border-2 border-neutral-600 rounded-md px-1 resize-none h-fit w-full overflow-hidden">
                                {{
                                    formatTime(timer.tempo) }}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div
                class="flex justify-center content-center w-full h-[30rem] border-2 border-neutral-600 overflow-hidden p-5 rounded-xl">
                <ul
                    class="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-fit overflow-hidden">
                    <li v-for="password in userPasswords" :key="password._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-full h-fit p-2">
                        <div class="p-1 mb-5 resize-none h-fit w-full">
                            <p
                                class="border-2 border-neutral-600 rounded-md px-1 resize-none h-fit w-full overflow-hidden">
                                {{ password.content }}
                            </p>
                        </div>
                        <div class="flex rounded-md shadow-sm ring-2 ring-inset ring-neutral-600">
                            <p v-if="password.show" class="px-1 resize-none w-full overflow-hidden">
                                {{ password.secret }}
                            </p>
                            <input v-else type="password" v-model="password.secret"
                                class="block flex-1 w-full bg-transparent pl-1.5 focus:ring-0 sm:text-sm sm:leading-6 outline-none" />
                            <button @click="togglePasswordVisibility(password)" class="px-1 py-0.5 flex">
                                <template v-if="password.show">
                                    <img width="25" height="20"
                                        src="https://img.icons8.com/ios-glyphs/90/FFFFFF/visible--v1.png"
                                        alt="visible--v1" class="p-0.5" />
                                </template>
                                <template v-else>
                                    <img width="20" height="20"
                                        src="https://img.icons8.com/ios-glyphs/90/FFFFFF/invisible.png" alt="invisible"
                                        class="p-0.5" />
                                </template>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

            <div
                class="flex justify-center content-center w-full h-[30rem] border-2 border-neutral-600 p-5 overflow-hidden rounded-xl">
                <ul
                    class="w-full h-full grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 overflow-hidden justify-items-center">
                    <div>
                        <li v-show="piggyBank.nameProfit || piggyBank.profit != false"
                            v-for="piggyBank in userPiggyBanks" :key="piggyBank._id"
                            class="flex flex-col border-2 border-neutral-600 my-2 rounded-lg w-80 h-fit p-2">
                            <div v-show="piggyBank.nameProfit" class="p-1 resize-none h-fit w-full">
                                <p
                                    class="border-2 border-neutral-600 rounded-md px-1 resize-none h-fit w-full overflow-hidden">
                                    {{ piggyBank.nameProfit }}</p>
                            </div>
                            <div v-show="piggyBank.profit != false" class="p-1 resize-none h-fit w-full">
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <div
                                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 pb-1">
                                        <span class="text-green-500 font-bold">+</span>
                                    </div>
                                    <p
                                        class="border-2 border-neutral-600 rounded-md pl-5 resize-none h-fit w-full overflow-hidden">
                                        {{ formatCurrency(piggyBank.profit) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </div>
                    <div>
                        <li v-show="piggyBank.nameExpense || piggyBank.expense != false"
                            v-for="piggyBank in userPiggyBanks" :key="piggyBank._id"
                            class="flex flex-col border-2 border-neutral-600 my-2 rounded-lg w-80 h-fit p-2">
                            <div v-show="piggyBank.nameExpense" class=" p-1 resize-none h-fit w-full">
                                <p
                                    class="border-2 border-neutral-600 rounded-md px-1 resize-none h-fit w-full overflow-hidden">
                                    {{ piggyBank.nameExpense }}
                                </p>
                            </div>
                            <div v-show="piggyBank.expense != false" class=" p-1 resize-none h-fit w-full">
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <div
                                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 pb-0.5">
                                        <span class="text-red-500 font-bold">-</span>
                                    </div>
                                    <p
                                        class="border-2 border-neutral-600 rounded-md pl-5 resize-none h-fit w-full overflow-hidden">
                                        {{ formatCurrency(piggyBank.expense) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </div>
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
            userPosts: [],
            userTimers: [],
            userPasswords: [],
            userPiggyBanks: [],
        };
    },
    mounted() {
        this.fetchPosts();
        this.fetchTimer();
        this.fetchPassword();
        this.fetchPiggyBank();
    },
    methods: {
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
        formatTime(milliseconds) {
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
        },
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
                this.userPasswords = response.data.passwords.map(password => ({ ...password, show: false }));
            } catch (error) {
                console.error(error);
            }
        },
        togglePasswordVisibility(password) {
            password.show = !password.show;
        },
        async fetchPosts() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/post/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userPosts = response.data.posts;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPiggyBank() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/piggybank/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userPiggyBanks = response.data.piggyBanks;
            } catch (error) {
                console.error(error);
            }
        },
        formatCurrency(amount) {
            return parseFloat(amount).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'EUR',
            });
        },
        reload() {
            window.location.reload();
        }
    }
}
</script>