<template>
  <div>
    <q-list bordered>
      <q-item
        v-ripple
        clickable
        @click="toggleCompleted(task)"
        :class="!task.completed ? 'bg-grey-2' : 'bg-grey-3'"
        v-touch-hold:1000.mouse="showEditForm"
      >
        <q-item-section avatar>
          <q-checkbox
            name="completed"
            v-model="task.completed"
            class="no-pointer-events"
          />
        </q-item-section>

        <q-space />

        <q-item-section>
          <q-item-label
            :class="{ showCompleted: task.completed }"
            v-html="$options.filters.searchHighlight(task.name, search)"
          >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ taskDueDate | longDate }}</q-item-label>
          <q-item-label>{{ taskDueTime }}</q-item-label>
        </q-item-section>

        <q-item-section side v-if="task.dueDate">
          <q-icon name="mdi-calendar-today" size="sm" left color="primary" />
          <q-icon name="mdi-alarm" size="sm" left color="info" />
        </q-item-section>

        <q-separator vertical spaced />
        <q-item-section side>
          <q-btn round color="primary" icon="post_add" @click.stop="editTask" />
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            color="red"
            icon="delete_outline"
            @click.stop="deleteSelectedTask(task.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- edit task dialog -->
    <q-dialog v-model="showEditTaskForm" no-backdrop-dismiss>
      <show-edit-task
        @closeTaskForm="showEditTaskForm = false"
        :taskId="task.id"
        :taskToEdit="task"
      ></show-edit-task>
    </q-dialog>
  </div>
</template>

<script>
import { date } from 'quasar';
import moment from 'moment';

import { mapState, mapActions, mapGetters } from 'vuex';
import ShowEditTask from 'components/tasks/ShowEditTask.vue';
export default {
  props: ['task'],
  components: {
    'show-edit-task': ShowEditTask,
  },
  data() {
    return {
      newTask: {},
      showEditTaskForm: false,
    };
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    showEditForm() {
      this.showEditTaskForm = true;
    },
    toggleCompleted(task) {
      this.task.sortDate = moment(this.task.dueDate, 'DD/MM/YYYY').format('X');
      const changedTask = {
        id: task.id,
        name: task.name,
        dueDate: task.dueDate,
        dueTime: task.dueTime,
        completed: !task.completed,
        sortDate: task.sortDate,
      };
      // noinspection JSValidateTypes
      this.updateTask(changedTask);
    },
    editTask() {
      this.showEditTaskForm = !this.showEditTaskForm;
    },
    deleteSelectedTask(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Would you like to delete this task?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
  },
  computed: {
    ...mapState('tasks', ['search']), //needs module to be namespaced to work
    ...mapGetters('settings', ['settings']),
    ...mapGetters('tasks', ['getSearch']),

    search() {
      return this.getSearch;
    },
    taskDueTime() {
      if (this.settings.show12HourFormat) {
        return moment(this.task.dueTime, 'HH:mm').format('LT');
      } else {
        return this.task.dueTime;
      }
    },
    taskDueDate() {
      return moment(this.task.dueDate, 'DD/MM/YYYY').format('lll');
    },
  },
  filters: {
    longDate(value) {
      return date.formatDate(value, 'ddd, D MMM YYYY');
    },
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = new RegExp(search, 'ig');
        return value.replace(searchRegExp, match => {
          return '<span class="bg-light-blue-3">' + match + '</span>';
        });
      }
      return value;
    },
  },
};
</script>

<style scoped>
.showCompleted {
  text-decoration: line-through;
}
</style>
