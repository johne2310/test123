<template>
  <v-app>
    <v-content>
      <app-navbar />
      <v-container class="mx-auto mt-10">
        <p class="display-1">Quote progress (max:10)</p>
        <app-progress :value="value">
          <template v-slot:default>
            <strong> {{ quotes.length }} / {{ maxQuotes }}</strong>
          </template>
        </app-progress>
        <app-quotes @new-quote="addNewQuote"></app-quotes>
        <app-quote-grid
          :quotes="quotes"
          @delete-index="deleteQuote"
        ></app-quote-grid>
        <app-info class="mt-10 white--text"></app-info>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Progress from "@/components/Progress.vue";
import Navbar from "@/components/Navbar.vue";
import Quotes from "@/components/Quotes.vue";
import QuoteGrid from "@/components/QuoteGrid.vue";
import Info from "@/components/Info.vue";

export default {
  name: "App",
  components: {
    appProgress: Progress,
    appNavbar: Navbar,
    appQuotes: Quotes,
    appQuoteGrid: QuoteGrid,
    appInfo: Info
  },
  data() {
    return {
      quotes: ["1"],
      maxQuotes: 10
    };
  },
  computed: {
    value() {
      return Math.ceil((this.quotes.length / this.maxQuotes) * 100);
    }
  },
  methods: {
    addNewQuote(quote) {
      if (quote != "" && this.quotes.length < this.maxQuotes) {
        this.quotes.push(quote);
      } else {
        alert(
          "The maximum number if quotes has been reached. Please delete one."
        );
      }
    },
    deleteQuote(index) {
      console.log("Deleting quote: ", index);
      this.quotes.splice(index, 1);
    }
  }
};
</script>

<style></style>
