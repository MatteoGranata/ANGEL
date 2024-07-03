<template>
  <div
    class="min-h-full sm:min-h-[97vh] h-full w-[97vw] sm:w-full pt-3 pr-3 pb-4 pl-3 sm:pl-7 sm:pr-3 bg-ghost mt-5 mb-3 sm:mt-3 sm:mx-3 rounded-xl text-lg"
  >
    <div class="flex justify-center w-full h-full drop-shadow-3xl">
      <div class="flex flex-row justify-center w-full h-full">
        <ul
          class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 h-full w-full"
        >
          <li
            v-for="timer in userTimers"
            :key="timer._id"
            class="flex flex-col bg-ghost rounded-xl w-full h-fit p-1 shadow-lg"
          >
            <div class="resize-none h-fit w-full">
              <textarea
                @keyup="autoUpdate(timer._id)"
                v-model="timer.nome"
                name="timer"
                placeholder="Name Timer..."
                rows="1"
                class="bg-ghost overflow-hidden rounded-xl px-2 py-0.5 resize-none h-full w-full outline-none text-slate-600 font-medium"
              >
              </textarea>
            </div>
            <div class="flex rounded-md w-fit">
              <p class="p-3 bg-ghost rounded-lg w-fit text-slate-800 font-medium">
                {{ formatTime(timer.tempo) }}
              </p>
            </div>
            <div class="flex-row flex-wrap flex justify-between mt-4">
              <button
                v-if="!timer.attivo"
                @click="startTimer(timer._id)"
                class="text-slate-800 font-medium rounded-md px-1.5 py-0.5 mx-2 shadow-lg ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
              >
                START
              </button>
              <button
                v-if="timer.attivo"
                @click="stopTimer(timer._id)"
                class="text-slate-800 font-medium rounded-md px-1.5 py-0.5 mx-2 shadow-lg ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
              >
                STOP
              </button>
              <button
                v-if="timer.tempo != 0"
                @click="resetTimer(timer._id)"
                class="text-slate-800 font-medium rounded-md px-1.5 py-0.5 mx-2 shadow-lg ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
              >
                RESET TIMER
              </button>
              <button
                @click="delteTimer(timer._id)"
                class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
              >
                <img src="../assets/icon/trashcan.png" alt="" />
              </button>
            </div>
          </li>
          <li class="flex h-full w-full sm:w-fit justify-center items-center">
            <button
              @click="createTimer"
              class="py-5 m-7 w-20 h-20 flex justify-center rounded-full bg-ghost text-5xl text-slate-600 ring-2 ring-inset ring-snow/70 hover:bg-snow drop-shadow-<xl"
            >
              +
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      nome: '',
      userTimers: [],
      status: ''
    }
  },
  mounted() {
    this.fetchTimer()
  },
  methods: {
    formatTime(milliseconds) {
      const hours = Math.floor(milliseconds / (1000 * 60 * 60))
      const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
      return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
    },
    async fetchTimer() {
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
        this.userTimers = response.data.timers
      } catch (error) {
        console.error(error)
      }
    },
    async createTimer() {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          console.error('No token found')
          return
        }
        const projectID = localStorage.getItem('projectID')
        if (!projectID) {
          console.error('No Project found')
          return
        }
        const response = await axios.post(
          'https://angel-fq3c.onrender.com/timer',
          { nome: this.nome, projectId: projectID },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userTimers.push(response.data.timer)
      } catch (error) {
        console.error(error)
      }
    },
    async autoUpdate(timerId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updateTimer(timerId)
      }, 300)
    },
    async updateTimer(timerId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const timerToUpdate = this.userTimers.find((timer) => timer._id == timerId)
        if (!timerToUpdate) {
          console.error('Post to update not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/timer/${timerId}`,
          { nome: timerToUpdate.nome },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async startTimer(timerId) {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          console.error('No token found')
          return
        }
        const timerToUpdate = this.userTimers.find((timer) => timer._id === timerId)
        if (!timerToUpdate) {
          console.error('Timer to start not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/timer/${timerId}/avvia`,
          { tempo: timerToUpdate.tempo },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        timerToUpdate.attivo = true
        this.intervalId = setInterval(() => {
          timerToUpdate.tempo += 1000 // Update in milliseconds
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    async stopTimer(timerId) {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          console.error('No token found')
          return
        }
        const timerToUpdate = this.userTimers.find((timer) => timer._id === timerId)
        if (!timerToUpdate) {
          console.error('Timer to stop not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/timer/${timerId}/arresta`,
          { tempo: timerToUpdate.tempo },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        timerToUpdate.attivo = false
        this.timerToUpdate = clearInterval(this.intervalId)
        this.intervalId = null
      } catch (error) {
        console.error(error)
      }
    },
    async resetTimer(timerId) {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          console.error('No token found')
          return
        }
        const timerToUpdate = this.userTimers.find((timer) => timer._id === timerId)
        if (!timerToUpdate) {
          console.error('Timer to stop not found')
          return
        }
        const response = await axios.put(
          `https://angel-fq3c.onrender.com/timer/${timerId}/reset`,
          { tempo: timerToUpdate.tempo },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        timerToUpdate.tempo = 0
      } catch (error) {
        console.error(error)
      }
    },
    async delteTimer(timerId) {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.delete(`https://angel-fq3c.onrender.com/timer/${timerId}`, {
          headers: { Authorization: `bearer ${token}` }
        })
        this.userTimers = this.userTimers.filter((timer) => timer._id !== timerId)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
