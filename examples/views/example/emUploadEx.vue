<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>自动上传</div>
			</template>
			<div class="card-body">
				<em-upload v-model="id1" fileName="files" listType="picture-card" :length="2" @on-file-change="onfileChange" />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>手动上传</div>
			</template>
			<div class="card-body">
				<em-upload
					v-model="id2"
					:auto-upload="false"
					:length="3"
					fileName="files"
					listType="picture-card"
					@on-file-change="onfileChange"
				/>
			</div>
			<div class="card-footer">
				<source-code-view :code="code2" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>网络地址上传</div>
			</template>
			<div class="card-body">
				<em-upload v-model="id3" fileName="files" listType="picture-card" upload-fetch @on-file-change="onfileChange" />
			</div>
			<div class="card-footer">
				<source-code-view :code="code3" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1, code2, code3 } from '../../codeJson/emUploadEx'
	export default {
		name: 'uploadExcelEx',
		components: {
			sourceCodeView
		},
		data() {
			return {
				id1: ['666963bb096132e67ebe120d.png'],
				id2: null,
				id3: 'http://cdn.cy1973.cn/screen-designer/images/material/2024-06/666963bb096132e67ebe120d.png',
				code1,
				code2,
				code3
			}
		},
		methods: {
			onfileChange(data) {
				console.log(data)
			}
		}
	}
</script>
