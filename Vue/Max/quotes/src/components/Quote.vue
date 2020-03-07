<template>
  <v-container>
    <v-card class="mx-auto mt-10" width="500px">
      <!-- <v-card-title dark class="primary white--text">
        A wonderful quote
      </v-card-title> -->
      <slot name="title"></slot>
      <slot></slot>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AppQuote",

  data: () => ({})
};
</script>
