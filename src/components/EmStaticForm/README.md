## EmForm

表单聚合组件，融合了表单常用的功能组件

### 组件属性

|       参数        |                说明                |  类型   |       可选值        | 默认值  |
| :---------------: | :--------------------------------: | :-----: | :-----------------: | :-----: |
|     formData      |            表单结构数据            |  Array  |          —          |   []    |
|     formRules     |            表单结构规则            |  Array  |          —          |   []    |
|    showMessage    |          是否显示校验信息          | Boolean |          —          |  true   |
|   inlineMessage   |     是否以行内形式展示校验信息     | Boolean |          —          |  false  |
|    labelWidth     |           表单项标签宽度           | String  |          —          |  120px  |
|      inline       |          是否行内表单模式          | Boolean |          —          |  false  |
|   labelPosition   |          表单域标签的位置          | String  |   right/left/top    |  right  |
|       size        |     用于控制该表单内组件的尺寸     | String  | default/small/large | default |
|   showLongOkBt    |         是否展示长确定按钮         | Boolean |          —          |  false  |
|  showInlineOkBt   |       是否展示行内短确定按钮       | Boolean |          —          |  false  |
| showInlineClearBt |       是否展示行内短清空按钮       | Boolean |          —          |  false  |
|    longOkBtTxt    |           长确定按钮内容           | String  |          —          |  确认   |
|   inlineOkBtTxt   |           短确定按钮内容           | String  |          —          |  确认   |
| inlineClearBtTxt  |           短清空按钮内容           | String  |          —          |  清空   |
|  inlineOkBtIcon   |           短确定按钮Icon           | String  |          —          |    —    |
| inlineClearBtIcon |           短清空按钮Icon           | String  |          —          |    —    |
|    btnLoading     |        提交按钮显示loading         | Boolean |          —          |  false  |
|       trim        | 是否去除提交数据中的字符串首尾空格 | Boolean |          —          |  true   |
|     disabled      |        整表禁用，仅展示使用        | Boolean |          —          |  false  |

### 组件事件

|    事件类型    |            说明            |    回调参数    |
| :------------: | :------------------------: | :------------: |
| on-item-change | 表单选项值发生变化回调函数 | 变化表单项的值 |
|   on-submit    |        表单提交函数        |  整个表单的值  |

### 组件方法

| 事件类型 | 说明 | 参数 |
| :-: | :-: | :-: |
| resetForm | 清空表单的值 | — |
| reRenderForm | 重新渲染表单 | — |
| updateDataGroup | 更新表单项的值 | data：更新数据；notClearOthers：是否清空其他表单项，默认清空 |
| updateFormDataT | 更新表单结构 | {index:1,key:XXX,val:XXX}<br/>或<br/>[{index:1,key:XXX,val:XXX},{index:2,key:XXX,val:XXX}] |
| changeLoading | 主动改变表单按钮loading状态 | true/false |
| getDataGroup | 获取表单填写的数据，不会触发校验 | — |
| submit | 表单提交触发事件，会触发表单校验 | — |

### 表单子选项属性

#### form-item 表单项公共属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-: | :-: | :-: | :-: | :-: |
| type | 表单项类型 | String | txt，input，inputNumber，select，radio，checkbox，textarea，date，time，upload，area，cascader，bdMap，editor，selectIcon，tableSelect，custom | — |
| key | 表单收集的字段 | String | — | — |
| label | 表单标签文本 | String | — | — |
| show | 是否显示该选项，若为false，不收集该字段的值；<br/>基本格式：{key:'test',val:['zh','li']}，表示只有当test是zh或li时才展示；<br/>也可以设置多个字段，并用数组包装，所有条件满足才展示；<br/>也可以传一个回调函数，回调参数是表单所有选项的值，需要返回一个布尔值来确定是否展示； | Object/Array/Function | — | — |
| showOr | 当show为数组时，showOr设置为true表示只要满足数组中的任意一个条件即可展示 | Boolean | — | false |
| labelWidth | 标签宽度，默认使用form组件的labelWidth属性 | String | — | — |
| disabled | 是否禁用该选项 | Boolean | — | false |
| showMessage | 是否显示校验错误信息 | Boolean | — | true |

#### txt 文本

| 参数 |   说明   |  类型  | 可选值 | 默认值 |
| :--: | :------: | :----: | :----: | :----: |
| val  | 文本内容 | String |   —    |   —    |

#### input 输入框

|     参数     |         说明         |  类型   | 可选值 | 默认值 |
| :----------: | :------------------: | :-----: | :----: | :----: |
|  maxLength   |     最大输入长度     | Number  |   —    |   —    |
|  minLength   |     最小输入长度     | Number  |   —    |   —    |
| placeholder  |        占位符        | String  |   —    | 请输入 |
| showPassword | 是否展示切换密码图标 | Boolean |   —    | false  |
|   prepend    |    输入框前置内容    |  Slots  |   —    |   —    |
|    append    |    输入框后置内容    |  Slots  |   —    |   —    |

#### InputNumber 数字输入框

|       参数       |       说明       |  类型   | 可选值 | 默认值 |
| :--------------: | :--------------: | :-----: | :----: | :----: |
|       min        |      最小值      | Number  |   —    |   —    |
|       max        |      最大值      | Number  |   —    |   —    |
|       step       |    计数器步长    | Number  |   —    |   1    |
|    precision     |     数值精度     | Number  |   —    |   1    |
|   placeholder    |      占位符      | String  |   —    | 请输入 |
|     controls     | 是否使用控制按钮 | Boolean |   —    |  true  |
| controlsPosition |   控制按钮位置   | String  | right  |   —    |

#### Switch 开关

|     参数      |          说明           |           类型            | 可选值 | 默认值  |
| :-----------: | :---------------------: | :-----------------------: | :----: | :-----: |
|     width     |  switch 的宽度（像素）  |          Number           |   —    |   40    |
|  activeText   | switch 打开时的文字描述 |          String           |   —    |    —    |
| inactiveText  | switch 关闭时的文字描述 |          String           |   —    |    —    |
|  activeValue  |    switch 打开时的值    | boolean / string / number |   —    |  true   |
| inactiveValue |    switch 关闭时的值    | boolean / string / number |   —    |  false  |
|  activeColor  |  switch 打开时的背景色  |          string           |   —    | #409EFF |
| inactiveColor |  switch 关闭时的背景色  |          string           |   —    | #C0CCDA |
|   disabled    |        是否禁用         |          Boolean          |   —    |  false  |

#### Slider 滑块

|     参数      |                     说明                      |      类型       | 可选值 | 默认值 |
| :-----------: | :-------------------------------------------: | :-------------: | :----: | :----: |
|      min      |                    最小值                     |     Number      |   —    |   0    |
|      max      |                    最大值                     |     Number      |   —    |  100   |
|     step      |                     步长                      |     Number      |   —    |   1    |
|   showStops   |                是否显示间断点                 |     Boolean     |   —    | false  |
|  showTooltip  |               是否显示 tooltip                |     Boolean     |   —    |  true  |
| formatTooltip |            格式化 tooltip message             | function(value) |   —    |   —    |
|     range     |                是否为范围选择                 |                 |   —    | false  |
|   vertical    |                 是否竖向模式                  |     Boolean     |   —    | false  |
|    height     |          Slider 高度，竖向模式时必填          |     string      |   —    |   —    |
|     marks     | 标记， key 的类型必须为 number 且取值在闭区间 |     object      |   —    |   —    |
|   disabled    |                   是否禁用                    |     Boolean     |   —    | false  |

#### Rate 评分

|       参数        |           说明           |     类型     | 可选值  |                  默认值                  |
| :---------------: | :----------------------: | :----------: | :-----: | :--------------------------------------: |
|        max        |         最大分值         |    Number    |    —    |                    5                     |
|     allowHalf     |       是否允许半选       |   Boolean    |    —    |                  false                   |
|      colors       |         颜色分段         | array/object |    —    |    ['#F7BA2A', '#F7BA2A', '#F7BA2A']     |
|     voidColor     |    未选中 icon 的颜色    |    string    |    —    |                 #C6D1DE                  |
| disabledVoidColor | 只读时未选中 icon 的颜色 |    string    |    —    |                 #EFF2F7                  |
|     showText      |     是否显示辅助文字     |   Boolean    |    —    |                  false                   |
|     showScore     |     是否显示当前分数     |   Boolean    |    —    |                  false                   |
|     textColor     |      辅助文字的颜色      |    string    |    —    |                 #1F2D3D                  |
|       texts       |       辅助文字数组       |    array     |    —    | ['极差', '失望', '一般', '满意', '惊喜'] |
|   scoreTemplate   |       分数显示模板       |    string    | {value} |                    —                     |
|     disabled      |         是否禁用         |   Boolean    |    —    |                  false                   |

#### select 下拉选择器

| 参数        | 说明             | 类型           | 可选值 | 默认值 |
| ----------- | ---------------- | -------------- | ------ | ------ |
| filterable  | 是否可搜索       | Boolean        | —      | true   |
| multiple    | 是否多选         | Boolean        | —      | false  |
| placeholder | 占位符           | String         | —      | 请选择 |
| options     | label            | 子选项标签名称 | —      | —      |
| val         | 子选项值         | —              | —      |
| disabled    | 是否禁用该子选项 | Boolean        | false  |

#### radio 单选组

| 参数       | 说明                                    | 类型          | 可选值              | 默认值  |
| ---------- | --------------------------------------- | ------------- | ------------------- | ------- |
| size       | 单选框组尺寸                            | String        | default/small/large | default |
| textColor  | 按钮形式的 Radio 激活时的文本颜色       | string        | —                   | #ffffff |
| fill       | 按钮形式的 Radio 激活时的填充色和边框色 | String        | —                   | #409EFF |
| radioType  | radio展示类型                           | String        | button/radio        | radio   |
| options    | label                                   | radio标签名称 | —                   | —       |
| val        | radio的值                               | —             | —                   |
| itemBorder | Radio是否展示边框                       | Boolean       | false               |
| disabled   | 是否禁用该子选项                        | Boolean       | false               |

#### checkbox 多选组

| 参数         | 说明                                       | 类型             | 可选值              | 默认值   |
| ------------ | ------------------------------------------ | ---------------- | ------------------- | -------- |
| size         | 多选框组尺寸                               | String           | default/small/large | default  |
| textColor    | 按钮形式的 Checkbox 激活时的文本颜色       | string           | —                   | #ffffff  |
| fill         | 按钮形式的 Checkbox 激活时的填充色和边框色 | String           | —                   | #409EFF  |
| checkboxType | Checkbox展示类型                           | String           | button/checkbox     | checkbox |
| options      | label                                      | checkbox标签名称 | —                   | —        |
| val          | checkbox的值                               | —                | —                   |
| itemBorder   | Checkbox是否展示边框                       | Boolean          | false               |
| disabled     | 是否禁用该子选项                           | Boolean          | false               |

#### date 日期组件

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-: | :-: | :-: | :-: | :-: |
| key2 | 当使用了范围选择时结束时间的key值 | String | — | — |
| dateType | 显示类型 | String | year/month/date/dates/months/years week/datetime/datetimerange/ daterange/monthrange | — |
| align | 对齐方式 | String | left, center, right | left |
| rangeSeparator | 选择范围时的分隔符 | String | — | - |
| placeholder | 非范围选择时占位符 | String | — | 选择日期 |
| startPlaceholder | 范围选择时开始日期的占位符 | String | — | 开始日期 |
| endPlaceholder | 范围选择时结束日期的占位符 | String | — | 结束日期 |
| pickerOptions | 当前时间日期选择器特有的选项(参考el-date组件) | Object | — | {} |

#### time 时间组件

|       参数       |                     说明                      |  类型   |       可选值        |  默认值  |
| :--------------: | :-------------------------------------------: | :-----: | :-----------------: | :------: |
|       key2       |       当使用了范围选择时结束时间的key值       | String  |          —          |    —     |
|     isRange      |              是否为时间范围选择               | Boolean |          —          |  false   |
|      align       |                   对齐方式                    | String  | left, center, right |   left   |
|  rangeSeparator  |              选择范围时的分隔符               | String  |          —          |    -     |
|   placeholder    |              非范围选择时占位符               | String  |          —          | 选择时间 |
| startPlaceholder |          范围选择时开始时间的占位符           | String  |          —          | 开始时间 |
|  endPlaceholder  |          范围选择时结束时间的占位符           | String  |          —          | 结束时间 |
|  pickerOptions   | 当前时间日期选择器特有的选项(参考el-time组件) | Object  |          —          |    {}    |

#### upload 上传组件

详情见[EmUpload](../EmUpload/README.md)

|      参数       |         说明         |  类型   |           可选值            | 默认值  |
| :-------------: | :------------------: | :-----: | :-------------------------: | :-----: |
|   autoUpload    |     是否自动上传     | Boolean |              —              |  true   |
|       url       |    自动上传的url     | String  |              —              | /upload |
|    paramData    | 文件上传接口其他参数 | Object  |              —              |   {}    |
|     headers     |    请求头额外参数    | Object  |              —              |   {}    |
|    fileName     |   上传文件的字段名   | String  |              —              |  file   |
|    multiple     |     是否支持多选     | Boolean |              —              |  true   |
|     format      |   限制文件上传类型   |  Array  |              —              |   []    |
|     maxSize     |   单个文件大小限制   | Number  |              —              |    0    |
|     length      |   文件上传数量限制   | Number  |              —              |    1    |
|    listType     |    文件列表的类型    | String  | text，picture，picture-card |  text   |
| withCredentials |     是否支持跨域     | Boolean |              —              |  true   |
|    disabled     |       是否禁用       | Boolean |              —              |  false  |

#### area 行政区域级联

详情见[EmCascaderArea](../EmCascaderArea/README.md)

|     参数      |        说明        |      类型      |       可选值        | 默认值  |
| :-----------: | :----------------: | :------------: | :-----------------: | :-----: |
|     level     | 精确至几级行政区域 | Number, String | 1：省市，2：省市区  |    2    |
| showAllLevels |  是否显示完整路径  |    Boolean     |          —          |  true   |
|   separator   |   地址名称分隔符   |     string     |          —          |    /    |
|     size      |      组件大小      |     string     | default/small/large | default |
|  filterable   |     是否可搜索     |    Boolean     |          —          |  true   |
|   disabled    |      是否禁用      |    Boolean     |          —          |  false  |
|  placeholder  |       占位符       |     string     |          —          | 请输入  |

#### cascader 自定义级联

详情见[EmCascader](../EmCascader/README.md)

|     参数      |          说明          |   类型   |       可选值        | 默认值  |
| :-----------: | :--------------------: | :------: | :-----------------: | :-----: |
|      url      |   远程拉取数据的地址   |  string  |          —          |    —    |
|     data      |        静态数据        |  Array   |          —          |   []    |
|   optionVal   | v-model收集节点的字段  |  string  |          —          |   id    |
|  optionLabel  | 选项的标签对应接口字段 |  string  |          —          |  name   |
| optionFilter  |    筛选待选项的方法    | Function |          —          |    —    |
| showAllLevels |    是否显示完整路径    | Boolean  |          —          |  true   |
|   separator   |     地址名称分隔符     |  string  |          —          |    /    |
|     size      |        组件大小        |  string  | default/small/large | default |
|  filterable   |       是否可搜索       | Boolean  |          —          |  true   |
| checkStrictly |   是否可以选任意一级   | Boolean  |          —          |  false  |
|   multiple    |        是否多选        | Boolean  |          —          |  false  |
|   disabled    |        是否禁用        | Boolean  |          —          |  false  |
|  placeholder  |         占位符         |  string  |          —          | 请输入  |

#### bdMap 百度地图

详情见[EmBaiduMap](../EmBaiduMap/README.md)

|    参数     |     说明     |  类型   | 可选值 |                   默认值                   |
| :---------: | :----------: | :-----: | :----: | :----------------------------------------: |
|    width    |   地图宽度   | string  |   —    |                    100%                    |
|   height    |   地图高度   | string  |   —    |                   300px                    |
| placeholder | 搜索栏占位符 | string  |   —    |                    搜索                    |
|  disabled   |   是否禁用   | boolean |   -    |                   false                    |
|     ak      | 百度地图ak码 | string  |   —    | ak+Math.floor(Math.random() \* 1000000000) |

#### editor 富文本框

详情见[EmEditor](../EmEditor/README.md)

|     参数      |    说明     |  类型   |     可选值     | 默认值  |
| :-----------: | :---------: | :-----: | :------------: | :-----: |
| toolbarConfig | toolbar配置 | Object  |       —        |    —    |
| editorConfig  | 编辑框配置  | Object  |       —        |    -    |
|     mode      |    模式     | string  | default/simple | default |
|    height     | 编辑框高度  | string  |       —        |  300px  |
|   disabled    |  是否禁用   | Boolean |       —        |  false  |
|  placeholder  |   占位符    | string  |       —        |    —    |

#### selectIcon 图标选择

详情见[EmIconSelect](../EmIconSelect/README.md)

|    参数     |      说明      |      类型      |          可选值          | 默认值 |
| :---------: | :------------: | :------------: | :----------------------: | :----: |
|    width    |   弹出层宽度   | String, Number |            —             |  450   |
|   trigger   | 弹出层触发方式 |     string     | click/focus/hover/manual | click  |
| placeholder |  输入框占位符  |     string     |            —             | 请选择 |
|  disabled   |    是否禁用    |    boolean     |            -             | false  |

#### tableSelect 表格选择

详情见[EmTableSelect](../EmTableSelect/README.md)

|    参数     |              说明              |  类型   |             可选值              | 默认值 |
| :---------: | :----------------------------: | :-----: | :-----------------------------: | :----: |
|     url     |     表格拉取数据的接口地址     | String  |                —                |   —    |
| searchForm  |          表格搜索条件          |  Array  |                —                |   []   |
|   columns   | 表格表头结构数据，同Element-ui |  Array  |                —                |   []   |
|  pageSize   |          表格查询数量          | Number  |                —                |   -1   |
|    width    |           弹出窗宽度           | Number  |                —                |  500   |
|  multiple   |            是否多选            | Boolean |                —                | false  |
|   valKey    |          绑定值的key           | String  |                —                |   id   |
|  labelKey   |          展示值的key           | String  |                —                |  name  |
| placeholder |          输入框占位符          | String  |                —                | 请选择 |
|  placement  |         弹窗从哪里弹出         | String  | [同el-popover中的placement属性] | bottom |
|  disabled   |            是否禁用            | Boolean |                —                | false  |

#### custom 自定义选项

|   参数   |                 说明                 |  类型  | 可选值 | 默认值 |
| :------: | :----------------------------------: | :----: | :----: | :----: |
| slotName | 插槽名字，自定义选项通过插槽接入表单 | String |   —    |   —    |
