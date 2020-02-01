<template>
  <v-container>
    <v-card width="450" class="mx-auto mt-5">
      <v-card-title>
        Add a new Ninja Smoothie {{ smoothie.title }}
      </v-card-title>
      <v-form @submit.prevent="addSmoothie">
        <v-text-field
          class="px-5"
          name="title"
          label="Smoothie Name"
          v-model="smoothie.title"
        >
        </v-text-field>
        <span class="px-5 isTitle" v-show="isTitle"
          >A smoothie title is required.</span
        >

        <v-text-field v-model="ing" class="px-5" name="ing" label="Ingredient">
          <template slot="append">
            <v-btn icon text outlined class="my-1" @click="addIng">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-row>
          <v-col class="mx-5">
            <v-chip
              close
              @click:close="remove(index)"
              class="mx-1"
              small
              v-for="(item, index) in ingredients"
              :key="index"
              >{{ item }}</v-chip
            >
          </v-col>
        </v-row>

        <v-card-actions class="px-5 py-6 mt-5">
          <v-btn type="submit" class="add-buttons" color="primary">
            <v-icon left>mdi mdi-content-save-outline</v-icon>

            Save</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="add-buttons" color="red white--text" @click="closeForm">
            <v-icon left>mdi-door-closed</v-icon>
            Close</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import EventBus from '../EventBus';
import { smoothiesCollection } from '../firebase';
export default {
  name: 'addSmoothie',
  props: {
    smoothie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      title: '',
      ing: '',
      newSmoothie: {},
      ingredients: [],
      showAdd: false,
      smoothies: [],
      id: '',
      isTitle: false,
    };
  },
  firestore: {
    smoothies: smoothiesCollection.orderBy('createdAt', 'desc'),
  },
  mounted() {
    console.log('Add Smoothie: ', this.smoothie);
  },
  methods: {
    async addSmoothie() {
      //run function to create new doc and get Id to add to document object. function is asynchronous so need to use async/await
      if (this.title === '') {
        this.isTitle = true;
        return;
      }

      await this.getDocId();
      //set newSmoothie objct
      this.newSmoothie = {
        title: this.title,
        ingredients: this.ingredients,
        createdAt: new Date(),
        id: this.id,
      };

      //add new smoothie to Firestore
      smoothiesCollection
        .doc(this.id)
        .set(this.newSmoothie)
        .then(() => {
          console.log('New smoothie added', this.id);
        })
        .catch(error => {
          console.log('There was an error adding the record: ', error);
        });

      this.title = '';
      this.ingredients = [];
    },
    getDocId() {
      //create new blank document
      const newDoc = smoothiesCollection.doc();
      return newDoc.get().then(docRef => {
        this.id = docRef.id;
        console.log('New doc id: ', this.id);
      });
    },
    addIng() {
      console.log('Ing: ', this.ing);
      if (this.ing) {
        this.ingredients.push(this.ing);
        this.ing = '';
        console.log(this.ingredients);
      }
    },
    closeForm() {
      this.$emit('close-form');
    },
    remove(index) {
      console.log('Remove item: ', index);
      this.ingredients.splice(index, 1);
      console.log(this.ingredients);
    },
  },
};
</script>
<style scoped>
.add-buttons {
  width: 90px;
}
.isTitle {
  color: red;
  font-size: 12px;
}
</style>
