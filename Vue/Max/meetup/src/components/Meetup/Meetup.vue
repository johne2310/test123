<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title class="pa-1 ma-1">
            <div class="title primary--text text--darken-1">
              {{ meetup.title }}
            </div>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageUrl"> </v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | longDate }} at {{ meetup.time }} -
              {{ meetup.title }}:
              {{ meetup.location }}
            </div>
            <div>{{ meetup.description }} {{ isCreator }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="isCreator"
              outlined
              color="amber darken-4"
              @click="editMeetup"
            >
              Edit Meetup
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click="registerForMeetup">
              {{ isRegisteredForMeetup ? 'Unregister ' : 'Register' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- registered snackbar -->
    <v-snackbar
      v-model="success"
      :timeout="timeout"
      color="grey darken-3"
      bottom
    >
      {{
        !isRegisteredForMeetup
          ? 'Successfully unregistered from this meetup'
          : 'Successfully registered for this meetup'
      }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'Meetup',
  props: ['id'],
  data() {
    return {
      timeout: 3000,
    };
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    isRegisteredForMeetup() {
      return (
        this.$store.getters.isRegisteredForMeetup.findIndex(id => {
          return id === this.id;
        }) >= 0
      );
    },
    isCreator() {
      const currentUser = this.$store.getters.user;
      return currentUser.userId === this.meetup.creatorId;
    },
    success: {
      get: function() {
        return this.$store.getters.success;
      },
      set: function() {
        this.$store.commit('success', false);
      },
    },
  },
  methods: {
    registerForMeetup() {
      if (this.isRegisteredForMeetup) {
        this.$store.dispatch('unRegisterMeetup', this.id);
      } else {
        this.$store.dispatch('registerMeetup', this.id);
      }
    },
    editMeetup() {
      this.$router.push({ name: 'Edit', params: { id: this.id } });
    },
  },
};
</script>

<style scoped></style>
