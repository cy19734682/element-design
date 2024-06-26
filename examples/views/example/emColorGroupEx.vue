<template>
  <div class="container">
    <h2>颜色组</h2>
    <em-color-group v-model="colors" is-add-del />
  </div>
</template>

<script>
export default {
  name: "EmColorGroupEx",
  data() {
    return {
      colors: ["#ccc"],
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 40px;
}
</style>
