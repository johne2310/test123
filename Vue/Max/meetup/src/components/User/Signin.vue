<template>
  <v-container class="mx-auto">
    <app-alert
      v-if="error"
      @dismissed="onDismissed"
      :errorText="error"
    ></app-alert>
    <v-form @submit.prevent="signin" v-model="valid" ref="form">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="primary darken-2 white--text my-4">
          <h1 class="display-1">Sign in</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            ref="email"
            label="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            prepend-icon="mdi-email-outline"
            autofocus
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
        </v-card-text>
        <!-- <v-divider></v-divider> -->
        <v-card-actions class="pa-5">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="info"
            type="submit"
            :loading="loading"
            >Sign in</v-btn
          >
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
      show: true,
      valid: false,
      showPassword: false,
      email: null,
      password: null,
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
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    signin() {
      if (this.email && this.password) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('signin', user);
        this.$refs.form.reset();
      } else {
      }
    },
    onDismissed() {
      this.$refs.email.focus();
      this.$store.dispatch('clearError');
    },
  },
};
</script>

<style></style>
