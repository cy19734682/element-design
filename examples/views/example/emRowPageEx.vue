<template>
	<div class="container">
		<el-card :body-style="{ padding: '0px' }">
			<template #header>
				<div>栅栏表格</div>
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
						<em-table-page
							id="tablePage"
							ref="tableRef"
							selection
							:url="serverUrl + '/bt-table-page'"
							:isTable="false"
							:row-gutter="15"
							:columns="columns"
							:searchData="searchData"
							orderKey=""
							@row-click="rowClick"
							@row-selection-change="selectionChange"
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
	import { mapGetters } from 'vuex'
	import sourceCodeView from '../../components/sourceCodeView.vue'
	import { code1 } from '../../codeJson/emRowPageEx'

	export default {
		name: 'emRowPageEx',
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
						render: (h, params) => {
							return h('el-image', {
								style: {
									width: '100%',
									height: '200px'
								},
								attrs: {
									src: window.global.serverImg + params.row.imgPath
								}
							})
						}
					},
					{
						key: 'name',
						label: '名称'
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
				this.$request[method](this.serverUrl + '/bt-table', data, {
					isShowLoading: true
				})
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
