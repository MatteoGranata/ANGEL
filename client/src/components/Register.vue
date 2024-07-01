<template>
  <div class="flex justify-center items-center h-screen w-full">
    <form @submit.prevent="register" class="w-96 h-min ">
      <div class="space-y-12">
        <div class="border-2 p-6 border-gray-900/10 pb-12">
          <h2 class="text-base text-center font-semibold leading-7 text-4xl text-gray-900">REGISTER</h2>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div class="sm:col-span-4">
              <label for="username"
                class="block text-sm font-medium text-center text-xl leading-6 text-gray-900">USERNAME:</label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="username" id="username" v-model="username"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
            <div class="sm:col-span-4">
              <label for="password"
                class="block text-sm font-medium leading-6 text-xl text-center text-gray-900">PASSWORD:</label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="password" name="password" id="password" v-model="password"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
            <!-- <div class="sm:col-span-4">
              <label for="email"
                class="block text-sm font-medium leading-6 text-xl text-center text-gray-900">EMAIL:</label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="email" name="email" id="email" v-model="email"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div> -->
          </div>
          <div class="mt-2 text-end">
            <button type="submit"
              class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">LOGIN</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
// const API_URL =  "http://localhost:3000"
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      axios.post("/auth/register", { username: this.username, password: this.password }) // POST request
        .then(response => {
          // Handle successful response
          if(response.data.status == 'okay'){
            this.$router.push('/login');
            console.log('registration was successful');
          }else{
            return console.error(response.data.message)
          }
        })
        .catch(error => {
          // Handle error response
          console.error('Error:', error);
        });
    }
  }
}
</script>