<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>弹窗表单</div>
			</template>
			<div class="card-body">
				<el-button type="primary" @click="newData">新增</el-button>
				<el-button type="warning" @click="editData">编辑</el-button>
				<div class="json-title">解析数据:</div>
				<json-viewer :value="dataJson" theme="my-awesome-json-theme" expanded copyable />
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<em-form-modal
			ref="formModalRef"
			:title="title"
			:form-data="formData"
			:form-rules="formRules"
			btnLoading
			@on-item-change="onItemChange"
			@on-submit="onSubmit"
			@on-close="onClose"
		/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emFormModalEx'

	export default {
		name: 'EmFormModalEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl']),
			formData() {
				return [
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
						type: 'select',
						label: '借用数据',
						key: 'wbId',
						borrowOption: 'education',
						optionLabel: 'name',
						optionVal: 'id',
						collectLabel: {
							valKey: 'mimeType',
							key: 'mine2'
						}
					},
					{
						type: 'select',
						label: '远程数据',
						key: 'devId',
						asyncOption: true,
						optionUrl: this.serverUrl + '/bt-table',
						optionLabel: 'name',
						optionVal: 'id',
						collectLabel: {
							valKey: 'mimeType',
							key: 'mine'
						},
						changeOption: [
							{
								valKey: 'wbId',
								key: 'wbId'
							},
							{
								valKey: 'education',
								key: 'education',
								notRequired: true
							}
						],
						localOption: [
							{
								id: 998,
								name: 'test1',
								mimeType: 't1'
							},
							{
								id: 999,
								name: 'test2',
								mimeType: 't2'
							}
						]
					},
					{
						type: 'date',
						label: '日期',
						key: 'date',
						defaultVal: '2023-01-12'
					},
					{
						type: 'time',
						label: '时间',
						key: 'time',
						defaultVal: '12:12:12'
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
				]
			}
		},
		data() {
			return {
				title: '',
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
					credential: {
						required: true
					}
				}
			}
		},
		mounted() {},
		methods: {
			newData() {
				this.title = '新增数据'
				this.$refs.formModalRef.open()
			},
			editData() {
				this.title = '编辑数据'
				this.$refs.formModalRef.updateDataGroup({
					name: '小王',
					price: 2690,
					education: 3,
					wbId: 2,
					devId: 81,
					date: '2023-05-01',
					time: '14:29:10',
					datetime: '2023-01-05 11:12:52',
					startDate: '2012-01-12',
					endDate: '2015-01-12',
					startTime: '00:10:12',
					endTime: '15:12:31'
				})
				this.$refs.formModalRef.open()
			},
			onItemChange(d) {
				console.log(d)
			},
			onSubmit(data) {
				this.dataJson = data
				console.log(data)
				this.$refs.formModalRef.close()
				setTimeout(() => {
					this.$refs.formModalRef.changeLoading(false)
				}, 500)
			},
			onClose() {
				console.log('关闭')
				setTimeout(() => {
					this.$refs.formModalRef.resetForm()
				}, 200)
			}
		}
	}
</script>
