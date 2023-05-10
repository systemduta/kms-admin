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
  async index(store, payload) {
    try {
      const { data } = await axios.post(
        "api/web/index_performance_kpi",
        payload
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async store(store, payload) {
    try {
      const { data } = await axios.post("api/web/pas_performance_kpi", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async destroy(store, id) {
    try {
      const { data } = await axios.delete(`api/web/pas_performance_kpi/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  // ssdasdasdhji sjia nsd assnn shieme she d askkjhkskdjhskjcjoawehooeoihhhdh bnnnnnbbxcvbvkjasssssssssssdhhhh dsudaisd yo ag abayu  anggan apra syaha ajs  yo ga  bay i> sksdjs>sdasdkasd>skaSD>sdk

  async show({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/pas_performance_kpi/${id}`);
      commit("SET_ROW", data.data);
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
      const { data } = await axios.post(
        `api/web/pas_performance_kpi/${id}`,
        payload
      );
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
