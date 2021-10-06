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
    component: () => import(/* webpackChunkName: "Init" */ "../views/Init.vue"),
  },
  {
    path: "/watch",
    name: "watch",
    component: () => import(/* webpackChunkName: "Watch" */  "../views/Watch.vue"),
  },
  {
    path: "/new",
    name: "new",
    component: () => import(/* webpackChunkName: "newProcess" */  "../views/newProcess.vue"),
  },
  {
    path: "/approving",
    name: "approving",
    component: () => import(/* webpackChunkName: "Approval" */  "../views/Approval.vue"),
  },
  {
    path: "/details/:id",
    props: true,
    name: "details",
    component: () => import(/* webpackChunkName: "Details" */  "../views/Details.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
