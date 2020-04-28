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
    @focus="selectAll($event)"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(['setSearchValue']),
    selectAll(event) {
      event.target.select();
    },
  },
  computed: {
    ...mapGetters(['getSearch']),
    searchField: {
      get() {
        return this.getSearch;
      },
      set(value) {
        this.setSearchValue(value);
      },
    },
  },
};
</script>

<style scoped></style>
