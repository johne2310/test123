// import { usersCollection } from '../../boot/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  namespaced: true,
  state: {
    user: null,
    error: null,
    loading: false,
    isLoggedIn: false,
  },
  mutations: {
    registerUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    loginUser(state, payload) {
      state.user = payload.uid;
      // state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      // state.isLoggedIn = false;
    },
  },

  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      console.log('Register user: ', payload);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('setLoading', false);
          const newUser = {
            userId: cred.user.uid,
            todos: [],
          };
          commit('registerUser', newUser);
          // router.push({ name: 'Home' });
        })
        .catch(error => {
          console.log(
            'An error has occurred registering the user: ',
            error.message
          );
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    loginUser({ state, commit, rootState }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('setLoading', false);
          commit('loginUser', cred.user);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit('logoutUser');
    },
    authStateChange({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('user is logged in');
          commit('setLoggedIn', true);
          this.$router.push({ name: 'Home' }).catch(error => {});
        } else {
          console.log('user is logged out');
          commit('setLoggedIn', false);
          this.$router.replace({ name: 'Login' }).catch(error => {});
        }
      });
    },
  },

  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
  },
};

// rootState and rootGetters working examples
// console.log(
//   'List Format: ',
//   rootGetters['settings/settings'].showOneList
// );
// console.log('getTest: ', rootState['settings'].test);
