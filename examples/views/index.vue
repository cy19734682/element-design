<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="8" v-for="(item,index) of routeArr" :key="'menu'+index">
        <el-card shadow="hover">
          <router-link
              class="linkA"
              :to="item.path"
              :key="'item'+index"
              :title="item.meta.title"
          >
            <span class="txt">{{ item.meta.title }}</span>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      active: [],
      routeArr: []
    }
  },
  created() {
    this.routeArr = this.$router.options.routes.filter(e => {
      if (e.name && e.name !== 'login' && e.name !== 'index') {
        return e
      }
    })
  },
  methods: {
    loginH() {

    }
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 50px;
  .el-col{
    margin-bottom: 20px;
  }
  .linkA{
    color: #409EFF;
    cursor: pointer;
    &:hover{
      opacity: .85;
    }
  }
}
</style>