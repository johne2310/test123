import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import * as VueGoogleMaps from 'vue2-google-maps';

import './firebase';
import { firestorePlugin } from 'vuefire';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB02qX2PjUurCQJMy-0vBk2Hedtn55Wpx0',
    libraries: 'places',
    installComponents: true,
  },
});
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

//wait for firebase auth to init before creating app
let app = null;
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});
