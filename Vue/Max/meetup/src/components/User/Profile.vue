<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="headline font-weight-bold blue--text text--darken-4">
          My Registered Meetups
        </p>
      </v-col>
    </v-row>
    <v-row v-for="meetup in getUserMeetups" :key="meetup.id">
      <v-col cols="12">
        <v-card class="grey lighten-4" outlined>
          <v-container fluid>
            <v-row>
              <v-col cols="6" xs="5" sm="4" md="3">
                <v-img class="align-end" height="130px" :src="meetup.imageUrl">
                </v-img>
              </v-col>
              <v-col cols="6" xs="7" sm="8" md="9" class="pl-0">
                <v-card-title class="pt-2">
                  <div>
                    <div class="title">
                      {{ meetup.title }}
                    </div>
                    <div class="grey--text text--darken-2 subtitle-2">
                      {{ meetup.date | longDate }} - {{ meetup.time }}
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions class="pt-0">
                  <v-btn
                    rounded
                    small
                    outlined
                    color="primary"
                    :to="{ name: 'Meetup', params: { id: meetup.id } }"
                  >
                    <v-icon left>mdi-arrow-right</v-icon>
                    View Meetup</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(['getUserDetails']),
  },
  computed: {
    currentUser() {
      return this.$store.getters.user.email;
    },
    registeredMeetups() {
      return this.$store.getters.user.registeredMeetups;
    },
    getUserMeetups() {
      return this.$store.getters.getUserMeetups;
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

<style scoped></style>
