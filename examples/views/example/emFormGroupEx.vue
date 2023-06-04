<template>
  <div class="container">
    <h2>emFormGroupEx表单</h2>
    <div style="width: 750px">
      <em-form-group
          ref="formGroupRef"
          :form-data="formData"
          :form-rules="formRules"
          btnLoading
          @on-submit="onSubmit"
      >
      </em-form-group>
    </div>
  </div>
</template>

<script>
  import EmFormGroup from '../../../src/components/EmFormGroup'

  export default {
    name: 'EmFormGroupEx',
    components: {EmFormGroup},
    data() {
      return {
        formData: [
          {
            type: "input",
            key: "name",
            label: '名称'
          }, {
            type: "inputNumber",
            label: "金额",
            key: "price",
          }, {
            type: 'select',
            label: '学历',
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
            label: "日期",
            key: "date",
          }, {
            type: "time",
            label: "时间",
            key: "time",
          }, {
            type: "date",
            dateType: "datetime",
            label: "日期时间",
            key: "datetime",
          }, {
            type: "date",
            dateType: "daterange",
            label: "日期区间",
            key: "startDate",
            key2: "endDate",
          }, {
            type: "time",
            isRange: true,
            label: "时间区间",
            key: "startTime",
            key2: "endTime",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
          }, {
            type: "date",
            dateType: "monthrange",
            label: "月份区间",
            key: "startMonth",
            key2: "endMonth",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份"
          }, {
            type: "date",
            dateType: "datetimerange",
            label: "日期时间区间",
            key: "startDateTime",
            key2: "endDateTime",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
          },
        ],
        formRules: {
          name: {
            required: true
          },
          price: {
            required: true
          },
          education: {
            required: true
          },
          sex: {
            required: true
          },
          credential: {
            required: true
          }
        }
      }
    },
    mounted() {
    },
    methods: {
      onSubmit(data) {
        console.log(data)
        setTimeout(() => {
          this.$refs.formGroupRef.changeLoading(false)
        }, 500)
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
