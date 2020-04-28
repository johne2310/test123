<template>
  <v-container>
    <app-alert
      v-if="error"
      @dismissed="onDismissed"
      :errorText="error"
    ></app-alert>

    <v-card class="mx-auto blue lighten-5" width="500px">
      <v-form @submit.prevent="saveEditedMeetup" ref="form" v-model="valid">
        <v-card-title class="info--text text--darken-4">
          <h1 class="display-1">Edit Meetup</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="title"
            title="title"
            label="Meetup title"
            id="title"
            :rules="titleRules"
            autofocus
          ></v-text-field>

          <!-- location textfield -->
          <v-text-field
            v-model="location"
            title="Location"
            label="Location"
            id="location"
            :rules="locationRules"
            validate-on-blur
          ></v-text-field>

          <!-- imageUrl textfield -->
          <v-text-field
            v-model="imageUrl"
            title="imageUrl"
            label="Image Url"
            id="imageUrl"
            :rules="imageUrlRules"
            validate-on-blur
          ></v-text-field>

          <!-- <v-file-input
            v-model="imageUrl"
            chips
            label="Upload image"
            show-size
            append-icon="mdi-paperclip"
            prepend-icon=""
            clearable
          ></v-file-input> -->

          <!-- display thumbnail of image -->
          <img v-if="imageUrl" :src="imageUrl" alt="" height="130" />

          <!-- description textfield -->
          <v-textarea
            v-model="description"
            label="Description"
            id="description"
            rows="3"
            :rules="descriptionRules"
            validate-on-blur
            no-resize
            counter="200"
          ></v-textarea>

          <v-row>
            <v-col>
              <!-- date picker -->
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    :rules="dateRules"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :min="nowDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <!-- time picker -->
              <v-menu
                v-model="timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="Time"
                    append-icon="mdi-clock-outline"
                    :rules="timeRules"
                    readonly
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="time"
                  @input="timeMenu = false"
                  ampm-in-title
                  scrollable
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" class="mx-2" type="submit" color="success"
            >Save Meetup</v-btn
          >
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :disabled="!valid" class="mx-2" color="warning"
                >Delete Meetup</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="pt-5 body-1"
                >Delete current Meetup?</v-card-title
              >

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  outlined
                  @click="deleteSelectedMeetup"
                  >Confirm</v-btn
                >
                <v-btn color="red darken-1" outlined @click="dialog = false"
                  >Cancel</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn color="red" dark @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="success" :timeout="timeout" color="info" bottom>
      <p class="body-2 font-weight-medium">
        Meetup successfully saved!
      </p>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      timeout: 2000,
      valid: false,
      dateMenu: false,
      timeMenu: false,
      title: null,
      location: '',
      description: '',
      imageUrl: null,
      date: '',
      time: '',
      nowDate: new Date().toISOString().slice(0, 10),
      titleRules: [
        v => !!v || 'A meetup title is required',
        v =>
          (v && v.length <= 20) ||
          'Meetup title must be less than 20 characters',
      ],
      locationRules: [
        v => !!v || 'A meetup location is required',
        v =>
          (v && v.length <= 50) ||
          'Meetup title must be less than 50 characters',
      ],
      descriptionRules: [
        v => !!v || 'A meetup description is required',
        v =>
          (!!v && v.length <= 200) || 'Maximum description is 200 characters',
      ],
      imageUrlRules: [v => !!v || 'A meetup location is required'],
      dateRules: [v => !!v || 'A meetup date is required'],
      timeRules: [v => !!v || 'A meetup time is required'],
    };
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    error() {
      return this.$store.getters.error;
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
    ...mapActions(['saveMeetup', 'deleteMeetup']),

    saveEditedMeetup() {
      // use moment to format time
      //   const formattedDate = moment(this.date).format('ddd, D MMM YYYY');
      const formattedTime = moment(this.time, 'HH:mm').format('LT');

      const newMeetup = {
        id: this.id,
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: this.date,
        time: this.time,
      };
      this.saveMeetup(newMeetup);
    },
    resetForm() {
      this.$refs.form.reset();
    },
    deleteSelectedMeetup() {
      this.deleteMeetup(this.id);
    },
    cancelEdit() {
      this.$router.push({ name: 'Meetup', params: { id: this.id } });
    },
    onDismissed() {
      this.$refs.title.focus();
      this.$store.dispatch('clearError');
    },
  },
  created() {
    this.title = this.meetup.title;
    this.location = this.meetup.location;
    this.description = this.meetup.description;
    this.imageUrl = this.meetup.imageUrl;
    this.date = this.meetup.date;
    this.time = this.meetup.time;
  },
};
</script>

<style scoped></style>
