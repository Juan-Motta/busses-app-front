import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      username: null,
      email: null,
      name: null,
      last_name: null,
      document: null,
      birth: null,
      phone: null,
      is_active: null,
      is_staff: null
    },
    isLoged: false
  },
  mutations: {
    setUser(state, user) {
      state.user.id = user.id
      state.user.username = user.username
      state.user.email = user.email
      state.user.name = user.name
      state.user.last_name = user.last_name
      state.user.document = user.document
      state.user.birth = user.birth
      state.user.phone = user.phone
      state.user.is_active = user.is_active
      state.user.is_staff = user.is_staff
    },
    deleteUser(state) {
      state.user.id = null
      state.user.username = null
      state.user.email = null
      state.user.name = null
      state.user.last_name = null
      state.user.document = null
      state.user.birth = null
      state.user.phone = null
      state.user.is_active = null
      state.user.is_staff = null
    },
    setIsLoged(state, value) {
      state.isLoged = value
    }
  },
  actions: {

  },
  getters: {
    getUserData(state) {
      return {
        id: state.user.id,
        username: state.user.username,
        email: state.user.email,
        name: state.user.name,
        last_name: state.user.last_name,
        document: state.user.document,
        birth: state.user.birth,
        phone: state.user.phone,
        is_active: state.user.is_active,
        is_staff: state.user.is_staff
      }
    },
    getIsLoged(state) {
      return state.isLoged
    },
    getName(state) {
      return state.user.name
    },
    getId(state) {
      return state.user.id
    }
  },
  modules: {
  }
})
