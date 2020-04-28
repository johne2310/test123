<template>
  <v-container>
    <v-row v-for="meetup in loadedMeetups" :key="meetup.id">
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
                      {{ meetup.date | longDate }} <br />
                      {{ meetup.time }}
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
                //TODO: Test
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- deleted confirmation snackbar -->
    <v-snackbar
      v-model="deleted"
      :timeout="timeout"
      color="red accent-4 white--text"
      bottom
    >
      {{
        deleted
          ? 'Meetup successfully deleted'
          : 'There was an error deleting the meetup'
      }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Meetups',
  data() {
    return {
      timeout: 3000,
    };
  },

  computed: {
    ...mapGetters(['loadedMeetups']),
    deleted: {
      get: function() {
        return this.$store.getters.deleted;
      },
      set: function() {
        this.$store.commit('deleted', false);
      },
    },
  },
};
</script>

<style scoped>
div {
  /* white-space: pre-wrap; */
  word-break: keep-all; /*this stops the word breaking*/
}
</style>
