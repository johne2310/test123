<template>
  <v-app>
    <NavBar></NavBar>

    <v-content>
      <!-- <HelloWorld /> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },

  components: {
    // HelloWorld,
    NavBar,
  },
};
</script>
