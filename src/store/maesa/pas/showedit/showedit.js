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
  async show(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_edit_1", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async update(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_edit_2", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async delete(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_edit_3", payload);
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
