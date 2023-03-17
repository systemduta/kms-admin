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
  CLEAR_JADWAL_USER(state) {
    state.jadwalUser.rows = null;
  },
};
const actions = {
  clearJadwalUser({ commit }) {
    commit("CLEAR_JADWAL_USER");
  },
  async showdetail({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/showdetail/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async indexDetail({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/indexdetail/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/jadwalvhsuser`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getvhs({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/getvhs`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getuser({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/get_user`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getcompany({ commit }, payload) {
    try {
      const { data } = await axios.get(`api/web/getcompany`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async store({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/jadwalvhsuser", payload, {
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
      const { data } = await axios.post(`api/web/jadwalvhsuser/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async destroy(store, id) {
    try {
      const { data } = await axios.delete(`api/web/jadwalvhsuser/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async show({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/jadwalvhsuser/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async updateUser(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(`api/web/uservhs/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
