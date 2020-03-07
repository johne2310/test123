<template>
  <v-container class="mx-auto">
    <app-alert
      v-if="error"
      @dismissed="onDismissed"
      :errorText="error"
    ></app-alert>

    <v-form @submit.prevent="signup" v-model="valid" ref="form">
      <v-card width="400" class="mx-auto mt-5" elevation="3">
        <v-card-title class="primary darken-2 white--text my-4">
          <h1 class="display-1">Signup</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            ref="email"
            label="email"
            v-model="email"
            autofocus
            :rules="[rules.required, rules.email]"
            prepend-icon="mdi-email-outline"
          />
          <v-text-field
            ref="password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :rules="[rules.required]"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            :rules="[rules.required, comparePasswords]"
            label="Confirm Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-5">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="info"
            type="submit"
            :loading="loading"
            >Sign up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import Alert from '@/components/Shared/Alert.vue';

export default {
  name: 'Signup',
  components: {
    'app-alert': Alert,
  },
  data() {
    return {
      valid: false,
      showPassword: false,
      email: null,
      password: null,
      confirmPassword: null,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        required: value => !!value || 'This field is required.',
      },
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords do not match'
        : true;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    signup() {
      const newUser = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('registerUser', newUser);
      this.$refs.form.reset();
    },
    onDismissed() {
      console.log('Alert was dismissed');
      this.$refs.email.focus();
      this.$store.dispatch('clearError');
    },
  },
};
</script>

<style></style>
