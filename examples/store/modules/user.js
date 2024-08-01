import { getToken, setToken, removeToken } from "../../utils/auth";
import { $request } from "../../../src";
import app from "./app";

const state = {
  token: getToken(),
  nickname: localStorage.getItem("NICKNAME"),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      const loginData = {
        username: username,
        password: password,
      };
      $request
        .post(app.state.serverUrl + "/login", loginData)
        .then((response) => {
          const { token, userInfo } = response;
          commit("SET_TOKEN", token);
          commit("SET_NICKNAME", userInfo.username);
          setToken(token);
          localStorage.setItem("NICKNAME", userInfo.username);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      $request
        .get(app.state.serverUrl + "/logout")
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          localStorage.removeItem("NICKNAME");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
