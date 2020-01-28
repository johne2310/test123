import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
