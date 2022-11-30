import axios from "@/axios";
const state = {
  rows: [],
};
const mutations = {
  SET_ROWS(state, data) {
    state.rows = data;
  },
};
const actions = {
  async index({ commit }) {
    try {
      const { data } = await axios.get("api/web/get_user");
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async store(store, payload) {
    try {
      const { data } = await axios.post("api/web/register", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async show({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/detail_user/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async update(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(`api/web/update_user/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async destroy(store, id) {
    try {
      const { data } = await axios.delete(`api/web/delete_user/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  // async status(store,id)
  // {
  //   try {
  //     const { data } = await axios.delete(`api/web/delete_user/${id}`);
  //     return Promise.resolve(data);
  //   } catch (error) {
  //     return Promise.reject(error.response);
  //   }
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
