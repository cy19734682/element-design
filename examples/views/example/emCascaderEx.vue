<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>自定义级联选择</div>
			</template>
			<div class="card-body">
				<em-cascader v-model="value1" :data="data" @on-val-change="onValChange" @on-name-change="onNameChange1" />
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="name1" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>远程级联选择</div>
			</template>
			<div class="card-body">
				<em-cascader
					v-model="value2"
					:url="serverUrl + '/dept'"
					@on-val-change="onValChange"
					@on-name-change="onNameChange2"
				/>
				<div class="json-title">绑定数据:</div>
				<json-viewer :value="name2" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code2" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1, code2 } from '../../codeJson/emCascaderEx'
	import { mapGetters } from 'vuex'

	export default {
		name: 'EmCascaderEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl'])
		},
		data() {
			return {
				code1,
				code2,
				value1: null,
				value2: null,
				name1: {},
				name2: {},
				data: [
					{
						id: 1,
						name: '爷爷',
						children: [
							{ id: 2, name: '父亲' },
							{ id: 3, name: '叔叔' }
						]
					}
				]
			}
		},
		methods: {
			onValChange(data) {
				console.log(data)
			},
			onNameChange1(data) {
				console.log(data)
				this.name1 = { val: this.value1, name: data }
			},
			onNameChange2(data) {
				console.log(data)
				this.name2 = { val: this.value2, name: data }
			}
		}
	}
</script>
