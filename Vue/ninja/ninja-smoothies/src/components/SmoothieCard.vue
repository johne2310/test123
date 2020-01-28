<template>
  <div>
    <v-card class="mx-auto mt-10" shaped width="400" height="200">
      <v-card-title class="primary lighten-2"
        >{{ smoothie.title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle class="primary lighten-4 pt-2 pb-1"
        ><span>Ingredients</span></v-card-subtitle
      >
      <hr color="#EDE7F6" />
      <v-card-text>
        <v-chip
          class="ma-1"
          small
          v-for="ingredient in smoothie.ingredients"
          :key="ingredient"
          >{{ ingredient }}</v-chip
        >
        <v-btn
          @click="deleteCard(smoothie.title)"
          color="grey lighten-1"
          icon
          small
          bottom
          right
          absolute
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SmoothieCard',
  props: {
    smoothie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteCard(name) {
      this.$emit('deleteCard', name);
      console.log(name, ' from card');
    },
  },
};
</script>
