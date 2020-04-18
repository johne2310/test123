<template>
  <q-card class="mx-auto mt-5" style="width: 500">
    <TaskHeader>Edit Task</TaskHeader>
    <q-form @submit.prevent="saveTask">
      <q-card-section>
        <TaskName :taskName.sync="newTask.name"></TaskName>
        <!-- <div class="q-pt-sm"> -->
        <!-- <div class="q-gutter-sm row"> -->
        <!-- date input -->
        <TaskDueDate
          :taskDueDate.sync="newTask.dueDate"
          :dateOptions="dateOptions"
        >
        </TaskDueDate>
        <!-- time input -->
        <TaskDueTime
          :taskDueTime.sync="newTask.dueTime"
          :isDateSet="isDateSet"
        ></TaskDueTime>
        <!-- </div> -->
        <!-- </div> -->
      </q-card-section>
      <q-separator />
      <!-- Action buttons -->
      <TaskButtons :validTask="validTask"></TaskButtons>
    </q-form>
  </q-card>
</template>

<script>
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task.js';
import { uid, date } from 'quasar';
import TaskHeader from 'components/tasks/TaskHeader.vue';
import TaskName from 'components/tasks/TaskName.vue';
import TaskDueDate from 'components/tasks/TaskDueDate.vue';
import TaskDueTime from 'components/tasks/TaskDueTime.vue';
import TaskButtons from 'components/tasks/TaskButtons.vue';

export default {
  mixins: [mixinAddEditTask],
  props: ['taskId', 'taskEdit'],
  components: {
    TaskHeader,
    TaskName,
    TaskDueDate,
    TaskDueTime,
    TaskButtons,
  },
  data() {
    return {
      newTask: {},
      today: '',
    };
  },
  methods: {
    saveTask() {
      if (this.newTask.dueDate) {
        const newDate = date.extractDate(this.newTask.dueDate, 'DD/MM/YYYY');
        this.newTask.dueDate = newDate;
      }
      this.$store.dispatch('editTask', this.newTask);
      this.$emit('closeTaskForm');
    },
  },
  computed: {
    task() {
      // load task from store based on id passed from prop
      return this.$store.getters.loadedTask(this.taskId);
    },
  },
  created() {
    this.newTask.id = this.taskId;
    this.newTask.name = this.task.name;
    this.newTask.dueDate = date.formatDate(this.task.dueDate, 'DD/MM/YYYY');
    this.newTask.dueTime = this.task.dueTime;
  },
};
</script>

<style scoped></style>
