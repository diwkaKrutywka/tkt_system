import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../views/AdminView.vue"
const routes = [
  {  path: `/`,
    name: "AdminView",
    component: AdminView,
    redirect: "/user/all",
    children: [
        {
            path: "/user/all",
            name: "UserList",
            component: () => import("../views/user/UserList.vue"),
        },
]
},
   {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
