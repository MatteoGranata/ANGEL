<template>
    <div class="piggyBank-form">
        <h2>PIGGY BANK</h2>
        <form @submit.prevent="createPiggyBank">
            <div class="form-group">
                <label for="nameProfit">name profit:</label>
                <input type="text" id="piggyBank" v-model="nameProfit" />
            </div>
            <div class="form-group">
                <label for="profit">profit:</label>
                <input type="number" id="piggyBank" v-model="profit" />
            </div>
            <div class="form-group">
                <label for="nameExpense">name expense:</label>
                <input type="text" id="piggyBank" v-model="nameExpense" />
            </div>
            <div class="form-group">
                <label for="expense">expense:</label>
                <input type="number" id="piggyBank" v-model="expense" />
            </div>
            <button type="submit">add piggyBank</button>
        </form>
    </div>
    <div class="piggyBank-container">
        <ul v-if="userPiggyBanks.length > 0">
            <li v-for="piggyBank in userPiggyBanks" :key="piggyBank._id">
                <p>name profit:</p>
                <textarea v-model="piggyBank.nameProfit" name="nameProfit" id="nameProfit" cols="10"
                    rows="1"> {{ piggyBank.nameProfit }}</textarea>
                <p>profit:</p>
                <textarea v-model="piggyBank.profit" name="profit" id="profit" cols="10"
                    rows="1"> {{ piggyBank.profit }}</textarea>
                <p>name expense:</p>
                <textarea v-model="piggyBank.nameExpense" name="nameExpense" id="nameExpense" cols="10"
                    rows="1"> {{ piggyBank.nameExpense }}</textarea>
                <p>expense:</p>
                <textarea v-model="piggyBank.expense" name="expense" id="expense" cols="30"
                    rows="1">{{ piggyBank.expense }}</textarea><br>
                <button @click="updatePiggyBank(piggyBank._id)">update PiggyBank</button>
                <button @click="deletePiggyBank(piggyBank._id)">delete PiggyBank</button>
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

            } catch (error) {
                console.error(error);
            }
        },
        async createPiggyBank() {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                if (!token) {
                    // Handle no token case (e.g., redirect to login)
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/piggybank', { nameProfit: this.nameProfit, profit: this.profit, nameExpense: this.nameExpense, expense: this.expense }, {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('piggy bank added:', response.data);

                this.userPiggyBanks.push(response.data.piggyBank)
                this.nameProfit = ''
                this.profit = ''
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
                console.log(piggyBankToUpdate)
                const response = await axios.patch(`/piggybank/${piggyBankId}`, { profit: passwordToUpdate.profit, expense: passwordToUpdate.expense }, {
                    headers: { Authorization: `bearer ${token}` },
                });

                console.log('Password updated:', response.data);
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