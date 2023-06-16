<template>
  <div class="container">
    <h2>百度地图</h2>
    <em-baidu-map
        v-model="value"
        @on-val-change="onValChange"
        @on-name-change="locationChange"
    />
    <div>{{value}}</div>
  </div>
</template>

<script>
  export default {
    name: 'EmMapEx',
    data() {
      return {
        value: {
          lng: 102.554865,
          lat: 26.567981
        },
      }
    },
    methods:{
      onValChange(data){
        console.log(data)
      },
      locationChange(data){
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
