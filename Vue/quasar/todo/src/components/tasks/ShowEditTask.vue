<template>
  <q-card class="mx-auto mt-5" style="width: 500">
    <TaskHeader>Edit Task</TaskHeader>
    <q-form @submit.prevent="saveTask">
      <q-card-section>
        <TaskName :taskName.sync="newTask.name"></TaskName>

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
      </q-card-section>
      <q-separator />
      <!-- Action buttons -->
      <TaskButtons :validTask="validTask"></TaskButtons>

      <pre>{{ newTask.dueDate | longDate }}</pre>
      <pre>{{ newDate }}</pre>
      <pre>{{ newTask }}</pre>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task.js';
import { uid, date } from 'quasar';
import TaskHeader from 'components/tasks/TaskHeader.vue';
import TaskName from 'components/tasks/TaskName.vue';
import TaskDueDate from 'components/tasks/TaskDueDate.vue';
import TaskDueTime from 'components/tasks/TaskDueTime.vue';
import TaskButtons from 'components/tasks/TaskButtons.vue';

export default {
  mixins: [mixinAddEditTask],
  props: ['taskId', 'taskToEdit'],
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
      //convert 12 hour format to 24 hour format for saving
      if (this.settings.show12HourFormat) {
        const newTime = moment(this.newTask.dueTime, 'hh:mma').format('HH:mm');
        this.newTask.dueTime = newTime;
      } else {
        const newTime = moment(this.newTask.dueTime, 'HH:mm').format('HH:mm');
        this.newTask.dueTime = newTime;
      }
      this.$store.dispatch('editTask', this.newTask);
      this.$emit('closeTaskForm');
    },
  },
  computed: {
    ...mapGetters(['settings']),
    newDate() {
      const newDate = this.$options.filters.displayDate(this.newTask.dueDate);
      console.log('date for display computed: ', newDate);
      return newDate;
    },
    // task() {
    // load task from store based on id passed from prop
    // return this.$store.getters.loadedTask(this.taskId);
    // },
  },
  filters: {
    longDate(value) {
      return date.formatDate(value, 'ddd, D MMM YYYY');
    },
    displayDate(value) {
      return date.formatDate(value, 'DD/MM/YYYY');
    },
  },
  created() {
    this.newTask = Object.assign({}, this.taskToEdit);
    this.newTask.dueDate = this.$options.filters.displayDate(
      this.newTask.dueDate
    );
  },
};
</script>

<style scoped></style>
