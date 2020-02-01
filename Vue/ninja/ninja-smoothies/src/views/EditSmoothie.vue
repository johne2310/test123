<template>
  <v-container>
    <v-card width="450" class="mx-auto mt-5">
      <v-card-title> Editing: {{ smoothie.title }} Smoothie</v-card-title>
      <v-form @submit.prevent="updateSmoothie">
        <v-text-field
          class="px-5"
          name="title"
          label="Smoothie Name"
          v-model="smoothie.title"
        ></v-text-field>
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
              @click:close="removeIng(index)"
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
            <v-icon left>mdi-content-save-edit</v-icon>
            Update</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="add-buttons"
            color="red white--text"
            :to="{ name: 'home' }"
          >
            <v-icon left>mdi-cancel</v-icon>Cancel</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { smoothiesCollection } from '../firebase';
export default {
  name: 'EditSmoothie',
  props: {},

  data() {
    return {
      ing: '',
      smoothie: {},
      ingredients: [],
      id: '',
      isTitle: false,
    };
  },
  mounted() {
    //just getting the params.id does not work (relate to string format)
    const docId = this.$router.resolve(this.$route).route.params.id;
    console.log('docId: ', docId);
    const editSmoothie = smoothiesCollection.doc(docId);
    editSmoothie
      .get()
      .then(doc => {
        if (doc.exists) {
          this.smoothie = doc.data();
          this.ingredients = this.smoothie.ingredients;
        }
      })
      .catch(error => {
        console.log('An error has occured gettting record: ', error);
      });
  },
  methods: {
    addIng() {
      if (this.ing) {
        this.ingredients.push(this.ing);
        this.ing = '';
      }
    },
    removeIng(index) {
      this.ingredients.splice(index, 1);
    },
    updateSmoothie() {
      if (this.smoothie.title === '') {
        this.isTitle = true;
        return;
      }
      //set upDated Smoothie objct
      const newSmoothie = {
        title: this.smoothie.title,
        ingredients: this.ingredients,
        lastUpdated: new Date(),
      };

      //add new smoothie to Firestore
      smoothiesCollection
        .doc(this.smoothie.id)
        .update(newSmoothie)
        .then(() => {
          console.log('Smoothie updated', this.smoothie.id);
        })
        .catch(error => {
          console.log('There was an error adding the record: ', error);
        });
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.isTitle {
  color: red;
  font-size: 12px;
}
</style>
