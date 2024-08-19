export const code1 = `
<template>
<div class="container">
  <em-color-group v-model="colors" is-add-del />
</div>
</template>

<script>
export default {
  name: 'EmColorGroupEx',
  data() {
    return {
      colors: ['#ccc']
    }
  }
}
</script>
`