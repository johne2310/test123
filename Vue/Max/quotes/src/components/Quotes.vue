<template>
  <div>
    <v-textarea
      v-model="quote"
      class="mx-auto mt-5"
      outlined
      label="Enter Quote Text Here"
    ></v-textarea>
    <v-btn class="info mb-5" @click="saveQuote(quote)">Save</v-btn>
  </div>
</template>

<script>
export default {
  name: "QuoteField",
  data() {
    return {
      quote: ""
    };
  },
  methods: {
    saveQuote(quote) {
      console.log("Saving quote: ", quote);
      this.$emit("new-quote", quote);
      this.quote = "";
    }
  }
};
</script>

<style scoped></style>
