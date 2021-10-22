import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      username: '',
      email: '',
      name: '',
      last_name: '',
      document: '',
      birth: '',
      phone: '',
      is_active: false,
      is_staff: false
    }
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
      state.user.id = ''
      state.user.username = ''
      state.user.email = ''
      state.user.name = ''
      state.user.last_name = ''
      state.user.document = ''
      state.user.birth = ''
      state.user.phone = ''
      state.user.is_active = ''
      state.user.is_staff = ''
    }
  },
  actions: {
    getUser(context, { id, token }) {
      console.log(id, token, 'storage');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get(`https://overidebusapp.herokuapp.com/api/users/${id}`, config)
        .then(res => {
          context.commit('setUser', { id, ...res.data })
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  modules: {
  }
})
