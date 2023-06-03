<template>
  <div class="container">
    <h2>自定义级联选择</h2>
    <em-cascader
        v-model="value"
        :data="data"
        @on-val-change="onValChange"
        @on-name-change="onNameChange"
    />
    <div>{{value}}</div>
    <div>{{name}}</div>
  </div>
</template>

<script>
  import EmCascader from '../../../src/components/EmCascader'

  export default {
    name: 'EmCascaderEx',
    components: {EmCascader},
    data() {
      return {
        value: null,
        name:null,
        data:[
          {id:1,name:"爷爷",children:[{id:2,name:'父亲'},{id:3,name:'叔叔'}]}
        ]
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
<style lang="scss" scoped>
  .container {
    padding: 40px;
  }
</style>
