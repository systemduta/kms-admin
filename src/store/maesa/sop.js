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
  async getall ({ commit }, payload) {
    try {
      const { data } = await axios.get('/api/web/getsopcompany')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async getsoporg ({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/getsoporganization/${id}`)
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async index ({ commit }, payload) {
    try {
      const { data } = await axios.get('/api/web/organization')
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async getSop ({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/sop?organization_id=${id}`)
      commit('SET_ROWS', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async store ({ commit }, payload) {
    try {
      const { data } = await axios.post('api/web/sop', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          commit(
            'SET_UPLOAD_PROGRESS',
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          )
        }
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async show ({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/sop/${id}`)
      commit('SET_ROW', data.data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
    //   return Promise.resolve(data)
    // } catch (error) {
    //   return Promise.reject(error.response)
    // }
  },
  async update (store, payload) {
    let id = null
    for (const pair of payload.entries()) {
      if (pair[0] === 'id') id = pair[1]
    }
    try {
      const { data } = await axios.post(`api/web/sop/${id}`, payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async destroy (store, id) {
    try {
      const { data } = await axios.delete(`api/web/sop/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async delete (store, id) {
    try {
      const { data } = await axios.delete(`api/web/delete_cross/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async store_cross (store, payload) {
    try {
      const { data } = await axios.post('api/web/store_cross', payload)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async getCross ({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/getcross/${id}`)
      commit('SET_ROWS', data.data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async update_answer (store, payload) {
    // console.log(id);
    try {
      const { data } = await axios.put(
        `api/web/sop_status/${payload.id}`,
        payload
      )
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async status (store, id) {
    try {
      const { data } = await axios.get(`api/web/sop_status/${id}`)
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
