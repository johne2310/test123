<!--suppress ALL -->
<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="dataLoaded">
        <!-- Search box -->
        <div class="row justify-between items-center">
          <div class="col">
            <Search></Search>
          </div>

          <div class="q-pl-md q-pb-sm">
            <sort-by></sort-by>
          </div>
        </div>
        <div class="q-pl-xs text-grey-8">
          <p v-if="search && !tasksTodo.length && !tasksCompleted.length">
            No results found for this search
          </p>
        </div>
        <q-scroll-area class="q-scroll-area-tasks row">
          <q-banner
            v-if="getError"
            inline-actions
            dense
            rounded
            class="bg-red-14 text-white"
          >
            An error has occured: {{ getError }}
            <template v-slot:action>
              <q-btn flat label="Dismiss" @click="dismissAlert" />
            </template>
          </q-banner>
          <!-- active list -->
          <tasks-todo
            class="q-mt-sm"
            :tasksTodo="tasksTodo"
            :taskTotal="taskTotal"
          ></tasks-todo>

          <!-- completed todos -->
          <tasks-completed :tasksCompleted="tasksCompleted"></tasks-completed>
        </q-scroll-area>
      </template>

      <template v-else>
        <div class="absolute-center">
          <q-spinner-gears color="grey-8" size="4em" />
          <p class="q-mt-lg grey-7">Hold on, just hitching up the horses...</p>
        </div>
      </template>

      <!-- sticky button -->
      <q-page-sticky v-if="dataLoaded" position="bottom" :offset="[18, 18]">
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
import { mapGetters, mapActions, mapState } from 'vuex';
import TasksTodo from 'components/tasks/TasksTodo.vue';
import TasksCompleted from 'components/tasks/TasksCompleted.vue';
import ShowAddTask from 'components/tasks/ShowAddTask.vue';
import Search from 'components/tasks/tools/Search.vue';
import SortBy from 'components/tasks/tools/SortBy';

export default {
  name: 'PageIndex',
  components: {
    'sort-by': SortBy,
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
    dismissAlert() {
      this.$store.commit('tasks/setError', null);
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
      'getError',
    ]),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['sort', 'search', 'dataLoaded']), //not state does not map when using modules without namespace

    sortBy: {
      get() {
        return this.getSortBy;
      },
      set(value) {
        this.setSortBy(value);
      },
    },
    // success() {
    //   return this.$store.getters['tasks/getSuccess'];
    // },
    deleted() {
      return this.$store.getters['tasks/getDeleted'];
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
  },
  mounted() {
    //load data from firebase via Vuex
    // this.$store.dispatch('tasks/bindTodos');
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
