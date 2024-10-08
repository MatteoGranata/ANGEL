import './assets/style.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000' // to connect to the local backend

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
