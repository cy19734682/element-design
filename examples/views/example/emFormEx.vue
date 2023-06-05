<template>
  <div class="container">
    <h2>自定义表单</h2>
    <div style="width: 750px;">
      <em-form :form-data="formData" :formRules="formRules" show-inline-ok-bt show-inline-clear-bt @on-submit="onSubmit" @on-item-change="onItemChange">
        <template #sgInput="{dataGroup}">
          <el-input v-model="dataGroup.sgInput" />
        </template>
      </em-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EmFormEx',
  data() {
    return {
      formData: [
        {
          type: "txt",
          label: "信息",
          val: "这是一条占位信息",
        },
        {
          type: "input",
          label: "名称",
          key: "name",
          defaultVal:"121"
        },
        {
          type: "inputNumber",
          label: "金额",
          key: "price",
        },
        {
          type: 'select',
          label: '学历',
          key: 'education',
          options: [
            {
              label: '高中',
              val: 1
            },
            {
              label: '专科',
              val: 2
            },
            {
              label: '本科',
              val: 3
            },
            {
              label: '研究生',
              val: 4
            },
            {
              label: '博士',
              val: 5,
              disabled: true
            }
          ]
        },
        {
          type: 'radio',
          key: 'sex',
          label: '性别',
          options: [
            {
              label: '男',
              val: 1
            },
            {
              label: '女',
              val: 0
            }
          ]
        },
        {
          type: 'checkbox',
          label: '证书',
          key: 'credential',
          checkboxType:"button",
          options: [
            {
              label: '英语四级',
              val: 'CET4',
            }, {
              label: '英语六级',
              val: 'CET6',
              disabled: true
            }, {
              label: 'C1驾照',
              val: 'C1',
              disabled: true
            }
          ]
        },
        {
          type: "upload",
          label: "文件上传",
          key: "imgUrl",
        },
        {
          type: "area",
          label: "行政区域",
          key: "areaCode",
          key2: "areaName",
        },
        {
          type: "cascader",
          label: "自定义级联",
          url: "/dept",
          key: "deptId",
          key2: "deptName",
          checkStrictly: true
        },
        {
          type: "bdMap",
          label: "位置",
          key: "lng",
          key2: "lat",
          key3: "address"
        },
        {
          type: "textarea",
          label: "备注",
          key: "remark",
        },
        {
          type: "editor",
          label: "内容",
          key: "content",
        },
        {
          type: "date",
          dateType:"datetime",
          label: "日期时间",
          key: "datetime",
        },
        {
          type: "date",
          dateType:"daterange",
          label: "日期区间",
          key: "startDate",
          key2: "endDate",
        },
        {
          type: "date",
          dateType:"monthrange",
          label: "月份区间",
          key: "startMonth",
          key2: "endMonth",
        },
        {
          type: "custom",
          label: "自定义",
          key: "sgInput",
          slotName: "sgInput"
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
        },
        imgUrl: {
          required: true
        },
        areaCode: {
          required: true
        },
        deptId: {
          required: true
        },
        lng: {
          required: true
        },
        content: {
          required: true
        }
      }
    }
  },
  mounted() {
  },
  methods:{
    onItemChange(data){
      console.log(data)
    },
    onSubmit(data){
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 40px;
}
</style>
