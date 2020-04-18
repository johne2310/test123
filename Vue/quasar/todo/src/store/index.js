import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      tasks: [
        {
          id: 1,
          name: 'Go to shop',
          completed: true,
          dueDate: 'Mon Apr 27 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
          dueTime: '12.00pm'
        },
        {
          id: 2,
          name: 'Get bananas',
          completed: false,
          dueDate: 'Mon Apr 13 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
          dueTime: '12.00pm'
        },
        {
          id: 3,
          name: 'Get apples',
          completed: false,
          dueDate: 'Mon Apr 20 2020 10:00:00 GMT+1000 (Australian Eastern Standard Time)',
          dueTime: '12.00pm'
        }
      ],
      search: '',
      sort: 'name'
    },
    mutations: {
      updateTask (state, payload) {
        // const currentTask = state.tasks.find(task => task.id === payload.id);
        // console.log('Current task: ', currentTask);
        state.tasks.find(task => task.id === payload.id).completed = !payload.completed
      },
      deleteTask (state, payload) {
        const findTask = state.tasks.findIndex(task => 
          task.id === payload
        );
        state.tasks.splice(findTask, 1)
      },
      addTask (state, payload) {
        state.tasks.push(payload)
      },
      editTask (state, payload) {
        //replace task being edited with new object
        const findTask = state.tasks.findIndex(task => task.id === payload.id)
        state.tasks[findTask].name = payload.name;
        state.tasks[findTask].dueDate = payload.dueDate;
        state.tasks[findTask].dueTime = payload.dueTime;
      },
      setSearchValue (state, payload) {
        state.search = payload
      },
      setSortByDate (state) {
        console.log('Sorting by date');
        return state.tasks.sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateA - dateB;
        });
      },
      setSortByName (state) {
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
      setSortBy (state, value) {
        state.sort = value
      }
    },
    actions: {
      updateTask ({ commit }, payload) {
        commit('updateTask', payload)
  
      },
      deleteTask ({ commit }, payload) {
        commit('deleteTask', payload)
      },
      addTask ({ commit, state }, payload) {
        commit('addTask', payload)
        if (state.sort === 'name') {
          commit('setSortByName')
        } else {
          commit('setSortByDate')
        }
      },
      editTask ({ commit, state }, payload) {
        commit('editTask', payload) 
        if (state.sort === 'name') {
          commit('setSortByName')
        } else {
          commit('setSortByDate')
        }
         },
      setSearchValue ({ commit }, payload) {
        commit('setSearchValue', payload)
      },
      setSortBy ({ commit }, value) {
        commit('setSortBy', value)
      }
    },
    getters: {
      tasksTodo: (state, getters) => {
        //check if search is active first, then filter search results
        if (state.search) {
          return getters.searchActiveTasks.filter(task=> task.completed === false)
        } else {
          //return non search tasks array
          return state.tasks.filter(task => task.completed === false)
                } 
      },
      tasksCompleted: (state, getters) => {
        //check if search is active first, then filter search results
        if (state.search) {
          return getters.searchActiveTasks.filter(task => task.completed === true)
        } else {
          //return non search tasks array
          return state.tasks.filter(task => task.completed === true)
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
          return state.tasks.filter(task => task.name.toLowerCase().match(state.search.toLowerCase()))
      },
 
    },


    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}




