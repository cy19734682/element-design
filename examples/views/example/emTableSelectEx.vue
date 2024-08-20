<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>表格选择器</div>
			</template>
			<div class="card-body">
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
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="cloneVal" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emTableSelectEx'
	import { mapGetters } from 'vuex'

	export default {
		name: 'emTableSelectEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl']),
			cloneVal() {
				return _.cloneDeep(this.deptId)
			}
		},
		data() {
			return {
				code1,
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
		mounted() {},
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
