export const code1 = `
<script lang="ts" setup>
let value1 = ref<Record<string, any>>({})
const onValChange = (val: any) => {
  console.log(val)
}
const onChange = (val: any) => {
  console.log(val)
}
</script>

<template>
  <em-select-input
    v-model="value1"
    url="/brand"
    optionVal="label"
    optionLabel="name"
    @on-val-change="onValChange"
    @on-change="onChange"
  />
</template>
`

export const code2 = `
<script lang="ts" setup>
let value2 = ref<Record<string, any>>({})
let data = ref<any[]>([
  {
    val: '1',
    label: '小学'
  },
  {
    val: '2',
    label: '初中'
  },
  {
    val: '3',
    label: '高中'
  },
  {
    val: '4',
    label: '大学'
  }
])

const onValChange = (val: any) => {
  console.log(val)
}
const onChange = (val: any) => {
  console.log(val)
}
</script>
<template>
  <em-select-input
    v-model="value2"
    :data="data"
    optionVal="label"
    optionLabel="name"
    @on-val-change="onValChange"
    @on-change="onChange"
  />
</template>
`
