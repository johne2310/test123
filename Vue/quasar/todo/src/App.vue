<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions('settings', ['loadSettings']),
    ...mapActions('users', ['authStateChange']),
  },
  mounted() {
    this.loadSettings();
    this.authStateChange();
  },
};
</script>

<style></style>
