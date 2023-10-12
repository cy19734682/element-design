<template>
  <div class="app-container">
    <div class="app-search-table">
      <em-search-form ref="searchFormRef" :form-data="searchFormData" btnLoading @on-search="search">
        <template slot="beginBtnGroup">
          <el-button type="success " @click="addData()">
            新增
          </el-button>
          <el-button type="danger" :disabled="!(selectIds && selectIds.length > 0)" @click="delData()">
            删除
          </el-button>
          <el-button type="primary"  @click="exportTableExcel()">
            TABLE导出
          </el-button>
          <el-button type="warning"  @click="exportJsonExcel()">
            JSON导出
          </el-button>
          <el-button type="warning"  @click="exportJsonZip()">
            zip导出
          </el-button>
        </template>
      </em-search-form>
      <em-table-page
          id="tablePage"
          ref="tableRef"
          radio
          url="/bt-table-page"
          :isTable="false"
          :row-gutter="15"
          :columns="columns"
          :searchData="searchData"
          orderKey=""
          @row-click="rowClick"
          @selection-change="selectionChange"
          @on-data-change="onDataChange"
      />
    </div>
    <em-form-modal
        ref="formModalRef"
        :title="activeRow.id?'编辑':'新增'"
        :form-data="formData"
        :form-rules="formRules"
        btnLoading
        @on-submit="onSubmit"
        @on-close="onClose"
    >
    </em-form-modal>
  </div>
</template>

<script>
  import {exportTableToExcel,exportJsonToExcel} from '../../../src/methods/export2Excel'
  import {exportTxtToZip} from '../../../src/methods/export2Zip'
  export default {
    name: "emRowPageEx",
    data() {
      return {
        activeRow:{},
        selectIds:[],
        searchData:{},
        searchFormData:[
          {
            type: "input",
            key: "name",
            placeholder: '名称'
          }, {
            type: "input",
            placeholder: "类型",
            key: "mimeType",
          },{
            type: 'select',
            placeholder: '后缀',
            key: 'extension',
            options: [
              {
                label: 'jpg',
                val: '.jpg'
              }, {
                label: 'html',
                val: '.html'
              }, {
                label: 'png',
                val: '.png'
              }, {
                label: 'jpeg',
                val: '.jpeg'
              }
            ]
          },
        ],
        columns:[
          {
            key: "id",
            label: "ID",
            render: (h, params) => {
              return h(
                  'el-popover',
                  {
                    props: {
                      trigger: 'hover'
                    }
                  },
                  [
                    h('el-image', {
                      props: {
                        fit: 'fill'
                      },
                      attrs: {
                        src: window.global.serverImg + params.row.file_path
                      }
                    }),
                    h('el-image', {
                      slot: 'reference',
                      props: {
                        fit: 'fill'
                      },
                      style: {
                        width: '100%',
                        height: '200px',
                        margin: '0 auto'
                      },
                      attrs: {
                        src: window.global.serverImg + params.row.file_path
                      }
                    })
                  ]
              )
            }
          },
          {
            key: "name",
            label: "名称"
          }
        ],
        formData: [
          {
            type: "input",
            label: "名称",
            key: "name",
          },
          {
            type: "input",
            label: "类型",
            key: "mimeType",
          },
          {
            type: 'select',
            label: '后缀',
            key: 'extension',
            options: [
              {
                label: 'jpg',
                val: '.jpg'
              }, {
                label: 'html',
                val: '.html'
              }, {
                label: 'png',
                val: '.png'
              }, {
                label: 'jpeg',
                val: '.jpeg'
              }
            ]
          }
        ],
        formRules: {
          name: {
            required: true
          },
          mimeType: {
            required: true
          },
          extension: {
            required: true
          }
        }
      }
    },
    methods: {
      /**
       * 搜索
       */
      search(data){
        this.searchData = window._.cloneDeep(data)
      },
      rowClick(row){
        console.log(row)
      },
      /**
       * 复选框选择回调
       * @param selection
       */
      selectionChange(selection) {
        console.log(selection)
        this.selectIds = selection.map(item => item.id)
      },
      /**
       * 列表加载完成回调
       */
      onDataChange(){
        this.$refs.searchFormRef.changeLoading(false)
      },
      addData(){
        this.$refs.formModalRef.open()
      },
      /**
       * 删除数据
       */
      delData(id){
        let ids = ''
        if (this.isValidVal(id)) {
          ids = id
        } else {
          if (this.selectIds.length <= 0) {
            this.$message.warning("请选择数据")
            return
          }
          ids = this.selectIds.join()
        }
        this.$msgbox.confirm('是否确认删除','提示').then(() => {
          this.$request.delete('/bt-table',{ids}).then(e=>{
            if(e.code === 0){
              this.$message.success('删除成功')
              this.$refs.tableRef.getTableData()
            }else {
              this.$message.error(e.msg || '删除失败')
            }
          }).catch()
        }).catch(e => {
          console.log(e)
        })
      },
      /**
       * 关闭弹框
       */
      onClose(){
        setTimeout(()=>{
          this.$refs.formModalRef.resetForm()
          this.activeRow = {}
        },200)
      },
      /**
       * 新增 or 编辑
       */
      onSubmit(data){
        let method = 'post'
        if(this.activeRow.id){
          method = 'put'
          data['id'] = this.activeRow.id
        }
        this.$request[method]('/bt-table',data , {isShowLoading: true}).then(e=>{
          if(e.code === 0){
            this.$message.success(method === 'post' ?'新增成功': '编辑成功')
            this.$refs.tableRef.getTableData()
            this.$refs.formModalRef.changeLoading(false)
            this.$refs.formModalRef.close()
            this.onClose()
          }else {
            this.$refs.formModalRef.changeLoading(false)
            this.$message.error(e.msg || method === 'post' ?'新增失败': '编辑失败')
          }
        }).catch(e => {
          this.$refs.formModalRef.changeLoading(false)
        })
      },
      /**
       * 导出Excel
       */
      exportJsonExcel(){
        const dataT = this.$refs.tableRef.dataT || []
        let columns = this.columns.filter(e => e.key)
        let header = columns.map(e => e.label)
        let headValue = columns.map(e => e.key)
        let data = dataT.map((v) => headValue.map((j) => v[j]))
        let filename = '表格数据'
        exportJsonToExcel({header, data, filename})
      },
      /**
       * 导出zip
       */
      exportJsonZip(){
        const dataT = this.$refs.tableRef.dataT || []
        let columns = this.columns.filter(e => e.key)
        let header = columns.map(e => e.label)
        let headValue = columns.map(e => e.key)
        let data = dataT.map((v) => headValue.map((j) => v[j]))
        let filename = '表格数据'
        exportTxtToZip(header,data,filename,filename)
      },
      /**
       * 导出Excel
       */
      exportTableExcel(){
        exportTableToExcel('tablePage',1,4,'表格数据')
      }
    }
  }
</script>
<style scoped lang="scss">
  .app-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
