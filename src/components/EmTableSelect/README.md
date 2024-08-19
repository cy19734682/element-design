## EmTableSelect

弹出层表格选择组件

- 注意：该组件在表单内使用时，校验规则中trigger要设置为‘blur’，否则会出现清空表单时校验信息未被清空的问题。

### 组件属性

|      参数       |              说明              |         类型          |             可选值              | 默认值 |
| :-------------: | :----------------------------: | :-------------------: | :-----------------------------: | :----: |
|     $attrs      |    继承了el-table的所有属性    |          Any          |                —                |   —    |
| value / v-model |             绑定值             | String, Number, Array |                —                |   —    |
|       url       |     表格拉取数据的接口地址     |        String         |                —                |   —    |
|   searchForm    |          表格搜索条件          |         Array         |                —                |   []   |
|     columns     | 表格表头结构数据，同Element-ui |         Array         |                —                |   []   |
|    pageSize     |          表格查询数量          |        Number         |                —                |   -1   |
|      width      |           弹出窗宽度           |        Number         |                —                |  500   |
|    multiple     |            是否多选            |        Boolean        |                —                | false  |
|     valKey      |          绑定值的key           |        String         |                —                |   id   |
|    labelKey     |          展示值的key           |        String         |                —                |  name  |
|   placeholder   |          输入框占位符          |        String         |                —                | 请选择 |
|    placement    |         弹窗从哪里弹出         |        String         | [同el-popover中的placement属性] | bottom |
|    disabled     |            是否禁用            |        Boolean        |                —                | false  |

### 组件事件

|  事件类型  |           说明           |   回调参数   |
| :--------: | :----------------------: | :----------: |
| $listeners | 继承了el-table所有的事件 | 根据事件返回 |
