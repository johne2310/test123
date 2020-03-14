import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import meetups from './meetups';
import user from './user';
import shared from './shared';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetups,
    user,
    shared,
  },
  plugins: [
    createPersistedState({
      paths: ['meetups', 'user'],
    }),
  ],
});
