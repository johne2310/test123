export default {
  state: {
    settings: {
      show12HourFormat: false
    }
   },
  mutations: {
    setTimeFormat (state, value) {
      state.settings.show12HourFormat = value
    }
   },
  actions: {
    setTimeFormat ({ commit }, value) {
      commit('setTimeFormat', value)
    }
   },
  getters: {
    settings: state => {
      return state.settings
    }
  },
};
