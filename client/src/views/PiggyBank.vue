<template>
    <div class="piggyBank-form">
        <h2>PIGGY BANK</h2>
        <form @submit.prevent="createProfit">
            <div class="form-group">
                <label for="nameProfit">name profit:</label>
                <input type="text" id="piggyBank" v-model="nameProfit" />
            </div>
            <div class="form-group">
                <label for="profit">profit:</label>
                <input type="number" id="piggyBank" v-model="profit" />
            </div>
            <button type="submit">add profit</button>

        </form>
        <!-- v-show="userPiggyBanks == 0" -->
        <form @submit.prevent="createExpense">
            <div class="form-group">
                <label for="nameExpense">name expense:</label>
                <input type="text" id="piggyBank" v-model="nameExpense" />
            </div>
            <div class="form-group">
                <label for="expense">expense:</label>
                <input type="number" id="piggyBank" v-model="expense" />
            </div>
            <button type="submit">add expense</button>
        </form>
    </div>
    <div class="piggyBank-container">
        <ul v-if="userPiggyBanks.length > 0">
            <li v-show="piggyBank.nameProfit != null || piggyBank.profit > 0" v-for="piggyBank in userPiggyBanks"
                :key="piggyBank._id">
                <div v-show="piggyBank.nameProfit != null">
                    <p>name profit:</p>
                    <textarea v-model="piggyBank.nameProfit" name="nameProfit" id="nameProfit" cols="10"
                        rows="1"> {{ piggyBank.nameProfit }}</textarea>
                </div>

                <div v-show="piggyBank.profit > 0">
                    <p>profit:</p>
                    <textarea v-model="piggyBank.profit" name="profit" id="profit" cols="10"
                        rows="1"> {{ piggyBank.profit }}</textarea>
                </div>
                <button @click="updatePiggyBank(piggyBank._id)">update Profit</button>
                <button @click="deletePiggyBank(piggyBank._id)">delete Profit</button>
            </li>

            <li v-show="piggyBank.nameExpense != null || piggyBank.expense > 0" v-for="piggyBank in userPiggyBanks"
                :key="piggyBank._id">
                <div v-show="piggyBank.nameExpense != null">
                    <p>name expense:</p>
                    <textarea v-model="piggyBank.nameExpense" name="nameExpense" id="nameExpense" cols="10"
                        rows="1"> {{ piggyBank.nameExpense }}</textarea>
                </div>
                <div v-show="piggyBank.expense > 0">
                    <p>expense:</p>
                    <textarea v-model="piggyBank.expense" name="expense" id="expense" cols="30"
                        rows="1">{{ piggyBank.expense }}</textarea>
                </div>
                <button @click="updatePiggyBank(piggyBank._id)">update expense</button>
                <button @click="deletePiggyBank(piggyBank._id)">delete expense</button>
            </li>

        </ul>
        <p v-else>No piggy banks found.</p>
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
            userPiggyBanks: [],
        };
    },
    mounted() {
        this.fetchPiggyBank();
    },
    fetchPiggyBank: {},
    methods: {
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
            } catch (error) {
                console.error(error)
            }
        },

    }
}
</script>