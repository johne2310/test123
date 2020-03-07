<template>
  <v-container class="mx-auto mt-8">
    {{ name | capitalise }}
    <v-row>
      <v-col>
        <v-card class="mx-auto" width="400">
          <v-card-title>
            A Firestore Driven Chat App
          </v-card-title>
          <v-form @submit.prevent="enterChat">
            <v-text-field
              required
              class="mx-5"
              hint="Enter username"
              autofocus:true
              validate-on-blur:
              true
              prepend-icon="mdi-account"
              label="Username"
              id="id"
              v-model="user"
              :rules="[rules.required, rules.counter]"
            ></v-text-field>

            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn type="submit" outlined color="primary" :disabled="isValid"
                >Enter Chat</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: '',
      name: 'jimbob',
      // isValid: false,
      rules: {
        required: value => !!value || 'A username is required.',
        counter: value =>
          value.length >= 4 || 'Username must be at least four characters.',
      },
    };
  },

  computed: {
    isValid() {
      return !(this.user && this.user.length >= 4);
    },
  },
  methods: {
    enterChat() {
      console.log('user is: ', this.user);
      this.$router.push({
        name: 'chat',
        params: { user: this.user },
      });
    },
  },
};
</script>
