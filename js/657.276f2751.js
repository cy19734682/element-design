"use strict";(self["webpackChunk_yuechan_element_design"]=self["webpackChunk_yuechan_element_design"]||[]).push([[657],{68832:(e,n,t)=>{t.d(n,{A:()=>c});var a=function(){var e=this,n=e._self._c;return n("div",{staticClass:"source-container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"source-box"},[n("highlight-code",{attrs:{lang:"vue"}},[e._v(e._s(e.code))])],1),n("div",{staticClass:"example-control",class:{show:e.show},on:{click:function(n){e.show=!e.show}}},[n("span",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}]},[n("i",{staticClass:"el-icon-arrow-down"}),e._v(" "+e._s(e.$t("button.viewSourceCode"))+" ")]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},[n("i",{staticClass:"el-icon-arrow-up"}),e._v(" "+e._s(e.$t("button.hideSourceCode"))+" ")])])])},s=[];const o={name:"sourceCodeView",props:{code:{default:""}},data(){return{show:!1}}},l=o;var i=t(81656),r=(0,i.A)(l,a,s,!1,null,"642e412d",null);const c=r.exports},53657:(e,n,t)=>{t.r(n),t.d(n,{default:()=>h});var a=function(){var e=this,n=e._self._c;return n("div",{staticClass:"container"},[n("el-card",{attrs:{"body-style":{padding:"0px"}},scopedSlots:e._u([{key:"header",fn:function(){return[n("div",[e._v("分页表格")])]},proxy:!0}])},[n("div",{staticClass:"card-body"},[n("div",{staticClass:"table-container"},[n("div",{staticClass:"app-search-table"},[n("em-search-form",{ref:"searchFormRef",attrs:{size:"mini","form-data":e.searchFormData,btnLoading:""},on:{"on-search":e.search},scopedSlots:e._u([{key:"beginBtnGroup",fn:function(){return[n("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(n){return e.addData()}}},[e._v(" 新增 ")]),n("el-button",{attrs:{type:"danger",size:"mini",disabled:!(e.selectIds&&e.selectIds.length>0)},on:{click:function(n){return e.delData()}}},[e._v(" 删除 ")])]},proxy:!0}])}),n("div",{staticStyle:{margin:"10px 0"}},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.exportTableExcel()}}},[e._v(" TABLE导出Excel")]),n("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(n){return e.exportJsonExcel()}}},[e._v(" JSON导出Excel")]),n("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(n){return e.exportJsonZip()}}},[e._v(" zip导出")])],1),n("em-table-page",{ref:"tableRef",attrs:{id:"tablePage",selection:"",url:e.serverUrl+"/bt-table-page",columns:e.columns,searchData:e.searchData,orderKey:""},on:{"row-click":e.rowClick,"selection-change":e.selectionChange,"on-data-change":e.onDataChange}})],1)])]),n("div",{staticClass:"card-footer"},[n("source-code-view",{attrs:{code:e.code1}})],1)]),n("em-form-modal",{ref:"formModalRef",attrs:{title:e.activeRow.id?"编辑":"新增","form-data":e.formData,"form-rules":e.formRules,btnLoading:""},on:{"on-submit":e.onSubmit,"on-close":e.onClose}})],1)},s=[],o=t(56179),l=t(95353),i=t(68832);const r="\n<template>\n<div class=\"container\">\n  <div class=\"table-container\">\n    <div class=\"app-search-table\">\n      <em-search-form ref=\"searchFormRef\" size=\"mini\" :form-data=\"searchFormData\" btnLoading @on-search=\"search\">\n        <template #beginBtnGroup>\n          <el-button type=\"success\" size=\"mini\" @click=\"addData()\"> 新增 </el-button>\n          <el-button\n            type=\"danger\"\n            size=\"mini\"\n            :disabled=\"!(selectIds && selectIds.length > 0)\"\n            @click=\"delData()\"\n          >\n            删除\n          </el-button>\n        </template>\n      </em-search-form>\n      <div style=\"margin: 10px 0\">\n        <el-button type=\"primary\" size=\"mini\" @click=\"exportTableExcel()\"> TABLE导出Excel</el-button>\n        <el-button type=\"warning\" size=\"mini\" @click=\"exportJsonExcel()\"> JSON导出Excel</el-button>\n        <el-button type=\"warning\" size=\"mini\" @click=\"exportJsonZip()\"> zip导出</el-button>\n      </div>\n      <em-table-page\n        id=\"tablePage\"\n        ref=\"tableRef\"\n        selection\n        :url=\"serverUrl + '/bt-table-page'\"\n        :columns=\"columns\"\n        :searchData=\"searchData\"\n        orderKey=\"\"\n        @row-click=\"rowClick\"\n        @selection-change=\"selectionChange\"\n        @on-data-change=\"onDataChange\"\n      />\n    </div>\n  </div>\n  <em-form-modal\n    ref=\"formModalRef\"\n    :title=\"activeRow.id ? '编辑' : '新增'\"\n    :form-data=\"formData\"\n    :form-rules=\"formRules\"\n    btnLoading\n    @on-submit=\"onSubmit\"\n    @on-close=\"onClose\"\n  >\n  </em-form-modal>\n</div>\n</template>\n<script>\nimport { exportTableToExcel, exportJsonToExcel, exportTxtToZip } from '../../../src'\nimport { mapGetters } from 'vuex'\n\nexport default {\n  name: 'EmTablePageEx',\n  computed: {\n    ...mapGetters(['serverUrl'])\n  },\n  data() {\n    return {\n      activeRow: {},\n      selectIds: [],\n      searchData: {},\n      searchFormData: [\n        {\n          type: 'input',\n          key: 'name',\n          placeholder: '名称'\n        },\n        {\n          type: 'input',\n          placeholder: '类型',\n          key: 'mimeType'\n        },\n        {\n          type: 'select',\n          placeholder: '后缀',\n          key: 'extension',\n          options: [\n            {\n              label: 'jpg',\n              val: '.jpg'\n            },\n            {\n              label: 'html',\n              val: '.html'\n            },\n            {\n              label: 'png',\n              val: '.png'\n            },\n            {\n              label: 'jpeg',\n              val: '.jpeg'\n            }\n          ]\n        }\n      ],\n      columns: [\n        {\n          key: 'id',\n          label: 'ID',\n          minWidth: 100\n        },\n        {\n          key: 'name',\n          label: '名称',\n          minWidth: 100\n        },\n        {\n          key: 'mimeType',\n          label: '类型',\n          minWidth: 100\n        },\n        {\n          key: 'extension',\n          label: '后缀',\n          minWidth: 100\n        },\n        {\n          label: '操作',\n          width: 250,\n          render: (h, params) => {\n            return h('div', [\n              h(\n                'el-button',\n                {\n                  props: {\n                    type: 'warning',\n                    size: 'mini'\n                  },\n                  on: {\n                    click: (e) => {\n                      e.stopPropagation()\n                      this.activeRow = params.row\n                      this.$refs.formModalRef.updateDataGroup(params.row)\n                      this.$refs.formModalRef.open()\n                    }\n                  }\n                },\n                '编辑'\n              ),\n              h(\n                'el-button',\n                {\n                  props: {\n                    type: 'danger',\n                    size: 'mini'\n                  },\n                  on: {\n                    click: (e) => {\n                      e.stopPropagation()\n                      this.delData(params.row.id)\n                    }\n                  }\n                },\n                '删除'\n              )\n            ])\n          }\n        }\n      ],\n      formData: [\n        {\n          type: 'input',\n          label: '名称',\n          key: 'name'\n        },\n        {\n          type: 'input',\n          label: '类型',\n          key: 'mimeType'\n        },\n        {\n          type: 'select',\n          label: '后缀',\n          key: 'extension',\n          options: [\n            {\n              label: 'jpg',\n              val: '.jpg'\n            },\n            {\n              label: 'html',\n              val: '.html'\n            },\n            {\n              label: 'png',\n              val: '.png'\n            },\n            {\n              label: 'jpeg',\n              val: '.jpeg'\n            }\n          ]\n        }\n      ],\n      formRules: {\n        name: {\n          required: true\n        },\n        mimeType: {\n          required: true\n        },\n        extension: {\n          required: true\n        }\n      }\n    }\n  },\n  methods: {\n    /**\n     * 搜索\n     */\n    search(data) {\n      this.searchData = window._.cloneDeep(data)\n    },\n    rowClick(row) {\n      console.log(row)\n    },\n    /**\n     * 复选框选择回调\n     * @param selection\n     */\n    selectionChange(selection) {\n      console.log(selection)\n      this.selectIds = selection.map((item) => item.id)\n    },\n    /**\n     * 列表加载完成回调\n     */\n    onDataChange() {\n      this.$refs.searchFormRef.changeLoading(false)\n    },\n    addData() {\n      this.$refs.formModalRef.open()\n    },\n    /**\n     * 删除数据\n     */\n    delData(id) {\n      let ids = ''\n      if (this.isValidVal(id)) {\n        ids = id\n      } else {\n        if (this.selectIds.length <= 0) {\n          this.$message.warning('请选择数据')\n          return\n        }\n        ids = this.selectIds.join()\n      }\n      this.$msgbox\n        .confirm('是否确认删除', '提示')\n        .then(() => {\n          this.$request\n            .delete(this.serverUrl + '/bt-table', { ids })\n            .then(() => {\n              this.$message.success('删除成功')\n              this.$refs.tableRef.getTableData()\n            })\n            .catch()\n        })\n        .catch((e) => {\n          console.log(e)\n        })\n    },\n    /**\n     * 关闭弹框\n     */\n    onClose() {\n      setTimeout(() => {\n        this.$refs.formModalRef.resetForm()\n        this.activeRow = {}\n      }, 200)\n    },\n    /**\n     * 新增 or 编辑\n     */\n    onSubmit(data) {\n      let method = 'post'\n      if (this.activeRow.id) {\n        method = 'put'\n        data['id'] = this.activeRow.id\n      }\n      this.$request[method](this.serverUrl + '/bt-table', data, { isShowLoading: true })\n        .then((e) => {\n          this.$message.success(method === 'post' ? '新增成功' : '编辑成功')\n          this.$refs.tableRef.getTableData()\n          this.$refs.formModalRef.changeLoading(false)\n          this.$refs.formModalRef.close()\n          this.onClose()\n        })\n        .catch((e) => {\n          this.$refs.formModalRef.changeLoading(false)\n        })\n    },\n    /**\n     * 导出Excel\n     */\n    exportJsonExcel() {\n      const dataT = this.$refs.tableRef.dataT || []\n      let columns = this.columns.filter((e) => e.key)\n      let header = columns.map((e) => e.label)\n      let headValue = columns.map((e) => e.key)\n      let data = dataT.map((v) => headValue.map((j) => v[j]))\n      let filename = '表格数据'\n      exportJsonToExcel({ header, data, filename })\n    },\n    /**\n     * 导出zip\n     */\n    exportJsonZip() {\n      const dataT = this.$refs.tableRef.dataT || []\n      let columns = this.columns.filter((e) => e.key)\n      let header = columns.map((e) => e.label)\n      let headValue = columns.map((e) => e.key)\n      let data = dataT.map((v) => headValue.map((j) => v[j]))\n      let filename = '表格数据'\n      exportTxtToZip(header, data, filename, filename)\n    },\n    /**\n     * 导出Excel\n     */\n    exportTableExcel() {\n      exportTableToExcel('tablePage', 1, 4, '表格数据')\n    }\n  }\n}\n<\/script>\n<style scoped lang=\"scss\">\n\t.table-container {\n\t\tposition: relative;\n\t\theight: 800px;\n\t}\n</style>\n",c={name:"EmTablePageEx",components:{sourceCodeView:i.A},computed:{...(0,l.L8)(["serverUrl"])},data(){return{code1:r,activeRow:{},selectIds:[],searchData:{},searchFormData:[{type:"input",key:"name",placeholder:"名称"},{type:"input",placeholder:"类型",key:"mimeType"},{type:"select",placeholder:"后缀",key:"extension",options:[{label:"jpg",val:".jpg"},{label:"html",val:".html"},{label:"png",val:".png"},{label:"jpeg",val:".jpeg"}]}],columns:[{key:"id",label:"ID",minWidth:100},{key:"name",label:"名称",minWidth:100},{key:"mimeType",label:"类型",minWidth:100},{key:"extension",label:"后缀",minWidth:100},{label:"操作",width:250,render:(e,n)=>e("div",[e("el-button",{props:{type:"warning",size:"mini"},on:{click:e=>{e.stopPropagation(),this.activeRow=n.row,this.$refs.formModalRef.updateDataGroup(n.row),this.$refs.formModalRef.open()}}},"编辑"),e("el-button",{props:{type:"danger",size:"mini"},on:{click:e=>{e.stopPropagation(),this.delData(n.row.id)}}},"删除")])}],formData:[{type:"input",label:"名称",key:"name"},{type:"input",label:"类型",key:"mimeType"},{type:"select",label:"后缀",key:"extension",options:[{label:"jpg",val:".jpg"},{label:"html",val:".html"},{label:"png",val:".png"},{label:"jpeg",val:".jpeg"}]}],formRules:{name:{required:!0},mimeType:{required:!0},extension:{required:!0}}}},methods:{search(e){this.searchData=window._.cloneDeep(e)},rowClick(e){console.log(e)},selectionChange(e){console.log(e),this.selectIds=e.map((e=>e.id))},onDataChange(){this.$refs.searchFormRef.changeLoading(!1)},addData(){this.$refs.formModalRef.open()},delData(e){let n="";if(this.isValidVal(e))n=e;else{if(this.selectIds.length<=0)return void this.$message.warning("请选择数据");n=this.selectIds.join()}this.$msgbox.confirm("是否确认删除","提示").then((()=>{this.$request.delete(this.serverUrl+"/bt-table",{ids:n}).then((()=>{this.$message.success("删除成功"),this.$refs.tableRef.getTableData()})).catch()})).catch((e=>{console.log(e)}))},onClose(){setTimeout((()=>{this.$refs.formModalRef.resetForm(),this.activeRow={}}),200)},onSubmit(e){let n="post";this.activeRow.id&&(n="put",e["id"]=this.activeRow.id),this.$request[n](this.serverUrl+"/bt-table",e,{isShowLoading:!0}).then((e=>{this.$message.success("post"===n?"新增成功":"编辑成功"),this.$refs.tableRef.getTableData(),this.$refs.formModalRef.changeLoading(!1),this.$refs.formModalRef.close(),this.onClose()})).catch((e=>{this.$refs.formModalRef.changeLoading(!1)}))},exportJsonExcel(){const e=this.$refs.tableRef.dataT||[];let n=this.columns.filter((e=>e.key)),t=n.map((e=>e.label)),a=n.map((e=>e.key)),s=e.map((e=>a.map((n=>e[n])))),l="表格数据";(0,o.JL)({header:t,data:s,filename:l})},exportJsonZip(){const e=this.$refs.tableRef.dataT||[];let n=this.columns.filter((e=>e.key)),t=n.map((e=>e.label)),a=n.map((e=>e.key)),s=e.map((e=>a.map((n=>e[n])))),l="表格数据";(0,o.hn)(t,s,l,l)},exportTableExcel(){(0,o.p9)("tablePage",1,4,"表格数据")}}},d=c;var m=t(81656),p=(0,m.A)(d,a,s,!1,null,"947eae9c",null);const h=p.exports}}]);