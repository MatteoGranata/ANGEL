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
            v-for="password in userPasswords"
            :key="password._id"
            class="flex flex-col bg-ghost rounded-xl w-full h-fit p-1 shadow-lg"
          >
            <div class="resize-none h-fit w-full">
              <textarea
                @keyup="autoUpdate(password._id)"
                v-model="password.passwordContent"
                name="password"
                placeholder="Name Password..."
                rows="1"
                class="bg-ghost overflow-hidden pl-2 pt-2 mb-2 resize-none h-fit w-full outline-none text-slate-800 font-medium"
              >
              </textarea>
            </div>
            <div class="flex rounded-md w-full bg-ghost text-slate-800">
              <input
                @keyup="autoUpdate(password._id)"
                v-if="password.show"
                type="text"
                v-model="password.secret"
                name="passwordView"
                class="block flex-1 w-60 bg-transparent rounded-xl py-1.5 pl-2 focus:ring-0 sm:leading-6 outline-none"
              />
              <input
                @keyup="autoUpdate(password._id)"
                v-else
                type="password"
                v-model="password.secret"
                name="passwordHidden"
                class="block flex-1 w-60 bg-transparent rounded-xl py-1.5 pl-2 focus:ring-0 sm:leading-6 outline-none"
                placeholder="Password..."
              />
              <button @click="togglePasswordVisibility(password)" class="rounded-md px-2.5">
                <template v-if="password.show">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-glyphs/90/1E293B/visible--v1.png"
                    alt="visible--v1"
                  />
                </template>
                <template v-else>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-glyphs/90/1E293B/invisible.png"
                    alt="invisible"
                  />
                </template>
              </button>
            </div>
            <div class="flex flex-row justify-end sm:justify-between">
              <div class="flex-row flex mt-2">
                <button
                  @click="deletePassword(password._id)"
                  class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
                >
                  <img src="../assets/icon/trashcan.png" alt="cancel" />
                </button>
              </div>
              <div class="hidden sm:flex mt-2 flex-row flex">
                <button
                  @click="pinPassword(password._id)"
                  v-bind:class="{ 'bg-smoke ring-2 ring-slate-500/40': password.pin }"
                  class="rounded-md px-2 h-8 w-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-neutral-300/40"
                >
                  <img src="../assets/icon/pin.png" alt="pin" />
                </button>
              </div>
            </div>
          </li>
          <li class="flex h-full w-full sm:w-fit justify-center items-center">
            <button
              @click="createPassword"
              class="py-5 m-7 w-20 h-20 flex justify-center rounded-full bg-ghost text-5xl text-slate-600 ring-2 ring-inset ring-snow/70 hover:bg-snow drop-shadow-xl"
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
      passwordContent: '',
      secret: '',
      userPasswords: []
    }
  },
  mounted() {
    this.fetchPassword()
  },
  fetchPassword: {},
  methods: {
    async fetchPassword() {
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
        this.userPasswords = response.data.passwords.map((passwords) => ({
          ...passwords,
          show: false
        }))
      } catch (error) {
        console.error(error)
      }
    },
    async createPassword() {
      try {
        const token = localStorage.getItem('token') // Get token from local storage
        if (!token) {
          // Handle no token case (e.g., redirect to login)
          console.error('No token found')
          return
        }
        const projectID = localStorage.getItem('projectID')
        if (!projectID) {
          console.error('No Project found')
          return
        }
        const response = await axios.post(
          'https://angel-fq3c.onrender.com/password',
          { passwordContent: this.passwordContent, secret: this.secret, projectId: projectID },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userPasswords.push({ ...response.data.password, show: false })
      } catch (error) {
        console.error(error)
      }
    },
    async autoUpdate(passwordId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updatePassword(passwordId)
      }, 300)
    },
    async updatePassword(passwordId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const passwordToUpdate = this.userPasswords.find((password) => password._id === passwordId)
        if (!passwordToUpdate) {
          console.error('Password to update not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/password/${passwordId}`,
          { passwordContent: passwordToUpdate.passwordContent, secret: passwordToUpdate.secret },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async pinPassword(passwordId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const passwordToUpdate = this.userPasswords.find((password) => password._id == passwordId)
        if (!passwordToUpdate) {
          console.error('Post to update not found')
          return
        }
        if (passwordToUpdate.pin === true) {
          passwordToUpdate.pin = false
        } else if (passwordToUpdate.pin === false) {
          passwordToUpdate.pin = true
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/password/${passwordId}`,
          { pin: passwordToUpdate.pin },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async deletePassword(passwordId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.delete(
          `https://angel-fq3c.onrender.com/password/${passwordId}`,
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userPasswords = this.userPasswords.filter((password) => password._id !== passwordId)
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
