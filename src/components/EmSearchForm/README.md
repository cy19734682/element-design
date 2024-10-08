## EmSearchForm

搜索表单组件，相关用法见[EmForm](../EmForm/README.md)，一般配合EmTablePage组件使用。

### 组件属性

|       参数        |                说明                |  类型   |       可选值        |     默认值      |
| :---------------: | :--------------------------------: | :-----: | :-----------------: | :-------------: |
|     formData      |            表单结构数据            |  Array  |          —          |       []        |
|     formRules     |            表单结构规则            |  Array  |          —          |       []        |
|    showMessage    |          是否显示校验信息          | Boolean |          —          |      true       |
|   inlineMessage   |     是否以行内形式展示校验信息     | Boolean |          —          |      false      |
|    labelWidth     |           表单项标签宽度           | String  |          —          |      120px      |
|      inline       |          是否行内表单模式          | Boolean |          —          |      false      |
|   labelPosition   |          表单域标签的位置          | String  |   right/left/top    |      right      |
|       size        |     用于控制该表单内组件的尺寸     | String  | large/default/small |     default     |
|   inlineOkBtTxt   |           短确定按钮内容           | String  |          —          |      搜索       |
| inlineClearBtTxt  |           短清空按钮内容           | String  |          —          |      重置       |
|  inlineOkBtIcon   |           短确定按钮Icon           | String  |          —          | el-icon-search  |
| inlineClearBtIcon |           短清空按钮Icon           | String  |          —          | el-icon-refresh |
|   showBeginBtn    |          是否展示开头标签          | Boolean |          —          |      true       |
|    btnLoading     |        提交按钮显示loading         | Boolean |          —          |      false      |
|       trim        | 是否去除提交数据中的字符串首尾空格 | Boolean |          —          |      true       |
|     disabled      |        整表禁用，仅展示使用        | Boolean |          —          |      false      |

### 组件事件

| 事件类型  |     说明     | 回调参数 |
| :-------: | :----------: | :------: |
| on-search | 执行搜索事件 | 表单数据 |

### 组件方法

| 事件类型 | 说明 | 参数 |
| :-: | :-: | :-: |
| resetForm | 清空表单的值 | — |
| reRenderForm | 重新渲染表单 | — |
| updateDataGroup | 更新表单项的值 | data：更新数据；notClearOthers：是否清空其他表单项，默认清空 |
| updateFormDataT | 更新表单结构 | {index:1,key:XXX,val:XXX}<br/>或<br/>[{index:1,key:XXX,val:XXX},{index:2,key:XXX,val:XXX}] |
| changeLoading | 主动改变表单按钮loading状态 | true/false |
