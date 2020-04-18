<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <!-- TODO: replace class with platform.has.touch -->
    <!-- v-if="$q.platform.has.touch" -->
    <q-footer>
      <q-tabs inline-label class="primary text-white shadow-2">
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :icon="link.icon"
          :to="link.path"
          :label="link.title"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      show-if-above
      :width="230"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-blue-grey-2"
    >
      <q-list>
        <q-item-label header class="text-grey-10">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink';

export default {
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Todos',
          caption: 'View Todos',
          icon: 'list',
          path: { name: 'Home' },
        },
        {
          title: 'Settings',
          caption: 'Edit App Settings',
          icon: 'settings',
          path: { name: 'Settings' },
        },
      ],
    };
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.q-drawer .q-router-link--exact-active {
  color: rgb(13, 6, 56) !important;
}
</style>
