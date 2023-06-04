<template>
  <div class="container">
    <h2>省市区选择</h2>
    <em-cascader-area
        v-model="value"
        :level="2"
        @on-val-change="onValChange"
        @on-name-change="onNameChange"
    />
    <div>{{value}}</div>
    <div>{{name}}</div>
  </div>
</template>

<script>
  import EmCascaderArea from '../../../src/components/EmCascaderArea'

  export default {
    name: 'EmCascaderAreaEx',
    components: {EmCascaderArea},
    data() {
      return {
        value: [ "150000", "150100", "150104" ],
        name:null
      }
    },
    methods:{
      onValChange(data){
        console.log(data)
      },
      onNameChange(data){
        console.log(data)
        this.name = data
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
