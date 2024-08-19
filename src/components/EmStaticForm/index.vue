<template>
	<div class="em-form">
		<el-form
			ref="elFormRef"
			:model="valueT"
			:label-position="labelPosition"
			:label-width="labelWidth"
			:inline="inline"
			:size="size"
			:disabled="disabled"
		>
			<!--解决form只有一个input时enter触发页面刷新的问题-->
			<el-form-item style="display: none"><input type="text" /></el-form-item>
			<el-form-item
				v-for="(item, index) in formData"
				:key="item.key + index"
				:prop="item.key"
				:label="item.label"
				:label-width="item.labelWidth || labelWidth"
			>
				<!--纯文本,也可以不传label和val,单纯用来布局占位-->
				<div v-if="item.type === 'txt'" style="display: inline-block; color: #606266">{{ item.val }}</div>
				<!-- inupt输入框 -->
				<el-input
					v-if="item.type === 'input'"
					v-model="valueT[item.key]"
					:maxlength="item.maxLength || null"
					:minlength="item.minLength || null"
					:placeholder="item.placeholder || t('em.pInput')"
					clearable
					:show-password="item.showPassword"
					:disabled="item.disabled || disabled"
					:readonly="item.readonly"
				>
					<template v-if="item.prepend" #prepend>
						<span>{{ item.prepend }}</span>
					</template>
					<template v-if="item.append" #append>
						<span>{{ item.append }}</span>
					</template>
				</el-input>
				<!-- InputNumber 输入框 -->
				<el-input-number
					v-else-if="item.type === 'inputNumber'"
					v-model="valueT[item.key]"
					:min="item.min || item.min === 0 ? item.min : -Infinity"
					:max="item.max || item.max === 0 ? item.max : Infinity"
					:step="item.step || 1"
					:precision="item.precision"
					:placeholder="item.placeholder || t('em.pInput')"
					:controls="item.controls || true"
					:controls-position="item.controlsPosition || 'right'"
					:disabled="item.disabled || disabled"
					:readonly="item.readonly"
				/>
				<!-- Switch  开关 -->
				<el-switch
					v-else-if="item.type === 'switch'"
					v-model="valueT[item.key]"
					:disabled="item.disabled || disabled"
					:width="item.width"
					:active-text="item.activeText"
					:inactive-text="item.inactiveText"
					:active-value="item.activeValue"
					:inactive-value="item.inactiveValue"
					:active-color="item.activeColor || '#409EFF'"
					:inactive-color="item.inactiveColor || '#C0CCDA'"
				/>
				<!-- Slider 滑块 -->
				<el-slider
					v-else-if="item.type === 'slider'"
					v-model="valueT[item.key]"
					:disabled="item.disabled || disabled"
					:min="item.min || 0"
					:max="item.min || 100"
					:step="item.step || 1"
					:show-stops="item.showStops"
					:show-tooltip="item.showTooltip"
					:format-tooltip="item.formatTooltip"
					:range="item.range"
					:vertical="item.vertical"
					:height="item.height"
					:debounce="item.debounce"
					:marks="item.marks"
				/>
				<!-- Rate 评分 -->
				<el-rate
					v-else-if="item.type === 'rate'"
					v-model="valueT[item.key]"
					:disabled="item.disabled || disabled"
					:max="item.min || 5"
					:allow-half="item.allowHalf"
					:colors="item.colors"
					:void-color="item.voidColor"
					:disabled-void-color="item.disabledVoidColor"
					:show-text="item.showText"
					:show-score="item.showScore"
					:text-color="item.textColor"
					:texts="item.texts"
					:score-template="item.scoreTemplate"
				/>
				<!-- Select 下拉框 -->
				<el-select
					v-else-if="item.type === 'select'"
					v-model="valueT[item.key]"
					:filterable="item.filterable || true"
					:multiple="item.multiple || false"
					clearable
					:placeholder="item.placeholder || t('em.pSelect')"
					:disabled="item.disabled || disabled"
				>
					<el-option
						v-for="optionItem in item.options"
						:key="'selectItem' + optionItem.val"
						:label="optionItem.label"
						:value="optionItem.val"
						:disabled="!!optionItem.disabled"
					/>
				</el-select>
				<!--单选组-->
				<el-radio-group
					v-else-if="item.type === 'radio'"
					v-model="valueT[item.key]"
					:size="item.size || 'medium'"
					:text-color="item.textColor || '#ffffff'"
					:fill="item.fill || '#409EFF'"
					:disabled="item.disabled || disabled"
				>
					<template v-if="item.radioType === 'button'">
						<el-radio-button
							v-for="radioItem of item.options"
							:key="'radioItem' + radioItem.val"
							:label="radioItem.val"
							:border="item.itemBorder || false"
							:disabled="!!radioItem.disabled"
						>
							<span>{{ radioItem.label || radioItem.val }}</span>
						</el-radio-button>
					</template>
					<template v-else>
						<el-radio
							v-for="radioItem of item.options"
							:key="'radioItem' + radioItem.val"
							:label="radioItem.val"
							:border="item.itemBorder || false"
							:disabled="!!radioItem.disabled"
						>
							<span>{{ radioItem.label || radioItem.val }}</span>
						</el-radio>
					</template>
				</el-radio-group>
				<!--多选组-->
				<el-checkbox-group
					v-else-if="item.type === 'checkbox'"
					v-model="valueT[item.key]"
					:size="item.size || 'medium'"
					:text-color="item.textColor || '#ffffff'"
					:fill="item.fill || '#409EFF'"
					:disabled="item.disabled || disabled"
				>
					<template v-if="item.checkboxType === 'button'">
						<el-checkbox-button
							v-for="checkItem of item.options"
							:key="'optionItem' + checkItem.val"
							:label="checkItem.val"
							:border="item.itemBorder || false"
							:disabled="!!checkItem.disabled"
						>
							<span>{{ checkItem.label || checkItem.val }}</span>
						</el-checkbox-button>
					</template>
					<template v-else>
						<el-checkbox
							v-for="checkItem of item.options"
							:key="'optionItem' + checkItem.val"
							:label="checkItem.val"
							:border="item.itemBorder || false"
							:disabled="!!checkItem.disabled"
						>
							<span>{{ checkItem.label || checkItem.val }}</span>
						</el-checkbox>
					</template>
				</el-checkbox-group>
				<!--多行文本框-->
				<el-input
					v-else-if="item.type === 'textarea'"
					type="textarea"
					v-model="valueT[item.key]"
					:autosize="item.autosize || { minRows: 2 }"
					:maxlength="item.maxLength || null"
					:show-word-limit="item.showWordLimit || false"
					:placeholder="item.placeholder || t('em.pInput')"
					clearable
					:disabled="item.disabled || disabled"
				/>
				<!--日期组件-->
				<el-date-picker
					v-else-if="item.type === 'date'"
					v-model="valueT[item.key]"
					:type="item.dateType"
					:align="item.align || 'left'"
					:range-separator="item.rangeSeparator || '-'"
					:placeholder="item.placeholder || t('el.datepicker.selectDate')"
					:start-placeholder="item.startPlaceholder || t('el.datepicker.startDate')"
					:end-placeholder="item.endPlaceholder || t('el.datepicker.endDate')"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled || disabled"
				>
				</el-date-picker>
				<!--时间组件-->
				<el-time-picker
					v-else-if="item.type === 'time'"
					v-model="valueT[item.val]"
					:align="item.align || 'left'"
					:is-range="item.isRange || false"
					:range-separator="item.rangeSeparator || '-'"
					:placeholder="item.placeholder || t('el.datepicker.selectTime')"
					:start-placeholder="item.startPlaceholder || t('el.datepicker.startTime')"
					:end-placeholder="item.endPlaceholder || t('el.datepicker.endTime')"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled || disabled"
				>
				</el-time-picker>
				<!--颜色选择-->
				<el-color-picker
					v-else-if="item.type === 'colorPicker'"
					v-model="valueT[item.key]"
					:disabled="item.disabled || disabled"
					:size="item.size"
					:show-alpha="item.showAlpha"
					:color-format="item.colorFormat"
					:popper-class="item.popperClass"
					:predefine="item.predefine"
				/>
				<!--自定义级联-->
				<em-cascader
					v-else-if="item.type === 'cascader'"
					v-model="valueT[item.key]"
					:disabled="item.disabled || disabled"
					:filterable="item.filterable"
					:url="item.url"
					:data="item.data"
					:check-strictly="item.checkStrictly"
					:multiple="item.multiple"
					:option-val="item.optionVal"
					:option-label="item.optionLabel"
					:option-filter="item.optionFilter"
					:separator="item.separator"
					:size="item.size"
					:placeholder="item.placeholder"
					:show-all-levels="item.showAllLevels"
				/>
				<!--自定义选项-->
				<div v-else-if="item.type === 'custom'" class="inlineBlock">
					<slot :name="item.slotName" :data-group="valueT" />
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { isValidVal } from '../../methods'
	import Locale from '../../mixins/locale'

	export default {
		name: 'EmStaticForm',
		model: {
			prop: 'value',
			event: 'on-val-change'
		},
		mixins: [Locale],
		props: {
			value: {
				/*组件绑定的值（v-model）*/
				type: Object,
				default() {
					return {}
				}
			},
			formData: {
				/*表单结构数据*/
				type: Array,
				default() {
					return []
				}
			},
			labelWidth: {
				/*表单项标签宽度*/
				type: String,
				default: '120px'
			},
			inline: {
				/*行内表单模式*/
				type: Boolean,
				default: false
			},
			labelPosition: {
				/*表单域标签的位置*/
				type: String,
				default: 'right'
			},
			size: {
				/*用于控制该表单内组件的尺寸*/
				type: String,
				default: 'medium'
			},
			disabled: {
				/*整表禁用，仅展示*/
				type: Boolean,
				default: false
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
		created() {
			this.initDataGroup()
		},
		methods: {
			/**
			 * 初始化表单项
			 */
			initDataGroup() {
				for (let root of this.formData) {
					if (root.key) {
						if (root.type === 'inputNumber' || root.type === 'slider' || root.type === 'rate') {
							if (!isValidVal(this.valueT[root.key])) {
								this.$set(this.valueT, root.key, undefined)
							}
						} else if (root.type === 'switch') {
							if (!isValidVal(this.valueT[root.key])) {
								this.$set(this.valueT, root.key, false)
							}
						} else if (
							root.type === 'checkbox' ||
							(root.type === 'select' && root.multiple) ||
							root.type === 'datetime' ||
							root.type === 'datetimerange' ||
							root.type === 'daterange'
						) {
							if (!isValidVal(this.valueT[root.key])) {
								this.$set(this.valueT, root.key, [])
							}
						} else {
							if (!isValidVal(this.valueT[root.key])) {
								this.$set(this.valueT, root.key, null)
							}
						}
					}
				}
			}
		}
	}
</script>
