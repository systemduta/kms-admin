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
  async getDown({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/downcourse/${id}`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async index({ commit }, payload) {
    try {
      const { data } = await axios.get(`/api/web/organization`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getCourse({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/course?organization_id=${id}`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getCorporateValueCourse({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/course?type=${id}`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async getQuestion({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/web/get_question/${id}`);
      commit("SET_ROWS", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async destroy(store, id) {
    try {
      const { data } = await axios.delete(`api/web/course/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async delete(store, id) {
    try {
      const { data } = await axios.delete(`api/web/delete_answer/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async deletes(store, id) {
    try {
      const { data } = await axios.delete(`api/web/delete_question/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async store({ commit }, payload) {
    try {
      const { data } = await axios.post("api/web/course", payload, {
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

  async store_question(store, payload) {
    try {
      const { data } = await axios.post("api/web/store_question", payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async show({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/detail_course/${id}`);
      commit("SET_ROW", data.data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async details({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/detail_question/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async detail_answer({ commit }, id) {
    try {
      const { data } = await axios.get(`api/web/detail_answer/${id}`);
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
      const { data } = await axios.post(`api/web/course/${id}`, payload);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async update_answer(store, payload) {
    // console.log(id);
    try {
      const { data } = await axios.put(
        `api/web/update_answer/${payload.id}`,
        payload
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async edits(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(
        `api/web/update_question/${id}`,
        payload
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response);
    }
  },
  async edit(store, payload) {
    let id = null;
    for (const pair of payload.entries()) {
      if (pair[0] === "id") id = pair[1];
    }
    try {
      const { data } = await axios.post(`api/web/update_answer/${id}`, payload);
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
