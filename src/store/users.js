import Vue from "vue";
import faker from "faker";

const generateFakeUser = () => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    avatar: faker.internet.avatar(),
    nickname: faker.internet.userName(),
    fullName: `${faker.name.findName()} ${faker.name.lastName()}`,
    ip: faker.internet.ip(),
  };
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    async getById(context, userId) {
      // Fake API request
      await sleep(1500);

      const user = generateFakeUser();

      user.id = userId;

      context.commit("set", user);

      return user;
    },
    async getBySearchString(context, data) {
      // Fake API request
      await sleep(1500);

      const { type, searchString } = data;

      const user = generateFakeUser();
      user[type] = searchString;

      context.commit("set", user);

      return user;
    },
  },
};

export default users;
