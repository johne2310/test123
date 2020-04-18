import Vue from 'vue'
import Vuex from 'vuex'

import solutionFoods from './Solution/store-foods'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // solutionFoods
    },
    state: {
      foods: [
        {
          id: 1,
          name: 'Burger',
          description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
          imageUrl: 'https://i.imgur.com/0umadnY.jpg',
          rating: 4
        },
        {
          id: 2,
          name: 'Pizza',
          description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
          imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
          rating: 5
        },
        {
          id: 3,
          name: 'Sprouts',
          description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
          imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
          rating: 1
        }
      ],
    },
    mutations: {
      deleteFood (state, payload) {
        const findFood = state.foods.findIndex(food => payload === food.id)
        state.foods.splice(findFood, 1)
      },
      addFood (state, payload) {
        state.foods.push(payload)
      },
      editFood (state, payload) {
        const findFood = state.foods.findIndex(food => 
          payload.id === food.id
        );
        state.foods[findFood].name = payload.name
        state.foods[findFood].description = payload.description
        state.foods[findFood].imageUrl = payload.imageUrl
        state.foods[findFood].rating = payload.rating
       }
    },
    actions: {
      deleteFood ({ commit }, payload) {
        commit('deleteFood', payload)
      },
      addFood ({ commit }, payload) {
        commit('addFood', payload)
      },
      editFood ({ commit }, payload) {
        console.log('Action: ', payload);
        commit('editFood', payload)
      }
    },
    getters: {
      loadFoods: state => {
        return state.foods
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
