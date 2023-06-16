<template>
  <div>
    <!--设置范围-->
    <el-dialog
        title="设置范围"
        :visible.sync="setDialogVisible"
        :before-close="handleSetClose"
        width="60%"
        append-to-body
    >
      <div class="pop-table-cont">
        <div class="search">
          <el-input
              placeholder="请输入采购单位名称"
              v-model="setSearch.companyName"
              class="input-with-select"
              clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="getSetCompanyList"></el-button>
          </el-input>
        </div>
        <div class="tableData pop-table-data">
          <el-table
              ref="setCompanyTable"
              :data="setCompanyList"
              style="width: 100%"
              :row-key="
            (row) => {
              return row.id;
            }
          "
              @select="handleSelectionChange"
              @select-all="handleSelectAllChange"
              border
              :row-style="tableRowStyle"
              :header-cell-style="tableHeaderStyle"
          >
            <el-table-column
                type="selection"
                width="60"
                align="center"
                :reserve-selection="true"
            ></el-table-column>

            <el-table-column prop="companyName" label="采购单位名称">
              <template slot-scope="scope">
                <span class="handleLook">{{ scope.row.companyName }}</span>
              </template>
            </el-table-column>

            <el-table-column
                prop="settlementCompanyName"
                label="结算单位名称"
            >
              <template slot-scope="scope">
                {{ scope.row.settlementCompanyName }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container clearfix">
          <el-pagination
              background
              @size-change="handleSizeChangeSet"
              @current-change="handleCurrentChangeSet"
              layout="total, sizes,prev, pager, next,jumper"
              :page-size="setPage.pageSize"
              :page-sizes="pageSizes"
              :current-page.sync="setPage.pageNum"
              :total="setPage.pageTotal"
          >
          </el-pagination>
        </div>
      </div>
      <div class="clearfix"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">{{
            $t("common.cancel")
          }}</el-button>
        <el-button type="primary" @click="confirm">{{
            $t("common.confirm")
          }}</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { deepClone } from "@/utils";
  import { pageSizes, tableHeaderStyle, tableRowStyle } from "@/utils/table";
  import { getCompanyListPage} from "@/api/organization";
  import {saveSettlementScope,getCompanySettlementScope} from "@/api/bdsettlementsetting"

  export default {
    props: {
      selectedData: {
        type: Array,
        default: () => [],
      },
      selectRow:{
        type: Object,
        default:{}
      }
    },
    data() {
      return {
        pageSizes,
        tableHeaderStyle,
        setDialogVisible:false,
        setSearch:{
          companyName:''
        },
        setCompanyList:[],
        setPage: {
          pageNo: 1,
          pageSize: 10,
          pageTotal: 0,
        },
        multipleSelection:[],//结算范围多选
        scopeCompanyList:[],//结算范围
        selectedCompany: [...this.selectedData],
      };
    },
    watch: {
      selectedData: {
        deep: true,
        handler(list) {
          this.constructSuppliers(list);
          if (this.setCompanyList.length > 0) {
            if(this.setDialogVisible){
              this.setSelected();
            }
          }

        },
      },
      setDialogVisible(val, oldVal) {
        if (val) {
          if (this.setCompanyList.length == 0) {
            this.getSetCompanyList();

          }
          this.setSelected();

        }
      },
    },
    created(){
      this.constructSuppliers(this.selectedCompany);
      this.getSetCompanyList(true);
    },
    methods: {
      tableRowStyle,
      async getSetCompanyList(reset=false){
        if(reset){
          this.setPage.pageNo = 1;
        }
        const res = await getCompanyListPage(this.setPage.pageNo,this.setPage.pageSize,this.setSearch);
        if(res.data){
          this.setCompanyList=res.data.records;
          this.setPage.pageTotal=res.data.total;
        }else{
          this.companyList=[];
        }
      },
      handleSetClose(){
        this.setDialogVisible=false;

      },
      handleCurrentChangeSet(pageNo) {
        this.setPage.pageNo = pageNo;
        this.getSetCompanyList().then(()=>{
          this.setSelected();
        });

      },
      handleSizeChangeSet(pageSize) {
        this.setPage.pageSize = pageSize;
        this.getSetCompanyList().then(()=>{
          this.setSelected();
        });
      },
      toggleDialog() {
        this.setDialogVisible = true;
      },
      constructSuppliers(list) {
        //   this.arrSupplier = list;

        let arr=deepClone(list);
        let data=[];
        arr.forEach(item=>{
          data.push({
            id:item.companyId,
            companyName:item.companyName,
            companyCode:item.companyCode,
            companyId:item.companyId
          })
        });
        this.selectedCompany=deepClone(data);
      },
      //将table中被选中的公司的checkbox选中
      setSelected() {
        this.$nextTick(() => {
          this.$refs.setCompanyTable.clearSelection();
          this.setCompanyList.map((item, index) => {
            this.selectedCompany.map((sitem) => {
              if (item.id == sitem.id) {
                this.$refs.setCompanyTable.toggleRowSelection(
                    this.setCompanyList[index],
                    true
                );
              }
            });
          });
        });
      },
      //修改checkbox
      handleSelectionChange(list) {
        this.setCompanyList.map((item) => {
          let index = list.findIndex((a) => a.id == item.id);
          let sIndex = this.selectedCompany.findIndex(
              (a) => a.id == item.id
          );
          //选中
          if (index > -1) {
            if (sIndex == -1) {
              this.selectedCompany.push(item);
            }
          }
          //取消
          else {
            if (sIndex > -1) {
              this.selectedCompany.splice(sIndex, 1);
            }
          }
        });
      },
      handleSelectAllChange(list){
        //取消全选
        if (list.length == 0) {
          this.setCompanyList.map((item) => {
            let index = this.selectedCompany.findIndex(
                (a) => a.id == item.id
            );
            if (index > -1) {
              this.selectedCompany.splice(index, 1);
            }
          });
        }
        //全选
        else {
          this.setCompanyList.map((item) => {
            let index = this.selectedCompany.findIndex(
                (a) => a.id == item.id
            );
            if (index == -1) {
              this.selectedCompany.push(item);
            }
          });
        }
      },
      async confirm() {
        if (!this.selectedCompany || this.selectedCompany.length==0) {
          this.$message({
            type: "warning",
            message: this.$t("common.isSelectedRow")
          });
          return;
        }

        let data={
          bdSettlementSettingCreateParamList:[],
          settlementCompanyId:this.selectRow.id
        }
        this.selectedCompany.forEach(item=>{
          data.bdSettlementSettingCreateParamList.push({
            companyCode:item.companyCode,
            companyId:item.id,
            companyName:item.companyName,
            settlementCompanyId:this.selectRow.id,
            settlementCompanyName:this.selectRow.companyName
          })
        })
        const res=await saveSettlementScope(data);
        if(res.code==200){
          this.$emit("getCompany");
          this.setDialogVisible=false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pop-table-cont{
    .pop-table-data{
      max-height:50vh;
      overflow: auto;
    }
    .search{
      width:100%;
      height:auto;
      margin-bottom:15px;
    }
  }
  .pagination-container {
    float: right;
    margin-top: 10px;
  }
</style>

