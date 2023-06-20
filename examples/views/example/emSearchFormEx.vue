<template>
  <div class="container">
    <h2>搜索表单</h2>
    <div>
      <em-search-form ref="searchFormRef" :form-data="formData" btnLoading @on-search="search">
        <template slot="beginBtnGroup">
          <el-button type="primary">添加</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </em-search-form>

      <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'EmSearchFormEx',
    data() {
      return {
        dates: [],
        formData: [
          {
            type: "input",
            key: "name",
            placeholder: '名称'
          }, {
            type: "inputNumber",
            placeholder: "金额",
            key: "price",
          }, {
            type: 'select',
            placeholder: '学历',
            key: 'education',
            options: [
              {
                label: '高中',
                val: 1
              }, {
                label: '专科',
                val: 2
              }, {
                label: '本科',
                val: 3
              }, {
                label: '研究生',
                val: 4
              }, {
                label: '博士',
                val: 5,
                disabled: true
              }
            ]
          }, {
            type: "date",
            placeholder: "日期",
            key: "date",
          }, {
            type: "time",
            placeholder: "时间",
            key: "time",
          }, {
            type: "date",
            dateType: "datetime",
            placeholder: "日期时间",
            key: "datetime",
          }, {
            type: "date",
            dateType: "daterange",
            placeholder: "日期区间",
            key: "startDate",
            key2: "endDate",
          }, {
            type: "time",
            isRange: true,
            key: "startTime",
            key2: "endTime",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
          }, {
            type: "date",
            dateType: "monthrange",
            key: "startMonth",
            key2: "endMonth",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份"
          }, {
            type: "date",
            dateType: "datetimerange",
            key: "startDateTime",
            key2: "endDateTime",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
          },
        ]
      }
    },
    mounted() {
    },
    methods: {
      search(data) {
        console.log(data)
        setTimeout(()=>{
          this.$refs.searchFormRef.changeLoading(false)
        },500)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    padding: 40px;
  }
</style>
