<template>
  <v-card :color="sale.color">
    <v-card-text>
      <v-sparkline
        :labels="sale.labels"
        :show-labels="false"
        :value="sale.sales"
        color="rgb(255,255,255,0.7)"
        height="100"
        padding="24"
        stroke-linecap="round"
        smooth
      >
      </v-sparkline>
    </v-card-text>
    <v-card-text class="text-center">
      <div class="display-1">{{ sale.title }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'sales-graph',
  props: {
    sale: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
