import Vue from 'vue'
import Vuex from 'vuex'
import allPatents from '@/data/patentes.json'

Vue.use(Vuex)

// console.log(allPatents)

export default new Vuex.Store({
  state: {
    allPatents,
    columnsToShow: [
      'STATUS',
      'PROCESSO',
      'CLASSIFICAÇÃO',
      'RESPONSÁVEL'
    ],
    columnsAvailable: Object.keys(allPatents[0])
  },

  mutations: {
    UPDATE_COLUMNS (state, data) {
      state.columnsToShow = data
    }
  },

  actions: {
    updateColumnsAvailable ({ commit, state }, data) {
      console.log('updateColumnsAvailable', data)
      commit('UPDATE_COLUMNS', data)
    }
  },

  getters: {
    filteredPatents: (state) => {
      return state.allPatents
    },

    getPatentById: (state) => (id) => {
      return state.allPatents[id]
    }
  }
})
