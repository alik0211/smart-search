import Vue from "vue";
import api from "../tools/api";

const users = {
  namespaced: true,

  state: {
    byId: {},
  },

  mutations: {
    set(state, user) {
      Vue.set(state.byId, user.id, user);
    },
  },

  actions: {
    async getUsers(context, payload) {
      const users = await api.getUsers(payload);

      users.forEach((user) => {
        context.commit("set", user);
      });

      return users;
    },
  },
};

export default users;
