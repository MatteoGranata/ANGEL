import './assets/main.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'; // Sostituisci con l'URL reale del tuo backend

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
