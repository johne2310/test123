export default {
  state: {
    loading: null,
    error: null,
    success: null,
    deleted: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      console.log('error is: ', payload);
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    success(state, payload) {
      state.success = payload;
    },
    deleted(state, payload) {
      state.deleted = payload;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    success(state) {
      return state.success;
    },
    deleted(state) {
      return state.deleted;
    },
  },
};
