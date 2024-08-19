## EmFormModal

表单弹窗组件，相关用法见[EmForm](../EmForm/README.md)，用于弹出层表单使用。

### 组件属性

|     参数      |                说明                |  类型   |       可选值        | 默认值  |
| :-----------: | :--------------------------------: | :-----: | :-----------------: | :-----: |
|     title     |              弹窗标题              | String  |          —          |  标题   |
|     width     |              弹窗宽度              | String  |          —          |  750px  |
|   formData    |            表单结构数据            |  Array  |          —          |   []    |
|   formRules   |            表单结构规则            |  Array  |          —          |   []    |
|  showMessage  |          是否显示校验信息          | Boolean |          —          |  true   |
| inlineMessage |     是否以行内形式展示校验信息     | Boolean |          —          |  false  |
|  labelWidth   |           表单项标签宽度           | String  |          —          |  120px  |
|    inline     |          是否行内表单模式          | Boolean |          —          |  false  |
| labelPosition |          表单域标签的位置          | String  |   right/left/top    |  right  |
|     size      |     用于控制该表单内组件的尺寸     | String  | default/small/large | default |
|  btnLoading   |        提交按钮显示loading         | Boolean |          —          |  false  |
|    okBtTxt    |          弹窗确定按钮文本          | String  |          —          |  确定   |
|  cancelBtTxt  |          弹窗取消按钮文本          | String  |          —          |  取消   |
|     trim      | 是否去除提交数据中的字符串首尾空格 | Boolean |          —          |  true   |
|   disabled    |        整表禁用，仅展示使用        | Boolean |          —          |  false  |

### 组件事件

|    事件类型    |            说明            |    回调参数    |
| :------------: | :------------------------: | :------------: |
| on-item-change | 表单选项值发生变化回调函数 | 变化表单项的值 |
|    on-close    |        弹窗关闭事件        |       —        |
|   on-submit    |        表单提交函数        |  整个表单的值  |

### 组件方法

| 事件类型 | 说明 | 参数 |
| :-: | :-: | :-: |
| open | 打开弹窗 | — |
| close | 关闭弹窗 | — |
| resetForm | 清空表单的值 | — |
| reRenderForm | 重新渲染表单 | — |
| updateDataGroup | 更新表单项的值 | data：更新数据；notClearOthers：是否清空其他表单项，默认清空 |
| updateFormDataT | 更新表单结构 | {index:1,key:XXX,val:XXX}<br/>或<br/>[{index:1,key:XXX,val:XXX},{index:2,key:XXX,val:XXX}] |
| changeLoading | 主动改变表单按钮loading状态 | true/false |
| getDataGroup | 获取表单填写的数据，不会触发校验 | — |
| submit | 表单提交触发事件，会触发表单校验 | — |
