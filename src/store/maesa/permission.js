import axios from '@/axios'
const state = {
  rows: [],
  row: {},
  upload_progress: 0
}
const mutations = {
  SET_ROWS (state, data) {
    state.rows = data
  },
  SET_ROW (state, data) {
    state.row = data
  },
  SET_UPLOAD_PROGRESS (state, data) {
    state.upload_progress = data
  }
}
const actions = {
  async index ({ commit }) {
    try {
      const { data } = await axios.get('api/web/permission')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async store (store, payload) {
    try {
      const { data } = await axios.post('api/web/permission', payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async getPeople ({ commit }, payload) {
    try {
      const { data } = await axios.get('api/web/permissionAll')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async update (store, payload) {
    let id = null
    for (const pair of payload.entries()) {
      if (pair[0] === 'id') id = pair[1]
    }
    try {
      const { data } = await axios.post(`api/web/permission/${id}`, payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async destroy (store, id) {
    try {
      const { data } = await axios.delete(`api/web/permission/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async show ({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/permission/${id}`)
      commit('SET_ROW', data.data)
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
