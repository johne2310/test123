import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    // import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // alias: '/about',
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
