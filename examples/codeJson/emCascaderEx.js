export const code1 = `<template>
<template>
<div class="container">
  <em-select-input
   v-model="value1"
   :url="serverUrl + '/brand'"
   optionVal="label"
   optionLabel="name"
   @on-val-change="onValChange"
   @on-change="onChange"
  />
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
name: 'emSelectInputEx',
computed: {
 ...mapGetters(['serverUrl'])
},
data() {
 return {
  value1: {},
 }
},
methods: {
 onValChange(val) {
  console.log(val)
 },
 onChange(val) {
  console.log(val)
 }
}
}
</script>
`

export const code2 = `
<template>
<div class="container">
  <em-select-input
   v-model="value2"
   :data="data"
   optionVal="label"
   optionLabel="name"
   @on-val-change="onValChange"
   @on-change="onChange"
  />
</div>
</template>

<script>
export default {
name: 'emSelectInputEx',
data() {
 return {
  value2: {},
  data: [
   { val: '1', label: '小学' },
   { val: '2', label: '初中' },
   { val: '3', label: '高中' },
   { val: '4', label: '大学' }
  ]
 }
},
methods: {
 onValChange(val) {
  console.log(val)
 },
 onChange(val) {
  console.log(val)
 }
}
}
</script>
`
