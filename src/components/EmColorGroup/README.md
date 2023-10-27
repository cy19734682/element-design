## EmColorGroup

颜色组选择器组件

### 基本使用

````javascript
<em-color-group v-model="color"/>

data()
{
  return {
    color: ['#fff','#aaa']
  }
}

````

### 组件属性

|       参数        |    说明     |   类型    | 可选值 |  默认值  |
|:---------------:|:---------:|:-------:|:---:|:-----:|
| value / v-model |    绑定值    |  Array  |  —  |   —   |
|    showAlpha    |  是否显示透明色  | boolean |  —  | false |
|     remain      | 剩余几个时不可删除 | Number  |  —  |   0   |
|    isAddDel     | 是否可以新增和删除 | boolean |  —  | true  |

### 组件事件

|     事件类型      |    说明    | 回调参数 |
|:-------------:|:--------:|:----:|
| on-val-change | 绑定值的变化响应 | 绑定的值 |
