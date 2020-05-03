import { firestoreAction } from 'vuexfire';
import { todosCollection } from 'boot/firebase';

export default {
  namespaced: true,
  state: {
    tasks: [
      // {
      //   id: 1,
      //   name: 'Go to shop',
      //   completed: true,
      //   dueDate:
      //     'Mon Apr 27 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
      //   dueTime: '16.00',
      // },
      // {
      //   id: 2,
      //   name: 'Get bananas',
      //   completed: false,
      //   dueDate:
      //     'Mon Apr 17 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
      //   dueTime: '12.00',
      // },
      // {
      //   id: 3,
      //   name: 'Get apples',
      //   completed: false,
      //   dueDate:
      //     'Mon Apr 20 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
      //   dueTime: '08.00',
      // },
    ],
    search: '',
    sort: 'name',
    success: false,
    error: null,
    deleted: null,
  },
  mutations: {
    updateTask(state, payload) {
      state.tasks.find(
        task => task.id === payload.id
      ).completed = !payload.completed;
    },
    deleteTask(state, payload) {
      const findTask = state.tasks.findIndex(task => task.id === payload);
      state.tasks.splice(findTask, 1);
    },
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    editTask(state, payload) {
      //replace task being edited with new object
      const findTask = state.tasks.findIndex(task => task.id === payload.id);
      state.tasks[findTask].name = payload.name;
      state.tasks[findTask].dueDate = payload.dueDate;
      state.tasks[findTask].dueTime = payload.dueTime;
    },
    setSearchValue(state, payload) {
      state.search = payload;
    },
    setSortByDate(state) {
      return state.tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
    },
    setSortByName(state) {
      return state.tasks.sort((a, b) => {
        const nameA = a.name.toLowerCase(); //ignore case
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    setSortBy(state, value) {
      state.sort = value;
    },
    loadFirestore(state, payload) {
      console.log('loading data: ', payload);
      state.tasks = [];
      state.tasks = Object.assign(state.tasks, payload);
    },
    setError(state, value) {
      state.error = value;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, value) {
      state.success = value;
    },
    deleted(state, value) {
      state.deleted = value;
    },
  },
  actions: {
    bindTodos: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const user = rootState['users'].user;
      return bindFirestoreRef(
        'tasks',
        todosCollection.doc(user).collection(user)
      );
    }),
    updateTask({ commit, rootState }, payload) {
      commit('clearError');
      // get user id from user store
      const user = rootState['users'].user;
      const queryRef = todosCollection
        .doc(user)
        .collection(user)
        .doc(payload.id);

      queryRef
        .update({
          id: payload.id,
          name: payload.name,
          dueDate: payload.dueDate,
          dueTime: payload.dueTime,
          completed: payload.completed,
        })
        .then(() => {
          // commit handled by VuexFire
          commit('setSuccess', true);
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    deleteTask({ commit, rootState }, taskId) {
      console.log('deleting item: ', taskId);
      const user = rootState['users'].user;
      const queryRef = todosCollection
        .doc(user)
        .collection(user)
        .doc(taskId);

      queryRef
        .delete()
        .then(() => {
          commit('deleted', true);
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    addTask({ commit, state }, payload) {
      commit('addTask', payload);
      if (state.sort === 'name') {
        commit('setSortByName');
      } else {
        commit('setSortByDate');
      }
    },
    editTask({ commit, state, dispatch }, payload) {
      // commit('editTask', payload);
      if (state.sort === 'name') {
        dispatch('updateTask');
        commit('setSortByName');
      } else {
        commit('setSortByDate');
      }
    },
    setSearchValue({ commit }, payload) {
      commit('setSearchValue', payload);
    },
    setSortBy({ commit }, value) {
      commit('setSortBy', value);
    },
    loadFirestore({ commit, rootState }) {
      console.log('get data for user : ', rootState['users'].user);
      const tasks = [];
      todosCollection
        .doc(rootState['users'].user)
        .collection(rootState['users'].user)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              dueDate: doc.data().dueDate,
              dueTime: doc.data().dueTime,
              completed: doc.data().completed,
            };
            tasks.push(data);
            commit('loadFirestore', tasks);
          });
        });
    },
  },
  getters: {
    tasksTodo: (state, getters) => {
      //check if search is active first, then filter search results
      if (state.search) {
        return getters.searchActiveTasks.filter(
          task => task.completed === false
        );
      } else {
        //return non search tasks array
        return state.tasks.filter(task => task.completed === false);
      }
    },
    tasksCompleted: (state, getters) => {
      //check if search is active first, then filter search results
      if (state.search) {
        return getters.searchActiveTasks.filter(
          task => task.completed === true
        );
      } else {
        //return non search tasks array
        return state.tasks.filter(task => task.completed === true);
      }
    },
    loadedTask: state => {
      return taskId => {
        return state.tasks.find(task => {
          return task.id === taskId;
        });
      };
    },
    taskTotal: state => {
      return state.tasks.filter(task => task.completed === false).length > 0;
    },
    searchActiveTasks: state => {
      return state.tasks.filter(task =>
        task.name.toLowerCase().match(state.search.toLowerCase())
      );
    },
    getSortBy: state => {
      return state.sort;
    },
    getSearch: state => {
      return state.search;
    },
  },
};
