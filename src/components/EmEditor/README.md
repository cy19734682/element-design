## EmEditor

富文本输入组件

### 基本使用

静态数据

````javascript
<em-editor
  v-model="value"
  @on-val-change="onValChange"
  />

  data() {
      return {
        value: '',
      }
}
````

### 组件属性

|       参数        |    说明     |   类型    |      可选值       |   默认值   |
|:---------------:|:---------:|:-------:|:--------------:|:-------:|
| value / v-model |    绑定值    | String  |       —        |    —    |
|  toolbarConfig  | toolbar配置 | Object  |       —        |    —    |
|  editorConfig   |   编辑框配置   | Object  |       —        |    -    |
|      mode       |    模式     | string  | default/simple | default |
|     height      |   编辑框高度   | string  |       —        |  300px  |
|    disabled     |   是否禁用    | Boolean |       —        |  false  |
|   placeholder   |    占位符    | string  |       —        |    —    |

### 组件事件

|      事件类型      |     说明     | 回调参数 |
|:--------------:|:----------:|:----:|
| on-val-change  | 返回绑定值的变化响应 | 绑定的值 |
