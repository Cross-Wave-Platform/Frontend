import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
