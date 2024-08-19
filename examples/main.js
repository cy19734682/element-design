import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //加载element-ui样式
import 'normalize.css/normalize.css' // 标准化样式（消除浏览器差异）
import './style/index.scss'

import App from './App' // 入口页面
import store from './store' //Vuex
import router from './router.js' //路由
import i18n from './lang' //国际化
import elmDesign from '../src'
import JsonView from 'vue-json-viewer'
import VueHighlightJS from 'vue-highlight.js'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import vue from 'vue-highlight.js/lib/languages/vue'
import 'highlight.js/styles/atom-one-dark.css' // 引入样式文件
import 'highlight.js/styles/default.css'
import '../src/style/index.scss'

const { mockXHR } = require('../mock')
mockXHR()

Vue.use(JsonView)
Vue.use(VueHighlightJS, {
	languages: {
		css,
		javascript,
		vue
	}
})
Vue.use(Element, {
	size: Cookies.get('size') || 'medium', // 设置element-ui默认大小
	i18n: (key, value) => i18n.t(key, value)
})
Vue.use(elmDesign, {
	router,
	store,
	i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: (h) => h(App)
})
