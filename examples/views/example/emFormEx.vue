<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>综合表单</div>
			</template>
			<div class="card-body">
				<em-form
					:form-data="formData"
					:formRules="formRules"
					show-inline-ok-bt
					show-inline-clear-bt
					@on-submit="onSubmit"
					@on-item-change="onItemChange"
				>
					<template #sgInput="{ dataGroup }">
						<el-input v-model="dataGroup.sgInput" />
					</template>
				</em-form>
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
	import { mapGetters } from 'vuex'
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emFormEx'

	export default {
		name: 'EmFormEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl']),
			formData() {
				return [
					{
						type: 'txt',
						label: '信息',
						val: '这是一条占位信息'
					},
					{
						type: 'input',
						label: '名称',
						key: 'name',
						defaultVal: '121'
					},
					{
						type: 'inputNumber',
						label: '金额',
						key: 'price'
					},
					{
						type: 'select',
						label: '学历',
						key: 'education',
						options: [
							{
								label: '高中',
								val: 1
							},
							{
								label: '专科',
								val: 2
							},
							{
								label: '本科',
								val: 3
							},
							{
								label: '研究生',
								val: 4
							},
							{
								label: '博士',
								val: 5,
								disabled: true
							}
						]
					},
					{
						type: 'radio',
						key: 'sex',
						label: '性别',
						options: [
							{
								label: '男',
								val: 1
							},
							{
								label: '女',
								val: 0
							}
						]
					},
					{
						type: 'checkbox',
						label: '证书',
						key: 'credential',
						checkboxType: 'button',
						options: [
							{
								label: '英语四级',
								val: 'CET4'
							},
							{
								label: '英语六级',
								val: 'CET6',
								disabled: true
							},
							{
								label: 'C1驾照',
								val: 'C1',
								disabled: true
							}
						],
						show: {
							key: 'education',
							val: [3, 4, 5]
						}
					},
					{
						type: 'selectInput',
						label: '学校',
						key: 'school',
						defaultKey: 'gz',
						defaultVal: '52',
						data: [
							{ val: 'xx', label: '小学' },
							{ val: 'cz', label: '初中' },
							{ val: 'gz', label: '高中' },
							{ val: 'dx', label: '大学' }
						]
					},
					{
						type: 'upload',
						label: '文件上传',
						key: 'imgUrl',
						autoUpload: false
					},
					{
						type: 'colorPicker',
						label: '颜色',
						key: 'color',
						showAlpha: true
					},
					{
						type: 'selectIcon',
						label: '图标',
						key: 'icon',
						defaultVal: 'lock',
						info: '选择图标选标选择图标选择图标选择图标选择图标',
						infoColor: '#333'
					},
					{
						type: 'switch',
						label: '开关',
						key: 'open'
					},
					{
						type: 'slider',
						label: '滑动',
						key: 'step'
					},
					{
						type: 'rate',
						label: '分数',
						key: 'fs'
					},
					{
						type: 'area',
						label: '行政区域',
						key: 'areaCode',
						key2: 'areaName'
					},
					{
						type: 'cascader',
						label: '部门',
						url: this.serverUrl + '/dept',
						key: 'deptId',
						key2: 'deptName'
					},
					{
						type: 'select',
						label: '品牌',
						key: 'brandId',
						asyncOption: true,
						optionUrl: this.serverUrl + '/brand',
						optionLabel: 'name',
						optionVal: 'id'
					},
					{
						type: 'tableSelect',
						label: '文档类型',
						key: 'mimeType',
						multiple: true,
						url: this.serverUrl + '/bt-table-page',
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
						]
					},
					{
						type: 'bdMap',
						label: '位置',
						key: 'lng',
						key2: 'lat',
						key3: 'address'
					},
					{
						type: 'textarea',
						label: '备注',
						key: 'remark'
					},
					{
						type: 'editor',
						label: '内容',
						key: 'content'
					},
					{
						type: 'date',
						dateType: 'datetime',
						label: '日期时间',
						key: 'datetime'
					},
					{
						type: 'date',
						dateType: 'daterange',
						label: '日期区间',
						key: 'startDate',
						key2: 'endDate'
					},
					{
						type: 'date',
						dateType: 'monthrange',
						label: '月份区间',
						key: 'startMonth',
						key2: 'endMonth'
					},
					{
						type: 'custom',
						label: '自定义',
						key: 'sgInput',
						slotName: 'sgInput'
					}
				]
			}
		},
		data() {
			return {
				code1,
				dataJson: {},
				formRules: {
					name: {
						required: true
					},
					price: {
						required: true
					},
					education: {
						required: true
					},
					sex: {
						required: true
					},
					color: {
						required: true
					},
					step: {
						required: true
					},
					open: {
						required: true
					},
					fs: {
						required: true
					},
					credential: {
						required: true
					},
					imgUrl: {
						required: true
					},
					areaCode: {
						required: true
					},
					deptId: {
						required: true
					},
					lng: {
						required: true
					},
					content: {
						required: true
					},
					icon: {
						required: true
					},
					mimeType: {
						required: true,
						trigger: 'blur'
					},
					school: {
						required: true
					}
				}
			}
		},
		mounted() {},
		methods: {
			onItemChange(data) {
				console.log(data)
			},
			onSubmit(data) {
				this.dataJson = data
				console.log(data)
			}
		}
	}
</script>
