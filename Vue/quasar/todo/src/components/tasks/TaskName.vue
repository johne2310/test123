<template>
  <q-input
    autofocus
    @focus="$event.target.select()"
    :value="taskName"
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
export default {
  props: ['taskName'],
  data() {
    return {
      rules: {
        required: val => !!val || 'This field is required.',
      },
    };
  },
  methods: {
    selectAll(event) {
      event.target.select();
    },
  },
  computed: {},
};
</script>
