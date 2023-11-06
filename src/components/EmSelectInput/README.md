## EmSelectInput

下拉选择输入框组件

### 基本使用

静态数据

````javascript
<em-select-input
  v-model="value"
  :data = "data"
@on
-val - change = "onValChange"
@on
-change = "onChange" / > data()
{
  return {
    value: {},
    data: [
      {
        val: '1',
        label: '小学'
      }, {
        val: '2',
        label: '初中'
      }, {
        val: '3',
        label: '高中'
      }, {
        val: '4',
        label: '大学'
      },
    ]
  }
}

````

远程数据

````javascript
<em-select-input
  v-model="value"
  url="/brand"
  optionVal="label"
  optionLabel="name"
  @on - val - change = "onValChange"
@on
-change = "onChange" / >
  
  data()
{
  return {
    value: null
  }
}

````

### 组件属性

|        参数         |              说明               |          类型           | 可选值 |  默认值  |
|:-----------------:|:-----------------------------:|:---------------------:|:---:|:-----:|
|  value / v-model  |              绑定值              | String, Number, Array |  —  |   —   |
|        url        |           远程拉取数据的地址           |        string         |  —  |   —   |
|       data        |             静态数据              |         Array         |  —  |  []   |
|     selectKey     | select选择框的key，当这个值存在时，会返回2个字段 |        string         |  —  |   —   |
|    selectWidth    |          select选择框宽度          |        string         |  —  | 120px |
|     optionVal     |        v-model收集节点的字段         |        string         |  —  |  val  |
|    optionLabel    |          选项的标签对应接口字段          |        string         |  —  | label |
|   optionFilter    |           筛选待选项的方法            |       Function        |  —  |   —   |
|    filterable     |             是否可搜索             |        Boolean        |  —  | true  |
|     disabled      |             是否禁用              |        Boolean        |  —  | false |
| selectPlaceholder |              占位符              |        string         |  —  |  请选择  |
| inputPlaceholder  |              占位符              |        string         |  —  |  请输入  |

### 组件事件

|     事件类型      |       说明        | 回调参数  |
|:-------------:|:---------------:|:-----:|
| on-val-change | input输入框的值的变化响应 | 组件绑定值 |
|   on-change   |    组件的值变化响应     | 组件绑定值 |
