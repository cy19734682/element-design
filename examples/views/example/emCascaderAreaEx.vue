<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>省市区选择</div>
			</template>
			<div class="card-body">
				<em-cascader-area v-model="value" :level="2" @on-val-change="onValChange" @on-name-change="onNameChange" />
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="value" theme="my-awesome-json-theme" expanded copyable />
				<div class="json-title">名称数据:</div>
				<json-viewer :value="name" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emCascaderAreaEx'

	export default {
		name: 'EmCascaderAreaEx',
		components: { sourceCodeView },
		data() {
			return {
				code1,
				value: ['150000', '150100', '150104'],
				name: ''
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
