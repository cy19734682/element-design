<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>分页表格</div>
			</template>
			<div class="card-body">
				<div class="table-container">
					<div class="app-search-table">
						<em-search-form ref="searchFormRef" size="mini" :form-data="searchFormData" btnLoading @on-search="search">
							<template #beginBtnGroup>
								<el-button type="success" size="mini" @click="addData()"> 新增 </el-button>
								<el-button
									type="danger"
									size="mini"
									:disabled="!(selectIds && selectIds.length > 0)"
									@click="delData()"
								>
									删除
								</el-button>
							</template>
						</em-search-form>
						<div style="margin: 10px 0">
							<el-button type="primary" size="mini" @click="exportTableExcel()"> TABLE导出Excel</el-button>
							<el-button type="warning" size="mini" @click="exportJsonExcel()"> JSON导出Excel</el-button>
							<el-button type="warning" size="mini" @click="exportJsonZip()"> zip导出</el-button>
						</div>
						<em-table-page
							id="tablePage"
							ref="tableRef"
							selection
							:url="serverUrl + '/bt-table-page'"
							:columns="columns"
							:searchData="searchData"
							orderKey=""
							@row-click="rowClick"
							@selection-change="selectionChange"
							@on-data-change="onDataChange"
						/>
					</div>
				</div>
			</div>
			<div class="card-footer">
				<source-code-view :code="code1" />
			</div>
		</el-card>
		<em-form-modal
			ref="formModalRef"
			:title="activeRow.id ? '编辑' : '新增'"
			:form-data="formData"
			:form-rules="formRules"
			btnLoading
			@on-submit="onSubmit"
			@on-close="onClose"
		>
		</em-form-modal>
	</div>
</template>

<script>
	import { exportTableToExcel, exportJsonToExcel, exportTxtToZip } from '../../../src'
	import { mapGetters } from 'vuex'
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emTablePageEx'

	export default {
		name: 'EmTablePageEx',
		components: { sourceCodeView },
		computed: {
			...mapGetters(['serverUrl'])
		},
		data() {
			return {
				code1,
				activeRow: {},
				selectIds: [],
				searchData: {},
				searchFormData: [
					{
						type: 'input',
						key: 'name',
						placeholder: '名称'
					},
					{
						type: 'input',
						placeholder: '类型',
						key: 'mimeType'
					},
					{
						type: 'select',
						placeholder: '后缀',
						key: 'extension',
						options: [
							{
								label: 'jpg',
								val: '.jpg'
							},
							{
								label: 'html',
								val: '.html'
							},
							{
								label: 'png',
								val: '.png'
							},
							{
								label: 'jpeg',
								val: '.jpeg'
							}
						]
					}
				],
				columns: [
					{
						key: 'id',
						label: 'ID',
						minWidth: 100
					},
					{
						key: 'name',
						label: '名称',
						minWidth: 100
					},
					{
						key: 'mimeType',
						label: '类型',
						minWidth: 100
					},
					{
						key: 'extension',
						label: '后缀',
						minWidth: 100
					},
					{
						label: '操作',
						width: 250,
						render: (h, params) => {
							return h('div', [
								h(
									'el-button',
									{
										props: {
											type: 'warning',
											size: 'mini'
										},
										on: {
											click: (e) => {
												e.stopPropagation()
												this.activeRow = params.row
												this.$refs.formModalRef.updateDataGroup(params.row)
												this.$refs.formModalRef.open()
											}
										}
									},
									'编辑'
								),
								h(
									'el-button',
									{
										props: {
											type: 'danger',
											size: 'mini'
										},
										on: {
											click: (e) => {
												e.stopPropagation()
												this.delData(params.row.id)
											}
										}
									},
									'删除'
								)
							])
						}
					}
				],
				formData: [
					{
						type: 'input',
						label: '名称',
						key: 'name'
					},
					{
						type: 'input',
						label: '类型',
						key: 'mimeType'
					},
					{
						type: 'select',
						label: '后缀',
						key: 'extension',
						options: [
							{
								label: 'jpg',
								val: '.jpg'
							},
							{
								label: 'html',
								val: '.html'
							},
							{
								label: 'png',
								val: '.png'
							},
							{
								label: 'jpeg',
								val: '.jpeg'
							}
						]
					}
				],
				formRules: {
					name: {
						required: true
					},
					mimeType: {
						required: true
					},
					extension: {
						required: true
					}
				}
			}
		},
		methods: {
			/**
			 * 搜索
			 */
			search(data) {
				this.searchData = window._.cloneDeep(data)
			},
			rowClick(row) {
				console.log(row)
			},
			/**
			 * 复选框选择回调
			 * @param selection
			 */
			selectionChange(selection) {
				console.log(selection)
				this.selectIds = selection.map((item) => item.id)
			},
			/**
			 * 列表加载完成回调
			 */
			onDataChange() {
				this.$refs.searchFormRef.changeLoading(false)
			},
			addData() {
				this.$refs.formModalRef.open()
			},
			/**
			 * 删除数据
			 */
			delData(id) {
				let ids = ''
				if (this.isValidVal(id)) {
					ids = id
				} else {
					if (this.selectIds.length <= 0) {
						this.$message.warning('请选择数据')
						return
					}
					ids = this.selectIds.join()
				}
				this.$msgbox
					.confirm('是否确认删除', '提示')
					.then(() => {
						this.$request
							.delete(this.serverUrl + '/bt-table', { ids })
							.then(() => {
								this.$message.success('删除成功')
								this.$refs.tableRef.getTableData()
							})
							.catch()
					})
					.catch((e) => {
						console.log(e)
					})
			},
			/**
			 * 关闭弹框
			 */
			onClose() {
				setTimeout(() => {
					this.$refs.formModalRef.resetForm()
					this.activeRow = {}
				}, 200)
			},
			/**
			 * 新增 or 编辑
			 */
			onSubmit(data) {
				let method = 'post'
				if (this.activeRow.id) {
					method = 'put'
					data['id'] = this.activeRow.id
				}
				this.$request[method](this.serverUrl + '/bt-table', data, { isShowLoading: true })
					.then((e) => {
						this.$message.success(method === 'post' ? '新增成功' : '编辑成功')
						this.$refs.tableRef.getTableData()
						this.$refs.formModalRef.changeLoading(false)
						this.$refs.formModalRef.close()
						this.onClose()
					})
					.catch((e) => {
						this.$refs.formModalRef.changeLoading(false)
					})
			},
			/**
			 * 导出Excel
			 */
			exportJsonExcel() {
				const dataT = this.$refs.tableRef.dataT || []
				let columns = this.columns.filter((e) => e.key)
				let header = columns.map((e) => e.label)
				let headValue = columns.map((e) => e.key)
				let data = dataT.map((v) => headValue.map((j) => v[j]))
				let filename = '表格数据'
				exportJsonToExcel({ header, data, filename })
			},
			/**
			 * 导出zip
			 */
			exportJsonZip() {
				const dataT = this.$refs.tableRef.dataT || []
				let columns = this.columns.filter((e) => e.key)
				let header = columns.map((e) => e.label)
				let headValue = columns.map((e) => e.key)
				let data = dataT.map((v) => headValue.map((j) => v[j]))
				let filename = '表格数据'
				exportTxtToZip(header, data, filename, filename)
			},
			/**
			 * 导出Excel
			 */
			exportTableExcel() {
				exportTableToExcel('tablePage', 1, 4, '表格数据')
			}
		}
	}
</script>
<style scoped lang="scss">
	.table-container {
		position: relative;
		height: 800px;
	}
</style>
