import { getStore, setStore } from '../../utils/auth'
import { getLanguage } from '../../lang/index'

const state = {
	language: getLanguage(),
	serverUrl: getStore('serverUrl') || '',
  isDark: getStore('isDark') || false,
  theme: getStore('theme')
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      setStore(key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
