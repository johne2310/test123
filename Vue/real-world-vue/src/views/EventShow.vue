<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">
        @{{ event.time }} on {{ event.date | formatDate }}
      </span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organised by: {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event Details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        {{ attendee.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('dddd, D MMMM YYYY');
  }
});

export default {
  name: 'event-show',

  props: {
    id: {
      type: [Number, String],
      default: Number,
    },
  },
  data() {
    return { event: Object };
  },
  methods: {},
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        console.log(response.data);
        this.event = response.data;
        console.log(this.event.attendees);
      })
      .catch(error => {
        console.log('An error has occured: ', error);
      });
  },
};
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
