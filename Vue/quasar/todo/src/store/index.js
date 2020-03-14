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
          completed: false,
          dueDate: new Date(),
          dueTime: '12.00pm'
        },
        {
          id: 2,
          name: 'Get bananas',
          completed: true,
          dueDate: new Date(),
          dueTime: '12.00pm'
        },
        {
          id: 3,
          name: 'Get apples',
          completed: false,
          dueDate: new Date(),
          dueTime: '12.00pm'
        }
      ]
    },
    mutations: {
      updateTask (state, payload) {
        const currentTask = state.tasks.find(task => task.id === payload.id);
        console.log('Current task: ', currentTask);
        state.tasks.find(task => task.id === payload.id).completed = !payload.completed
      },
      deleteTask (state, payload) {
        const findTask = state.tasks.findIndex(task => {
          task.id === payload
        });
        state.tasks.splice(findTask, 1)
      }
    },
    actions: {
      updateTask ({ commit }, payload) {
        commit('updateTask', payload)
      },
      deleteTask ({ commit }, payload) {
        commit('deleteTask', payload)
      },
    },
    getters: {
      loadTasks: state=> {
        return state.tasks
      },
      loadedTask: state => {
        return taskId => {
          return state.tasks.find(task => {
            return task.id === taskId;
          });
        };
      },
    },


    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}




