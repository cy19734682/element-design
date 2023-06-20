## EmTablePage

分页表格组件

### 基本使用

````javascript
<em-table-page
  ref="tableRef"
  selection
  url="/bt-table-page"
  :columns="columns"
  :searchData="searchData"
  orderKey=""
  @row-click="rowClick"
  @selection-change="selectionChange"
  @on-data-change="onDataChange"
  />

  data() {
      return {
        searchData: {},
        columns:[
          {
            key: "id",
            label: "ID"
          },{
            key: "name",
            label: "名称"
          },{
            label: "操作",
            width: 250,
            render: (h, params) => {
              return h("div", [
                h("el-button", {
                  props:{
                    type:"warning"
                  },
                  on: {
                    click: e => {
                    }
                  }
                }, '编辑'),
                h("el-button", {
                  props:{
                    type:"danger"
                  },
                  on: {
                    click: e => {
                    }
                  }
                }, "删除")
              ])
            }
          },
        ],
      }
    }

    methods: {
      rowClick(row){
        console.log(row)
      },
      selectionChange(selection) {
        console.log(selection)
      },
      onDataChange(d){
        console.log(s)
      }
    }
````

### 组件属性

|         参数          |          说明           |   类型    |                        可选值                        |                   默认值                   |
|:-------------------:|:---------------------:|:-------:|:-------------------------------------------------:|:---------------------------------------:|
|       $attrs        |   继承了el-table的所有属性    |   Any   |                         —                         |                    —                    |
|      initData       |     是否初始化从接口获取数据      | Boolean |                         —                         |                  false                  |
|         url         |      表格拉取数据的接口地址      | String  |                         —                         |                    —                    |
|     searchData      |       表格条件查询数据        | Object  |                         —                         |                   {}                    |
|       columns       | 表格表头结构数据，同Element-ui  |  Array  |                         —                         |                   []                    |
|        data         | 表格默认数据，没有url的本地静态表格使用 |  Array  |                         —                         |                   []                    |
|     tableAlign      |        表格对齐方式         | String  |                 left,right,center                 |                 center                  |
| showOverflowTooltip |      内容过长被隐藏时显示       | Boolean |                         —                         |                  true                   |
|      selection      |      是否展示每列开头复选框      | Boolean |                         —                         |                  false                  |
|        radio        |      是否展示每列开头单选框      | Boolean |                         —                         |                  false                  |
|       loading       |     拉取表格数据时显示遮罩层      | Boolean |                         —                         |                  true                   |
|      orderKey       |        排序的key         | String  |                         —                         |                   id                    |
|    orderDefault     |        排序是升是降         | String  |                         —                         |                  desc                   |
|      showPage       |        是否展示页签         | Boolean |                         —                         |                  true                   |
|     pageLayout      |         分页布局          | String  | sizes, prev, pager, next, jumper, ->, total, slot | total, sizes, prev, pager, next, jumper |
|      pageSize       |         每页条数          | Number  |                         —                         |                   10                    |
|      pageSizes      |    每页显示个数选择器的选项设置     |  Array  |                         —                         |        [10, 20, 30, 40, 50, 100]        |
|   currentPageKey    |       分页当前页码key       | String  |                         —                         |                 current                 |
|     pageSizeKey     |      每页显示条目个数key      | String  |                         —                         |                  size                   |
|      totalKey       |        总条目数key        | String  |                         —                         |                  total                  |

### 组件事件

|      事件类型      |        说明        |  回调参数  |
|:--------------:|:----------------:|:------:|
|   $listeners   | 继承了el-table所有的事件 | 根据事件返回 |
| on-data-change |   远程数据加载完成后回调    | 接口返回的值 |

### 组件方法

|         事件类型         |   说明   | 回调参数 |
|:--------------------:|:------:|:----:|
|    handleRowClick    | 列表单机事件 |  —   |
| handleClearSelection | 清空复选的值 |  —   |
|    clearTableData    | 清空表格数据 |  —   |
|     getTableData     | 拉取表格数据 |  —   |
