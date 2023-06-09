<template>
  <div class="container">
    <h2>文件上传</h2>
    <em-upload
        v-model="id"
        fileName="files"
        multiple
        :length="5"
        :format="['jpg','xlsx']"
        listType="picture-card"
        @on-file-change="onfileChange"
    />
  </div>
</template>

<script>

  export default {
    name: 'EmUploadEx',
    data() {
      return {
        id: null
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
