import axios from '@/axios'
const state = {
  rows: [],
  upload_progress: 0
}
const mutations = {
  SET_ROWS (state, data) {
    state.rows = data
  },
  SET_UPLOAD_PROGRESS (state, data) {
    state.upload_progress = data
  }
}
const actions = {
  async index ({commit}) {
    try {
      const { data } = await axios.get('/api/web/splash_screen')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async store ({commit}, payload) {
    try {
      const { data } = await axios.post('api/web/splash_screen',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            commit('SET_UPLOAD_PROGRESS', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)))
          }
        }
      )
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
      const { data } = await axios.post(`api/web/splash_screen/${id}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
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
