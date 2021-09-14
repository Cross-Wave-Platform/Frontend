import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userdata: {
      username: null
    }
  },
  mutations: {
    loadUserdata (state, data) {
      state.userdata = data
    }
  },
  actions: {
  },
  modules: {
  }
})
