<template>
  <v-alert outlined border="left" type="error" dismissible @input="onClose">
    {{ errorText }}
  </v-alert>
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
    },
  },
  methods: {
    onClose() {
      this.$emit('dismissed');
    },
  },
  computed: {},
};
</script>

<style scoped></style>
