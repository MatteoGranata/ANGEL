<template>
    <div class="bg-neutral-900 min-h-screen h-fit w-full">
        <div class="flex flex-col flex-wrap w-full h-full mt-10">
            <form @submit.prevent="createPassword" class="h-fit flex justify-center">
                <div class="mt-10 p-5 border-2 border-neutral-600 flex rounded-xl w-80">
                    <div class="sm:col-span-4">
                        <label for="password" class="block text-sm font-medium leading-6 text-slate-50">
                            for what:
                        </label>
                        <div class="mt-1 mb-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                <input type="text" v-model="content" required
                                    class="pl-2 outline-none block flex-1 w-60 bg-transparent py-1.5 pl-1 text-slate-50 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label for="password" class="block text-sm font-medium text-slate-50">Password:</label>
                            <div class="mt-1">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                    <input type="password" v-model="secret" required
                                        class="pl-2 outline-none block flex-1 leading-6 w-60 leanding-6 bg-transparent py-1.5 pl-1 text-slate-50 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 text-end">
                            <button type="submit"
                                class="rounded-md px-1.5 py-0.5 text-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800 text-slate-50">
                                ADD PASSWORD
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="flex flex-row justify-center h-fit mx-4 mt-10">
                <ul class="grid grid-cols-1 gap-9 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <li v-for="password in userPasswords" :key="password._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-full h-fit p-2">
                        <div class="resize-none h-fit w-full">
                            <textarea @keyup="autoUpdate(password._id)" v-model="password.content" name="password"
                                class="bg-neutral-800 overflow-hidden rounded-md pl-2 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                            </textarea>
                        </div>
                        <div class="flex rounded-md w-full bg-neutral-800">
                            <input @keyup="autoUpdate(password._id)" v-if="password.show" type="text"
                                v-model="password.secret"
                                class="block flex-1 w-60 bg-neutral-800 rounded-lg py-1.5 pl-2 focus:ring-0 sm:text-sm sm:leading-6 outline-none" />
                            <input @keyup="autoUpdate(password._id)" v-else type="password" v-model="password.secret"
                                class="block flex-1 w-60 bg-neutral-800 rounded-lg py-1.5 pl-2 focus:ring-0 sm:text-sm sm:leading-6 outline-none" />
                            <button @click="togglePasswordVisibility(password)" class="rounded-md px-2.5">
                                <template v-if="password.show">
                                    <img width="20" height="20"
                                        src="https://img.icons8.com/ios-glyphs/90/FFFFFF/visible--v1.png"
                                        alt="visible--v1" />
                                </template>
                                <template v-else>
                                    <img width="20" height="20"
                                        src="https://img.icons8.com/ios-glyphs/90/FFFFFF/invisible.png"
                                        alt="invisible" />
                                </template>
                            </button>
                        </div>
                        <div class="flex-row flex mt-2">
                            <button @click="deletePassword(password._id)"
                                class="rounded-md px-1.5 py-0.5 text-lg text-gray-900 mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">&#128465;</button>
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
                this.userPasswords = response.data.passwords.map(password => ({ ...password, show: false }));
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

                this.userPasswords.push({ ...response.data.password, show: false });
                this.content = '';
                this.secret = '';

            } catch (error) {
                console.error(error);
            }
        },
        async autoUpdate(passwordId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.updatePassword(passwordId)
            }, 300);
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
                const response = await axios.patch(`/password/${passwordId}`, { content: passwordToUpdate.content, secret: passwordToUpdate.secret }, {
                    headers: { Authorization: `bearer ${token}` },
                });

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
        togglePasswordVisibility(password) {
            password.show = !password.show;
        }
    }
}
</script>
