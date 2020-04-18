<template>
  <q-page class="q-pa-lg">
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
      <p v-if="tasksTodo.length < 1 && tasksCompleted.length < 1">
        No results found for this search
      </p>
    </div>
    <!-- active list -->
    <div col="12">
      <list-header bgColour="bg-primary">Active Tasks</list-header>

      <div v-if="taskTotal">
        <q-list bordered separator>
          <TaskList
            v-for="task in tasksTodo"
            :key="task.id"
            :task="task"
          ></TaskList>
        </q-list>
      </div>
      <div v-else>
        <q-banner class="bg-blue-2 text-blue-grey-14 text-center">
          <q-icon name="mdi-check-circle-outline" style="font-size: 2em;" />
          Well done. You have completed all your tasks!
        </q-banner>
      </div>
    </div>

    <div class="q-mt-lg"></div>

    <!-- completed list -->
    <list-header bgColour="bg-grey">Completed Tasks</list-header>
    <q-list bordered separator>
      <TaskList
        v-for="task in tasksCompleted"
        :key="task.id"
        :task="task"
      ></TaskList>
    </q-list>

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

    <!-- add new task dialog -->
    <q-dialog v-model="showNewTaskForm" no-backdrop-dismiss>
      <show-add-task @closeTaskForm="showTaskForm"></show-add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import TaskList from 'components/tasks/TaskList.vue';
import ShowAddTask from 'components/tasks/ShowAddTask.vue';
import Search from 'components/tasks/tools/Search.vue';
import ListHeader from 'components/shared/ListHeader.vue';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'PageIndex',
  components: {
    TaskList,
    'show-add-task': ShowAddTask,
    'list-header': ListHeader,
    Search,
  },
  data() {
    return {
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
    ...mapActions(['setSortBy']),

    changeSort() {
      if (this.sort === 'name') {
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
    ...mapGetters(['tasksTodo', 'tasksCompleted']),
    ...mapState(['sort']),
    sortBy: {
      get() {
        return this.sort;
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
      if (
        this.newTask.name.length > 0 &&
        this.newTask.dueDate != '' &&
        this.newTask.dueTime != ''
      ) {
        return true;
      } else {
        return false;
      }
    },
    taskTotal() {
      return this.$store.getters.taskTotal;
    },
  },
  mounted() {
    // console.log('Sortby is: ', this.sortBy);
    this.$store.commit('setSortByName');
    // this.setSortBy();
  },
};
</script>
<style scoped>
.buttonWidth {
  width: 145px;
  height: 38px;
}
</style>
