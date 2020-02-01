import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueMoment from 'vue-moment';
import VueChatScoll from 'vue-chat-scroll';

import './firebase';
import { firestorePlugin } from 'vuefire';

Vue.use(VueMoment);
Vue.use(VueChatScoll);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
