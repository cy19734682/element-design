<template>
	<div class="em-table-page">
		<div class="table-container">
			<!--  表格   -->
			<el-table
				v-if="isTable"
				v-bind="$attrs"
				v-on="$listeners"
				v-loading="loading"
				id="dataTable"
				ref="elTableRef"
				:data="dataS"
				:reserve-selection="selection"
				@selection-change="handleSelectionChange"
				@row-click="handleRowClick"
				:header-cell-style="{ backgroundColor: 'var(--el-fill-color-light)' }"
			>
				<!--多选框-->
				<el-table-column v-if="selection" type="selection" width="50" align="center"></el-table-column>
				<!--单选框-->
				<el-table-column v-if="radio" width="50" align="center">
					<template #default="scope">
						<el-radio :label="scope.row[defaultId]" v-model="onlyId"><span></span></el-radio>
					</template>
				</el-table-column>
				<el-table-column
					v-for="(item, index) in columnsT"
					:key="item.key + index"
					:type="item.type"
					:prop="item.key"
					:label="item.label"
					:width="item.width"
					:min-width="item.minWidth"
					:fixed="item.fixed"
					:header-align="item.headerAlign"
					:align="item.align || tableAlign"
					:formatter="item.formatter"
					:show-overflow-tooltip="showOverflowTooltip"
				>
					<template #header>
						<span>{{ item.label }}</span>
					</template>
					<template #default="scope">
						<render-dom
							v-if="item.render"
							:render="item.render"
							:row="scope.row"
							:index="scope.$index"
							:column="item"
						/>
						<span
							v-else-if="
								tableEmptyTdHandle &&
								(scope.row[item.key] === '' || scope.row[item.key] === null || scope.row[item.key] === undefined)
							"
							>--</span
						>
						<span v-else>{{ scope.row[item.key] }}</span>
					</template>
				</el-table-column>
			</el-table>
			<!--  栅格模式   -->
			<el-row v-else :gutter="rowGutter" :type="rowType" :justify="rowJustify" :align="rowAlign">
				<template v-if="dataS && dataS.length > 0">
					<el-col
						v-for="(item, _index) in dataS"
						:key="item[defaultId]"
						:span="rowSpan"
						@click.native="handleRowClick(item, _index)"
					>
						<div
							style="border: 2px solid transparent"
							:style="[
								{ 'border-color': radio && item[defaultId] === onlyId ? rowBorderColor : 'transparent' },
								{ cursor: radio || selection ? 'pointer' : 'inherit' }
							]"
						>
							<el-checkbox
								v-model="item.check"
								v-if="selection"
								style="position: absolute"
								@click.native.prevent="() => {}"
							/>
							<div v-for="(c_item, index) in columnsT" :key="c_item.key + index">
								<render-dom v-if="c_item.render" :render="c_item.render" :row="item" :index="index" :column="c_item" />
								<div class="row-sda" :class="'sl-' + index" v-else>{{ item[c_item.key] }}</div>
							</div>
						</div>
					</el-col>
				</template>
				<template v-else>
					<el-col :span="24">
						<el-empty :description="t('em.noData')" />
					</el-col>
				</template>
			</el-row>
		</div>
		<div class="pagination-container" v-if="showPage">
			<el-pagination
				background
				:current-page.sync="currentPage"
				:page-size.sync="pageSizeT"
				:page-sizes="pageSizesT"
				:layout="pageLayout"
				:total="total"
				v-bind="$attrs"
				@size-change="changePage"
				@current-change="changePage"
			/>
		</div>
	</div>
</template>

<script>
	import { scrollTo } from '../../methods/scroll-to'
	import request from '../../methods/request'
	import Locale from '../../mixins/locale'

	export default {
		name: 'EmTablePage',
		components: {
			/**自定义render组件**/
			renderDom: {
				functional: true,
				props: {
					row: Object,
					render: Function,
					index: Number,
					column: {
						type: Object,
						default: null
					}
				},
				render: (h, context) => {
					const params = {
						row: context.props.row,
						index: context.props.index
					}
					if (context.props.column) {
						params.column = context.props.column
					}
					return context.props.render(h, params)
				}
			}
		},
		mixins: [Locale],
		props: {
			initData: {
				/*初始化数据，即组件创建后自动拉取第一次数据*/
				type: Boolean,
				default: true
			},
			isTable: {
				/*是否是表格*/
				type: Boolean,
				default: true
			},
			url: {
				/*表格拉取数据的接口地址*/
				type: String,
				default: ''
			},
			searchData: {
				/*表格条件查询数据*/
				type: Object,
				default() {
					return {}
				}
			},
			columns: {
				/*表格表头结构数据，同Element-ui*/
				type: Array,
				default() {
					return []
				}
			},
			data: {
				/*表格默认数据，没有url的本地静态表格使用*/
				type: Array,
				default() {
					return []
				}
			},
			tableAlign: {
				/*表格对齐方式*/
				type: String,
				default: 'center'
			},
			showOverflowTooltip: {
				/*当内容过长被隐藏时显示 tooltip*/
				type: Boolean,
				default: true
			},
			tableEmptyTdHandle: {
				/*表格内容为空时是否展示 --*/
				type: Boolean,
				default: true
			},
			selection: {
				/*是否展示每列开头复选框*/
				type: Boolean,
				default: false
			},
			radio: {
				/*是否展示每列开头单选框*/
				type: Boolean,
				default: false
			},
			loading: {
				/*拉取表格数据时显示遮罩层*/
				type: Boolean,
				default: false
			},
			defaultId: {
				/*默认id的key*/
				type: String,
				default: 'id'
			},
			orderKey: {
				/*排序的key*/
				type: String,
				default: 'id'
			},
			orderDefault: {
				/*排序是升是降*/
				type: String,
				default: 'desc'
			},
			showPage: {
				/*是否展示页签*/
				type: Boolean,
				default: true
			},
			pageLayout: {
				/*分页布局*/
				type: String,
				default: 'total, sizes, prev, pager, next, jumper'
			},
			pageSize: {
				/*每页条数*/
				type: Number,
				default: 10
			},
			pageSizes: {
				/*每页显示个数选择器的选项设置*/
				type: Array,
				default() {
					return [10, 20, 30, 40, 50, 100]
				}
			},
			currentPageKey: {
				/*分页当前页码key*/
				type: String,
				default: 'current'
			},
			pageSizeKey: {
				/*每页显示条目个数key*/
				type: String,
				default: 'size'
			},
			totalKey: {
				/*总条目数key*/
				type: String,
				default: 'total'
			},
			rowGutter: {
				/*栅格间隔（非表格）*/
				type: Number,
				default: 4
			},
			rowType: {
				/*布局模式（非表格）*/
				type: String,
				default: ''
			},
			rowJustify: {
				/*flex 布局下的水平排列方式（非表格）*/
				type: String,
				default: 'start'
			},
			rowAlign: {
				/*flex 布局下的垂直排列方式（非表格）*/
				type: String,
				default: ''
			},
			rowSpan: {
				/*栅格占据的列数（非表格）*/
				type: Number,
				default: 6
			},
			rowBorderColor: {
				/*单选时表格边框颜色（非表格）*/
				type: String,
				default: '#409eff'
			}
		},
		data() {
			return {
				currentPage: 1,
				pageSizesT: this.pageSizes,
				pageSizeT: Number(this.pageSize),
				total: 0,
				dataT: this.data,
				selected: [],
				onlyId: null
			}
		},
		computed: {
			/**
			 * 查询条件
			 * @returns
			 */
			queryData() {
				let temp = {
					...this.searchData,
					[this.currentPageKey]: this.currentPage,
					[this.pageSizeKey]: this.pageSizeT
				}
				if (this.orderKey && this.orderDefault) {
					temp[this.orderKey] = this.orderDefault
				}
				return temp
			},
			/**
			 * 列表选项处理
			 * @returns {*[]}
			 */
			columnsT() {
				return this.columns.map((item) => {
					item['key'] = item['key'] || ''
					return item
				})
			},
			/**
			 * 处理列表数控
			 */
			dataS: {
				get() {
					return this.dataT.map((e, i) => {
						return {
							rowKey: 'bt-' + i,
							...e
						}
					})
				},
				set(v) {
					this.dataT = v
				}
			},
			/**
			 * 列表多选选择的Id组
			 * @returns {*[]}
			 */
			selectedIds() {
				return this.selected.map((e) => e[this.defaultId])
			}
		},
		watch: {
			searchData: {
				handler() {
					this.currentPage = 1
					this.getTableData()
				},
				deep: true
			}
		},
		created() {
			if (this.initData) {
				this.getTableData()
			}
		},
		methods: {
			/**
			 * 列表单机事件
			 * @param row
			 * @param index
			 */
			handleRowClick(row, index) {
				if (this.radio) {
					this.onlyId = row[this.defaultId]
				}
				if (this.selection) {
					if (this.isTable) {
						this.$refs.elTableRef.toggleRowSelection(row)
					} else {
						row.check = !Boolean(row.check)
						this.$set(this.dataT, index, row)
						let _index = this.selected.findIndex((e) => e[this.defaultId] === row[this.defaultId])
						if (_index > -1) {
							this.selected.splice(_index, 1)
						} else {
							this.selected.push(row)
						}
						this.$emit('row-selection-change', this.selected)
					}
				}
			},
			/**
			 * 清空多选(公开)
			 */
			handleClearSelection() {
				if (this.isTable) {
					this.$refs.elTableRef.clearSelection()
				} else {
					this.selected = []
				}
			},
			/**
			 * 列表复选框选择事件,返回所有选中数据
			 * @param selection
			 */
			handleSelectionChange(selection) {
				if (this.selection) {
					this.selected = selection
				}
			},
			/**
			 * 清空选择
			 */
			clearSelect() {
				if (this.radio) {
					this.onlyId = null
				}
				if (this.selection) {
					if (this.isTable) {
						this.$refs.elTableRef.clearSelection()
					} else {
						this.selected = []
					}
				}
			},
			/**
			 * 切换分页
			 */
			changePage() {
				scrollTo(0, 800)
				this.getTableData()
			},
			/**
			 * 清空表格数据
			 */
			clearTableData() {
				this.$set(this, 'dataT', [])
				this.clearSelect()
				this.currentPage = 1
				this.total = 0
			},
			/**
			 * 拉取表格数据并且点击行
			 */
			getDataAndClickRow(val) {
				if (val) {
					this.getTableData().then(() => {
						if (this.dataT.length > 0) {
							setTimeout(() => {
								let row = this.dataT.find((e) => e[this.defaultId] === val)
								if (row) {
									this.handleRowClick(row)
									this.$refs.elTableRef.setCurrentRow(row)
								}
							}, 10)
						}
					})
				} else {
					this.getTableData()
				}
			},
			/**
			 * 拉取表格数据
			 * @returns {Promise<unknown>}
			 */
			getTableData(keepSelect = false) {
				return new Promise((resolve) => {
					if (this.url && this.url !== '') {
						request
							.get(this.url, this.queryData, { isShowLoading: this.loading })
							.then((d) => {
								if (!keepSelect) {
									this.clearSelect()
								}
								if (d) {
									this.dataT = d.data || d || []
									this.total = d[this.totalKey] || 0
								} else {
									this.clearTableData()
								}
								this.$emit('on-data-change', d)
								resolve(d)
							})
							.catch((e) => {
								console.warn(e)
								this.$emit('on-data-change', e)
							})
					} else {
						console.warn('没有有效的请求地址，无法获取表格数据')
					}
				})
			}
		}
	}
</script>
