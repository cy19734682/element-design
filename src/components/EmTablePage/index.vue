<template>
  <div class="em-table-page">
    <div class="table-container">
      <el-table
          v-bind="$attrs"
          v-on="$listeners"
          v-loading="loading"
          id="dataTable"
          ref="elTableRef"
          :data="dataS"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          :header-cell-style="{backgroundColor: '#f1f1f1'}"
      >
        <!--多选框-->
        <el-table-column v-if="selection" type="selection" width="50" align="center"></el-table-column>
        <el-table-column
            v-for="(item,index) in columnsT"
            :key="item.key+index"
            :type="item.type"
            :prop="item.key"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :header-align="item.headerAlign"
            :align="item.align || tableAlign"
            :formatter="item.formatter"
            :show-overflow-tooltip="showOverflowTooltip"
        >
          <template slot="header">
            <span>{{ item.label }}</span>
          </template>
          <template slot-scope="scope">
            <render-dom v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" :column="item"></render-dom>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" v-if="showPage">
      <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size.sync="pageSizeT"
          :page-sizes="pageSizesT"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-bind="$attrs"
          @size-change="changePage"
          @current-change="changePage"
      />
    </div>
  </div>
</template>

<script>
  import {scrollTo} from '../../methods/scroll-to'
  export default {
    name: 'EmTablePage',
    components:{
      /**自定义render组件**/
      renderDom: {
        functional: true,
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null,
          },
        },
        render: (h, context) => {
          const params = {
            row: context.props.row,
            index: context.props.index,
          };
          if (context.props.column) params.column = context.props.column;
          return context.props.render(h, params);
        },
      }
    },
    props: {
      initData: {
        /*初始化数据，即组件创建后自动拉取第一次数据*/
        type: Boolean,
        default: true
      },
      url: {
        /*表格拉取数据的接口地址*/
        type: String,
        default: ''
      },
      searchData: {
        /*表格条件查询数据*/
        type: Object,
        default() {
          return {}
        }
      },
      columns: {
        /*表格表头结构数据，同iView*/
        type: Array,
        default() {
          return []
        }
      },
      data: {
        /*表格默认数据，没有url的本地静态表格使用*/
        type: Array,
        default() {
          return []
        }
      },
      tableAlign: {
        /*表格对齐方式*/
        type: String,
        default: "center"
      },
      showOverflowTooltip: {
        /*当内容过长被隐藏时显示 tooltip*/
        type: Boolean,
        default: true
      },
      selection: {
        /*是否展示每列开头复选框*/
        type: Boolean,
        default: false
      },
      pageSize: {
        /*每页条数*/
        type: Number,
        default: 10
      },
      showPage: {
        /*是否展示页签*/
        type: Boolean,
        default: true
      },
      loading: {
        /*拉取表格数据时显示遮罩层*/
        type: Boolean,
        default: false
      },
      orderKey: {
        /*排序的key*/
        type: String,
        default: "id"
      },
      orderDefault: {
        /*排序是升是降*/
        type: String,
        default: "desc"
      },
      currentPageKey: {
        /*分页当前页码key*/
        type: String,
        default: "page"
      },
      pageSizeKey: {
        /*每页显示条目个数key*/
        type: String,
        default: "limit"
      },
      totalKey: {
        /*总条目数key*/
        type: String,
        default: "count"
      },
      pageSizes: {
        /*每页显示个数选择器的选项设置*/
        type: Array,
        default() {
          return [10, 20, 30, 40, 50, 100]
        }
      },
    },
    data() {
      return {
        currentPage: 1,
        pageSizesT: this.pageSizes,
        pageSizeT: Number(this.pageSize),
        total: 0,
        dataT: this.data,
        selected: [],
      }
    },
    computed: {
      /**
       * 查询条件
       * @returns
       */
      queryData() {
        let temp = {
          ...this.searchData,
          [this.currentPageKey]: this.currentPage,
          [this.pageSizeKey]: this.pageSizeT
        }
        if (this.orderKey && this.orderDefault) {
          temp[this.orderKey] = this.orderDefault
        }
        return temp
      },
      /**
       * 列表选项处理
       * @returns {*[]}
       */
      columnsT() {
        return this.columns.filter(item => {
          return item.type !== 'selection'
        })
      },
      /**
       * 处理列表数控
       */
      dataS: {
        get() {
          return this.dataT.map((e, i) => {
            return {
              rowKey: 'bt-' + i,
               ...e
            }
          })
        },
        set(v) {
          this.dataT = v
        }
      },
      /**
       * 列表多选选择的Id组
       * @returns {*[]}
       */
      selectedIds() {
        return this.selected.map(e => e.id)
      },
    },
    watch: {
      searchData: {
        handler() {
          this.currentPage = 1
          this.getTableData()
        },
        deep: true
      }
    },
    created() {
      if(this.initData){
        this.getTableData()
      }
    },
    methods: {
      /**
       * 列表单机事件
       * @param row
       */
      handleRowClick(row) {
        this.$refs.elTableRef.toggleRowSelection(row)
      },
      /**
       * 列表复选框选择事件
       * @param selection
       */
      handleSelectionChange(selection) {
        this.selected = selection
      },
      /**
       * 切换分页
       */
      changePage() {
        scrollTo(0, 800)
        this.getTableData()
      },
      /**
       * 清空表格数据
       */
      clearTableData() {
        this.$set(this, 'dataT', [])
        this.currentPage = 1
        this.total = 0
      },
      /**
       * 拉取表格数据
       * @returns {Promise<unknown>}
       */
      getTableData() {
        return new Promise(resolve => {
          if (this.url && this.url !== '') {
            this.$request.get(this.url, this.queryData,{isShowLoading: this.loading}).then(d => {
              if (d && d.code === 0 && d.data) {
                this.dataT = d.data.data || []
                this.total = d.data[this.totalKey] || 0
              }
              else {
                this.clearTableData()
              }
              this.$emit('on-data-change', d)
              resolve(d)
            })
                .catch(e => {
                  console.warn(e)
                  this.$emit('on-data-change', e)
                })
          }
          else {
            console.warn('没有有效的请求地址，无法获取表格数据')
          }
        })
      }
    }
  }
</script>

