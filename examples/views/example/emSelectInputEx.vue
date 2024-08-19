<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>下拉选择输入(远程数据)</div>
			</template>
			<div class="card-body">
				<em-select-input
					v-model="value1"
					:url="serverUrl + '/brand'"
					optionVal="label"
					optionLabel="name"
					@on-val-change="onValChange"
					@on-change="onChange"
				/>
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="value1" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>下拉选择输入（静态数据）</div>
			</template>
			<div class="card-body">
				<em-select-input
					v-model="value2"
					:data="data"
					optionVal="label"
					optionLabel="name"
          @on-val-change="onValChange"
					@on-change="onChange"
				/>
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="value2" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code2" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import sourceCodeView from '../../components/sourceCodeView.vue'
  import { code1, code2 } from '../../codeJson/emCascaderEx'

	export default {
		name: 'emSelectInputEx',
		components: {
      sourceCodeView
    },
		computed: {
			...mapGetters(['serverUrl'])
		},
		data() {
			return {
        code1,
        code2,
				value1: {},
				value2: {},
				data: [
					{ val: '1', label: '小学' },
					{ val: '2', label: '初中' },
					{ val: '3', label: '高中' },
					{ val: '4', label: '大学' }
				]
			}
		},
		mounted() {},
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