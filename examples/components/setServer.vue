<template>
  <div class="lang">
    <el-radio-group v-model="serverUrl">
      <el-radio label="/mock">{{ $t("route.localServer") }}</el-radio>
      <el-radio label="">{{ $t("route.nodeServer") }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "setLange",
  computed: {
    serverUrl: {
      get() {
        return this.$store.getters.serverUrl;
      },
      set(v) {
        this.$store.dispatch("app/setServerUrl", v);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.lang {
  padding: 20px 0;
  text-align: right;
}
</style>
