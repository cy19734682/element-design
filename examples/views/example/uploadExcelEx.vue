<template>
  <div class="container">
    <h2>excel上传</h2>
    <EmUploadExcel :onSuccess="onSuccess"/>
  </div>
</template>

<script>

  export default {
    name: 'uploadExcelEx',
    data() {
      return {
        value: "hello"
      }
    },
    created() {
    },
    methods:{
      onSuccess(data){
        console.log(data)
      }
    }
  }
</script>
<style lang="less" scoped>
  .container{
    padding: 40px;
  }
</style>
