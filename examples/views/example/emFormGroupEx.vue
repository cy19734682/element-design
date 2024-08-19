<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>基础表单</div>
			</template>
			<div class="card-body">
				<em-form-group ref="formGroupRef1" :form-data="formData" btnLoading @on-submit="onSubmit1" />
				<div class="json-title">提交数据:</div>
				<json-viewer :value="dataJson1" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>校验表单</div>
			</template>
			<div class="card-body">
				<em-form-group
					ref="formGroupRef2"
					:form-data="formData"
					:form-rules="formRules"
					btnLoading
					@on-submit="onSubmit2"
				/>
				<div class="json-title">提交数据:</div>
				<json-viewer :value="dataJson2" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code2" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>日期表单</div>
			</template>
			<div class="card-body">
				<em-form-group
					ref="formGroupRef3"
					labelWidth="100px"
					:form-data="dateFormData"
					btnLoading
					@on-submit="onSubmit3"
				/>
				<div class="json-title">提交数据:</div>
				<json-viewer :value="dataJson3" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code3" />
			</div>
		</el-card>
		<el-divider />
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>日期表单</div>
			</template>
			<div class="card-body">
				<em-form-group ref="formGroupRef4" :form-data="fetchFormData" btnLoading @on-submit="onSubmit4" />
				<div class="json-title">提交数据:</div>
				<json-viewer :value="dataJson4" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code4" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1, code2, code3, code4 } from '../../codeJson/emFormGroupEx'
	import { mapGetters } from 'vuex'

	export default {
		name: 'EmFormGroupEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl']),
			fetchFormData() {
				return [
					{
						type: 'selectInput',
						label: '学校',
						key: 'school',
						url: this.serverUrl + '/brand',
						optionVal: 'id',
						optionLabel: 'name'
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
					}
				]
			}
		},
		data() {
			return {
				code1,
				code2,
				code3,
				code4,
				dataJson1: {},
				dataJson2: {},
				dataJson3: {},
				dataJson4: {},
				formData: [
					{
						type: 'input',
						key: 'name',
						label: '名称'
					},
					{
						type: 'inputNumber',
						label: '金额',
						key: 'price'
					},
					{
						type: 'switch',
						label: '显示学历',
						key: 'open'
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
						],
						show: {
							key: 'open',
							val: [true]
						}
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
						]
					}
				],
				dateFormData: [
					{
						type: 'date',
						label: '日期',
						key: 'date'
					},
					{
						type: 'time',
						label: '时间',
						key: 'time'
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
						type: 'time',
						isRange: true,
						label: '时间区间',
						key: 'startTime',
						key2: 'endTime',
						startPlaceholder: '开始时间',
						endPlaceholder: '结束时间'
					},
					{
						type: 'date',
						dateType: 'monthrange',
						label: '月份区间',
						key: 'startMonth',
						key2: 'endMonth',
						startPlaceholder: '开始月份',
						endPlaceholder: '结束月份'
					},
					{
						type: 'date',
						dateType: 'datetimerange',
						label: '日期时间区间',
						key: 'startDateTime',
						key2: 'endDateTime',
						startPlaceholder: '开始时间',
						endPlaceholder: '结束时间'
					}
				],
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
					credential: {
						required: true
					}
				}
			}
		},
		methods: {
			onSubmit1(data) {
				console.log(data)
				this.dataJson1 = data
				setTimeout(() => {
					this.$refs.formGroupRef1.changeLoading(false)
				}, 500)
			},
			onSubmit2(data) {
				console.log(data)
				this.dataJson2 = data
				setTimeout(() => {
					this.$refs.formGroupRef2.changeLoading(false)
				}, 500)
			},
			onSubmit3(data) {
				console.log(data)
				this.dataJson3 = data
				setTimeout(() => {
					this.$refs.formGroupRef3.changeLoading(false)
				}, 500)
			},
			onSubmit4(data) {
				console.log(data)
				this.dataJson4 = data
				setTimeout(() => {
					this.$refs.formGroupRef4.changeLoading(false)
				}, 500)
			}
		}
	}
</script>
