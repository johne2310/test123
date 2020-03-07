import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import AuthGuard from './auth-guard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "create" */ '../components/Meetup/CreateMeetup.vue'
      ),
    beforeEnter: AuthGuard,
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: () => import('../components/Meetup/Meetups.vue'),
  },
  {
    path: '/meetup/:id',
    name: 'Meetup',
    props: true,
    component: () => import('../components/Meetup/Meetup.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    props: true,
    component: () => import('../components/Meetup/EditMeetup.vue'),
    beforeEnter: AuthGuard,
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/User/Signup.vue'),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../components/User/Signin.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/User/Profile.vue'),
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
