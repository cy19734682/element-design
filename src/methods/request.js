import axios from 'axios'
import {MessageBox, Message, Loading} from 'element-ui'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
let loading = null
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
  if (config["isShowLoading"]) {
    loading = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.3)'
    });
  }
  return config
}, error => {
  return Promise.reject(error)
})
/**
 * axios接口响应处理，增加未登录判断
 */
service.interceptors.response.use(({data}) => {
  loading && loading.close();
  const {code, msg} = data
  if (code === 0) {
    return data
  }else if (code === -999) {
    MessageBox.confirm('当前页面已失效，请重新登录', '确认退出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      logoutHandle()
    }).catch(e=>{
      console.log(e)
    })
    return Promise.reject(new Error(msg || 'Error'))
  }
  else {
    Message({
      message: msg || '系统出错',
      type: 'error'
    })
    return Promise.reject(new Error(msg || 'Error'))
  }
}, error => {
  loading && loading.close();
  const {msg} = error.response.data
  Message({
    message: msg || '系统出错',
    type: 'error'
  })
  return Promise.reject(new Error(msg || 'Error'))
})


/**
 * 用户登出操作
 */
function logoutHandle() {
  if (service.store) {
    if(typeof service.store === "function"){
      const store = service.store()
      if(store.logout){
        store.logout()
      }
    }else {
      service.store.dispatch("logout")
    }
  }
  else {
    console.warn('store为空，请在安装插件时传入store实例：Vue.use(elmDesign,{store:store})')
  }
}


export default {
  /**
   * @description 初始化该请求插件
   * @function
   * @param {object} store 项目中vuex的store
   */
  init(store) {
    service.store = store
  },
  /**
   * post 请求
   */
  post(url, data = {}, config = {}) {
    return new Promise((s, j) => {
      service.post(url, {data: data, ...config}).then(r => {
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
      service.put(url, {data: data, ...config}).then(r => {
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
      service.get(url, {params: data, ...config}).then(r => {
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
      service.post(url, {data: data, ...config}).then(r => {
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

