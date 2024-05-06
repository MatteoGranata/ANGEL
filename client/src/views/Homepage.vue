<template>
    <main>
        <Post />
        <Password />
        <Timer />
        <PiggyBank />
    </main>
    <div>
        <button @click="logout">LOGOUT</button>
    </div>
</template>

<script setup>
import Post from './Post.vue'
import Password from './Password.vue'
import Timer from './Timer.vue'
import PiggyBank from './PiggyBank.vue'

</script>

<script>
export default {
    methods: {
        async logout() {
            localStorage.clear('token')
            localStorage.clear('username')
            console.log('logout effettuato con successo')
            this.$router.push('/login')
        }
    }
}
</script>