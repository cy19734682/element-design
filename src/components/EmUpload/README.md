## EmUpload

文件上传组件

### 基本使用

自动上传

````javascript
<em-upload
  v-model="url"
  multiple
  :length = "1"
:
format = "['jpg','xlsx']"
listType = "picture-card"
@on
-file - change = "onfileChange" / >
  
  data()
{
  return {
    url: '',
  }
}

methods: {
  onfileChange(data)
  {
    console.log(data)
  }
}
````

手动上传

````javascript
<em-upload
  v-model="files"
  :autoUpload = 'false'
fileName = "files"
multiple
  :length = "5"
:
format = "['jpg','xlsx']"
listType = "picture-card"
@on
-file - change = "onfileChange" / >
  
  data()
{
  return {
    files: [],
  }
}

methods: {
  onfileChange(data)
  {
    console.log(data)
  }
}
````

### 组件属性

|         参数          |     说明     |             类型              |            可选值            |   默认值   |
|:-------------------:|:----------:|:---------------------------:|:-------------------------:|:-------:|
| fileValue / v-model |    绑定值     | Array, Number, String, File |             —             |    —    |
|     autoUpload      |   是否自动上传   |           Boolean           |             —             |  true   |
|         url         |  自动上传的url  |           String            |             —             | /upload |
|      paramData      | 文件上传接口其他参数 |           Object            |             —             |   {}    |
|       headers       |  请求头额外参数   |           Object            |             —             |   {}    |
|      fileName       |  上传文件的字段名  |           String            |             —             |  file   |
|      multiple       |   是否支持多选   |           Boolean           |             —             |  true   |
|       format        |  限制文件上传类型  |            Array            |             —             |   []    |
|       maxSize       |  单个文件大小限制  |           Number            |             —             |    0    |
|       length        |  文件上传数量限制  |           Number            |             —             |    1    |
|      listType       |  文件列表的类型   |           String            | text，picture，picture-card |  text   |
|   withCredentials   |   是否支持跨域   |           Boolean           |             —             |  true   |
|      disabled       |    是否禁用    |           Boolean           |             —             |  false  |

### 组件事件

|      事件类型      |     说明     | 回调参数 |
|:--------------:|:----------:|:----:|
| on-file-change | 返回绑定值的变化响应 | 绑定的值 |
