import Vue from 'vue';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index';
import { usersCollection, meetupCollection, db } from '../firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    Error: null,
    success: null,
  },

  mutations: {
    registerMeetup(state, payload) {
      state.user.registeredMeetups.push(payload);
    },
    unRegisterMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      const meetingIndex = registeredMeetups.findIndex(
        meetup => meetup === payload
      );
      registeredMeetups.splice(meetingIndex, 1);
    },
    //load meetups on signin
    loadRegisteredMeetups(state, payload) {
      state.user = payload;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.Error = payload;
    },
    clearError(state) {
      state.Error = null;
    },
    success(state, payload) {
      state.success = payload;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('clearError');
    },
    registerMeetup({ commit, state }, payload) {
      const queryRef = usersCollection.where('userId', '==', state.user.userId);
      queryRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            usersCollection.doc(doc.id).update({
              registeredMeetups: firebase.firestore.FieldValue.arrayUnion(
                payload
              ),
            });
          });
          commit('registerMeetup', payload);
          commit('success', true);
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    unRegisterMeetup({ commit, state }, payload) {
      const queryRef = usersCollection.where('userId', '==', state.user.userId);
      queryRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            usersCollection.doc(doc.id).update({
              registeredMeetups: firebase.firestore.FieldValue.arrayRemove(
                payload
              ),
            });
          });
        })
        .then(() => {
          commit('unRegisterMeetup', payload);
          commit('success', true);
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
  },
  getters: {
    error(state) {
      return state.Error;
    },
    success(state) {
      return state.success;
    },
    isRegisteredForMeetup(state) {
      return state.user.registeredMeetups;
    },
  },
});
