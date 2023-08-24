import axios from '@/axios'
const state = {
  rows: [],
  exam_result: []
}
const mutations = {
  SET_ROWS (state, data) {
    state.rows = data
  },
  SET_EXAM_RESULT (state, data) {
    state.exam_result = data
  }
}
const actions = {
  async index ({ commit }) {
    try {
      // const { data } = await axios.get(`/api/web/organization/list_by_company?company_id=${payload}`)
      const { data } = await axios.get('/api/web/golongan/list_by_company')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async getLeaderboard ({ commit }, id) {
    try {
      // const { data } = await axios.get(`/api/web/leaderboard?organization_id=${id}`)
      const { data } = await axios.get(
        `/api/web/leaderboard?golongan_id=${id}`
      )
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async getLeaderboardDetail (store, payload) {
    try {
      const { data } = await axios.post('api/web/leaderboard/detail', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async exam_result ({ commit }) {
    try {
      const { data } = await axios.get('/api/web/leaderboard/exam_result')
      commit('SET_EXAM_RESULT', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async destroy (store, id) {
    try {
      const { data } = await axios.delete(`api/web/leaderboard/${id}`)
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
