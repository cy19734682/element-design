## EmCascaderArea

省市区级联选择

### 组件属性

|      参数       |        说明        |         类型          |       可选值        | 默认值  |
| :-------------: | :----------------: | :-------------------: | :-----------------: | :-----: |
| value / v-model |       绑定值       | String, Number, Array |          —          |    —    |
|      level      | 精确至几级行政区域 |    Number, String     | 1：省市，2：省市区  |    2    |
|  showAllLevels  |  是否显示完整路径  |        Boolean        |          —          |  true   |
|    separator    |   地址名称分隔符   |        string         |          —          |    /    |
|      size       |      组件大小      |        string         | large/default/small | default |
|   filterable    |     是否可搜索     |        Boolean        |          —          |  true   |
|    disabled     |      是否禁用      |        Boolean        |          —          |  false  |
|   placeholder   |       占位符       |        string         |          —          | 请选择  |

### 组件事件

|     事件类型      |         说明         |   回调参数   |
| :---------------: | :------------------: | :----------: |
| update:modelValue | 返回绑定值的变化响应 |   绑定的值   |
|  on-name-change   |  返回选择的值的名称  | 绑定值的名称 |
