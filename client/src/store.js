import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    message: (state, data) => {
      state.messages.unshift(data)
    },
    messages: (state, data) => {
      state.messages = data
    }
  },
  actions: {
   
  }
})
