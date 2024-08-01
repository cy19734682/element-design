<template>
  <div class="app-header">
    <div class="app-head-row">
      <div class="back">
        <el-button @click="back" size="mini" icon="el-icon-arrow-left" v-if="curPath !== '/index'">返回</el-button>
      </div>
      <setServer />
      <setLange />
      <div class="user-info">
        <div v-if="token">
          {{nickname}}
          <el-button @click="logout">注销</el-button>
        </div>
        <el-button v-else type="primary" @click="login"> {{ $t('login.logIn') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import setLange from '../components/setLange'
  import setServer from '../components/setServer.vue'
  export default {
    name: 'appHeader',
    components: {
      setLange,
      setServer
    },
    computed:{
      ...mapGetters([
        'nickname',
        'token'
      ]),
      curPath(){
        return this.$router.history.current.path
      }
    },
    methods: {
      login(){
        this.$router.push({
          path: '/login',
        })
      },
      back(){
        this.$router.go(-1)
      },
      logout(){
        this.$store.dispatch('user/logout')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .app-header{
    .app-head-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
