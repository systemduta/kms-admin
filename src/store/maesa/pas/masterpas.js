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
  async all_dimensi({ commit }) {
    try {
      const { data } = await axios.get("api/web/pas_master_all_dimensis");
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async all_kpi({ commit }) {
    try {
      const { data } = await axios.get("api/web/pas_master_all_kpi");
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async all_ind({ commit }) {
    try {
      const { data } = await axios.get("api/web/pas_master_all_ind");
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index_employee(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_master_employee", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index_datas(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_master_index", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index_divisi({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/pas_master_division/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index({ commit }) {
    try {
      const { data } = await axios.get("api/web/pas_master_3p");
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async index_company({ commit }) {
    try {
      const { data } = await axios.get("api/web/pas_master_company");
      commit("SET_ROWS", data.data);
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
