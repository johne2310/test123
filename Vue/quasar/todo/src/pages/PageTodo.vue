<template>
  <q-page class="q-pa-lg">
    <q-list bordered separator>
      <Tasks v-for="task in loadTasks" :key="task.id" :task="task"></Tasks>
    </q-list>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn round size="24px" icon="add" color="primary" @click="addTask" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import Tasks from 'components/Tasks.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  components: {
    Tasks,
  },
  data() {
    return {
      completed: false,
    };
  },
  methods: {},
  computed: {
    ...mapGetters(['loadTasks']),
  },
};
</script>
