export const code1 = `
<template>
<div class="container">
  <em-baidu-map v-model="value" @on-val-change="onValChange" @on-name-change="locationChange" />
</div>
</template>

<script>
export default {
  name: 'EmMapEx',
  data() {
    return {
      value: {
        lng: 102.554865,
        lat: 26.567981
      }
    }
  },
  methods: {
    onValChange(data) {
      console.log(data)
    },
    locationChange(data) {
      console.log(data)
    }
  }
}
</script>
`
