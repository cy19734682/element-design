# element-design
**基于[Element-ui](https://github.com/ElemeFE/element) 的Vue组件 (Vue.js 2.x)**
### 简介
基于 element-ui 2.0 的代码进行封装，将频繁使用的组件抽离，使用简单的代码完成复杂的业务场景。
### 安装
````
npm i @yuechan/element-design
````
### 使用
在mian.js中配置增加下列配置
````javascript
import ElmDesign from '@yuechan/element-design'
import '@yuechan/element-design/lib/elmDesign.min/css'

Vue.use(elmDesign,{
  router,
  store,
  i18n: (key, value) => i18n.t(key, value)
})
````
下面添加国际化相关配置，由于不同项目国际化配置位置不同，下面贴出常用配置
````javascript
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import enEmLocale from '@yuechan/element-design/lang/en'
import zhEmLocale from '@yuechan/element-design/lang/zh'

const messages = {
  en: {
    ...enLocale, ...elementEnLocale, ...enEmLocale
  },
  zh: {
    ...zhLocale, ...elementZhLocale, ...zhEmLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(), // set locale messages
  messages,
  silentTranslationWarn: true
})
````
### 组件
- [x] [EmBaiduMap](./src/components/EmBaiduMap/README.md)（百度地图）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmCascader （自定义级联）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmCascaderArea （省市区级联）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmCharts （图表）
- [x] EmEditor （富文本框）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmForm 表单
- [x] EmFormGroup （页面内表单）
- [x] EmFormModal （弹窗表单）
- [x] EmIcons （Icon）
- [x] EmIconSelect （Icon选择）
- [x] EmSearchForm （搜索表单）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmTablePage （分页表格）
- [x] EmTableSelect （表格弹窗选择）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmUpload （文件上传）<font color='#FF0000'>已集成到EmForm</font>
- [x] EmUploadExcel （Excel上传解析数据）

