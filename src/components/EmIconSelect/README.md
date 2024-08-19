## EmIconSelect

Icon选择组件

### 组件属性

|      参数       |      说明      |      类型      |          可选值          | 默认值  |
| :-------------: | :------------: | :------------: | :----------------------: | :-----: |
| value / v-model |     绑定值     |     String     |            —             |    —    |
|      data       | 传入的图标集合 |     Array      |            —             |    —    |
|      width      |   弹出层宽度   | String, Number |            —             |   450   |
|     trigger     | 弹出层触发方式 |     string     | click/focus/hover/manual |  click  |
|   placeholder   |  输入框占位符  |     string     |            —             | 请选择  |
|    disabled     |    是否禁用    |    boolean     |            -             |  false  |
|      color      |    字体颜色    |     string     |            -             | #606266 |
|   background    |    背景颜色    |     string     |            -             |  #FFF   |

### 组件事件

|     事件类型      |         说明         | 回调参数 |
| :---------------: | :------------------: | :------: |
| update:modelValue | 返回绑定值的变化响应 | 绑定的值 |
|     on-change     |   绑定值的变化响应   | 绑定的值 |
