import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    username: null
  },
  mutations: {
    message: (state, data) => {
      state.messages.unshift(data)
    },
    messages: (state, data) => {
      state.messages = data
    },
    login: (state, data) => {
      state.username = data
    },
    logout: (state) => {
      state.username = null
    },
    delete: (state, _id) => {
      state.messages = state.messages.filter(x => x._id !== _id)  
    }
  },
  actions: {
  },
  getters: {
    messages: state => state.messages
  }
})
