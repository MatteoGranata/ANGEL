import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Test from '../views/Test.vue'
// import TestView from '../views/TestShow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/test',
      component: Test,
    },
    // {
    //   path: '/viewtest',
    //   component: TestView
    // }

  ]
})

export default router
