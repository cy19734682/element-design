import EmBaiduMap from './components/EmBaiduMap'
import EmCascader from './components/EmCascader'
import EmCascaderArea from './components/EmCascaderArea'
import EmEditor from './components/EmEditor'
import EmForm from './components/EmForm'
import EmFormGroup from './components/EmFormGroup'
import EmFormModal from './components/EmFormModal'
import EmSearchForm from './components/EmSearchForm'
import EmTablePage from './components/EmTablePage'
import EmUpload from './components/EmUpload'
import EmUploadExcel from './components/EmUploadExcel'
import EmCharts from './components/EmCharts'
import EmIcons from './components/EmIcons'
import EmIconSelect from './components/EmIconSelect'

import {
  formatTime,
  byteLength,
  cleanArray,
  param2Obj,
  html2Text,
  objectMerge,
  toggleClass,
  debounce,
  deepClone,
  uniqueArr,
  myTypeof,
  isValidValue,
  findPath,
  trimObj,
  imageSplicing
} from './methods'

import $request from "./methods/request.js"
import locale from "./locale"

/*直接使用的组件（注册为全局Vue组件）*/
const components = {
  EmBaiduMap,
  EmCascader,
  EmCascaderArea,
  EmEditor,
  EmForm,
  EmFormGroup,
  EmFormModal,
  EmSearchForm,
  EmTablePage,
  EmUpload,
  EmUploadExcel,
  EmCharts,
  EmIcons,
  EmIconSelect
}

/*需要从插件中单独引入的方法（使用频率低）*/
const plugMethods = {
  formatTime,
  byteLength,
  cleanArray,
  param2Obj,
  html2Text,
  objectMerge,
  toggleClass,
  debounce,
  deepClone,
  uniqueArr,
}


/*挂在Vue原型对象上的方法*/
const methodsR = {
  trimObj,
  myTypeof,
  isValidValue,
  findPath,
  imageSplicing,
  $request
}


const install = function (Vue, opts = {}) {
  if (install.installed) {
    return
  }
  $request.init({store: opts.store, router: opts.router})
  locale.i18n(opts.i18n)
  require("./style/index.scss")
  require("./style/iconfont/iconfont.js")

  if (!Vue) {
    console.error('组件库安装失败，未获取到Vue对象')
    return
  }
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  
  Object.keys(methodsR).forEach(key => {
    if (!Vue.prototype.hasOwnProperty(key)) {
      Object.defineProperty(Vue.prototype, key, {
        get() {
          return methodsR[key]
        },
        set() {
        }
      })
    }
  })
  
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install: install, ...components, ...methodsR, ...plugMethods
}
