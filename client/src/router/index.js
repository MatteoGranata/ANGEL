import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Homepage from "../views/Homepage.vue";
import UserPage from "../views/UserPage.vue";
import Post from "../views/Post.vue";
import Welcome from "../views/Welcome.vue";
import Password from "../views/Password.vue";
import PiggyBank from "../views/PiggyBank.vue";
import Timer from "../views/Timer.vue";
import ProjectDetail from "../views/ProjectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Welcome,
    },
    {
      path: "/homepage",
      name: "homepage",
      component: Homepage,
    },
    {
      path: "/userpage",
      name: "userpage",
      component: UserPage,
    },
    {
      path: "/project",
      name: "ProjectDetail",
      component: ProjectDetail,
      children: [
        {
          path: "/post",
          name: "post",
          component: Post,
        },
        {
          path: "/password",
          name: "password",
          component: Password,
        },
        {
          path: "/piggybank",
          name: "piggybank",
          component: PiggyBank,
        },
        {
          path: "/timer",
          name: "timer",
          component: Timer,
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
