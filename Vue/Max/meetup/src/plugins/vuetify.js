import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      primary: '#01579B',
      secondary: '#2196f3',
      accent: '#00bcd4',
      error: '#f44336',
      warning: '#e91e63',
      info: '#009688',
      success: '#8bc34a',
    },
  },
});
