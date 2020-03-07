<template>
  <v-progress-linear
    :value="value"
    color="primary"
    height="25"
    dark
    background-opacity="0.4"
  >
    <slot></slot>
  </v-progress-linear>
</template>

<script>
export default {
  name: "Progress",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
