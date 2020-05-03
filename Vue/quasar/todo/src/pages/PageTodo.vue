<!--suppress ALL -->
<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <!-- Search box -->
      <div class="row justify-between items-center">
        <div class="col">
          <Search></Search>
        </div>

        <div class="q-pl-md q-pb-sm">
          <q-select
            class="buttonWidth"
            bg-color="grey-3"
            outlined
            v-model="sortBy"
            :options="options"
            dense
            emit-value
            map-options
            @input="changeSort"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-sort" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="q-pl-xs text-grey-8">
        <p v-if="search && !tasksTodo.length && !tasksCompleted.length">
          No results found for this search
        </p>
      </div>
      <q-scroll-area class="q-scroll-area-tasks row">
        <!-- active list -->
        <tasks-todo
          class="q-mt-sm"
          :tasksTodo="tasksTodo"
          :taskTotal="taskTotal"
        ></tasks-todo>

        <!-- completed todos -->
        <tasks-completed :tasksCompleted="tasksCompleted"></tasks-completed>
      </q-scroll-area>

      <!-- sticky button -->
      <q-page-sticky position="bottom" :offset="[18, 18]">
        <q-btn
          round
          size="24px"
          icon="add"
          color="primary"
          @click="showTaskForm"
        />
      </q-page-sticky>
    </div>
    <!-- add new task dialog -->
    <q-dialog v-model="showNewTaskForm" no-backdrop-dismiss>
      <show-add-task @closeTaskForm="showTaskForm"></show-add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import TasksTodo from 'components/tasks/TasksTodo.vue';
import TasksCompleted from 'components/tasks/TasksCompleted.vue';
import ShowAddTask from 'components/tasks/ShowAddTask.vue';
import Search from 'components/tasks/tools/Search.vue';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'PageIndex',
  components: {
    'tasks-todo': TasksTodo,
    'tasks-completed': TasksCompleted,
    'show-add-task': ShowAddTask,
    Search,
  },
  data() {
    return {
      dateFormat: '',
      loading: false,
      completed: false,
      showNewTaskForm: false,
      // sortBy: 'Name',

      options: [
        {
          label: 'Name',
          value: 'name',
        },
        {
          label: 'Due Date',
          value: 'dueDate',
        },
      ],
    };
  },
  methods: {
    ...mapActions('tasks', ['setSortBy', 'loadFirestore']),

    changeSort() {
      if (this.sortBy === 'name') {
        //change sort mutation to name
        this.$store.commit('setSortByName');
      } else {
        // change sort mutation to date
        this.$store.commit('setSortByDate');
      }
    },

    showTaskForm() {
      this.showNewTaskForm = !this.showNewTaskForm;
    },
    addNewTask() {
      this.showNewTaskForm = false;
    },
  },
  computed: {
    ...mapGetters('tasks', [
      'tasksTodo',
      'tasksCompleted',
      'getSortBy',
      'taskTotal',
    ]),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['sort', 'search']), //not state does not map when using modules without namespace
    sortBy: {
      get() {
        return this.getSortBy;
      },
      set(value) {
        this.setSortBy(value);
      },
    },

    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords do not match'
        : true;
    },
    validTask() {
      return (
        this.newTask.name.length > 0 &&
        this.newTask.dueDate != '' &&
        this.newTask.dueTime != ''
      );
    },
    // taskTotal() {
    //   return this.$store.getters.taskTotal;
    // },
  },
  mounted() {
    // this.loadFirestore();
    this.$store.dispatch('tasks/bindTodos');
    this.$store.commit('tasks/setSortByName');
  },
};
</script>
<style scoped>
.buttonWidth {
  width: 145px;
  height: 38px;
}
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
  height: calc(100% - 80px);
}
</style>
