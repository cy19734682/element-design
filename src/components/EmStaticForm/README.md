## EmStaticForm

静态响应式表单，只负责响应式展示表单数据

### 基本使用

````javascript
<em-form 
 :form - data = "formData"
:
formRules = "formRules"
show - inline - ok - bt
show - inline - clear - bt
@on
-submit = "onSubmit"
@on
-item - change = "onItemChange" > < template
#sgInput = "{dataGroup}" > < el - input
v - model = "dataGroup.sgInput" / > < /template>
</em-form>

data()
{
  return {
    formData: [
      {
        type: "txt",
        label: "信息",
        val: "这是一条占位信息",
      }, {
        type: "input",
        label: "名称",
        key: "name",
        defaultVal: "121"
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
        type: 'radio',
        key: 'sex',
        label: '性别',
        options: [
          {
            label: '男',
            val: 1
          }, {
            label: '女',
            val: 0
          }
        ]
      }, {
        type: 'checkbox',
        label: '证书',
        key: 'credential',
        checkboxType: "button",
        options: [
          {
            label: '英语四级',
            val: 'CET4',
          }, {
            label: '英语六级',
            val: 'CET6',
            disabled: true
          },
        ]
      }, {
        type: "upload",
        label: "文件上传",
        key: "imgUrl",
        autoUpload: false
      }, {
        type: "selectIcon",
        label: "图标",
        key: "icon",
        defaultVal: 'lock'
      }, {
        type: "area",
        label: "行政区域",
        key: "areaCode",
        key2: "areaName",
      }, {
        type: "cascader",
        label: "部门",
        url: '/dept',
        key: "deptId",
        key2: "deptName"
      }, {
        type: "select",
        label: "品牌",
        key: "brandId",
        asyncOption: true,
        optionUrl: "/brand",
        optionLabel: "name",
        optionVal: "id",
      }, {
        type: "tableSelect",
        label: "文档类型",
        key: "mimeType",
        multiple: true,
        url: "/bt-table-page",
        searchForm: [
          {
            type: 'input',
            key: 'name',
            label: '商品名称',
          }
        ],
        columns: [
          {
            key: "id",
            label: "ID"
          }, {
            key: "name",
            label: "名称"
          }
        ],
      }, {
        type: "bdMap",
        label: "位置",
        key: "lng",
        key2: "lat",
        key3: "address"
      }, {
        type: "editor",
        label: "内容",
        key: "content",
      }, {
        type: "date",
        dateType: "datetime",
        label: "日期时间",
        key: "datetime",
      }, {
        type: "custom",
        label: "自定义",
        key: "sgInput",
        slotName: "sgInput"
      },
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
      },
      sex: {
        required: true
      },
      credential: {
        required: true
      },
      imgUrl: {
        required: true
      },
      areaCode: {
        required: true
      },
      deptId: {
        required: true
      },
      lng: {
        required: true
      },
      content: {
        required: true
      },
      icon: {
        required: true
      },
      mimeType: {
        required: true,
        trigger: "blur",
      }
    }
  }
}

methods: {
  onItemChange(data)
  {
    console.log(data)
  }
,
  onSubmit(data)
  {
    console.log(data)
  }
}
````

### 组件属性

|        参数         |        说明         |   类型    |          可选值          |  默认值   |
|:-----------------:|:-----------------:|:-------:|:---------------------:|:------:|
|     formData      |      表单结构数据       |  Array  |           —           |   []   |
|    showMessage    |     是否显示校验信息      | Boolean |           —           |  true  |
|    labelWidth     |      表单项标签宽度      | String  |           —           | 120px  |
|      inline       |     是否行内表单模式      | Boolean |           —           | false  |
|   labelPosition   |     表单域标签的位置      | String  |    right/left/top     | right  |
|       size        |   用于控制该表单内组件的尺寸   | String  | medium / small / mini | medium |
|     disabled      |    整表禁用，仅展示使用     | Boolean |           —           | false  |

### 表单子选项属性

#### form-item 表单项公共属性

|     参数      |                                                                                 说明                                                                                  |          类型           |                                                              可选值                                                               |  默认值  |
|:-----------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------:|:------------------------------------------------------------------------------------------------------------------------------:|:-----:|
|    type     |                                                                                表单项类型                                                                                |        String         | txt，input，inputNumber，select，radio，checkbox，textarea，date，time，upload，area，cascader，bdMap，editor，selectIcon，tableSelect，custom |   —   |
|     key     |                                                                               表单收集的字段                                                                               |        String         |                                                               —                                                                |   —   |
|    label    |                                                                               表单标签文本                                                                                |        String         |                                                               —                                                                |   —   |
| labelWidth  |                                                                    标签宽度，默认使用form组件的labelWidth属性                                                                     |        String         |                                                               —                                                                |   —   |
|  disabled   |                                                                               是否禁用该选项                                                                               |        Boolean        |                                                               —                                                                | false |

#### txt 文本

| 参数  |  说明  |   类型   | 可选值 | 默认值 |
|:---:|:----:|:------:|:---:|:---:|
| val | 文本内容 | String |  —  |  —  |

#### input 输入框

|      参数      |     说明     |   类型    | 可选值 |  默认值  |
|:------------:|:----------:|:-------:|:---:|:-----:|
|  maxLength   |   最大输入长度   | Number  |  —  |   —   |
|  minLength   |   最小输入长度   | Number  |  —  |   —   |
| placeholder  |    占位符     | String  |  —  |  请输入  |
| showPassword | 是否展示切换密码图标 | Boolean |  —  | false |
|   prepend    |  输入框前置内容   |  Slots  |  —  |   —   |
|    append    |  输入框后置内容   |  Slots  |  —  |   —   |

#### InputNumber 数字输入框

|        参数        |    说明    |   类型    |  可选值  | 默认值  |
|:----------------:|:--------:|:-------:|:-----:|:----:|
|       min        |   最小值    | Number  |   —   |  —   |
|       max        |   最大值    | Number  |   —   |  —   |
|       step       |  计数器步长   | Number  |   —   |  1   |
|    precision     |   数值精度   | Number  |   —   |  1   |
|   placeholder    |   占位符    | String  |   —   | 请输入  |
|     controls     | 是否使用控制按钮 | Boolean |   —   | true |
| controlsPosition |    控制按钮位置  | String  | right |  —   |


#### Switch  开关

|      参数       |        说明        |            类型             | 可选值 |   默认值   |
|:-------------:|:----------------:|:-------------------------:|:---:|:-------:|
|     width     |  switch 的宽度（像素）  |          Number           |  —  |   40    |
|  activeText   | 	switch 打开时的文字描述 |          String           |  —  |    —    |
| inactiveText  | switch 关闭时的文字描述  |          String           |  —  |    —    |
|  activeValue  |   switch 打开时的值   | boolean / string / number |  —  |  true   |
| inactiveValue |   switch 关闭时的值   | boolean / string / number |  —  |  false  |
|  activeColor  |  switch 打开时的背景色  |          string           |  —  | #409EFF |
| inactiveColor |  switch 关闭时的背景色  |          string           |  —  | #C0CCDA |
|   disabled    |       是否禁用       |          Boolean          |  —  |  false  |

#### Slider 滑块

|      参数       |               说明               |        类型        | 可选值 |  默认值  |
|:-------------:|:------------------------------:|:----------------:|:---:|:-----:|
|      min      |              最小值               |      Number      |  —  |   0   |
|      max      |              	最大值              |      Number      |  —  |  100  |
|     step      |              	步长               |      Number      |  —  |   1   |
|   showStops   |            	是否显示间断点            |     Boolean      |  —  | false |
|  showTooltip  |         	是否显示 tooltip          |     Boolean      |  —  | true  |
| formatTooltip |      	格式化 tooltip message      | 	function(value) |  —  |   —   |
|     range     |            	是否为范围选择            |        	         |  —  | false |
|   vertical    |            	是否竖向模式             |     	Boolean     |  —  | false |
|    height     |       	Slider 高度，竖向模式时必填       |     	string      |  —  |   —   |
|     marks     | 	标记， key 的类型必须为 number 且取值在闭区间 |     	object      |  —  |   —   |
|   disabled    |              是否禁用              |     Boolean      |  —  | false |

#### Rate 评分

|        参数         |        说明        |      类型      |   可选值   |                默认值                |
|:-----------------:|:----------------:|:------------:|:-------:|:---------------------------------:|
|        max        |      	最大分值       |    Number    |    —    |                 5                 |
|     allowHalf     |     	是否允许半选      |   Boolean    |    —    |               false               |
|      colors       |      	颜色分段       | array/object |    —    | ['#F7BA2A', '#F7BA2A', '#F7BA2A'] |
|     voidColor     |  	未选中 icon 的颜色   |    string    |    —    |              #C6D1DE              |
| disabledVoidColor | 	只读时未选中 icon 的颜色 |   	string    |    —    |              #EFF2F7              |
|     showText      |    	是否显示辅助文字     |   Boolean	   |    —    |               false               |
|     showScore     |    	是否显示当前分数     |   Boolean	   |    —    |               false               |
|     textColor     |     	辅助文字的颜色     |   	string    |    —    |              #1F2D3D              |
|       texts       |     	辅助文字数组      |    	array    |    —    |  ['极差', '失望', '一般', '满意', '惊喜']   |
|   scoreTemplate   |      分数显示模板      |   	string    | {value} |                 —                 |
|     disabled      |       是否禁用       |   Boolean    |    —    |               false               |

#### select 下拉选择器

<table>
	<tr>
	    <th>参数</th>
	    <th>说明</th>
	    <th>类型</th>  
	    <th>可选值</th>  
	    <th>默认值</th>  
	</tr>
	<tr>
	    <td>filterable</td>
	    <td>是否可搜索</td>
	    <td>Boolean</td>
	    <td>—</td>
	    <td>true</td>
	</tr>
	<tr>
	    <td>multiple</td>
	    <td>是否多选</td>
	    <td>Boolean</td>
	    <td>—</td>
	    <td>false</td>
	</tr>
	<tr>
	    <td>placeholder</td>
	    <td>占位符</td>
	    <td>String</td>
	    <td>—</td>
	    <td>请选择</td>
	</tr>
	<tr >
	    <td rowspan="4">options</td>
	    <td>label</td>
	    <td>子选项标签名称</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>val</td>
	    <td>子选项值</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>disabled</td>
	    <td>是否禁用该子选项</td>
	    <td>Boolean</td>
	    <td>false</td>
	</tr>
</table>

#### radio 单选组

<table>
	<tr>
	    <th>参数</th>
	    <th>说明</th>
	    <th>类型</th>  
	    <th>可选值</th>  
	    <th>默认值</th>  
	</tr>
	<tr>
	    <td>size</td>
	    <td>单选框组尺寸</td>
	    <td>String</td>
	    <td>medium / small / mini</td>
	    <td>medium</td>
	</tr>
	<tr>
	    <td>textColor</td>
	    <td>按钮形式的 Radio 激活时的文本颜色</td>
	    <td>string</td>
	    <td>—</td>
	    <td>#ffffff</td>
	</tr>
	<tr>
	    <td>fill</td>
	    <td>按钮形式的 Radio 激活时的填充色和边框色</td>
	    <td>String</td>
	    <td>—</td>
	    <td>#409EFF</td>
	</tr>
	<tr>
	    <td>radioType</td>
	    <td>radio展示类型</td>
	    <td>String</td>
	    <td>button/radio</td>
	    <td>radio</td>
	</tr>
	<tr >
	    <td rowspan="4">options</td>
	    <td>label</td>
	    <td>radio标签名称</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>val</td>
	    <td>radio的值</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>itemBorder</td>
	    <td>Radio是否展示边框</td>
	    <td>Boolean</td>
	    <td>false</td>
	</tr>
	<tr >
	    <td>disabled</td>
	    <td>是否禁用该子选项</td>
	    <td>Boolean</td>
	    <td>false</td>
	</tr>
</table>

#### checkbox 多选组

<table>
	<tr>
	    <th>参数</th>
	    <th>说明</th>
	    <th>类型</th>  
	    <th>可选值</th>  
	    <th>默认值</th>  
	</tr>
	<tr>
	    <td>size</td>
	    <td>多选框组尺寸</td>
	    <td>String</td>
	    <td>medium / small / mini</td>
	    <td>medium</td>
	</tr>
	<tr>
	    <td>textColor</td>
	    <td>按钮形式的 Checkbox 激活时的文本颜色</td>
	    <td>string</td>
	    <td>—</td>
	    <td>#ffffff</td>
	</tr>
	<tr>
	    <td>fill</td>
	    <td>按钮形式的 Checkbox 激活时的填充色和边框色</td>
	    <td>String</td>
	    <td>—</td>
	    <td>#409EFF</td>
	</tr>
	<tr>
	    <td>checkboxType</td>
	    <td>Checkbox展示类型</td>
	    <td>String</td>
	    <td>button/checkbox</td>
	    <td>checkbox</td>
	</tr>
	<tr >
	    <td rowspan="4">options</td>
	    <td>label</td>
	    <td>checkbox标签名称</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>val</td>
	    <td>checkbox的值</td>
	    <td>—</td>
	    <td>—</td>
	</tr>
	<tr >
	    <td>itemBorder</td>
	    <td>Checkbox是否展示边框</td>
	    <td>Boolean</td>
	    <td>false</td>
	</tr>
	<tr >
	    <td>disabled</td>
	    <td>是否禁用该子选项</td>
	    <td>Boolean</td>
	    <td>false</td>
	</tr>
</table>

#### date 日期组件

|        参数        |             说明              |   类型   |                                         可选值                                          | 默认值  |
|:----------------:|:---------------------------:|:------:|:------------------------------------------------------------------------------------:|:----:|
|       key2       |     当使用了范围选择时结束时间的key值         | String |                                          —                                           |  —   |
|     dateType     |            显示类型                | String | year/month/date/dates/months/years week/datetime/datetimerange/ daterange/monthrange |  —   |
|      align       |            对齐方式             | String |                                 left, center, right                                  | left |
|  rangeSeparator  |          选择范围时的分隔符          | String |                                          —                                           |  -   |
|   placeholder    |          非范围选择时占位符          | String |                                          —                                           | 选择日期 |
| startPlaceholder |        范围选择时开始日期的占位符        | String |                                          —                                           | 开始日期 |
|  endPlaceholder  |        范围选择时结束日期的占位符        | String |                                          —                                           | 结束日期 |
|  pickerOptions   | 当前时间日期选择器特有的选项(参考el-date组件) | Object |                                          —                                           |  {}  |

#### time 时间组件

|        参数        |             说明              |   类型    |         可选值         |  默认值  |
|:----------------:|:---------------------------:|:-------:|:-------------------:|:-----:|
|       key2       |     当使用了范围选择时结束时间的key值         | String  |          —          |   —   |
|     isRange      |         是否为时间范围选择              | Boolean |          —          | false |
|      align       |            对齐方式             | String  | left, center, right | left  |
|  rangeSeparator  |          选择范围时的分隔符          | String  |          —          |   -   |
|   placeholder    |          非范围选择时占位符          | String  |          —          | 选择时间  |
| startPlaceholder |        范围选择时开始时间的占位符        | String  |          —          | 开始时间  |
|  endPlaceholder  |        范围选择时结束时间的占位符        | String  |          —          | 结束时间  |
|  pickerOptions   | 当前时间日期选择器特有的选项(参考el-time组件) | Object  |          —          |  {}   |

#### cascader 自定义级联

详情见[EmCascader](../EmCascader/README.md)

|      参数       |       说明       |    类型    |          可选值          |  默认值   |
|:-------------:|:--------------:|:--------:|:---------------------:|:------:|
|     data      |      静态数据      |  Array   |           —           |   []   |
|   optionVal   | v-model收集节点的字段 |  string  |           —           |   id   |
|  optionLabel  |  选项的标签对应接口字段   |  string  |           —           |  name  |
| optionFilter  |    筛选待选项的方法    | Function |           —           |   —    |
| showAllLevels |    是否显示完整路径    | Boolean  |           —           |  true  |
|   separator   |    地址名称分隔符     |  string  |           —           |   /    |
|     size      |      组件大小      |  string  | medium / small / mini | medium |
|  filterable   |     是否可搜索      | Boolean  |           —           |  true  |
| checkStrictly |   是否可以选任意一级    | Boolean  |           —           | false  |
|   multiple    |      是否多选      | Boolean  |           —           | false  |
|   disabled    |      是否禁用      | Boolean  |           —           | false  |
|  placeholder  |      占位符       |  string  |           —           |  请输入   |

#### custom 自定义选项

|    参数    |         说明         |   类型   | 可选值 | 默认值 |
|:--------:|:------------------:|:------:|:---:|:---:|
| slotName | 插槽名字，自定义选项通过插槽接入表单 | String |  —  |  —  |
