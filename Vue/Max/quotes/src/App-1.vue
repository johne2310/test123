<template>
  <v-app>
    <NavBar />
    <v-content>
      <v-card>
        <v-card-actions>
          <v-btn @click="selectedComponent = 'AppQuote'" color="success"
            >Quote</v-btn
          >
          <v-btn @click="selectedComponent = 'Author'" color="primary"
            >Author</v-btn
          >
          <v-btn @click="selectedComponent = 'New'" color="info">New</v-btn>
        </v-card-actions>
      </v-card>
      {{ selectedComponent }}
      <keep-alive>
        <component :is="selectedComponent">
          <p>Default Content</p>
        </component>
      </keep-alive>
      <!-- <AppQuote>
        <v-card-title dark class="primary white--text" slot="title">
          {{ quoteTitle }}
        </v-card-title>
        <v-card-text
          slot="content"
          class="body-1 font-italic font-weight-medium text--primary"
        >
          <div class="mt-5">
            This is the body of the quote
          </div>
        </v-card-text>
      </AppQuote> -->
    </v-content>
  </v-app>
</template>

<script>
import AppQuote from "./components/Quote";
import NavBar from "@/components/NavBar.vue";
import Author from "@/components/Author.vue";
import New from "@/components/New.vue";
export default {
  name: "App",

  components: {
    AppQuote: AppQuote,
    NavBar,
    Author: Author,
    New: New
  },

  data: () => {
    return {
      quoteTitle: "The Quote",
      selectedComponent: "AppQuote"
    }; //
  }
};
</script>
