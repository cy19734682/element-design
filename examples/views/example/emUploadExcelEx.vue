<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>excel上传</div>
			</template>
			<div class="card-body">
				<em-upload-excel :onSuccess="onSuccess" />
				<div class="json-title">解析数据:</div>
				<json-viewer :value="dataJson" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emUploadExcelEx'

	export default {
		name: 'uploadExcelEx',
		components: {
			sourceCodeView
		},
		data() {
			return {
				dataJson: {},
				code1
			}
		},
		methods: {
			onSuccess(data) {
				this.dataJson = data
				console.log(data)
			}
		}
	}
</script>
