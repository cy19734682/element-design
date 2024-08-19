export const code1 = `
<template>
<em-upload v-model="id1" fileName="files" listType="picture-card" :length="2" @on-file-change="onfileChange" />
</template>

<script>
export default {
  name: 'uploadExcelEx',
  data() {
    return {
      id1: ['666963bb096132e67ebe120d.png'],
    }
  },
  methods: {
    onfileChange(data) {
      console.log(data)
    }
  }
}
</script>
`

export const code2 = `
<template>
<em-upload
  v-model="id2"
  :auto-upload="false"
  :length="3"
  fileName="files"
  listType="picture-card"
  @on-file-change="onfileChange"
/>
</template>

<script>
export default {
  name: 'uploadExcelEx',
  data() {
    return {
      id2: null
    }
  },
  methods: {
    onfileChange(data) {
      console.log(data)
    }
  }
}
</script>
  `

export const code3 = `
<template>
  <em-upload
    v-model="id3"
    fileName="files"
    listType="picture-card"
    upload-fetch
    @on-file-change="onfileChange"
  />
</template>

<script>
export default {
  name: 'uploadExcelEx',
  data() {
    return {
      id2: 'http://cdn.cy1973.cn/screen-designer/images/material/2024-06/666963bb096132e67ebe120d.png'
    }
  },
  methods: {
    onfileChange(data) {
      console.log(data)
    }
  }
}
</script>
 `
