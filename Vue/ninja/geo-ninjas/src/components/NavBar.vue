<template>
  <div>
    <v-app-bar app color="deep-purple darken-1" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <router-link class="toolbar-title" :to="{ name: 'map' }">
          <v-toolbar-title class="display-1">
            Geo Ninjas
          </v-toolbar-title>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!user" rounded text :to="{ name: 'login' }" exact>
        <v-icon left>mdi-login</v-icon>Login
      </v-btn>

      <v-btn v-if="!user" rounded text :to="{ name: 'signup' }">
        <v-icon left>mdi-account-box</v-icon>
        Sign-up
      </v-btn>
      <span v-if="user">{{ user.email }}</span>
      <v-btn v-if="user" rounded text @click="signOut">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      color="grey lighten-3"
      app
      width="175"
    >
      <v-list nav dense>
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          clipped-left
        >
          <v-list-item :to="{ name: 'signup' }">
            <v-list-item-icon>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Signup</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      user: null,
      drawer: false,
      markers: [],
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.replace({ name: 'login' });
      this.loggedIn = false;
    },
  },
  mounted() {
    // watch changes in login status to map navbar buttons
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
