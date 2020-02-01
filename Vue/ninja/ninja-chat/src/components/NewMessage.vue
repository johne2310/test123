<template>
  <v-container width="350px" class="mx-auto">
    <hr />
    <!-- <span class="mx-5 text--grey lighten-2 caption">
      {{ this.user }} says:
    </span> -->
    <v-form class="mx-5 mt-5 mb-n5" @submit.prevent="addMessage">
      <v-text-field
        solo
        label="New message"
        autofocus:true
        v-model="message"
        append-icon="mdi-send-circle-outline"
        @click:append="addMessage"
      ></v-text-field>
      <span v-if="messageEmpty" class="red--text">{{ noMessage }}</span>
    </v-form>
  </v-container>
</template>

<script>
import { chatCollection } from '../firebase';
export default {
  name: 'NewMessage',
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  firestore() {},
  data() {
    return {
      newMessage: {},
      message: null,
      messageEmpty: false,
      id: '',
      noMessage: null,
    };
  },
  methods: {
    getDocId() {
      //create new blank document
      const newDoc = chatCollection.doc();
      return newDoc.get().then(docRef => {
        this.id = docRef.id;
        console.log('New doc id: ', this.id);
      });
    },
    async addMessage() {
      if (!this.message) {
        this.messageEmpty = true;
        this.noMessage = 'Please enter a message';
        return;
      }

      //run new doc function

      await this.getDocId();

      this.newMessage = {
        id: this.id,
        name: this.user,
        message: this.message,
        time: Date.now(),
      };
      console.log(this.newMessage);

      chatCollection
        .doc(this.id)
        .set(this.newMessage)
        .then(() => {
          console.log('New message added', this.id);
        })
        .catch(error => {
          console.log('There was an error adding the record: ', error);
        });
      this.message = null;
      this.noMessage = null;
    },
  },
};
</script>

<style scoped>
.top {
  border-top: 2px solid grey;
}
.red {
  color: red;
}
</style>
