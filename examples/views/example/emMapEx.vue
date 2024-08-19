<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>百度地图</div>
			</template>
			<div class="card-body">
				<em-baidu-map v-model="value" @on-val-change="onValChange" @on-name-change="locationChange" />
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="value" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emMapEx'

	export default {
		name: 'EmMapEx',
		components: { sourceCodeView },
		data() {
			return {
				code1,
				value: {
					lng: 102.554865,
					lat: 26.567981
				}
			}
		},
		methods: {
			onValChange(data) {
				console.log(data)
			},
			locationChange(data) {
				console.log(data)
			}
		}
	}
</script>
