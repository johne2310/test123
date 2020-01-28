<template>
  <v-timeline :dense="true" align-top>
    <v-timeline-item
      v-for="(event, i) in timeline"
      :key="i"
      :color="event.color"
      :icon="event.icon"
      fill-dot
    >
      <v-card :color="event.color" class="evelation-2" dark>
        <v-card-title class="title pt-3 pb-3">
          {{ event.title }}
        </v-card-title>
        <v-card-text class="white text--primary">
          <p class="pt-3 body-1 mb-0">{{ event.text }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'EventTimeline',
  props: {
    timeline: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
