<template>
  <div>
    <q-item
      v-ripple
      clickable
      @click="updateTask(task)"
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
        <q-item-label>{{ task.dueDate | longDate }}</q-item-label>
        <q-item-label>{{ task.dueTime }}</q-item-label>
      </q-item-section>

      <q-item-section side v-if="task.dueDate">
        <q-icon name="mdi-calendar-today" size="sm" left color="primary" />
        <q-icon name="mdi-alarm" size="sm" left color="info" />
      </q-item-section>

      <q-separator vertical spaced />
      <q-item-section side>
        <q-btn
          round
          color="primary"
          icon="post_add"
          @click.stop="editTask(task.id)"
        />
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

    <q-separator />

    <!-- edit task dialog -->
    <q-dialog v-model="showEditTaskForm" no-backdrop-dismiss>
      <show-edit-task
        @closeTaskForm="showEditTaskForm = false"
        :taskId="task.id"
        :taskEdit="task"
      ></show-edit-task>
    </q-dialog>
  </div>
</template>

<script>
import { date } from 'quasar';
const { formatDate } = date;
import { mapState, mapActions } from 'vuex';
import ShowEditTask from 'components/tasks/ShowEditTask.vue';
export default {
  props: ['task'],
  components: {
    'show-edit-task': ShowEditTask,
  },
  data() {
    return {
      showEditTaskForm: false,
    };
  },
  methods: {
    ...mapActions(['updateTask', 'deleteTask']),
    showEditForm() {
      this.showEditTaskForm = true;
    },
    editTask(id) {
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
    ...mapState(['search']),
    getStatus: {
      get() {
        return this.$store.getters.tasksTodo;
      },
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

<style scoped></style>
