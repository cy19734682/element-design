<template>
	<el-input
		v-bind="$attrs"
		v-on="$listeners"
		v-model="inputVal"
		class="em-input-with-select"
		clearable
		:placeholder="inputPlaceholder || t('em.pInput')"
		:disabled="disabled"
		@change="inputChange"
	>
		<template #prepend>
			<el-select
				v-model="selectVal"
				:placeholder="selectPlaceholder || t('em.pSelect')"
				:style="{ minWidth: selectWidth }"
				clearable
				:filterable="filterable"
				:disabled="disabled"
			>
				<el-option
					v-for="(item, index) in options"
					:key="'selectInput' + index"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</template>
	</el-input>
</template>
<script>
	import _ from 'lodash'
	import Locale from '../../mixins/locale'
	import { myTypeof } from '../../methods'
	import request from '../../methods/request'

	export default {
		name: 'EmSelectInput',
		model: {
			prop: 'value',
			event: 'on-val-change'
		},
		mixins: [Locale],
		props: {
			url: {
				/*远程拉取数据的地址*/
				type: String,
				default: ''
			},
			value: {
				/*组件的值，建议使用v-model绑定，key对应select值，val对应input值*/
				type: Object,
				default() {
					return {
						key: null,
						val: null
					}
				}
			},
			data: {
				type: Array,
				default() {
					return []
				}
			},
			selectWidth: {
				/*select选择框宽度*/
				type: String,
				default: '120px'
			},
			optionVal: {
				/*v-model收集节点的哪些字段*/
				type: String,
				default: 'val'
			},
			optionLabel: {
				/*选项的标签对应接口字段*/
				type: String,
				default: 'label'
			},
			optionFilter: {
				/*筛选待选项的方法，入参是接口请求回来的待选项数据，返回处理后的待选项（仅进行筛选操作，不要做其它处理）*/
				type: Function
			},
			filterable: {
				/*是否可搜索*/
				type: Boolean,
				default: true
			},
			disabled: {
				/*禁用组件*/
				type: Boolean,
				default: false
			},
			selectPlaceholder: {
				/*选择框占位符*/
				type: String,
				default: ''
			},
			inputPlaceholder: {
				/*输入框占位符*/
				type: String,
				default: ''
			}
		},
		computed: {
			selectVal: {
				get() {
					return (this.value && this.value.key) || null
				},
				set(val) {
					let temp = {
						key: val,
						val: null
					}
					if (this.selectVal && this.selectVal !== val) {
						temp.beforeKey = this.selectVal
					}
					this.$emit('on-val-change', temp)
					this.$emit('on-change', temp)
				}
			},
			inputVal: {
				get() {
					return (this.value && this.value.val) || null
				},
				set(val) {
					let temp = {
						key: this.selectVal,
						val: val
					}
					this.$emit('on-val-change', temp)
				}
			}
		},
		watch: {
			data: {
				handler(after) {
					if (after && after.length > 0) {
						this.options = this.dataFilter(after)
					}
				},
				deep: true,
				immediate: true
			}
		},
		data() {
			return {
				options: []
			}
		},
		created() {
			this.getData()
		},
		methods: {
			/**
			 * 拉取数据
			 */
			getData() {
				if (this.url && this.url !== '') {
					request
						.get(this.url)
						.then((d) => {
							let data = d || []
							if (myTypeof(this.optionFilter) === 'Function') {
								data = this.optionFilter(data)
							}
							this.options = this.dataFilter(data)
						})
						.catch((e) => {
							console.warn(e)
						})
				}
			},
			/**
			 * 数据过滤
			 * @param data
			 * @returns {[]}
			 */
			dataFilter(data) {
				let temp = []
				for (let item of data) {
					let tt = {
						value: item[this.optionVal],
						label: item[this.optionLabel]
					}
					temp.push(tt)
				}
				return temp
			},
			/**
			 * input输入响应
			 */
			inputChange: _.debounce(function (e) {
				this.$emit('on-change', {
					key: this.selectVal,
					val: e
				})
			}, 200)
		}
	}
</script>
