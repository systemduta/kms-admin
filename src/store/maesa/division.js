import axios from '@/axios'
const state = {
  rows: []
}
const mutations = {
  SET_ROWS (state, data) {
    state.rows = data
  }
}
const actions = {
  async index ({ commit }) {
    try {
      const { data } = await axios.get('api/web/organization')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async store (store, payload) {
    try {
      const { data } = await axios.post('api/web/organization', payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async show ({commit}, id) {
    try {
      const { data } = await axios.get(`api/web/organization/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async update (store, payload) {
    try {
      const { data } = await axios.put(`api/web/organization/${payload.id}`, payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async destroy (store, id) {
    try {
      const { data } = await axios.delete(`api/web/organization/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
