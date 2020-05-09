import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire';

Vue.use(firestorePlugin);
// Vue.filter('longDate', function(value) {
//   return moment(value).format('ddd, D MMM YYYY');
// });

Vue.config.productionTip = false;

Vue.filter('capitalise', function(value) {
  return value.toUpperCase();
});
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
