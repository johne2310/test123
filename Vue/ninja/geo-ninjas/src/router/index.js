import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import VueRouter from 'vue-router';

import Map from '../components/Map.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'map',
    component: Map,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const authRequired = to.matched.some(route => route.meta.requiresAuth);

  if (!currentUser && !authRequired) {
    next();
  } else if (authRequired && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
