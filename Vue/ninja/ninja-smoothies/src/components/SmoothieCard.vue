<template>
  <v-card
    class="mx-auto mt-10 card-outter"
    shaped
    width="400"
    height="220"
    hover
  >
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
        class="ma-1 primary lighten-3"
        small
        outlined
        v-for="ingredient in smoothie.ingredients"
        :key="ingredient"
        >{{ ingredient }}</v-chip
      >
    </v-card-text>

    <v-card-actions class="card-actions mx-3">
      <v-btn
        :to="{ name: 'edit', params: { id: smoothie.id } }"
        color="blue lighten-2"
        icon
        small
      >
        <v-icon>mdi-file-document-edit-outline</v-icon>
      </v-btn>

      <v-btn @click="deleteCard(smoothie.id)" color="red lighten-2" icon small>
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from '../EventBus';
import { smoothiesCollection } from '../firebase';
export default {
  name: 'SmoothieCard',
  props: {
    smoothie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showEditForm: true,
    };
  },

  methods: {
    deleteCard(id) {
      smoothiesCollection
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document deleted with id: ', id);
        })
        .catch(error => {
          console.log('An error occured deleting document: ', id, error);
        });

      // this.$emit('deleteCard', id);
      console.log(name, ' from card');
    },
    editCard(id) {
      console.log('Emitting bus from Navbar', id);
      EventBus.$emit('show-edit-form', id);
    },
  },
};
</script>

<style scoped>
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  right: 10px;
  position: absolute;
  bottom: 0;
}
</style>
