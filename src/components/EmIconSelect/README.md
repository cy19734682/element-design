## EmIconSelect

Icon选择组件

### 基本使用

````javascript
<em-icon-select v-model="icon"/>

data()
{
  return {
    icon: ''
  }
}

````

### 组件属性

|       参数        |   说明    |       类型       |           可选值            |  默认值  |
|:---------------:|:-------:|:--------------:|:------------------------:|:-----:|
| value / v-model |   绑定值   |     String     |            —             |   —   |
|      width      |  弹出层宽度  | String, Number |            —             |  450  |
|     trigger     | 弹出层触发方式 |     string     | click/focus/hover/manual | click |
|   placeholder   | 输入框占位符  |     string     |            —             |  请选择  |
|    disabled     |  是否禁用   |    boolean     |            -             | false |

### 组件事件

|     事件类型      |    说明    | 回调参数 |
|:-------------:|:--------:|:----:|
| on-val-change | 绑定值的变化响应 | 绑定的值 |
