import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import UpperCase from './filters/capitalise';
import DateFormat from './filters/date';
import firebase from 'firebase/app';
import VuePageTransition from 'vue-page-transition';

Vue.use(VuePageTransition);
Vue.filter('capitalise', UpperCase);
Vue.filter('longDate', DateFormat);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignin', user);
      }
    });
  },
}).$mount('#app');
