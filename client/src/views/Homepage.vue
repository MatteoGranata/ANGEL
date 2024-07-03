<template>
  <div class="flex flex-col m-0 w-full min-h-screen h-full bg-snow/40 backdrop-blur-3xl">
    <nav class="flex justify-between items-center w-full h-fit p-1 lg:p-2 z-20">
      <div class="flex h-fit ml-1 lg:ml-3">
        <img src="../assets/img/logo_angel.png" class="w-8 h-8 lg:w-10 lg:h-10" alt="logo-Angel" />
      </div>
      <!-- dropdown user menu -->
      <div class="flex flex-col items-end lg-1 lg:mr-10" @mouseover="showDropdown = true"
        @mouseleave="showDropdown = false">
        <img v-if="user.avatar" id="avatarButton" type="button" data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          class="w-11 h-11 lg:w-16 lg:h-16 rounded-full cursor-pointer object-cover shadow-lg ring-1 lg:ring-2 ring-snow/70"
          :src="`${baseUrl}${user.avatar}`" alt="User" />
        <div v-else
          class="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center shadow-lg">
          <i class="fas fa-user text-2xl"></i>
        </div>
        <div v-if="showDropdown" id="userDropdown"
          class="absolute top-12 lg:top-16 bg-ghost backdrop-blur-sm divide-y divide-snow rounded-lg shadow-lg w-44 text-md lg:text-xl">
          <div class="px-4 py-3">
            <div class="text-slate-800 font-medium">{{ user.username }}</div>
            <div class="font-medium truncate text-slate-500">{{ user.email }}</div>
          </div>
          <ul class="text-slate-600">
            <li>
              <router-link to="/userpage">
                <a class="block px-4 font-medium py-2 hover:bg-snow hover:border hover:border-snow">
                  Settings
                </a>
              </router-link>
            </li>
          </ul>
          <button @click="logout"
            class="w-full text-start text-slate-600 block px-4 py-2 font-medium hover:bg-snow hover:bg-snow hover:border hover:border-snow rounded-b-lg">
            logout
          </button>
        </div>
      </div>
      <!-- dropdown user menu -->
    </nav>
    <div class="flex flex-col sm:flex-row h-fit w-full">
      <!-- project list -->
      <ul class="min-h-[94vh] lg:min-h-[91vh] h-full items-center w-full sm:w-fit flex flex-col justify-between">
        <div class="flex justify-center flex-col items-center mx-2">
          <li v-for="project in userProjects" :key="project._id"
            class="flex flex-row justify-center rounded-lg bg-ghost m-2 py-0.5 pl-0.5 shadow-lg text-slate-800">
            <input @click="goToProject(project._id)" v-model="project.name" name="projectName"
              class="bg-ghost drop-shadow-3xl truncate overflow-hidden rounded-md w-full h-7 resize-none pl-1 cursor-alias text-slate-800 font-bold shadow-lg outline-none text-lg" />
            <div class="flex-col flex-wrap flex ml-0.5 justify-center mr-0.5">
              <button @click="deleteProject(project._id)" class="rounded-md px-0.5 w-6 h-6 hover:bg-snow-600/30">
                <img src="../assets/icon/trashcan.png" alt="" />
              </button>
            </div>
          </li>
          <!-- Button to create a new project -->
          <button @click="createProject"
            class="m-4 w-10 py-1.5 text-2xl h-10 flex justify-center rounded-full bg-ghost text-slate-600 text-3xl ring-2 ring-inset ring-snow/70 hover:bg-snow/80 shadow-lg">
            +
          </button>
        </div>
        <!-- Help message section -->
        <div class="mb-3 z-50">
          <div class="mx-4 my-1.5 flex">
            <div class="w-fit justify-center flex flex-col items-center" @mouseover="showMessage = true"
              @mouseleave="showMessage = false">
              <p v-if="showMessage"
                class="relative bottom-0 left-0 bg-ghost text-slate-600 p-3 w-48 text-center drop-shadow-3xl text-sm font-medium rounded-lg">
                - Click on a project to access its details and specific features. <br />
                - Use the "+" button to create a new project. <br />
                - You will find "pinned" posts and passwords in the top section of the page.
              </p>
              <p class="text-4xl cursor-help text-slate-600">&#128712;</p>
            </div>
          </div>
        </div>
      </ul>
      <!-- Pinned posts and passwords section -->
      <div
        class="hidden sm:grid grid-cols-1 md:grid-cols-2 w-full min-h-[88vh] h-fit text-slate-800 rounded-xl bg-ghost mr-6 text-2xl">
        <!-- post section-->
        <ul
          class="grid grid-cols-1 gap-5 xl:grid-cols-2 p-3 rounded-xl mr-2 h-fit justify-items-center drop-shadow-3xl">
          <li v-for="post in userPostsPinned" :key="post._id" v-show="post.pin !== false"
            class="flex flex-col bg-ghost rounded-xl border w-full h-[35vh] p-1 m-2">
            <textarea @keyup="autoPostUpdate(post._id)" v-model="post.postContent" name="post"
              class="bg-ghost overflow-hidden rounded-xl px-2 py-0.5 resize-none h-full w-full outline-none text-slate-600 font-medium">
            </textarea>
            <div class="flex flex-row justify-between">
              <div class="mt-2 flex-row flex">
                <button @click="deletePost(post._id)"
                  class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow">
                  <img src="../assets/icon/trashcan.png" alt="" />
                </button>
              </div>
              <div class="mt-2 flex-row flex">
                <button @click="pinPost(post._id)" v-bind:class="{ 'bg-smoke ring-2 ring-slate-500/40': post.pin }"
                  class="rounded-md px-2 h-8 w-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-neutral-300/40">
                  <img src="../assets/icon/pin.png" alt="" />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <!-- Password section -->
        <ul
          class="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center w-full h-fit justify-between p-3 ml-2 sm:mt-20 md:mt-0">
          <li v-for="password in userPasswordsPinned" :key="password._id" v-show="password.pin !== false"
            class="flex flex-col bg-ghost rounded-xl w-full h-fit p-1 drop-shadow-3xl justify-center">
            <div class="resize-none h-fit w-full">
              <textarea @keyup="autoPasswordUpdate(password._id)" v-model="password.passwordContent" name="password"
                rows="1"
                class="bg-ghost overflow-hidden rounded-md pl-2 pt-2 mb-2 resize-none h-full w-full outline-none font-medium">
              </textarea>
            </div>
            <div class="flex rounded-md w-full bg-ghost truncate">
              <input @keyup="autoPasswordUpdate(password._id)" v-if="password.show" type="text"
                v-model="password.secret" name="passwordVisible"
                class="block flex-1 w-60 bg-transparent rounded-xl py-1.5 pl-2" />
              <input @keyup="autoPasswordUpdate(password._id)" v-else type="password" v-model="password.secret"
                name="hiddenPassword" class="block flex-1 w-60 bg-transparent rounded-xl py-1.5 pl-2" />
              <button @click="togglePasswordVisibility(password)" class="rounded-md px-2.5">
                <template v-if="password.show">
                  <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/1E293B/visible--v1.png"
                    alt="visible--v1" />
                </template>
                <template v-else>
                  <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/1E293B/invisible.png"
                    alt="invisible" />
                </template>
              </button>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex-row flex mt-2">
                <button @click="deletePassword(password._id)"
                  class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow">
                  <img src="../assets/icon/trashcan.png" alt="" />
                </button>
              </div>
              <div class="mt-2 flex-row flex">
                <button @click="pinPassword(password._id)"
                  v-bind:class="{ 'bg-smoke ring-2 ring-slate-500/40': password.pin }"
                  class="rounded-md px-2 h-8 w-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-neutral-300/40">
                  <img src="../assets/icon/pin.png" alt="" />
                </button>
              </div>
            </div>
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
      content: '',
      user: '',
      userProjects: [],
      userPasswordsPinned: [],
      userPostsPinned: [],
      showDropdown: false,
      baseUrl: 'https://angel-fq3c.onrender.com/', // or baseUrl: 'http://localhost:yourport/' for local server
      showMessage: false
    }
  },
  mounted() {
    this.fetchPasswordsPinned()
    this.fetchPostsPinned()
    this.fetchProject()
    this.fetchUser()
    this.getToken()
  },
  methods: {
    async getToken() {
      try {
        const token = localStorage.getItem('token')
        this.token = token || false
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    },
    async logout() {
      try {
        localStorage.removeItem('token')
        this.token = null
        this.$router.push('/')
      } catch (error) {
        console.error('impossibile effettuare il logout:', error)
      }
    },
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
        const response = await axios.get(`https://angel-fq3c.onrender.com/users/${userId}`, { // remove https://...  if server run local
          headers: { Authorization: `bearer ${token}` }
        })
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async autoPostUpdate(postId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updatePost(postId)
      }, 300)
    },
    async autoPasswordUpdate(passwordId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updatePassword(passwordId)
      }, 300)
    },
    async fetchPasswordsPinned() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.get('https://angel-fq3c.onrender.com/password', { // remove https://...  if server run local
          headers: { Authorization: `bearer ${token}` }
        })
        this.userPasswordsPinned = response.data.passwords
      } catch (error) {
        console.error(error)
      }
    },
    async updatePassword(passwordId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const passwordToUpdate = this.userPasswordsPinned.find(
          (password) => password._id === passwordId
        )
        if (!passwordToUpdate) {
          console.error('Password to update not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/password/${passwordId}`, // remove https://...  if server run local
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
        const passwordToUpdate = this.userPasswordsPinned.find(
          (password) => password._id == passwordId
        )
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
          `https://angel-fq3c.onrender.com/password/${passwordId}`, // remove https://...  if server run local
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
          `https://angel-fq3c.onrender.com/password/${passwordId}`, // remove https://...  if server run local
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userPasswordsPinned = this.userPasswordsPinned.filter(
          (password) => password._id !== passwordId
        )
      } catch (error) {
        console.error(error)
      }
    },
    togglePasswordVisibility(password) {
      password.show = !password.show
    },
    async fetchPostsPinned() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.get('https://angel-fq3c.onrender.com/post', { // remove https://...  if server run local
          headers: { Authorization: `bearer ${token}` }
        })
        this.userPostsPinned = response.data.posts
      } catch (error) {
        console.error(error)
      }
    },
    async updatePost(postId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const postToUpdate = this.userPostsPinned.find((post) => post._id == postId)
        if (!postToUpdate) {
          console.error('Post to update not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/post/${postId}`, // remove https://...  if server run local
          { postContent: postToUpdate.postContent },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async pinPost(postId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const postToUpdate = this.userPostsPinned.find((post) => post._id == postId)
        if (!postToUpdate) {
          console.error('Post to update not found')
          return
        }
        if (postToUpdate.pin === true) {
          postToUpdate.pin = false
        } else if (postToUpdate.pin === false) {
          postToUpdate.pin = true
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/post/${postId}`, // remove https://...  if server run local
          { pin: postToUpdate.pin }, 
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async deletePost(postId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.delete(`https://angel-fq3c.onrender.com/post/${postId}`, { // remove https://...  if server run local
          headers: { Authorization: `bearer ${token}` }
        })
        this.userPostsPinned = this.userPostsPinned.filter((post) => post._id !== postId)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProject() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.get('https://angel-fq3c.onrender.com/project/', { // remove https://...  if server run local
          headers: { Authorization: `Bearer ${token}` }
        })
        this.userProjects = response.data.projects
      } catch (error) {
        console.error(error)
      }
    },
    async createProject() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.post(
          'https://angel-fq3c.onrender.com/project', // remove https://...  if server run local
          { content: this.content },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userProjects.push(response.data.project)
        this.id = response.data.project._id
        localStorage.setItem('projectID', response.data.project._id)
        await this.$router.push(`/post`)
      } catch (error) {
        console.error(error)
      }
    },
    async goToProject(projectId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const postToUpdate = this.userProjects.find((project) => project._id == projectId)
        if (!postToUpdate) {
          console.error('Post to update not found')
          return
        }
        localStorage.setItem('projectID', projectId)
        await this.$router.push('/post')
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProject(projectId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const response = await axios.delete(
          `https://angel-fq3c.onrender.com/project/${projectId}`, // remove https://...  if server run local
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userProjects = this.userProjects.filter((project) => project._id !== projectId)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
