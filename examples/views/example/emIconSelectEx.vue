<template>
  <div class="container">
    <h2>自定义图标</h2>
    <div class="form-box">
      <em-icon-select v-model="icon"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EmIconSelectEx',
  data() {
    return {
      icon: null
    }
  },
  mounted() {
  },
  methods:{
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
