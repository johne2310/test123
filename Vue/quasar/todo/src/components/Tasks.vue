<template>
  <q-item v-ripple clickable @click="updateTask(task)">
    <q-item-section side top>
      <q-checkbox
        name="completed"
        v-model="task.completed"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ task.id }}. {{ task.name }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="today" size="sm" right color="primary" />
      <q-icon name="alarm" size="sm" right color="info" />
    </q-item-section>
    <q-item-section side>
      <q-item-label>{{ task.dueDate | longDate }}</q-item-label>
      <q-item-label>{{ task.dueTime }}</q-item-label>
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
        @click="deleteSelectedTask(task.id)"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar';
const { formatDate } = date;
import { mapActions } from 'vuex';
export default {
  props: ['task'],

  methods: {
    ...mapActions(['updateTask', 'deleteTask']),
    editTask(id) {},
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
    getStatus: {
      get() {
        return this.$store.getters.loadTasks;
      },
    },
  },
  filters: {
    longDate(value) {
      return date.formatDate(value, 'ddd, D MMM YYYY');
    },
  },
};
</script>

<style scoped></style>
