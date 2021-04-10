import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import { ROUTES } from "../constants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    ...ROUTES.home,
  },
  {
    path: "/users/:id",
    props: true,
    component: () => import("@/views/user.vue"),
    ...ROUTES.user,
  },
];

const router = new VueRouter({
  routes,
  base: "/smart-search/",
});

export default router;
