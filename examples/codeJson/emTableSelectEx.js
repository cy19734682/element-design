export const code1 = `
<template>
<div class="container">
  <em-table-select
    ref="tableSelectRef"
    v-model="deptId"
    :searchForm="searchForm"
    :columns="columns"
    multiple
    :url="serverUrl + '/bt-table-page'"
    @on-data-change="onDataChange"
    @changeRow="changeRow"
  />
</div>
</template>

<script>
  import {mapGetters} from "vuex"

	export default {
		name: 'emTableSelectEx',
    computed: {
      ...mapGetters(['serverUrl']),
      cloneVal(){
        return _.cloneDeep(this.deptId)
      }
    },
		data() {
			return {
				deptId: [82],
				name: 'name',
				searchForm: [
					{
						type: 'input',
						key: 'name',
						label: '商品名称'
					}
				],
				columns: [
					{
						key: 'id',
						label: 'ID'
					},
					{
						key: 'name',
						label: '名称'
					},
					{
						key: 'mimeType',
						label: '类型'
					},
					{
						key: 'extension',
						label: '后缀'
					}
				],
				props: {
					key: 'id',
					label: 'name'
				}
			}
		},
		methods: {
			onDataChange(d) {
				console.log(d)
			},
			changeRow(d) {
				console.log(d)
			}
		}
	}
</script>
`