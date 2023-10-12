<template>
  <div class="container">
    <h2>文件上传</h2>
    <em-upload
        v-model="id"
        fileName="files"
        listType="picture-card"
        :autoUpload="false"
        @on-file-change="onfileChange"
    />
  </div>
</template>

<script>

  export default {
    name: 'EmUploadEx',
    data() {
      return {
        id: '/bg/2023-09/651297382d5f001095be7c90.jpg'
      }
    },
    methods:{
      onfileChange(data){
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
