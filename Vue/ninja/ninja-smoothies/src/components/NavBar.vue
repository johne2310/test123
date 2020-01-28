<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <router-link class="toolbar-title" :to="{ name: 'home' }">
      <v-toolbar-title class="display-1 font-weight-black">
        Ninja Smoothies
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <!-- <v-btn :to="{ name: 'add' }" fab right bottom absolute color="red"> -->
    <v-btn fab right bottom absolute color="red" @click="showAddForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import EventBus from '../EventBus';
export default {
  name: 'NavBar',
  data() {
    return {
      addDialogVisible: true,
    };
  },
  methods: {
    showAddForm() {
      console.log('Emitting bus from Navbar');
      EventBus.$emit('show-add-form', this.addDialogVisible);
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
