## EmSearchForm

搜索表单组件，相关用法见[EmForm](../EmForm/README.md)，一般配合EmTablePage组件使用。

### 基本使用

````javascript
<em-search-form 
  ref="searchFormRef" 
  :form-data="formData" 
  btnLoading
  @on-search="search"
  >
  <template slot="beginBtnGroup">
    <el-button type="primary">添加</el-button>
    <el-button type="danger">删除</el-button>
  </template>
</em-search-form>

  data() {
    return {
      formData: [
        {
          type: "input",
          key: "name",
          placeholder: '名称'
        }, {
          type: "inputNumber",
          placeholder: "金额",
          key: "price",
        }, {
          type: 'select',
          placeholder: '学历',
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
          type: "date",
          placeholder: "日期",
          key: "date",
        },{
          type: "date",
          dateType: "datetime",
          placeholder: "日期时间",
          key: "datetime",
        }
      ]
    }
  }

  methods: {
    search(data) {
      console.log(data)
      setTimeout(()=>{
        this.$refs.searchFormRef.changeLoading(false)
      },500)
    }
  }
````

### 组件属性

|        参数         |        说明         |   类型    |          可选值          |       默认值       |
|:-----------------:|:-----------------:|:-------:|:---------------------:|:---------------:|
|     formData      |      表单结构数据       |  Array  |           —           |       []        |
|     formRules     |      表单结构规则       |  Array  |           —           |       []        |
|    showMessage    |     是否显示校验信息      | Boolean |           —           |      true       |
|   inlineMessage   |   是否以行内形式展示校验信息   | Boolean |           —           |      false      |
|    labelWidth     |      表单项标签宽度      | String  |           —           |      120px      |
|      inline       |     是否行内表单模式      | Boolean |           —           |      false      |
|   labelPosition   |     表单域标签的位置      | String  |    right/left/top     |      right      |
|       size        |   用于控制该表单内组件的尺寸   | String  | medium / small / mini |     medium      |
|   inlineOkBtTxt   |      短确定按钮内容      | String  |           —           |       搜索        |
| inlineClearBtTxt  |      短清空按钮内容      | String  |           —           |       重置        |
|  inlineOkBtIcon   |     短确定按钮Icon     | String  |           —           | el-icon-search  |
| inlineClearBtIcon |     短清空按钮Icon     | String  |           —           | el-icon-refresh |
|   showBeginBtn    |     是否展示开头标签      | Boolean |          —          |      true       |
|    btnLoading     |   提交按钮显示loading   | Boolean |           —           |      false      |
|       trim        | 是否去除提交数据中的字符串首尾空格 | Boolean |           —           |      true       |
|     disabled      |    整表禁用，仅展示使用     | Boolean |           —           |      false      |

### 组件事件

|   事件类型    |   说明   | 回调参数 |
|:---------:|:------:|:----:|
| on-search | 执行搜索事件 | 表单数据 |

### 组件方法

|      事件类型       |        说明         |                                            参数                                             |
|:---------------:|:-----------------:|:-----------------------------------------------------------------------------------------:|
|    resetForm    |      清空表单的值       |                                             —                                             |
|  reRenderForm   |      重新渲染表单       |                                             —                                             |
| updateDataGroup |      更新表单项的值      |                          data：更新数据；notClearOthers：是否清空其他表单项，默认清空                          |
| updateFormDataT |      更新表单结构       | {index:1,key:XXX,val:XXX}<br/>或<br/>[{index:1,key:XXX,val:XXX},{index:2,key:XXX,val:XXX}] |
|  changeLoading  | 主动改变表单按钮loading状态 |                                        true/false                                         |
