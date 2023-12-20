# element-design
## 简介
基于 vue2 + element-ui 2.0 的代码进行封装，将频繁使用的组件抽离，使用简单的代码完成复杂的业务场景。

## vue3: [@yuechan/element-design@2.x.x](https://github.com/cy19734682/element-design-plus.git)
## vue2: [@yuechan/element-design@1.x.x](https://github.com/cy19734682/element-design.git)

### 安装
````
npm i @yuechan/element-design@vue2
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
- [x] [EmCascader](./src/components/EmCascader/README.md) （自定义级联）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmCascaderArea](./src/components/EmCascaderArea/README.md) （省市区级联）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmCharts](./src/components/EmCharts/README.md) （图表）
- [x] [EmColorGroup](./src/components/EmColorGroup/README.md) （颜色组选择器组件）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmEditor](./src/components/EmEditor/README.md) （富文本框）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmForm](./src/components/EmForm/README.md) 表单
- [x] [EmFormGroup](./src/components/EmFormGroup/README.md) （表单组）
- [x] [EmFormModal](./src/components/EmFormModal/README.md) （弹窗表单）
- [x] [EmSearchForm](./src/components/EmSearchForm/README.md) （搜索表单）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmSelectInput](./src/components/EmSelectInput/README.md) （下拉选择输入框组件）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmStaticForm](./src/components/EmStaticForm/README.md) （静态响应式表单）
- [x] [EmIcons](./src/components/EmIcons/README.md) （Icon）
- [x] [EmIconSelect](./src/components/EmIconSelect/README.md) （Icon选择）
- [x] [EmTablePage](./src/components/EmTablePage/README.md)（分页表格）
- [x] [EmTableSelect](./src/components/EmTableSelect/README.md) （表格弹窗选择）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmUpload](./src/components/EmUpload/README.md) （文件上传）<font color='#FF0000'>已集成到EmForm</font>
- [x] [EmUploadExcel](./src/components/EmUploadExcel/README.md) （Excel上传解析数据）

