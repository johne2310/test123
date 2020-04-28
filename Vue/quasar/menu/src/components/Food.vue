<template>
  <q-card class="card">
    <!--suppress HtmlUnknownTarget -->
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
        class="q-mt-sm"
        color="orange"
        readonly
        size="2em"
      />
    </q-card-section>

    <q-card-section>
      <span v-if="food.description">{{ food.description }}</span>
      <i v-else>No description provided.</i>
    </q-card-section>

    <q-card-actions align="right" class="absolute-bottom">
      <q-btn @click="showEditFoodModal = true" color="blue" flat icon="edit"
        >Edit
      </q-btn>
      <q-btn @click="deleteSelectedFood(food.id)" color="red" flat icon="delete"
        >Delete
      </q-btn>
    </q-card-actions>

    <q-dialog v-model="showEditFoodModal">
      <modal-add-edit-food
        :food="food"
        @closeFoodForm="showEditFoodModal = false"
        type="edit"
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
    // ...mapActions(['deleteFood']),
    ...mapActions({
      deleteFood: 'deleteFood',
    }),
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
