<template>
  <div class="app-container app-search-table">
    <em-search-form ref="searchFormRef" :form-data="searchFormData" btnLoading @on-search="search">
      <template slot="beginBtnGroup">
        <el-button type="danger" :disabled="!(selectIds && selectIds.length > 0)">
          删除
        </el-button>
      </template>
    </em-search-form>
    <em-table-page
        url="/log/loginLog"
        selection
        :columns="columns"
        :searchData="searchData"
        @selection-change="selectionChange"
        @on-data-change="onDataChange"
    />
  </div>
</template>

<script>
  import EmTablePage from '../../../src/components/EmTablePage'
  import EmSearchForm from '../../../src/components/EmSearchForm'
  export default {
    name: "EmTablePageEx",
    components:{
      EmTablePage,
      EmSearchForm
    },
    data() {
      return {
        selectIds:[],
        searchData:{},
        searchFormData:[
          {
            type: "input",
            key: "user",
            placeholder: '用户'
          }, {
            type: "input",
            placeholder: "日志内容",
            key: "content",
          },{
            type: 'select',
            placeholder: '状态',
            key: 'succeed',
            options: [
              {
                label: '成功',
                val: '成功'
              }, {
                label: '失败',
                val: '失败'
              }
            ]
          },
        ],
        columns:[
          {
            key: "id",
            label: "ID"
          },{
            key: "user",
            label: "用户名称"
          },{
            key: "content",
            label: "日志内容"
          },{
            key: "ip",
            label: "IP地址"
          },{
            key: "succeed",
            label: "状态"
          },{
            key: "gmt_create",
            label: "创建时间"
          },
        ]
      }
    },
    methods: {
      /**
       * 搜索
       */
      search(data){
        this.searchData = window._.cloneDeep(data)
      },
      selectionChange(selection) {
        this.selectIds = selection.map(item => item.id)
      },
      onDataChange(){
        this.$refs.searchFormRef.changeLoading(false)
      }
    }
  }
</script>
<style scoped lang="scss">
  .app-container{
    padding: 20px;
  }
</style>
