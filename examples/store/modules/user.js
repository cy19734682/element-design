import {getToken, setToken, removeToken} from '../../utils/auth'
import {$request} from '../../../src'

const state = {
  token: getToken(),
  nickname: localStorage.getItem('NICKNAME'),
  avatar: '',
  introduction: '',
  roles: [],
  perms: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMS: (state, perms) => {
    state.perms = perms
  }
}

const actions = {
  login({commit}, userInfo) {
    const {username, password, validateCode, uuid} = userInfo
    return new Promise((resolve, reject) => {
      const loginData = {
        username: username,
        password: password,
        uuid: uuid,
        validateCode: validateCode
      }
      $request.post('/login',loginData).then(response => {
        const {token,userInfo} = response
        commit('SET_TOKEN', token)
        commit('SET_NICKNAME', userInfo.username)
        setToken(token)
        localStorage.setItem('NICKNAME', userInfo.username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },// get user info
  getUserInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      $request.get('/index').then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }else {
          const {roles, nickname, avatar, perms} = response
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getUserInfo: roles must be a non-null array!')
          }
          commit('SET_NICKNAME', nickname)
          commit('SET_AVATAR', avatar)
          commit('SET_ROLES', roles)
          commit('SET_PERMS', perms)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
  
      $request.get('/logout').then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        localStorage.removeItem('NICKNAME')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
