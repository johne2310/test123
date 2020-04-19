<template>
  <!-- <div col="12"> -->
  <div v-if="tasksCompleted.length">
    <!-- completed list -->
    <transition-group
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated fadeOut"
    >
      <list-header key="list-header" bgColour="bg-grey"
        >Completed Tasks</list-header
      >
      <q-list key="todo-list" bordered separator>
        <tasks-todo
          v-for="task in tasksCompleted"
          :key="task.id"
          :task="task"
        ></tasks-todo>
      </q-list>
    </transition-group>
  </div>
  <!-- </div> -->
</template>

<script>
import ListHeader from 'components/shared/ListHeader.vue';
import TaskList from 'components/tasks/TaskList.vue';
export default {
  props: ['tasksCompleted'],
  components: {
    'tasks-todo': TaskList,
    'list-header': ListHeader,
  },
  computed: {},
};
</script>

<style scoped></style>
