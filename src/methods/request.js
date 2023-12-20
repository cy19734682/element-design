import axios from 'axios'
import {MessageBox, Message, Loading} from 'element-ui'
import {t} from '../locale'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
let LoadingEl = null
let MessageEl = null
let MessageBoxEl = null
/**
 * axios接口请求设置公共参数
 */
const service = axios.create({
  baseURL: window.global && window.global.server || "",
  timeout: window.global && window.global.timeout || 5000,
  withCredentials: window.global && window.global.withCredentials || true,
})
/**
 * axios接口请求拦截，设置headers['x-oauth-token']，并增加接口请求loading效果
 */
service.interceptors.request.use(config => {
  if (service.store && service.store.getters.token) {
    config.headers['x-oauth-token'] = service.store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
/**
 * axios接口响应处理，增加未登录判断
 */
service.interceptors.response.use(({data}) => {
  LoadingEl && LoadingEl.close()
  MessageEl && MessageEl.close()
  MessageBoxEl && MessageBox.close()
  const {
    code,
    msg,
    message
  } = data
  if (code === 0) {
    return data
  }
  else if (code === -999) {
    MessageBoxEl = MessageBox.confirm(t('em.loginTips.content'), t("em.loginTips.title"), {
      confirmButtonText: t("em.loginTips.okTxt"),
      cancelButtonText: t("em.button.cancel"),
      type: 'warning'
    }).then(() => {
      logoutHandle()
    }).catch(e => {
      console.log(e)
    })
    return Promise.reject(new Error(msg || message || 'Error'))
  }
  else {
    MessageEl = Message({
      message: msg || message || t("em.sysError"),
      type: 'error'
    })
    return Promise.reject(new Error(msg || message || 'Error'))
  }
}, error => {
  LoadingEl && LoadingEl.close()
  MessageEl && MessageEl.close()
  const {msg , message} = error.response.data
  MessageEl = Message({
    message: msg || message || t("em.sysError"),
    type: 'error'
  })
  return Promise.reject(new Error(msg || message || 'Error'))
})


/**
 * 用户登出操作
 */
function logoutHandle() {
  if (service.store) {
    if (typeof service.store === "function") {
      const store = service.store()
      if (store.logout) {
        store.logout()
      }
    }
    else {
      service.store.dispatch("user/logout").then(() => {
        if (service.router) {
          service.router.push(`/login?redirect=${service.router.history.current.path}`)
        }
        else {
          console.warn('router为空，请在安装插件时传入router实例：Vue.use(elmDesign,{router:router})')
        }
      })
    }
  }
  else {
    console.warn('store为空，请在安装插件时传入store实例：Vue.use(elmDesign,{store:store})')
  }
}

/**
 * 检查入参
 * @param method
 * @param url
 * @param data
 * @param config
 */
function checkRequest(method, url, data, config) {
  return new Promise((s, j) => {
    if (url) {
      if (config["isShowLoading"]) {
        LoadingEl = Loading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.3)'
        })
      }
      let reqData = data
      if (method === 'get') {
        reqData = {params: data}
      }
      else if (method === 'delete') {
        reqData = {data: data}
      }
      service[method](url, reqData).then(r => {
        s(r)
      }).catch(e => {
        j(e)
      })
    }
    else {
      j("请求地址为空")
      console.warn("请求地址为空")
    }
  })
}

export default {
  /**
   * @description 初始化该请求插件
   * @function
   * @param {object} store 项目中vuex的store
   * @param {object} router 项目中路由管理
   */
  init({
    store,
    router
  }) {
    service.store = store
    service.router = router
  },
  /**
   * post 请求
   */
  post(url, data = {}, config = {}) {
    return new Promise((s, j) => {
      checkRequest('post', url, data, config).then(r => {
        s(r)
      }).catch(e => {
        j(e)
      })
    })
  },
  /**
   * put请求
   */
  put(url, data = {}, config = {}) {
    return new Promise((s, j) => {
      checkRequest('put', url, data, config).then(r => {
        s(r)
      }).catch(e => {
        j(e)
      })
    })
  },
  /**
   * get请求
   */
  get(url, data = {}, config = {}) {
    return new Promise((s, j) => {
      checkRequest('get', url, data, config).then(r => {
        s(r)
      }).catch(e => {
        j(e)
      })
    })
  },
  /**
   * delete 请求
   */
  delete(url, data = {}, config = {}) {
    return new Promise((s, j) => {
      checkRequest('delete', url, data, config).then(r => {
        s(r)
      }).catch(e => {
        j(e)
      })
    })
  },
  /**
   * 并发请求
   */
  all: axios.all,
  /**
   * 并发请求结果分离
   */
  spread: axios.spread,
  /**
   * 该请求插件暴露给外界的配置对象，为axios.create创建的实例对象，使用方法见axios官方网站
   */
  config: service
}

