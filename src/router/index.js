import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/init",
  },

  {
    path: "/init",
    name: "init",
    component: () => import("../views/Init.vue"),
  },
  {
    path: "/watch",
    name: "watch",
    component: () => import("../views/Watch.vue"),
  },
  {
    path: "/new",
    name: "new",
    component: () => import("../views/newProcess.vue"),
  },
  {
    path: "/approval",
    name: "approval",
    component: () => import("../views/Approval.vue"),
  },
  {
    path: "/details/:id",
    props: true,
    name: "details",
    component: () => import("../views/Details.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
