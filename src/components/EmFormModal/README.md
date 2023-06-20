## EmFormModal

表单弹窗组件，相关用法见[EmForm](../EmForm/README.md)，用于弹出层表单使用。

### 基本使用

````javascript
<el-button type="primary" @click = "newData" > 新增 < /el-button>
<el-button type="warning" @click = "editData" > 编辑 < /el-button>
<em-form-modal
  ref="formModalRef"
  title="编辑数据"
  :form - data = "formData"
:
form - rules = "formRules"
btnLoading
@on
-item - change = "onItemChange"
@on
-submit = "onSubmit"
@on
-close = "onClose" / >
  
  data()
{
  return {
    formData: [
      {
        type: "input",
        key: "name",
        label: '名称'
      }, {
        type: "inputNumber",
        label: "金额",
        key: "price",
      }, {
        type: 'select',
        label: '学历',
        key: 'education',
        options: [
          {
            label: '高中',
            val: 1
          }, {
            label: '专科',
            val: 2
          }, {
            label: '本科',
            val: 3
          }, {
            label: '研究生',
            val: 4
          }, {
            label: '博士',
            val: 5,
            disabled: true
          }
        ]
      }, {
        type: "select",
        label: "借用数据",
        key: "wbId",
        borrowOption: "education",
        optionLabel: "name",
        optionVal: "id",
        collectLabel: {
          valKey: 'mimeType',
          key: 'mine2'
        }
      }
    ],
    formRules: {
      name: {
        required: true
      },
      price: {
        required: true
      },
      education: {
        required: true
      }
    }
  }
}

methods: {
  newData()
  {
    this.$refs.formModalRef.open()
  }
,
  editData()
  {
    this.$refs.formModalRef.updateDataGroup({
      name: "小王",
      price: 2690,
      education: 3,
      wbId: 2,
      devId: 81
    })
    this.$refs.formModalRef.open()
  }
,
  onItemChange(d)
  {
    console.log(d)
  }
,
  onSubmit(data)
  {
    console.log(data)
    setTimeout(() => {
      this.$refs.formModalRef.changeLoading(false)
    }, 500)
  }
,
  onClose()
  {
    setTimeout(() => {
      this.$refs.formModalRef.resetForm()
    }, 200)
  }
}
````

### 组件属性

|      参数       |        说明         |   类型    |          可选值          |  默认值   |
|:-------------:|:-----------------:|:-------:|:---------------------:|:------:|
|     title     |       弹窗标题        | String  |           —           |   标题   |
|     width     |       弹窗宽度        | String  |           —           | 750px  |
|   formData    |      表单结构数据       |  Array  |           —           |   []   |
|   formRules   |      表单结构规则       |  Array  |           —           |   []   |
|  showMessage  |     是否显示校验信息      | Boolean |           —           |  true  |
| inlineMessage |   是否以行内形式展示校验信息   | Boolean |           —           | false  |
|  labelWidth   |      表单项标签宽度      | String  |           —           | 120px  |
|    inline     |     是否行内表单模式      | Boolean |           —           | false  |
| labelPosition |     表单域标签的位置      | String  |    right/left/top     | right  |
|     size      |   用于控制该表单内组件的尺寸   | String  | medium / small / mini | medium |
|  btnLoading   |   提交按钮显示loading   | Boolean |           —           | false  |
|    okBtTxt    |     弹窗确定按钮文本      | String  |           —           |   确定   |
|  cancelBtTxt  |     弹窗取消按钮文本      | String  |           —           |   取消   |
|     trim      | 是否去除提交数据中的字符串首尾空格 | Boolean |           —           |  true  |
|   disabled    |    整表禁用，仅展示使用     | Boolean |           —           | false  |

### 组件事件

|      事件类型      |      说明       |  回调参数   |
|:--------------:|:-------------:|:-------:|
| on-item-change | 表单选项值发生变化回调函数 | 变化表单项的值 |
|    on-close    |    弹窗关闭事件     |    —    |
|   on-submit    |    表单提交函数     | 整个表单的值  |

### 组件方法

|      事件类型       |        说明         |                                            参数                                             |
|:---------------:|:-----------------:|:-----------------------------------------------------------------------------------------:|
|      open       |       打开弹窗        |                                             —                                             |
|      close      |       关闭弹窗        |                                             —                                             |
|    resetForm    |      清空表单的值       |                                             —                                             |
|  reRenderForm   |      重新渲染表单       |                                             —                                             |
| updateDataGroup |      更新表单项的值      |                          data：更新数据；notClearOthers：是否清空其他表单项，默认清空                          |
| updateFormDataT |      更新表单结构       | {index:1,key:XXX,val:XXX}<br/>或<br/>[{index:1,key:XXX,val:XXX},{index:2,key:XXX,val:XXX}] |
|  changeLoading  | 主动改变表单按钮loading状态 |                                        true/false                                         |
|  getDataGroup   | 获取表单填写的数据，不会触发校验  |                                             —                                             |
|     submit      | 表单提交触发事件，会触发表单校验  |                                             —                                             |
