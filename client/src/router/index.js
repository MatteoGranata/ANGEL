import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Homepage from '../views/Homepage.vue'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router
