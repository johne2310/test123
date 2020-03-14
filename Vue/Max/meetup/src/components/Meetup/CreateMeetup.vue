<template>
  <v-container>
    <app-alert
      v-if="error"
      @dismissed="onDismissed"
      :errorText="error"
    ></app-alert>
    <v-card class="mx-auto" width="500px">
      <v-form @submit.prevent="createNewMeetup" ref="form" v-model="valid">
        <v-card-title class="display-1 primary--text">
          Create New Meetup
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
          <v-btn :disabled="!valid" class="mx-2" type="submit" color="success"
            >Create Meetup</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="resetForm">Clear form</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="success" :timeout="timeout" color="info" bottom>
      <p class="body-2 font-weight-medium">
        New meetup successfully created!
      </p>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      timeout: 2000,
      valid: false,
      dateMenu: false,
      timeMenu: false,
      title: '',
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
    ...mapActions(['createMeetup']),

    createNewMeetup() {
      // set a random id
      const id = Math.floor(Math.random() * 100000);
      // use date-fns to format date
      const formattedDate = moment(this.date).format('ddd, D MMM YYYY');
      const formattedTime = moment(this.time, 'HH:mm').format('LT');

      const newMeetup = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: this.date,
        time: formattedTime,
      };
      this.createMeetup(newMeetup);
      this.resetForm();
      // this.$router.push({ name: 'Meetups' });
    },
    resetForm() {
      this.$refs.form.reset();
    },
    onDismissed() {
      this.$refs.title.focus();
      this.$store.dispatch('clearError');
    },
  },
};
</script>

<style scoped></style>
