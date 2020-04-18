<template>
  <q-card class="card">
    <q-img
      :src="food.imageUrl ? food.imageUrl : 'statics/image-placeholder.png'"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ food.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="food.rating"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section>
      <span v-if="food.description">{{ food.description }}</span>
      <i v-else>No description provided.</i>
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showEditFoodModal = true" icon="edit" color="blue" flat
        >Edit</q-btn
      >
      <q-btn icon="delete" color="red" flat @click="deleteSelectedFood(food.id)"
        >Delete</q-btn
      >
    </q-card-actions>

    <q-dialog v-model="showEditFoodModal">
      <modal-add-edit-food
        type="edit"
        :food="food"
        @closeFoodForm="showEditFoodModal = false"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['food'],
  data() {
    return {
      showEditFoodModal: false,
    };
  },
  components: {
    'modal-add-edit-food': require('components/ModalAddEditFood.vue').default,
  },
  methods: {
    ...mapActions(['deleteFood']),
    deleteSelectedFood(id) {
      this.$q
        .dialog({
          title: 'Confirm deletion',
          message: 'Would you like to delete this food item?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteFood(id);
        });
    },
  },
};
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
