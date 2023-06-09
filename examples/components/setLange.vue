<template>
  <div class="lang">
    <el-radio-group v-model="language">
      <el-radio label="zh">中文</el-radio>
      <el-radio label="en">English</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'setLange',
    computed: {
      language:{
        get(){
          return this.$store.getters.language
        },
        set(v){
          this.$i18n.locale = v
          this.$store.dispatch('app/setLanguage', v)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .lang{
    padding: 20px 0;
    text-align: right;
  }
</style>
