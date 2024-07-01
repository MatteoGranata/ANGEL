<template>
    <div
        class="min-h-full sm:min-h-[97vh] h-full w-[97vw] sm:w-full pt-3 pr-3 pb-4 pl-3 sm:pl-7 sm:pr-3 bg-ghost mt-5 mb-3 sm:mt-3 sm:mx-3 rounded-xl sm:text-lg">
        <div class="flex justify-center w-full h-full drop-shadow-3xl">
            <div class="flex flex-col sm:flex-row justify-center w-full h-full">
                <div class="flex flex-wrap w-full justify-center sm:w-fit h-fit">
                    <p
                        class="p-5 bg-ghost flex rounded-lg w-fit items-center text-center text-slate-800 font-medium shadow-lg flex">
                        TOTAL<br>{{ formatCurrency(balance) }}
                    </p>
                </div>
                <ul class="grid grid-cols-2 gap-5 md:grid-cols-2 h-full w-full mt-5 sm:ml-5 sm:mt-0">
                    <div class="flex flex-row justify-center h-full rounded-xl text-slate-800">
                        <div
                            class="grid gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 rounded-xl w-full h-fit">
                            <li v-for="piggyBank in userProfits" :key="piggyBank._id"
                                class="flex flex-col bg-ghost rounded-xl w-full h-fit p-1 shadow-lg">
                                <div class="resize-none h-fit w-full">
                                    <textarea @keyup="autoUpdateProfit(piggyBank._id)" v-model="piggyBank.nameProfit"
                                        name="nameProfit" placeholder="name profit..." rows="1"
                                        class="bg-ghost overflow-hidden rounded-md pl-2 pt-0.5 resize-none h-full w-full outline-none font-medium">
                                </textarea>
                                </div>
                                <div class="resize-none h-fit w-full">
                                    <div class="relative mt-2 rounded-md">
                                        <div
                                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 font-bold">
                                            <span class="text-emerald-600">+</span>
                                        </div>
                                        <input type="number" placeholder="0" v-model="piggyBank.amount" name="amount"
                                            @keyup="autoUpdateProfit(piggyBank._id)"
                                            class="block bg-ghost overflow-hidden rounded-md pl-6 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                                        </input>
                                    </div>
                                </div>
                                <div class="mt-2 flex-row flex">
                                    <button @click="deleteProfit(piggyBank._id)"
                                        class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow">
                                        <img src="../assets/icon/trashcan.png" alt="DELETE">
                                    </button>
                                </div>
                            </li>
                            <li class="flex h-fit w-full sm:w-fit justify-center items-center">
                                <button @click="createProfit"
                                    class="py-5 m-7 w-20 h-20 text-emerald-600 flex justify-center rounded-full bg-ghost text-5xl ring-2 ring-inset ring-snow/70 hover:bg-snow drop-shadow-3xl">
                                    +
                                </button>
                            </li>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center h-full rounded-xl text-slate-800">
                        <div
                            class="grid gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 rounded-xl w-full h-fit">
                            <li v-for="piggyBank in userExpenses" :key="piggyBank._id"
                                class="flex flex-col bg-ghost rounded-xl w-full h-fit p-1 shadow-lg">
                                <div class="resize-none h-fit w-full">
                                    <textarea @keyup="autoUpdateExpense(piggyBank._id)" v-model="piggyBank.nameExpense"
                                        name="nameExpense" placeholder="Name Expense" rows="1"
                                        class="bg-ghost overflow-hidden rounded-md pl-2 pt-0.5 resize-none h-full w-full outline-none">
                                </textarea>
                                </div>
                                <div class="resize-none h-fit w-full">
                                    <div class="relative mt-2 rounded-md">
                                        <div
                                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center font-bold pb-0.5 pl-2">
                                            <span class="text-orange-600">-</span>
                                        </div>
                                        <input type="number" placeholder="0" v-model="piggyBank.amount"
                                            name="amountExpense" @keyup="autoUpdateExpense(piggyBank._id)"
                                            class="block bg-ghost overflow-hidden rounded-md pl-6 pt-0.5 mb-2 resize-none h-full w-full outline-none">
                                        </input>
                                    </div>
                                </div>
                                <div class="mt-2 flex flex-row">
                                    <button @click="deleteExpense(piggyBank._id)"
                                        class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow">
                                        <img src="../assets/icon/trashcan.png" alt="delete">
                                    </button>
                                </div>
                            </li>
                            <li class="flex h-fit w-full sm:w-fit justify-center items-center">
                                <button @click="createExpense"
                                    class="py-4 m-7 w-20 h-20 flex justify-center rounded-full bg-ghost text-5xl text-orange-600 ring-2 ring-inset ring-snow/70 hover:bg-snow drop-shadow-3xl">
                                    -
                                </button>
                            </li>
                        </div>
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
            amount: '',
            nameExpense: '',
            balance: '',
            userProfits: [],
            userExpenses: [],
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
                const projectID = localStorage.getItem("projectID");
                if (!projectID) {
                    console.error('No Project found');
                    return;
                }
                const response = await axios.get(`https://pippo-bn7v.onrender.com/piggybank/${projectID}/balance`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.balance = response.data.total;
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
                const projectID = localStorage.getItem("projectID");
                if (!projectID) {
                    console.error('No Project found');
                    return;
                }
                const response = await axios.get(`https://pippo-bn7v.onrender.com/project/${projectID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userExpenses = response.data.piggyBanks.expenses;
                this.userProfits = response.data.piggyBanks.profits;
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
                const projectID = localStorage.getItem("projectID");
                if (!projectID) {
                    console.error('No Project found');
                    return;
                }
                const response = await axios.post('https://pippo-bn7v.onrender.com/piggybank/profit', { nameProfit: this.nameProfit, projectId: projectID }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userProfits.push(response.data.profit)
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
                const projectID = localStorage.getItem("projectID");
                if (!projectID) {
                    console.error('No Project found');
                    return;
                }
                const response = await axios.post('https://pippo-bn7v.onrender.com/piggybank/expense', { nameExpense: this.nameExpense, projectId: projectID }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userExpenses.push(response.data.expense)
                this.fetchBalance()
            } catch (error) {
                console.error(error);
            }
        },
        async autoUpdateProfit(piggyBankId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.updateProfit(piggyBankId)
            }, 300);
        },

        async updateProfit(profitId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const profitToUpdate = this.userProfits.find(piggyBank => piggyBank._id === profitId);
                if (!profitToUpdate) {
                    console.error('Piggy bank to update not found');
                    return;
                }
                const response = await axios.patch(`https://pippo-bn7v.onrender.com/piggybank/profit/${profitId}`, {
                    nameProfit: profitToUpdate.nameProfit,
                    amount: profitToUpdate.amount,
                }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.fetchBalance();
            } catch (error) {
                console.error(error);
            }
        },
        async autoUpdateExpense(piggyBankId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.updateExpense(piggyBankId)
            }, 300);
        },
        async updateExpense(expenseId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const expenseToUpdate = this.userExpenses.find(piggyBank => piggyBank._id === expenseId);
                if (!expenseToUpdate) {
                    console.error('Piggy bank to update not found');
                    return;
                }
                const response = await axios.patch(`https://pippo-bn7v.onrender.com/piggybank/expense/${expenseId}`, {
                    nameExpense: expenseToUpdate.nameExpense,
                    amount: expenseToUpdate.amount,
                }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.fetchBalance();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteProfit(profitId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`https://pippo-bn7v.onrender.com/piggybank/profit/${profitId}`, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userProfits = this.userProfits.filter(piggyBank => piggyBank._id !== profitId);
                this.fetchBalance()
            } catch (error) {
                console.error(error)
            }
        },
        async deleteExpense(expenseId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`https://pippo-bn7v.onrender.com/piggybank/expense/${expenseId}`, {
                    headers: { Authorization: `bearer ${token}` },
                });
                this.userExpenses = this.userExpenses.filter(piggyBank => piggyBank._id !== expenseId);
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