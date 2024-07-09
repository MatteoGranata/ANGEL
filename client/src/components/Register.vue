<template>
  <section class="bg-snow/40 w-full h-screen backdrop-blur-lg">
    <div
      class="flex w-full h-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-ghost rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div class="px-5 pt-4 pb-2 space-y-4 md:space-y-6 drop-shadow-3xl">
          <router-link to="/" class="flex p-1 w-fit">
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios-filled/100/1E293B/long-arrow-left.png"
              alt="Back home"
            />
          </router-link>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="username" class="block mb-2 font-medium text-slate-800"> Username </label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="Enter your username"
                v-model="username"
                class="bg-ghost border border-slate-800 text-slate-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true"
              />
            </div>
            <div>
              <label for="email" class="block mb-2 font-medium text-slate-800">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="bg-ghost border border-slate-800 text-slate-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your email address"
                required="true"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 font-medium text-slate-800">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                v-model="password"
                class="bg-ghost border border-slate-800 text-slate-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true"
              />
            </div>
            <button
              type="submit"
              class="flex justify-center w-full hover:shadow-xl text-slate-800 bg-primary-600 hover:bg-ghost focus:ring focus:ring-slate-800 focus:outline-none font-bold rounded-lg text-lg px-5 py-2.5 text-center"
            >
              <p v-if="loading == false">Register</p>
              <div v-else class="loader"></div>
            </button>
            <p
              v-if="errorRegister"
              class="flex items-center bg-red-500 text-slate-800 px-4 py-3 z-20 rounded font-bold"
            >
              {{ '!! ' + errorRegister + ' !!' }}
            </p>
            <p class="text-md font-light text-slate-800">
              Already have an account?
              <router-link to="/login" class="font-bold text-slate-800 hover:underline">
                Login here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      errorRegister: '',
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true
      try {
        const response = await axios.post('https://angel-fq3c.onrender.com/auth/register', {
          username: this.username,
          password: this.password,
          email: this.email
        }) // POST request
        // Handle successful response
        if (response.data.status == 'okay') {
          await this.$router.push('/login')
        }
        return (this.errorRegister = response.data.message)
      } catch (error) {
        console.error(error)
        this.errorRegister = error.response.data.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.loader {
  width: 100px;
  height: 80px;
  padding: 8px;
  box-sizing: border-box;
  display: grid;
  background: #f8f8ff;
  filter: blur(4px) contrast(10) hue-rotate(240deg);
  mix-blend-mode: luminosity;
}
.loader:before {
  content: '';
  grid-area: 1/1;
  margin: 28px 0;
  border-radius: 100px;
  background: #1e293b;
}
.loader:after {
  content: '';
  grid-area: 1/1;
  height: 20px;
  width: 20px;
  margin: auto;
  border-radius: 50%;
  background: #1e293b;
  animation: l5 2s infinite linear;
}
@keyframes l5 {
  0% {
    transform: translate(30px);
  }
  25% {
    transform: translate(0);
  }
  50% {
    transform: translate(-30px);
  }
  75% {
    transform: translate(0);
  }
  100% {
    transform: translate(30px);
  }
}
</style>
