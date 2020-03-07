<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn ripple color="info" large :to="{ name: 'Meetups' }"
          >Explore Meetups</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn color="info" large :to="{ name: 'Create' }"
          >Organise Meetups</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-carousel>
          <v-carousel-item
            v-for="meetup in featuredMeetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            :to="{ name: 'Meetup', params: { id: meetup.id } }"
            reverse-transition="fade-transition"
            transition="fade-transition"
            ripple
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <p class="grey--text text--darken-2 display-1 text-center">
          Join our awesome meetups!
        </p>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="info darken-3 "
        indeterminate
        size="50"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      overlay: false,
    };
  },
  computed: {
    ...mapGetters(['featuredMeetups']),
  },
  mounted() {
    this.overlay = true;
    this.$store
      .dispatch('bindMeetups')
      .then(() => {
        this.overlay = false;
      })
      .catch(error => {
        this.overlay = false;
      });
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
</style>
