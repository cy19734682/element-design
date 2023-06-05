import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //加载element-ui样式
import 'normalize.css/normalize.css' // 标准化样式（消除浏览器差异）
import '../src/style/index.scss'
import './style/index.scss'

import App from './App' // 入口页面
import router from './router.js' //路由
import i18n from './lang' //国际化
import elmDesign from '../src'

Vue.use(Element,{
  size: Cookies.get('size') || 'medium', // 设置element-ui默认大小
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(elmDesign,{
  router,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
