<template>
  <section class="bg-snow/40 w-full h-screen backdrop-blur-lg">
    <div
      class="flex w-full h-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-ghost rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div class="px-5 pt-4 pb-2 space-y-4 md:space-y-6">
          <router-link to="/" class="flex p-1 w-fit">
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios-filled/100/1E293B/long-arrow-left.png"
              alt="Back home"
            />
          </router-link>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="username" class="block mb-2 font-medium text-slate-800">
                Your username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                v-model="username"
                class="bg-ghost border border-slate-800 text-slate-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your username"
                required="true"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 font-medium text-slate-800">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                class="bg-ghost border border-slate-800 text-slate-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true"
              />
            </div>
            <button
              type="submit"
              class="flex justify-center items-center h-12 w-full hover:drop-shadow-3xl text-slate-800 bg-ghost focus:ring focus:ring-slate-800 focus:outline-none font-bold rounded-lg text-lg px-5 py-2.5 text-center border"
            >
              <p v-if="loading == false">Sign in</p>
              <div v-else class="loader"></div>
            </button>
            <p
              v-if="errorLogin"
              class="flex items-center bg-red-500 text-slate-800 px-4 py-3 z-20 rounded font-bold"
            >
              {{ '!! ' + errorLogin + ' !!' }}
            </p>
            <p class="text-md font-light text-slate-800">
              Don’t have an account yet?
              <router-link to="/register" class="font-bold text-slate-800 hover:underline"
                >Sign up</router-link
              >
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
      errorLogin: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const response = await axios.post('https://angel-fq3c.onrender.com/auth/login', {
          username: this.username,
          password: this.password
        })
        const userId = response.data.user._id
        localStorage.setItem('token', response.data.data)
        localStorage.setItem('userId', userId)
        await this.$router.push(`/homepage`)
        window.location.reload()
      } catch (error) {
        console.error(error)
        this.errorLogin = error.response.data.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style>
.loader {
  width: 40px;
  aspect-ratio: 1;
  border: 7px solid #f1f1f7;
  box-sizing: border-box;
  background:
    radial-gradient(farthest-side, #000 100%, #f8f8ff) 50%/10px 10px,
    radial-gradient(farthest-side, #000 100%, #f8f8ff) 50%/10px 10px,
    radial-gradient(farthest-side, #000 100%, #f8f8ff) 50%/10px 10px,
    radial-gradient(farthest-side, #000 100%, #f8f8ff) 50%/10px 10px,
    radial-gradient(farthest-side, #000 100%, #f8f8ff) 50%/10px 10px,
    linear-gradient(#000 0 0) 50%/100% 5px,
    linear-gradient(#000 0 0) 50%/5px 100%,
    #f8f8ff;
  background-repeat: no-repeat;
  filter: blur(3px) contrast(10);
  animation: l13 0.8s infinite;
}

@keyframes l13 {
  100% {
    background-position:
      50% -10px,
      -10px 50%,
      62.5px 50%,
      50% 62.5px,
      50%,
      50%,
      50%;
  }
}
</style>
