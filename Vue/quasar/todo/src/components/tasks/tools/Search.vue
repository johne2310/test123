<template>
  <q-input
    class="q-pb-sm"
    v-model="searchField"
    @keyup.esc="searchField = ''"
    debounce="500"
    label="Enter search"
    clearable
    outlined
    dense
    v-select-all
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all';
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  directives: {
    selectAll,
  },
  computed: {
    ...mapState(['search']),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearchValue(value);
      },
    },
  },
  methods: {
    ...mapActions(['setSearchValue']),
  },
};
</script>

<style scoped></style>
