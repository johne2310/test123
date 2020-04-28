<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['loadSettings']),
  },
  mounted() {
    this.loadSettings();
  },
};
</script>

<style>
</style>
