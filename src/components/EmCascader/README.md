## EmCascader

可以远程拉取数据的自定义级联组件

### 基本使用

静态数据

````javascript
<em-cascader
  v-model="value"
  :data = "data"
@on
-val - change = "onValChange"
@on
-name - change = "onNameChange" / >
  
  data()
{
  return {
    value: null,
    data: [
      {
        id: 1,
        name: "爷爷",
        children: [
          {
            id: 2,
            name: '父亲'
          },
          {
            id: 3,
            name: '叔叔'
          }
        ]
      }
    ]
  }
}

````

远程数据

````javascript
<em-cascader
  v-model="value"
  :url:= '/dept'
@on
-val - change = "onValChange"
@on
-name - change = "onNameChange" / >
  
  data()
{
  return {
    value: null
  }
}

````

### 组件属性

|       参数        |       说明       |          类型           |          可选值          |  默认值   |
|:---------------:|:--------------:|:---------------------:|:---------------------:|:------:|
| value / v-model |      绑定值       | String, Number, Array |           —           |   —    |
|       url       |   远程拉取数据的地址    |        string         |           —           |   —    |
|      data       |      静态数据      |         Array         |           —           |   []   |
|    optionVal    | v-model收集节点的字段 |        string         |           —           |   id   |
|   optionLabel   |  选项的标签对应接口字段   |        string         |           —           |  name  |
|  optionFilter   |    筛选待选项的方法    |       Function        |           —           |   —    |
|  showAllLevels  |    是否显示完整路径    |        Boolean        |           —           |  true  |
|    separator    |    地址名称分隔符     |        string         |           —           |   /    |
|      size       |      组件大小      |        string         | medium / small / mini | medium |
|   filterable    |     是否可搜索      |        Boolean        |           —           |  true  |
|  checkStrictly  |   是否可以选任意一级    |        Boolean        |           —           | false  |
|    multiple     |      是否多选      |        Boolean        |           —           | false  |
|    disabled     |      是否禁用      |        Boolean        |           —           | false  |
|   placeholder   |      占位符       |        string         |           —           |  请选择   |

### 组件事件

|      事件类型      |     说明     |  回调参数  |
|:--------------:|:----------:|:------:|
| on-val-change  | 返回绑定值的变化响应 |  绑定的值  |
| on-name-change | 返回选择的值的名称  | 绑定值的名称 |
