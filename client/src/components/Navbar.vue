<template>
    <nav class="flex justify-end w-full h-fit p-2 fixed left-0 top-0 text-slate-50 bg-neutral-900">
        <div v-if="!token" class="">
            <div class="flex justify-center m-0 p-2 border w-40">
                <router-link to="/register">register</router-link>
                <p class="px-1">/</p>
                <router-link to="/login">Sign in</router-link>
            </div>
        </div>
        <div v-else class="mx-4 my-1.5">
            <div class="">
                <button @click="logout"><img width="30" height="30"
                        src="https://img.icons8.com/fluency-systems-filled/96/F5F5F5/exit.png" alt="logout" />
                </button>
            </div>
        </div>
    </nav>

</template>

<script>
export default {
    data() {
        return {
            token: null,
        }
    },
    mounted() {
        this.getToken();
    },
    methods: {
        async getToken() {
            try {
                const token = localStorage.getItem('token');
                this.token = token || false; // Set token to retrieved value or null
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        },
        async logout() {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.token = null;
                this.$router.push('/');
            } catch (error) {
                console.error("impossibile effettuare il logout:", error)
            } // Redirect to login after logout
        }
    }
}
</script>