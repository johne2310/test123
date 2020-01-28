<template>
  <v-container>
    <v-card width="450" class="mx-auto mt-5">
      <v-card-title>
        Add a new Ninja Smoothie
      </v-card-title>
      <v-form @submit.prevent="addSmoothie">
        <v-text-field
          class="px-5"
          name="title"
          label="Smoothie Name"
          v-model="title"
        ></v-text-field>

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
          <v-btn type="submit" class="add-buttons" color="primary">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="add-buttons" color="red white--text" @click="closeForm"
            >Close</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import EventBus from '../EventBus';
export default {
  name: 'addSmoothie',
  data() {
    return {
      dialog: false,
      title: '',
      ing: '',
      newSmoothie: {},
      ingredients: [],
      showAdd: false,
    };
  },
  methods: {
    addSmoothie() {
      this.newSmoothie = {
        title: this.title,
        slug: '',
        ingredients: this.ingredients,
      };
      console.log('From Card: ', this.newSmoothie);
      //   EventBus.$emit('new-smoothie', this.newSmoothie);
      this.$emit('pass-object', this.newSmoothie);
      this.title = '';
      this.ingredients = [];
      //   this.$router.push({ name: 'home' });
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
</style>
