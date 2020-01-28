<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col>
        <AddSmoothie
          v-show="showAdd"
          @pass-object="addNewSmoothie($event)"
          @close-form="closeForm"
        ></AddSmoothie>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="smoothie in smoothies"
        :key="smoothie.title"
        cols="12"
        md="4"
        align-self="center"
      >
        <SmoothieCard
          :smoothie="smoothie"
          @deleteCard="deleteCard"
        ></SmoothieCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="showAdd = !showAdd" rounded color="primary">
          Show Add Form</v-btn
        >
        <v-btn @click="showSmoothies" rounded color="primary">
          Show Smoothies</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '../EventBus';
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
      smoothies: [
        {
          title: 'Ninja Brew',
          slug: 'ninja-brew',
          ingredients: ['banana', 'coffee', 'milk'],
        },
        {
          title: 'Morning Mood',
          slug: 'morning-mood',
          ingredients: ['mango', 'lime', 'juice'],
        },
      ],
    };
  },
  created: function() {
    EventBus.$on('show-add-form', this.toggleForm);
  },

  mounted: function() {
    console.log('running created hook');
    // console.log('Smoothis array before emit: ', this.smoothies);
    // EventBus.$on('new-smoothie', this.addBusSmoothie);
  },
  methods: {
    toggleForm(data) {
      this.showAdd = data;
    },
    deleteCard(key) {
      console.log(key, 'from Home');
      this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.title != key;
      });
    },
    addNewSmoothie(data) {
      console.log('emited new smoothie: ', data);
      this.smoothies.push(data);
      console.log('new Smoothie array: ', this.smoothies);
    },
    addBusSmoothie(data) {
      if (data) {
        console.log('ADD BUS: ', data);
        // console.log('new-smoothie data: ', data);
        // this.newSmoothie = data;
        this.smoothies.unshift(data);
        console.log('New Smoothie Array: ', this.smoothies);
      }
      this.$forceUpdate();
    },
    showSmoothies() {
      console.log('Current smoothies array: ', this.smoothies);
    },
    closeForm() {
      this.showAdd = false;
    },
  },
};
</script>
