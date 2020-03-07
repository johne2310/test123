<template>
  <v-app>
    <v-content>
      <v-container>
        <br />

        <v-btn @click="selectedComponent = 'appBlue'" class="primary mx-2"
          >Load Blue Template</v-btn
        >

        <v-btn @click="selectedComponent = 'appGreen'" class="green mx-2" dark
          >Load Green Template</v-btn
        >

        <v-btn @click="selectedComponent = 'appRed'" class="red mx-2" dark
          >Load Red Template</v-btn
        >

        <hr />
        <keep-alive>
          <component :is="selectedComponent">
            <p slot="blueSlot">{{ blueContent }}</p>
            <p slot="greenSlot">{{ greenContent }}</p>
            <p slot="redSlot">{{ redContent }} {{ redCont }}</p>
          </component>
        </keep-alive>
        <!-- <Blue>
          <p slot="blueSlot" class="black--text">{{ blueContent }}</p>
        </Blue>
        <Green>
          <p slot="greenSlot">
            {{ greenContent }}
          </p>
        </Green>
        <Red>
          <p slot="redSlot">
            {{ redContent }}
          </p>
        </Red> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Blue from "./components/Blue.vue";
import Green from "./components/Green.vue";
import Red from "./components/Red.vue";

export default {
  name: "App",
  components: {
    appBlue: Blue,
    appGreen: Green,
    appRed: Red
  },
  data() {
    return {
      blueContent: "This little piggy went to market",
      greenContent: "This little piggy stayed home",
      redContent: "This little piggy had roast beef",
      selectedComponent: "appBlue"
    };
  }
};
</script>

<style></style>
