import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import allPatents from '@/data/patentes.json'

Vue.use(Vuex)

// console.log(allPatents)
const allClassifications = () => {
  let list = []
  allPatents.forEach(item => {
    const chopItems = item['CLASSIFICAÇÃO'].map(item => {
      return item.substring(0, 3)
    })
    list = [...list, ...chopItems]
    // list = [...list, ...item['CLASSIFICAÇÃO']]
  })
  return [...new Set(list)].sort()
}

const allInventors = () => {
  let list = []
  allPatents.forEach(item => {
    list = [...list, ...item['INVENTOR']].sort()
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

// const allHolders = () => {
//   let list = []
//   allPatents.forEach(item => {
//     list = [...list, item['TITULAR']]
//   })
//   return [...new Set(list)]
// }

// console.log(allHolders())

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
    naturesActives: [],

    inventorsAll: allInventors(),
    inventorsActives: []
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
    },

    UPDATE_INVENTORS (state, data) {
      state.inventorsActives = data
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
    },

    updateInventorsActives ({ commit, state }, data) {
      commit('UPDATE_INVENTORS', data)
    }
  },

  getters: {

    filteredPatents (state) {
      let list = state.allPatents

      if (state.classificationsActive.length > 0) {
        list = list.filter(item => {
          const chopItems = item['CLASSIFICAÇÃO'].map(item => {
            return item.substring(0, 3)
          })
          return _.intersection(chopItems, state.classificationsActive).length > 0
        })
      }

      if (state.naturesActives.length > 0) {
        list = list.filter(item => {
          return state.naturesActives.includes(item['NATUREZA'])
        })
      }

      if (state.inventorsActives.length > 0) {
        list = list.filter(item => {
          return _.intersection(item['INVENTOR'], state.inventorsActives).length > 0
        })
      }

      return list
    },

    getPatentById: (state) => (id) => {
      return state.allPatents[id]
    }
  }
})
