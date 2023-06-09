<template>
  <div class="home">
    <h1>{{ $t('route.dashboard') }}</h1>
    <appHeader />
    <el-row :gutter="12" v-for="(item,index) of routeArr" :key="'f_'+index">
      <el-col :span="8" v-for="(c,index1) of item.children" :key="'c'+index1">
        <el-card shadow="hover">
          <router-link
              class="linkA"
              :to="item.path +'/'+ c.path"
              :key="'item'+index"
              :title="c.meta.title"
          >
            <span class="txt">{{ c.meta.title }}</span>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import appHeader from '../components/appHeader'

  export default {
    name: 'index',
    components: {appHeader},
    data() {
      return {
        active: [],
        routeArr: []
      }
    },
    computed: {
      language: {
        get() {
          return this.$store.getters.language
        },
        set(v) {
          this.$i18n.locale = v
          this.$store.dispatch('app/setLanguage', v)
        }
      }
    },
    created() {
      this.routeArr = this.$router.options.routes.filter(e => {
        if (e.name && e.name !== 'login' && e.name !== 'index') {
          return e
        }
      })
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .home {
    padding: 50px;

    .lang {
      padding: 20px 0;
      text-align: right;
    }

    .el-col {
      margin-bottom: 20px;
    }

    .linkA {
      color: #409EFF;
      cursor: pointer;

      &:hover {
        opacity: .85;
      }
    }
  }
</style>
