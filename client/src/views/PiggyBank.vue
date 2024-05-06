<template>
    <div class="piggyBank-form">
        <h2>PIGGY BANK</h2>
        <form @submit.prevent="createProfit">
            <div class="form-group">
                <label for="nameProfit">name profit:</label>
                <input type="text" id="nameProfit" v-model="nameProfit" />
            </div>
            <div class="form-group">
                <label for="profit">profit:</label>
                <input type="number" step="any" id="profit" v-model="profit" required />
            </div>
            <button type="submit">add profit</button>

        </form>
        <form @submit.prevent="createExpense">
            <div class="form-group">
                <label for="nameExpense">name expense:</label>
                <input type="text" id="nameExpense" v-model="nameExpense" />
            </div>
            <div class="form-group">
                <label for="expense">expense:</label>
                <input type="number" step="any" id="expense" v-model="expense" required />
            </div>
            <button type="submit">add expense</button>
        </form>
    </div>
    <div class="piggyBank-container">
        <ul v-if="userPiggyBanks.length > 0">
            <li v-show="piggyBank.nameProfit || piggyBank.profit != false" v-for="piggyBank in userPiggyBanks"
                :key="piggyBank._id">
                <div v-show="piggyBank.nameProfit">
                    <p>name profit:</p>
                    <textarea v-model="piggyBank.nameProfit" name="nameProfit" id="nameProfit" cols="10"
                        rows="1"> {{ piggyBank.nameProfit }}</textarea>
                </div>
                <div v-show="piggyBank.profit != false">
                    <p>profit:</p>
                    <textarea v-model="piggyBank.profit" name="profit" id="profit" cols="10"
                        rows="1"> {{ piggyBank.profit.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) }}</textarea>
                </div>
                <button @click="updatePiggyBank(piggyBank._id)">update Profit</button>
                <button @click="deletePiggyBank(piggyBank._id)">delete Profit</button>
            </li>

            <li v-show="piggyBank.nameExpense || piggyBank.expense != false" v-for="piggyBank in userPiggyBanks"
                :key="piggyBank._id" class="flex">
                <div v-show="piggyBank.nameExpense">
                    <p>name expense:</p>
                    <textarea v-model="piggyBank.nameExpense" name="nameExpense" id="nameExpense" cols="10"
                        rows="1"> {{ piggyBank.nameExpense }}</textarea>
                </div>
                <div v-show="piggyBank.expense != false">
                    <p>expense:</p>
                    <textarea v-model="piggyBank.expense" name="expense" id="expense" cols="10"
                        rows="1">{{ piggyBank.expense.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) }}</textarea>
                </div>
                <button @click="updatePiggyBank(piggyBank._id)">update expense</button>
                <button @click="deletePiggyBank(piggyBank._id)">delete expense</button>
            </li>

        </ul>
        <p v-else>No piggy banks found.</p>
        {{ balance.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) }}

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
        this.fetchBalance(),
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
                console.log('balance:', response.data)
                // Update the assignment based on your actual API response structure
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
                console.log('piggy:', response.data)
                // Update the assignment based on your actual API response structure
                this.userPiggyBanks = response.data.piggyBanks;
                console.log('piggy somma:', response.data.piggyBanks)
            } catch (error) {
                console.error(error);
            }
        },

        async createProfit() {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/piggybank', { nameProfit: this.nameProfit, profit: this.profit }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('piggy bank added:', response.data);

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
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/piggybank', { nameExpense: this.nameExpense, expense: this.expense }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('piggy bank added:', response.data);

                this.userPiggyBanks.push(response.data.piggyBank)
                this.nameExpense = ''
                this.expense = ''
                this.fetchBalance()
            } catch (error) {
                console.error(error);
            }
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
                    console.error('Password to update not found');
                    return;
                }
                console.log('test', piggyBankToUpdate)
                const response = await axios.patch(`/piggybank/${piggyBankId}`, { nameProfit: piggyBankToUpdate.nameProfit, profit: piggyBankToUpdate.profit, nameExpense: piggyBankToUpdate.nameExpense, expense: piggyBankToUpdate.expense }, {
                    headers: { Authorization: `bearer ${token}` },
                });

                console.log('Piggy bank updated:', response.data);
                this.fetchBalance()
            } catch (error) {
                console.error(error);
            }
        },
        async deletePiggyBank(piggyBankId) {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }

                const response = await axios.delete(`/piggybank/${piggyBankId}`, {
                    headers: { Authorization: `bearer ${token}` },

                });
                console.log('Password removed:', response.data);
                this.userPiggyBanks = this.userPiggyBanks.filter(password => password._id !== piggyBankId);
                this.fetchBalance()
            } catch (error) {
                console.error(error)
            }
        },

    }
}
</script>