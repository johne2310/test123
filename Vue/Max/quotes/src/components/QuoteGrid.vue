<template>
  <v-row>
    <v-col cols="4" v-for="(quote, index) in quotes" :key="index">
      <v-card tile @click="getQuote(index)">
        <v-card-text>
          {{ quote }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "QuoteGrid",
  props: {
    quotes: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    getQuote(index) {
      console.log("Quote clicked:", index);
      this.$emit("delete-index", index);
    }
  }
};
</script>

<style scoped></style>
