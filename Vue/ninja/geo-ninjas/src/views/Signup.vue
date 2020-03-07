<template>
  <v-container class="mx-auto">
    <v-form @submit.prevent="signup">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="amber darken-3 white--text my-4">
          <h1 class="display-1">Signup</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="email"
            v-model="email"
            prepend-icon="mdi-email-outline"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            label="alias"
            v-model="alias"
            prepend-icon="mdi-drama-masks"
          />
          <p class="mx-7 red--text caption font-italic">{{ feedback }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-5">
          <v-spacer></v-spacer>
          <v-btn color="info" type="submit">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { usersCollection } from '../firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import slugify from 'slugify';
export default {
  name: 'Signup',
  firestore: {
    usersCollection,
  },
  data() {
    return {
      showPassword: false,
      email: null,
      alias: null,
      password: null,
      feedback: null,
      slug: null,
      position: {
        lat: -37.8236,
        lng: 144.9631,
      },
      info: 'A place marker',
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.feedback = null;
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        console.log('Slug: ', this.slug);
        const ref = usersCollection.doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'This alias already exists';
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  id: cred.user.uid,
                  geolocation: this.position,
                  info: this.info,
                });
              })
              .then(() => {
                this.$router.push({ name: 'map' });
              })
              .catch(error => {
                console.log(error);
                this.feedback = error.message;
              });
          }
        });
      } else {
        this.feedback = 'You must enter all fields';
      }
    },
  },
};
</script>

<style></style>
