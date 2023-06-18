## EmBaiduMap
基于百度地图封装的地图组件
###基本使用
````javascript
<em-baidu-map 
  v-model="value"  
  @on-val-change="onValChange"
  />

  data() {
      return {
        value: {
          lng: 102.554865,
          lat: 26.567981
        },
      }
    }
  
````
### 组件属性
|       参数        |   说明    |   类型    | 可选值 |                    默认值                    |
|:---------------:|:-------:|:-------:|:---:|:-----------------------------------------:|
| value / v-model |   绑定值   | object  |  —  |     {lng: 106.554865,lat: 29.567981}      |
|      width      |  地图宽度   | string  |  —  |                   100%                    |
|     height      |  地图高度   | string  |  —  |                   300px                   |
|   placeholder   | 搜索栏占位符  | string  |  —  |                    搜索                     |
|    disabled     |  是否禁用   | boolean |  -  |                   false                   |
|       ak        | 百度地图ak码 | string  |  —  | ak+Math.floor(Math.random() * 1000000000) |
### 组件事件
|     事件类型      |    说明    | 回调参数 |
|:-------------:|:--------:|:----:|
| on-val-change | 绑定值的变化响应 | 绑定的值 |
