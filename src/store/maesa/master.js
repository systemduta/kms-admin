import axios from '@/axios'
const state = {}
const mutations = {}
const actions = {
  async companies () {
    try {
      const { data } = await axios.get('api/web/companies')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async organizations () {
    try {
      const { data } = await axios.get('api/web/organization')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async golongans () {
    try {
      const { data } = await axios.get('api/web/golongan')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async sops () {
    try {
      const { data } = await axios.get('api/web/get_sop')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },

  async crossfunctions () {
    try {
      const { data } = await axios.get('api/web/get_cross')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error.response)
    }
  },
  async detail_admin () {
    try {
      const { data } = await axios.get('api/web/detail_admin')
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
