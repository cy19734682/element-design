import Cookies from 'js-cookie'
import {getLanguage} from '../../lang/index'

const state = {
  language: getLanguage(),
  serverUrl: localStorage.getItem('serverUrl') || '',
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SERVER_URL: (state, url) => {
    state.serverUrl = url
    localStorage.setItem('serverUrl', url)
  }
}

const actions = {
  setLanguage({commit}, language) {
    commit('SET_LANGUAGE', language)
  },
  setServerUrl({commit}, url) {
    commit('SET_SERVER_URL', url)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
