<template>
  <q-input
    autofocus
    :value="taskName"
    v-select-all
    outlined
    hint="Task name"
    @input="$emit('update:taskName', $event)"
    :rules="[rules.required]"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-note-text" color="primary" />
    </template>
  </q-input>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all';
export default {
  props: ['taskName'],
  data() {
    return {
      rules: {
        required: val => !!val || 'This field is required.',
      },
    };
  },
  computed: {},
  directives: {
    selectAll,
  },
};
</script>
