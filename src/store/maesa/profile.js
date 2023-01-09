import axios from "@/axios";
const state = {
  rows: [],
  row: {},
  upload_progress: 0,
};
const mutations = {
  SET_ROWS(state, data) {
    state.rows = data;
  },
  SET_ROW(state, data) {
    state.row = data;
  },
  SET_UPLOAD_PROGRESS(state, data) {
    state.upload_progress = data;
  },
};
const actions = {
  async index({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/profile`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async store({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/updateprofile", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  //   async getvhs({ commit }, payload) {
  //     try {
  //       const { data } = await axios.get(`api/web/getvhs`);
  //       commit("SET_ROWS", data.data);
  //       return Promise.resolve(data);
  //     } catch (error) {
  //       return Promise.reject(error.response);
  //     }
  //   },

  //   async update(store, payload) {
  //     let id = null;
  //     for (const pair of payload.entries()) {
  //       if (pair[0] === "id") id = pair[1];
  //     }
  //     try {
  //       const { data } = await axios.post(`api/web/update_zoom/${id}`, payload);
  //       return Promise.resolve(data);
  //     } catch (error) {
  //       return Promise.reject(error.response);
  //     }
  //   },

  //   async destroy(store, id) {
  //     try {
  //       const { data } = await axios.delete(`api/web/zoom/${id}`);
  //       return Promise.resolve(data);
  //     } catch (error) {
  //       console.log(error);
  //       return Promise.reject(error.response);
  //     }
  //   },

  //   async show({ commit }, id) {
  //     try {
  //       const { data } = await axios.get(`api/web/zoom/${id}`);
  //       commit("SET_ROW", data.data);
  //       return Promise.resolve(data);
  //     } catch (error) {
  //       return Promise.reject(error.response);
  //     }
  //   },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
