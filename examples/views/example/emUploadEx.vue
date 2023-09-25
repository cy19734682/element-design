<template>
  <div class="container">
    <h2>文件上传</h2>
    <em-upload
        v-model="id"
        fileName="files"
        upload-fetch
        url="/v1/upload/fetchFileQn"
        @on-file-change="onfileChange"
    />
  </div>
</template>

<script>

  export default {
    name: 'EmUploadEx',
    data() {
      return {
        id: 'http://cdn.cy1973.cn/screen-designer/image/1695624399509logo.svg'
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
