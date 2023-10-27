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
import EmTableSelect from './components/EmTableSelect'
import EmSelectInput from './components/EmSelectInput'
import EmStaticForm from './components/EmStaticForm'
import EmColorGroup from './components/EmColorGroup'

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
  isValidVal,
  findPath,
  trimObj,
  imageSplicing
} from './methods'

import {exportTableToExcel, exportJsonToExcel} from "./methods/export2Excel.js"
import {exportTxtToZip} from "./methods/export2Zip.js"

import $request from "./methods/request.js"
import locale from "./locale"
import "./style/iconfont/iconfont.js"
import * as filters from './filters'
import Permission from './directive/permission'

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
  EmIconSelect,
  EmTableSelect,
  EmSelectInput,
  EmStaticForm,
  EmColorGroup
}

/*挂在Vue原型对象上的方法*/
const methodsR = {
  trimObj,
  myTypeof,
  isValidVal,
  findPath,
  imageSplicing,
  $request
}


const install = function (Vue, opts = {}) {
  if (install.installed) {
    return
  }
  $request.init({
    store: opts.store,
    router: opts.router
  })
  locale.i18n(opts.i18n)
  
  if (!Vue) {
    console.error('组件库安装失败，未获取到Vue对象')
    return
  }
  /*挂载组件*/
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  /*挂载公共方法*/
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
  /*挂载过滤器*/
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  /*挂载权限自定义指令*/
  if (Vue.directive('has') === undefined) {
    Vue.directive('has', Permission)
  }
  
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install: install, ...components
}

export {
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
  exportTableToExcel,
  exportJsonToExcel,
  exportTxtToZip,
  trimObj,
  myTypeof,
  isValidVal,
  findPath,
  imageSplicing,
  $request
}
