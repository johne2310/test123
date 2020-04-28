<!--suppress ALL -->
<template>
  <div>
    <div v-if="taskTotal">
      <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <list-header
          v-if="!settings.showOneList"
          key="list-header"
          bgColour="bg-primary"
          >Active Tasks</list-header
        >
        <!-- <q-list key="todo-list"> -->
        <task-list
          v-for="task in tasksTodo"
          :key="task.id"
          :task="task"
        ></task-list>
        <!-- </q-list> -->
      </transition-group>
    </div>
    <div v-else>
      <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated fadeOut"
      >
        <q-banner class="bg-blue-2 text-blue-grey-14 text-center">
          <q-icon name="mdi-check-circle-outline" style="font-size: 2em;" />
          Well done. You have completed all your tasks!
        </q-banner>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListHeader from 'components/shared/ListHeader.vue';
import TaskList from 'components/tasks/TaskList.vue';
export default {
  props: ['tasksTodo', 'taskTotal'],
  components: {
    'task-list': TaskList,
    'list-header': ListHeader,
  },
  computed: {
    ...mapGetters(['settings']),
  },
};
</script>

<style lang="scss" scoped></style>
