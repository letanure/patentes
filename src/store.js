import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
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

const allNatures = () => {
  let list = []
  allPatents.forEach(item => {
    list = [...list, item['NATUREZA']]
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
    allClassifications: allClassifications(),

    natureAll: allNatures(),
    naturesActives: []
  },

  mutations: {
    UPDATE_CLASSIFICATIONS (state, data) {
      state.classificationsActive = data
    },
    UPDATE_COLUMNS (state, data) {
      state.columnsToShow = data
    },
    UPDATE_NATURES (state, data) {
      state.naturesActives = data
    }
  },

  actions: {
    updateColumnsAvailable ({ commit, state }, data) {
      commit('UPDATE_COLUMNS', data)
    },

    updateclassificationsActive ({ commit, state }, data) {
      commit('UPDATE_CLASSIFICATIONS', data)
    },

    updateNaturesActives ({ commit, state }, data) {
      commit('UPDATE_NATURES', data)
    }
  },

  getters: {

    filteredPatents (state) {
      let list = state.allPatents

      if (state.classificationsActive.length > 0) {
        list = list.filter(item => {
          return _.intersection(item['CLASSIFICAÇÃO'], state.classificationsActive).length > 0
        })
      }

      if (state.naturesActives.length > 0) {
        list = list.filter(item => {
          return state.naturesActives.includes(item['NATUREZA'])
        })
      }

      return list
    },

    getPatentById: (state) => (id) => {
      return state.allPatents[id]
    }
  }
})
