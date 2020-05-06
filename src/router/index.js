import Vue from "vue";
import VueRouter from "vue-router";
import Recommend from "../views/Recommend.vue";
import Search from "../views/Search.vue";
import VideoView from "../views/VideoView.vue";
import Login from "../views/login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Recommend",
    name: "Recommend",
    component: Recommend,
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
  },
  {
    path: "/VideoView/:id",
    name: "VideoView",
    component: VideoView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
