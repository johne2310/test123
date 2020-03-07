<template>
  <v-app>
    <!-- navigation drawer -->
    <v-navigation-drawer v-model="sideNav" app temporary class="grey lighten-2">
      <v-list class="grey lighten-3">
        <v-subheader>Menu</v-subheader>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          color="primary darken-2"
          :to="{ name: item.route }"
        >
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="isLoggedIn"></v-divider>
        <v-list-item
          v-if="isLoggedIn"
          color="primary darken-2"
          @click="signout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Log out
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- main toolbar -->
    <v-app-bar app color="primary darken-2" dark elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="display">
        <router-link :to="{ name: 'Home' }" tag="span" style="cursor: pointer">
          DevMeetup
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        exact
        color="white"
        rounded
        outlined
        ripple
        text
        class="hidden-xs-only"
        v-for="item in menuItems"
        :key="item.title"
        :to="{ name: item.route }"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn
        exact
        v-if="isLoggedIn"
        class="hidden-xs-only"
        @click="signout"
        color="white"
        rounded
        outlined
        ripple
        text
      >
        <v-icon>mdi-logout</v-icon>
        Sign out</v-btn
      >
    </v-app-bar>
    <v-content>
      <!-- <vue-page-transition name="fade"> -->
      <router-view></router-view>
      <!-- </vue-page-transition> -->
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data() {
    return {
      sideNav: false,
      // isLoggedIn: true,
    };
  },
  computed: {
    isLoggedIn() {
      if (this.$store.state.user.user) {
        return true;
      } else {
        return false;
      }
    },
    menuItems() {
      if (this.isLoggedIn) {
        const menuItems = [
          {
            icon: 'mdi-account-search',
            title: 'View Meetups',
            route: 'Meetups',
          },
          {
            icon: 'mdi-plus-box-outline',
            title: 'Organise Meetup',
            route: 'Create',
          },
          {
            icon: 'mdi-account-supervisor',
            title: 'Profile',
            route: 'Profile',
          },
        ];
        return menuItems;
      } else {
        const menuItems = [
          { icon: 'mdi-lock-open', title: 'Sign-in', route: 'Signin' },
          { icon: 'mdi-face', title: 'Sign up', route: 'Signup' },
        ];
        return menuItems;
      }
    },
  },
  mounted() {},
  methods: {
    signout() {
      const routeName = this.$route.name;
      this.$store.dispatch('signout', routeName);
    },
  },
};
</script>

<style></style>
