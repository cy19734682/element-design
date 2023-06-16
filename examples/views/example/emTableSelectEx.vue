<template>
  <div class="container">
    <h2>表格选择器</h2>
    <div class="form-box">
      <em-table-select
          ref="tableSelectRef"
          v-model="deptId"
          :searchForm="searchForm"
          :columns="columns"
          multiple
          url="/bt-table-page"
          @on-data-change="onDataChange"
          @changeRow="changeRow"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'emTableSelectEx',
  data() {
    return {
      deptId: [82],
     /* deptId: [
        {
          id:82,
          name:"foot_nav3.png"
        },
        {
          id:81,
          name:"head_back.png"
        }
      ],*/
      name: "name",
      searchForm:[
        {
          type: 'input',
          key: 'name',
          label: '商品名称',
        }
      ],
      columns: [
        {
          key: "id",
          label: "ID"
        },{
          key: "name",
          label: "名称"
        },{
          key: "mimeType",
          label: "类型"
        },{
          key: "extension",
          label: "后缀"
        }
      ],
      props: {
        key: 'id',
        label: 'name'
      }
    }
  },
  mounted() {
  },
  methods:{
    onDataChange(d){
      console.log(d)
    },
    changeRow(d){
      console.log(d)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 40px;
  overflow-y: auto;
  height: 100%;
}
</style>
