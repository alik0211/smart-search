import faker from "faker";
import sleep from "./sleep";

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

class API {
  async getUsers(payload) {
    const { type, text } = payload;

    await sleep(1500);

    const users = Array.from({ length: 6 }, () => {
      return {
        ...generateFakeUser(),
        [type]: text,
      };
    });

    return users;
  }
}

const api = new API();

export default api;
