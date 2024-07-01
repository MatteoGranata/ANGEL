<template>
  <div
    class="flex m-0 w-full flex-col items-center sm:items-start sm:flex-row min-h-screen h-full text-slate-50 bg-snow/40 backdrop-blur-md"
  >
    <div class="flex-wrap w-full sm:w-fit flex justify-center">
      <div
        class="flex justify-center content-center w-fit h-fit place-self-start bg-ghost p-2 mt-5 rounded-xl shadow-xl"
      >
        <textarea
          @keyup="autoUpdate"
          v-model="nameProject.name"
          placeholder="Insert project name..."
          class="bg-ghost overflow-hidden rounded-lg w-full h-12 sm:h-full resize-none pl-2 py-2 text-slate-800 font-bold outline-none text-lg sm:text-xl shadow-lg"
        >
        </textarea>
      </div>
      <div class="flex sm:flex-col justify-around items-center mt-6 ml-4 w-full h-full">
        <div
          class="flex justify-center items-center sm:my-5 sm:py-2.5 sm:px-10 w-fit h-fit rounded-lg opacity-70"
          v-bind:class="{ 'bg-snow/30 shadow-xl opacity-95': activeButton === 'post' }"
        >
          <RouterLink to="/post" @click="setActiveButton('post')">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/fluency-systems-filled/96/1E293B/note.png"
              class="bg-snow/40 shadow-lg rounded-lg w-10 sm:w-10 p-1"
              alt="note"
            />
          </RouterLink>
        </div>
        <div
          class="flex justify-center items-center sm:my-5 sm:py-2.5 sm:px-10 w-fit h-fit rounded-lg opacity-70"
          v-bind:class="{ 'bg-snow/30 shadow-xl opacity-95': activeButton === 'timer' }"
        >
          <RouterLink to="/timer" @click="setActiveButton('timer')">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-rounded/96/1E293B/time.png"
              class="bg-snow/40 shadow-lg rounded-lg w-10 p-1"
              alt="timer"
            />
          </RouterLink>
        </div>
        <div
          class="flex justify-center items-center sm:my-5 sm:py-2.5 sm:px-10 w-fit h-fit rounded-lg opacity-70"
          v-bind:class="{ 'bg-snow/30 shadow-xl opacity-95': activeButton === 'password' }"
        >
          <RouterLink to="/password" @click="setActiveButton('password')">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/metro/104/1E293B/password.png"
              class="bg-snow/40 shadow-lg rounded-lg w-10 p-1"
              alt="password"
            />
          </RouterLink>
        </div>
        <div
          class="flex justify-center items-center sm:my-5 sm:py-2.5 sm:px-10 w-fit h-fit rounded-lg opacity-70"
          v-bind:class="{ 'bg-snow/30 shadow-xl opacity-95': activeButton === 'piggybank' }"
        >
          <RouterLink to="/piggybank" @click="setActiveButton('piggybank')">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/100/1E293B/money-box--v1.png"
              class="bg-snow/40 shadow-lg rounded-lg w-10 p-1"
              alt="piggybank"
            />
          </RouterLink>
        </div>
        <div
          class="flex justify-center items-center sm:my-5 sm:py-2.5 sm:px-10 w-fit h-fit rounded-lg opacity-70"
        >
          <RouterLink to="/homepage">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/90/1E293B/home.png"
              class="bg-snow/40 shadow-lg rounded-lg w-10 p-1"
              alt="home"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nameProject: '',
      userPosts: [],
      userTimers: [],
      userPasswords: [],
      userPiggyBanks: [],
      activeButton: 'post'
    }
  },
  mounted() {
    this.fetchProjects()
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button
    },
    async fetchProjects() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const projectID = localStorage.getItem('projectID')
        if (!projectID) {
          console.error('No Project found')
          return
        }
        const response = await axios.get(`https://angel-fq3c.onrender.com/project/${projectID}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.nameProject = response.data
        this.userPosts = response.data.posts
        this.userTimers = response.data.timers
        this.userPasswords = response.data.passwords
        this.userPiggyBanks = response.data.piggyBanks
      } catch (error) {
        console.error(error)
      }
    },
    async autoUpdate() {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updateNameProject()
      }, 300)
    },
    async updateNameProject() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const projectID = localStorage.getItem('projectID')
        if (!projectID) {
          console.error('No Project found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/project/${projectID}`,
          { name: this.nameProject.name },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    togglePasswordVisibility(password) {
      password.show = !password.show
    }
  }
}
</script>
