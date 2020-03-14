import router from '../../router/index';
import { usersCollection, meetupCollection } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  state: {
    user: null,
  },
  mutations: {
    registerUser(state, newUser) {
      state.user = {
        userId: newUser.userId,
        registeredMeetups: newUser.registeredMeetups,
      };
    },
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
      state.user.registeredMeetups = payload.registeredMeetups;
    },
    signout(state) {
      state.user = null;
    },
    signin(state, payload) {
      state.user = {
        userId: payload.uid,
        email: payload.email,
        registeredMeetups: [],
        meetingTitles: [],
      };
    },
    meetingTitles(state, payload) {
      state.user.meetingTitles = payload;
    },
  },
  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('setLoading', false);
          const newUser = {
            userId: cred.user.uid,
            registeredMeetups: [],
          };
          // usersCollection.add(newUser).then(docRef => {
          //   console.log('New user document created with id: ', docRef.id);
          // });
          commit('registerUser', newUser);
          router.push({ name: 'Home' });
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    signout({ commit }, payload) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setLoading', false);
          commit('signout');
          //redirect use to home page
          if (payload !== 'Home') {
            router.push({ name: 'Home' }).catch(error => {});
          }
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    signin({ commit, state }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('signin', cred.user);
        })
        .then(() => {
          //load registeredMeetups for this user
          const queryRef = usersCollection.where(
            'userId',
            '==',
            state.user.userId
          );
          queryRef.get().then(snapshot => {
            snapshot.forEach(doc => {
              commit('loadRegisteredMeetups', doc.data());
            });
          });
        })
        .then(() => {
          router.push({ name: 'Home' }); // navigate to home page
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    autoSignin({ commit, state }, payload) {
      // router.push({ name: 'Home' }).catch(() => {});
      commit('signin', payload);

      // ensure registeredMeetups is loaded on autoSignin
      const queryRef = usersCollection.where('userId', '==', state.user.userId);
      queryRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          commit('loadRegisteredMeetups', doc.data());
        });
      });
    },
    getUserDetails({ commit, state }, payload) {
      const titleList = [];
      const queryRef = meetupCollection.where(
        'id',
        'in',
        state.user.registeredMeetups
      );
      queryRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            titleList.push({
              id: doc.data().id,
              title: doc.data().title,
              location: doc.data().location,
              imageUrl: doc.data().imageUrl,
              date: doc.data().date,
              time: doc.data().time,
            });
          });
          commit('meetingTitles', titleList);
        })
        .catch(error => {
          commit('setError', error.message);
        });
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
    user(state) {
      return state.user;
    },
    isRegisteredForMeetup(state) {
      return state.user.registeredMeetups;
    },
    getUserMeetups(state) {
      return state.user.meetingTitles;
    },
  },
};
