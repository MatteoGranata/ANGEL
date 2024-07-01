<template>
    <div class="bg-neutral-900 min-h-screen h-fit w-full">
        <div class="flex flex-col w-full h-fit mt-10">
            <div class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 w-full">
                <form @submit.prevent="createProfit"
                    class="h-full flex justify-center sm:justify-center xl:justify-end me-0 sm:me-0 xl:me-3">
                    <div class="mt-10 p-5 border-2 border-neutral-600 flex rounded-xl w-80 flex">
                        <div class="sm:col-span-4">
                            <label for="nameProfit" class="block text-sm font-medium leading-6 text-slate-50">
                                NAME PROFIT:</label>
                            <div class="mt-1 mb-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                    <input type="text" v-model="nameProfit"
                                        class="pl-2 outline-none block flex-1 w-60 bg-transparent py-1.5 pl-1 text-slate-50 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-4 mt-2">
                                <label for="profit" class="block text-sm font-medium text-slate-50">PROFIT:</label>
                                <div class="mt-1">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                        <input type="number" step="any" v-model="profit" required
                                            class="pl-2 outline-none block flex-1 leading-6 w-60 leanding-6 bg-transparent py-1.5 pl-1 text-slate-50 focus:ring-0 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 text-end">
                                <button type="submit"
                                    class="rounded-md px-1.5 py-0.5 text-sm ring-2 ring-inset ring-neutral-600 hover:ring-green-900 hover:bg-green-700 text-slate-50">
                                    ADD PROFIT
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <form @submit.prevent="createExpense"
                    class="h-full flex justify-center sm:justify-center xl:justify-start">
                    <div class="mt-10 p-5 border-2 border-neutral-600 flex rounded-xl w-80 flex">
                        <div class="sm:col-span-4">
                            <label for="nameExpense" class="block text-sm font-medium leading-6 text-slate-50">
                                NAME EXPENSE:
                            </label>
                            <div class="mt-1 mb-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 sm:max-w-md">
                                    <input type="text" v-model="nameExpense"
                                        class="pl-2 outline-none block flex-1 w-60 bg-transparent py-1.5 pl-1 text-slate-50 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-4 mt-2">
                                <label for="expense" class="block text-sm font-medium text-slate-50">EXPENSE:</label>
                                <div class="mt-1">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-400 overflow-hidden sm:max-w-md">
                                        <input type="number" step="any" v-model="expense" required
                                            class="pl-2 outline-none block flex-1 leading-6 w-60 leanding-6 bg-transparent py-1.5 pl-1 text-slate-50 focus:ring-0 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 text-end">
                                <button type="submit"
                                    class="rounded-md px-1.5 py-0.5 text-sm ring-2 ring-inset ring-neutral-600 hover:ring-red-900 hover:bg-red-700 text-slate-50">
                                    ADD EXPENSE
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="flex justify-center">
                <p
                    class="flex text-center border-2 border-neutral-600 rounded-xl shadow-sm bg-neutral-900 w-fit h-fit px-3 py-1.5 mt-2">
                    TOTAL<br>{{ formatCurrency(balance) }}
                </p>
            </div>
            <div class="flex flex-row justify-center h-fit mx-4 mt-10">
                <ul class="flex justify-center flex-col">
                    <div
                        class="grid gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-2">
                        <li v-show="piggyBank.nameProfit || piggyBank.profit != false"
                            v-for="piggyBank in userPiggyBanks" :key="piggyBank._id"
                            class="flex flex-col flex-wrap mx-1 border-2 border-neutral-600 rounded-lg w-60 h-fit p-2">
                            <div class="resize-none h-fit w-full">
                                <textarea @keyup="autoUpdate(piggyBank._id)" v-model="piggyBank.nameProfit"
                                    class="bg-neutral-800 overflow-hidden rounded-md pl-2 pt-0.5 mb-2 resize-none h-full w-full outline-none"></textarea>
                            </div>
                            <div class="resize-none h-fit w-full">
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                        <span class="text-green-500">+</span>
                                    </div>
                                    <textarea v-model="piggyBank.profit" @keyup="autoUpdate(piggyBank._id)" rows="1"
                                        class="block bg-neutral-800 overflow-hidden rounded-md pl-6 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                                    </textarea>
                                </div>
                            </div>
                            <div class="flex-row flex">
                                <button @click="deletePiggyBank(piggyBank._id)"
                                    class="rounded-md px-1.5 py-0.5 text-lg text-gray-900 mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">&#128465;</button>
                            </div>
                        </li>
                    </div>
                    <div class="grid gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        <li v-show="piggyBank.nameExpense || piggyBank.expense != false"
                            v-for="piggyBank in userPiggyBanks" :key="piggyBank._id"
                            class="flex flex-col flex-wrap mx-1 border-2 border-neutral-600 rounded-lg w-60 h-fit p-2">
                            <div class="resize-none h-fit w-full">
                                <textarea @keyup="autoUpdate(piggyBank._id)" v-model="piggyBank.nameExpense"
                                    class="bg-neutral-800 overflow-hidden rounded-md pl-2 pt-0.5 mb-2 resize-none h-full w-full outline-none"></textarea>
                            </div>
                            <div class="resize-none h-fit w-full">
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                        <span class="text-red-500">-</span>
                                    </div>
                                    <textarea v-model="piggyBank.expense" @keyup="autoUpdate(piggyBank._id)" rows="1"
                                        class="block bg-neutral-800 overflow-hidden rounded-md pl-6 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                                    </textarea>
                                </div>
                            </div>
                            <div class="flex flex-row">
                                <button @click="deletePiggyBank(piggyBank._id)"
                                    class="rounded-md px-1.5 py-0.5 text-lg text-gray-900 mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">&#128465;</button>
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
            nameProfit: '',
            profit: '',
            nameExpense: '',
            expense: '',
            balance: '',
            userPiggyBanks: [],
        };
    },
    mounted() {
        this.fetchBalance();
        this.fetchPiggyBank();
    },
    methods: {

        async fetchBalance() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/piggybank/balance', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.balance = response.data.balance;
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
                return this.userPiggyBanks.profit > 0 ? `+${this.userPiggyBanks.profit}` : this.userPiggyBanks.profit;
            } catch (error) {
                console.error(error);
            }
        },

        async createProfit() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/piggybank', { nameProfit: this.nameProfit, profit: this.profit }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userPiggyBanks.push(response.data.piggyBank)
                this.nameProfit = ''
                this.profit = ''
                this.fetchBalance()
            } catch (error) {
                console.error(error);
            }
        },
        async createExpense() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/piggybank', { nameExpense: this.nameExpense, expense: this.expense }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userPiggyBanks.push(response.data.piggyBank)
                this.nameExpense = ''
                this.expense = ''
                this.fetchBalance()
            } catch (error) {
                console.error(error);
            }
        },
        async autoUpdate(piggyBankId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.updatePiggyBank(piggyBankId)
            }, 300);
        },
        async updatePiggyBank(piggyBankId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const piggyBankToUpdate = this.userPiggyBanks.find(piggyBank => piggyBank._id === piggyBankId);
                if (!piggyBankToUpdate) {
                    console.error('Piggy bank to update not found');
                    return;
                }
                const response = await axios.patch(`/piggybank/${piggyBankId}`, {
                    nameProfit: piggyBankToUpdate.nameProfit,
                    profit: piggyBankToUpdate.profit,
                    nameExpense: piggyBankToUpdate.nameExpense,
                    expense: piggyBankToUpdate.expense,
                }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.fetchBalance();
            } catch (error) {
                console.error(error);
            }
        },
        async deletePiggyBank(piggyBankId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`/piggybank/${piggyBankId}`, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userPiggyBanks = this.userPiggyBanks.filter(piggyBank => piggyBank._id !== piggyBankId);
                this.fetchBalance()
            } catch (error) {
                console.error(error)
            }
        },
        formatCurrency(amount) {
            return parseFloat(amount).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'EUR',
            });
        },
    }
}
</script>