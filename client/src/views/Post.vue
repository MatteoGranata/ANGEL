<template>
  <div
    class="min-h-full sm:min-h-[97vh] h-full w-[97vw] sm:w-full pt-3 pr-3 pb-4 pl-3 sm:pl-7 sm:pr-3 bg-ghost mt-5 mb-3 sm:mt-3 sm:mx-3 rounded-xl"
  >
    <div class="flex justify-center w-full h-full drop-shadow-3xl">
      <div class="flex flex-row justify-center w-full h-full">
        <ul
          class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 h-full w-full"
        >
          <li
            v-for="post in userPosts"
            :key="post._id"
            class="flex flex-col bg-ghost rounded-xl w-full h-[35vh] p-1 shadow-lg"
          >
            <textarea
              @keyup="autoUpdate(post._id)"
              v-model="post.postContent"
              name="post"
              class="bg-ghost overflow-hidden rounded-xl text-xl px-2 py-0.5 resize-none h-full w-full outline-none text-slate-600 font-medium"
            >
            </textarea>
            <div class="flex flex-row justify-end sm:justify-between">
              <div class="mt-2 flex-row flex">
                <button
                  @click="deletePost(post._id)"
                  class="rounded-md px-2 w-8 h-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-snow"
                >
                  <img src="../assets/icon/trashcan.png" alt="cancel" />
                </button>
              </div>
              <div class="hidden sm:flex mt-2 flex-row flex">
                <button
                  @click="pinPost(post._id)"
                  v-bind:class="{ 'bg-smoke ring-2 ring-slate-500/40': post.pin }"
                  class="rounded-md px-2 h-8 w-8 text-lg mx-2 shadow-3xl ring-2 ring-inset ring-slate-100/50 hover:bg-neutral-300/40"
                >
                  <img src="../assets/icon/pin.png" alt="pin" />
                </button>
              </div>
            </div>
          </li>
          <li class="flex h-full w-full sm:w-fit justify-center items-center">
            <button
              @click="createPost"
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
      postContent: '',
      userPosts: [],
      classeAttiva: ''
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
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
        this.userPosts = response.data.posts
      } catch (error) {
        console.error(error)
      }
    },
    async createPost() {
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
        const response = await axios.post(
          'https://angel-fq3c.onrender.com/post',
          { postContent: this.postContent, projectId: projectID },
          {
            headers: { Authorization: `bearer ${token}` }
          }
        )
        this.userPosts.push(response.data.post)
      } catch (error) {
        console.error(error)
      }
    },
    async autoUpdate(postId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.updatePost(postId)
      }, 300)
    },
    async updatePost(postId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }
        const postToUpdate = this.userPosts.find((post) => post._id == postId)
        if (!postToUpdate) {
          console.error('Post to update not found')
          return
        }
        const response = await axios.patch(
          `https://angel-fq3c.onrender.com/post/${postId}`,
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
        const postToUpdate = this.userPosts.find((post) => post._id == postId)
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
          `https://angel-fq3c.onrender.com/post/${postId}`,
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
        const response = await axios.delete(`https://angel-fq3c.onrender.com/post/${postId}`, {
          headers: { Authorization: `bearer ${token}` }
        })
        this.userPosts = this.userPosts.filter((post) => post._id !== postId)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
