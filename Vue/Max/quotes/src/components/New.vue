<template>
  <v-card-subtitle>New Quote</v-card-subtitle>
</template>

<script>
export default {
  deactivated() {
    console.log("New deactivated");
  },
  activated() {
    console.log("New activated");
  }
};
</script>

<style scoped></style>
