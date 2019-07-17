import Vue from 'vue'
import Vuex from 'vuex'
import allPatents from '@/data/patentes.json'

Vue.use(Vuex)

// console.log(allPatents)
const allClassifications = () => {
  let list = []
  allPatents.forEach(item => {
    list = [...list, ...item['CLASSIFICAÇÃO']]
  })
  return [...new Set(list)]
}

export default new Vuex.Store({
  state: {
    allPatents,
    columnsToShow: [
      'STATUS',
      'PROCESSO',
      'CLASSIFICAÇÃO',
      'RESPONSÁVEL'
    ],
    columnsAvailable: Object.keys(allPatents[0]),

    classificationsActive: [],
    allClassifications: allClassifications()
  },

  mutations: {
    UPDATE_CLASSIFICATIONS (state, data) {
      state.classificationsActive = data
    },
    UPDATE_COLUMNS (state, data) {
      state.columnsToShow = data
    }
  },

  actions: {
    updateColumnsAvailable ({ commit, state }, data) {
      commit('UPDATE_COLUMNS', data)
    },

    updateclassificationsActive ({ commit, state }, data) {
      commit('UPDATE_CLASSIFICATIONS', data)
    }
  },

  getters: {

    filteredPatents (state) {
      let list = state.allPatents
      if (state.classificationsActive.length > 0) {
        list = list.filter(item => {
          return item['CLASSIFICAÇÃO'].every(elem => state.classificationsActive.indexOf(elem) > -1)
        })
      }
      return list
    },

    getPatentById: (state) => (id) => {
      return state.allPatents[id]
    }
  }
})
