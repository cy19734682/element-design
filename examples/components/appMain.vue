<template>
  <section class="app-main">
    <appHeader />
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import appHeader from '../components/appHeader'

  export default {
    name: 'appMain',
    components: {
      appHeader
    },
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    padding: 50px;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
