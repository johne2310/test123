import { firestoreAction } from 'vuexfire';
import router from '../../router/index';
import { meetupCollection } from '../../firebase';
import 'firebase/auth';

export default {
  state: {
    loadedMeetups: [],
  },
  mutations: {
    // ...vuexfireMutations,
  },
  actions: {
    bindMeetups: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        'loadedMeetups',
        meetupCollection.orderBy('date', 'asc')
      );
    }),
    createMeetup({ commit, state }, payload) {
      const newMeetup = meetupCollection.doc();
      const id = newMeetup.id;
      newMeetup
        .set({
          id: id,
          creatorId: state.user.userId,
          title: payload.title,
          location: payload.location,
          description: payload.description,
          imageUrl: payload.imageUrl,
          date: payload.date,
          time: payload.time,
        })
        .then(() => {
          commit('success', true);
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    saveMeetup({ commit }, payload) {
      commit('clearError');

      const queryRef = meetupCollection.doc(payload.id);
      queryRef
        .update({
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date,
          time: payload.time,
        })
        .then(() => {
          commit('', payload);
          commit('success', true);
          router.push({ name: 'Meetup', params: { id: payload.id } });
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    deleteMeetup({ commit }, payload) {
      const queryRef = meetupCollection.doc(payload);
      queryRef
        .delete()
        .then(() => {
          commit('deleted', true);
          router.push({ name: 'Meetups' });
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
  },
  getters: {
    loadedMeetups: state => {
      // return state.loadedMeetups.sort((meetupA, meetupB) => {
      //   return meetupA.date > meetupB.date;
      // });
      return state.loadedMeetups;
    },
    featuredMeetups: (state, getters) => {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup: state => {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    loadedMeetup2: state => {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};
