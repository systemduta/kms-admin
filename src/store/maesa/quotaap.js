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
  async setUser({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/setuser", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          commit(
            "SET_UPLOAD_PROGRESS",
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async getUser({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/showuser", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          commit(
            "SET_UPLOAD_PROGRESS",
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async indexpermit({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/indexpermit/${id}`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async index({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/quotaap`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async getJadwal({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/getJadwal/${id}`);
      commit("SET_ROW", data.success);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async showquotaap({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/quotaap/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async getAll({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/getAll/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async store({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/quotaap", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          commit(
            "SET_UPLOAD_PROGRESS",
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
        },
      });
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
      const { data } = await axios.post(`api/web/quotaap/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async updateSingle(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(`api/web/updateSingle/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async updatequota(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(`api/web/quotaap/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async destroy(store, id) {
    try {
      const { data } = await axios.delete(`api/web/quotaap/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  //   async show({ commit }, id) {
  //     try {
  //       const { data } = await axios.get(`api/web/show_jadwal/${id}`);
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
