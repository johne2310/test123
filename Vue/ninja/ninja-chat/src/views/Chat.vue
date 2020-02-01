<template>
  <v-container style="max-height: 500px" class="mx-auto mt-8 ">
    <v-card width="500px" class="mx-auto">
      <v-card-title class="primary white--text">
        Ninja Chat
      </v-card-title>
    </v-card>
    <v-card
      width="500px"
      style="max-height: 500px"
      class="mx-auto overflow-y-auto"
      v-chat-scroll
    >
      <v-card-text>
        <v-list three-line>
          <v-list-item
            v-for="(chat, index) in chats"
            :key="chat.id"
            :class="{ alt: index % 2 != 0 }"
          >
            <v-list-item-avatar v-if="index % 2 == 0">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content :class="{ right: index % 2 != 0 }">
              <v-list-item-title
                class="font-weight-bold primary--text"
                v-text="chat.name"
              >
              </v-list-item-title>
              <v-list-item-title v-text="chat.message"></v-list-item-title>
              <v-list-item-subtitle>
                {{ chat.time | moment('llll') }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar v-if="index % 2 != 0">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card width="500px" class="mx-auto">
      <v-card-actions>
        <NewMessage :user="user"></NewMessage>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { chatCollection } from '../firebase';
import NewMessage from '@/components/NewMessage.vue';
export default {
  name: 'Chat',
  components: {
    NewMessage,
  },
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  firestore: {
    chats: chatCollection.orderBy('time', 'asc'),
  },
  data() {
    return {
      chats: [],
    };
  },
};
</script>

<style scoped>
.right {
  text-align: right;
}
.alt {
  background-color: rgb(223, 240, 248);
}
</style>
