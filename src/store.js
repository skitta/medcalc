import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formItem: {},
    totalLiquidRange: {},
    expandLiquid: 0,
    tension: '1/2'
  },
  mutations: {
    SET_ITEM (state, item) {
      state.formItem = item
    },
    SET_RANGE (state, item) {
      state.totalLiquidRange = item
    },
    SET_EXPAND (state, num) {
      state.expandLiquid = num
    },
    SET_TENSION (state, str) {
      state.tension = str
    }
  },
  actions: {
    setItem ({commit}, item) {
      commit('SET_ITEM', item)
    },
    setRange ({commit}, item) {
      commit('SET_RANGE', item)
    },
    setExpand ({commit}, num) {
      commit('SET_EXPAND', num)
    },
    setTension ({commit}, str) {
      commit('SET_TENSION', str)
    }
  }
})
