export const code1 = `
<template>
  <em-cascader-area v-model="value" :level="2" @on-val-change="onValChange" @on-name-change="onNameChange" />
</template>

<script>

export default {
  name: 'EmCascaderAreaEx',
  data() {
    return {
      code1,
      value: ['150000', '150100', '150104'],
      name: null
    }
  },
  methods: {
    onValChange(data) {
      console.log(data)
    },
    onNameChange(data) {
      console.log(data)
      this.name = data
    }
  }
}
</script>
`
