export const code1 = `
<template>
  <em-upload-excel :onSuccess="onSuccess" />
</template>

<script>
export default {
  name: 'uploadExcelEx',
  data() {
    return {
      code1
    }
  },
  methods: {
    onSuccess(data) {
      console.log(data)
    }
  }
}
</script>
`
