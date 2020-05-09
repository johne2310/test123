<template>
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
    >
      <template v-slot:prepend>
        <q-icon name="mdi-sort" />
      </template>
    </q-select>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'sort-by',
  data() {
    return {
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
    ...mapActions('tasks', ['setSortBy']),
  },
  computed: {
    ...mapState('tasks', ['sort']),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSortBy(value);
      },
    },
  },
};
</script>
<style scoped>
.buttonWidth {
  width: 145px;
  height: 38px;
}
</style>
