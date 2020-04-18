<template>
  <q-card class="mx-auto mt-5" style="width: 500">
    <TaskHeader>Add New Task</TaskHeader>
    <q-form @submit.prevent="addNewTask">
      <q-card-section>
        <TaskName :taskName.sync="newTask.name"></TaskName>
        <div class="q-pt-sm">
          <div class="q-gutter-sm row">
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
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <!-- Action buttons -->
      <TaskButtons :validTask="validTask"></TaskButtons>
    </q-form>
  </q-card>
</template>

<script>
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task.js';
import { uid } from 'quasar';
import TaskHeader from 'components/tasks/TaskHeader.vue';
import TaskName from 'components/tasks/TaskName.vue';
import TaskDueDate from 'components/tasks/TaskDueDate.vue';
import TaskDueTime from 'components/tasks/TaskDueTime.vue';
import TaskButtons from 'components/tasks/TaskButtons.vue';

export default {
  mixins: [mixinAddEditTask],
  components: {
    TaskHeader,
    TaskName,
    TaskDueDate,
    TaskDueTime,
    TaskButtons,
  },
  data() {
    return {
      newTask: {
        id: '',
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      },
      today: '',
    };
  },
  methods: {
    addNewTask() {
      this.newTask.id = uid();
      if (this.newTask.dueDate) {
        const newDate = date.extractDate(this.newTask.dueDate, 'DD/MM/YYYY');
        this.newTask.dueDate = newDate;
      }
      this.$store.dispatch('addTask', this.newTask);
      this.$emit('closeTaskForm');
    },
  },
  computed: {},
};
</script>

<style scoped></style>
