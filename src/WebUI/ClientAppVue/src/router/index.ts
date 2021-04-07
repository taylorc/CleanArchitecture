import AuthService from "@/services/AuthService";
import { User } from "oidc-client";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const authService: AuthService = new AuthService();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/fetchdata",
    name: "FetchData",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FetchData.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/authentication/login-callback",
    name: "Callback",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/authentication/Callback.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/",
    "/register",
    "/login",
    "/authentication/login-callback"
  ];
  const authRequired = !publicPages.includes(to.path);
  let loggedIn: User | null = null;

  authService.getUser().then(u => {
    loggedIn = u;
  });

  console.log(loggedIn);
  console.log(!loggedIn);
  console.log(authRequired);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
