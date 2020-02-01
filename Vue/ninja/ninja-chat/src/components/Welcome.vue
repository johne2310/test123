<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col>
        <v-card class="mx-auto" width="400">
          <v-card-title>
            A Firestore Driven Chat App
          </v-card-title>
          <v-form submit.prevent="enterChat">
            <v-text-field
              class="mx-5"
              clearable
              hint="Enter username"
              autofocus="true"
              name="name"
              label="Username"
              id="id"
              v-model="user"
            ></v-text-field>
          </v-form>

          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn type="submit" flat color="primary">Enter Chat</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Welcome',

  data: () => ({
    user: '',
  }),
};
</script>
