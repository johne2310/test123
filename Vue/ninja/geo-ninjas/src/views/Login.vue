<template>
  <v-container class="mx-auto">
    <v-form @submit.prevent="login">
      <v-card width="400" class="mx-auto mt-5 shaped">
        <v-card-title class="my-4">
          <h1 class="display-2 indigo--text text--darken-4 mx-auto">
            Login
          </h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="mdi-email-box"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <p class="mx-7 red--text caption font-italic">{{ feedback }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" :to="{ name: 'signup' }">Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="deep-purple" dark>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    login() {
      if (!this.email && !this.password) {
        this.feedback = 'All fields must be completed';
      } else {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.log('Error: ', error.message);
            this.feedback = error.message;
          });
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
