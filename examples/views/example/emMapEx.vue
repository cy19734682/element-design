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
  import EmBaiduMap from '../../../src/components/EmBaiduMap'
  export default {
    name: 'EmMapEx',
    components: {EmBaiduMap},
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
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
