<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center display-1">
      Ninja Chat
    </div>

    <v-spacer></v-spacer>

    <v-btn text rounded to="/">
      <span class="mr-2">Home</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-btn text rounded to="/about">
      <span class="mr-2">About</span>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped></style>
