<template>
  <div class="container">
    <h2>下拉选择输入框</h2>
    <div class="form-box">
      <em-select-input
          v-model="value"
          url="/brand"
          optionVal="label"
          optionLabel="name"
          @on-val-change="onValChange"
          @on-change="onChange"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'emSelectInputEx',
  data() {
    return {
      value:{},
      data: [
        {val:'1',label:'小学'},
        {val:'2',label:'初中'},
        {val:'3',label:'高中'},
        {val:'4',label:'大学'},
      ]
    }
  },
  mounted() {
  },
  methods:{
    onValChange(val){
      console.log(val)
    },
    onChange(val){
      console.log(val)
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
