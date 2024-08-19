<template>
	<div class="em-colors-box">
		<template v-if="valueT && valueT.length > 0">
			<div class="colors-item" v-for="(item, index) in valueT" :key="index + item">
				<div class="colors-item-bar" v-if="isAddDel && !disabled">
					<div class="colors-item-tool" @click="removeColor(index)">-</div>
					<div class="colors-item-tool" @click="addColor(index)">+</div>
				</div>
				<el-color-picker
					:size="size"
					:disabled="disabled"
					v-model="colorObj['val' + index]"
					@change="changeHandle($event, index)"
					:show-alpha="showAlpha"
				/>
			</div>
		</template>
		<div class="colors-item" v-if="isAddDel && !disabled"><i class="el-icon-plus" @click="addColor()"></i></div>
	</div>
</template>
<script>
	export default {
		name: 'EmColorGroup',
		model: {
			prop: 'value',
			event: 'on-val-change'
		},
		props: {
			value: {
				type: Array,
				default: () => {
					return []
				}
			},
			/*是否显示透明色*/
			showAlpha: {
				type: Boolean,
				default: false
			},
			/*剩余几个时不可删除*/
			remain: {
				type: Number,
				default: 0
			},
			/*是否可以新增和删除*/
			isAddDel: {
				type: Boolean,
				default: true
			},
			/*是否可以新增和删除*/
			disabled: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: 'small'
			}
		},
		computed: {
			valueT: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('on-val-change', val)
				}
			}
		},
		data() {
			return {
				colorObj: {}
			}
		},
		watch: {
			valueT: {
				handler() {
					this.colorObj = {}
					this.valueT.forEach((e, index) => {
						this.$set(this.colorObj, 'val' + index, e)
					})
				},
				deep: true, // 深度监听
				immediate: true //初始化执行
			}
		},
		methods: {
			/**
			 * 颜色选择响应
			 * @param color
			 * @param index
			 */
			changeHandle(color, index) {
				this.$set(this.valueT, index, color)
			},
			/**
			 * 颜色添加数据
			 * @param index
			 */
			addColor(index) {
				if (index || index === 0) {
					this.valueT.splice(index, 0, '#fff')
				} else {
					this.valueT.push('#fff')
				}
			},
			/**
			 * 颜色移除数据
			 * @param index
			 */
			removeColor(index) {
				if (this.valueT && this.valueT.length > this.remain) {
					this.valueT.splice(index, 1)
				}
			}
		}
	}
</script>
