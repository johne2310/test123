<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col>
        <AddSmoothie
          v-show="showAdd"
          @close-form="closeForm"
          :smoothie="smoothie"
        ></AddSmoothie>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="smoothie in smoothies"
        :key="smoothie.id"
        cols="12"
        md="4"
        align-self="center"
      >
        <SmoothieCard
          :smoothie="smoothie"
          @deleteCard="deleteCard($event)"
        ></SmoothieCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="showAdd = !showAdd" rounded color="primary">
          Show Add Form</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '../EventBus';
import { smoothiesCollection } from '../firebase';
// import { db } from '../firebase';
// @ is an alias to /src
import SmoothieCard from '@/components/SmoothieCard.vue';
import AddSmoothie from '@/views/AddSmoothie.vue';
export default {
  name: 'home',
  components: { SmoothieCard, AddSmoothie },

  data() {
    return {
      showAdd: false,
      newSmoothie: {},
      smoothies: [],
      smoothie: {},
    };
  },
  firestore: {
    smoothies: smoothiesCollection, // or use db.collection('smoothies'),
  },
  created: function() {
    //check to see if smoothies array has been loaded from firestore
    console.log('Loading smoothies from Firestore: ', this.smoothies);
  },

  mounted: function() {
    //listen to click event to show new smoothie form (click from NavBar button)
    EventBus.$on('show-add-form', this.toggleForm);
    EventBus.$on('show-edit-form', this.toggleEditForm);
  },
  methods: {
    toggleForm(data) {
      this.showAdd = data;
    },
    toggleEditForm(data) {
      console.log('Data from show edit: ', data);
      // this.showAdd = data;
    },
    deleteCard(id) {
      console.log(id, 'from Home');
      this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id != id;
      });
    },
    addNewSmoothie(data) {
      console.log('emited new smoothie: ', data);
      // this.smoothies.push(data);
      console.log('new Smoothie array: ', this.smoothies);

      //add new smoothie to Firestore
      smoothiesCollection
        .add(data)
        .then(() => {
          console.log('New smoothie added');
        })
        .catch(error => {
          console.log('There was an error adding the record: ', error);
        });
    },

    closeForm() {
      this.showAdd = false;
    },
  },
};
</script>
