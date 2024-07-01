<template>
  <div class="w-full h-screen px-4 py-3 bg-ghost/40 backdrop-blur-3xl">
    <div class="flex items-center sm:items-start flex-col h-[95vh] w-full bg-ghost rounded-xl p-5">
      <div class="absolute right-10 top-6 w-fit justify-end flex place-items-end">
        <router-link to="/homepage">
          <img
            width="45"
            height="45"
            src="https://img.icons8.com/ios-filled/100/1E293B/long-arrow-left.png"
            alt="Back home"
            class="w-8 lg:w-10"
          />
        </router-link>
      </div>
      <img
        v-if="user.avatar"
        :src="`${baseUrl}${user.avatar}`"
        alt="Immagine Profilo"
        class="w-32 h-32 lg:w-60 lg:h-60 rounded-full object-cover ring ring-snow/70 drop-shadow-xl"
      />
      <div
        v-else
        class="w-32 h-32 lg:w-60 lg:h-60 rounded-full bg-gray-300 text-slate-800 flex items-center justify-center"
      >
        <i class="fas fa-user text-2xl"></i>
      </div>

      <div
        class="flex flex-col relative -top-10 left-14 lg:absolute sm:left-32 lg:left-48 lg:top-60 items-start justify-between"
      >
        <label
          for="file"
          class="bg-ghost lg:text-lg drop-shadow-lg text-slate-800 font-medium cursor-pointer pt-1 px-1 lg:px-1.5 mb-2 rounded-md border lg:border-2 border-neutral-900 hover:bg-slate-100/90"
        >
          &#9999; Edit
        </label>
        <input type="file" id="file" class="hidden" @change="handleFileChange" />
        <p
          v-show="errorimage"
          class="flex text-sm lg:text-md absolute lg:static top-10 -left-36 w-60 lg:w-full items-center bg-red-500 text-slate-800 px-2 py-1 lg:px-4 lg:py-3 z-20 rounded font-medium"
        >
          {{ errorimage }}
        </p>
      </div>

      <div class="lg:ml-4 mt-10 w-full lg:w-fit">
        <div class="bg-ghost rounded-xl px-4 py-1 drop-shadow-3xl">
          <p class="text-sm w-fit rounded-lg text-slate-800 text-start relative top-1.5">
            Username:
          </p>
          <p class="text-xl lg:text-4xl font-medium text-start w-fit h-fit text-slate-900">
            {{ user.username }}
          </p>
        </div>
        <div class="bg-ghost rounded-xl px-4 py-1 mt-5 drop-shadow-3xl">
          <p class="text-sm text-slate-800 text-start relative top-3">Email:</p>
          <p class="text-lg lg:text-2xl font-medium text-start w-fit h-fit text-slate-900">
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedFile: null,
      user: '',
      errorimage: '',
      baseUrl: 'https://angel-fq3c.onrender.com/',
      currentPassword: '',
      newPassword: ''
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('No userId found')
          return
        }
        const response = await axios.get(`https://angel-fq3c.onrender.com/users/${userId}`, {
          headers: { Authorization: `bearer ${token}` }
        })
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
      if (
        this.selectedFile.size > 5242880 &&
        ['image/jpeg', 'image/jpg', 'image/png'].includes(this.selectedFile.type)
      ) {
        console.error('file too large max filesixe is 5mb')
        this.errorimage = 'File is too big. Maximum allowed size is 5MB.'
      } else {
        return this.uploadImage(), (this.errorimage = '')
      }
    },
    async uploadImage() {
      const formData = new FormData()
      formData.append('image', this.selectedFile)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('No userId found')
          return
        }
        const response = await axios.post(
          `https://angel-fq3c.onrender.com/users/${userId}/image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.fetchUser()
      } catch (error) {
        console.error(error)
        if (error.response.data.message) {
          console.log(error.response.data.message)
          this.errorimage = error.response.data.message
        }
      }
    }
  }
}
</script>
