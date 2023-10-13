<template>
  <div class="em-form">
    <el-form
        ref="elFormRef" :model="dataGroup" :rules="formRulesT" :label-position="labelPosition"
        :label-width="labelWidth"
        :show-message="showMessage" :inline-message="inlineMessage" :inline="inline" :size="size"
        :disabled="disabled"
    >
      <!--解决form只有一个input时enter触发页面刷新的问题-->
      <el-form-item style="display: none"><input type="text" /></el-form-item>
      <el-form-item
          v-for="(item,index) in formDataT" :key="item.key + index" v-if="getFormItemIfVal(item)"
          :prop="item.key" :label="item.label" :label-width="item.labelWidth || labelWidth"
          :show-message="item.showMessage || showMessage"
      >
        <!--纯文本,也可以不传label和val,单纯用来布局占位-->
        <div v-if="item.type === 'txt'" style="display: inline-block;color: #606266;">{{ item.val }}</div>
        <!-- Inupt输入框 -->
        <el-input
            v-if="item.type === 'input'"
            v-model="tempKeys[item.tempKey]"
            :maxlength="item.maxLength || null"
            :minlength="item.minLength || null"
            :placeholder="item.placeholder || t('em.pInput')"
            clearable
            :show-password="item.showPassword"
            :disabled="item.disabled || disabled"
            :readonly="item.readonly"
            @blur="itemChange($event,item)"
        >
          <template v-if="item.prepend" slot="prepend">
            <span>{{ item.prepend }}</span>
          </template>
          <template v-if="item.append" slot="append">
            <span>{{ item.append }}</span>
          </template>
        </el-input>
        <!-- InputNumber 输入框 -->
        <el-input-number
            v-else-if="item.type === 'inputNumber'"
            v-model="tempKeys[item.tempKey]"
            :min="(item.min||item.min===0)?item.min:-Infinity"
            :max="(item.max||item.max===0)?item.max:Infinity"
            :step="item.step || 1"
            :precision="item.precision" :placeholder="item.placeholder|| t('em.pInput')"
            :controls="item.controls || true"
            :controls-position="item.controlsPosition || 'right'"
            :disabled="item.disabled || disabled"
            :readonly="item.readonly"
            @blur="itemChange($event,item)"
            @input.native="clearValidateHandle"
        />
        <!-- Switch  开关 -->
        <el-switch
            v-else-if="item.type === 'switch'"
            v-model="tempKeys[item.tempKey]"
            :disabled="item.disabled || disabled"
            :width="item.width"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
            :active-color="item.activeColor || '#409EFF'"
            :inactive-color="item.inactiveColor || '#C0CCDA'"
            @change="itemChange($event,item)"
        />
        <!-- Slider 滑块 -->
        <el-slider
            v-else-if="item.type === 'slider'"
            v-model="tempKeys[item.tempKey]"
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
            :marks="item.marks"
            @change="itemChange($event,item)"
        />
        <!-- Rate 评分 -->
        <el-rate
            v-else-if="item.type === 'rate'"
            v-model="tempKeys[item.tempKey]"
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
            @change="itemChange($event,item)"
        />
        <!-- Select 下拉框 -->
        <el-select
            v-else-if="item.type === 'select'"
            v-model="tempKeys[item.tempKey]"
            :filterable="item.filterable || true"
            :multiple="item.multiple || false"
            clearable
            :placeholder="item.placeholder|| t('em.pSelect')"
            :disabled="item.disabled || disabled"
            @change="itemChange($event,item)"
        >
          <el-option
              v-for="optionItem in item.options"
              :key="'selectItem'+optionItem.val"
              :label="optionItem.label"
              :value="optionItem.val"
              :disabled="!!optionItem.disabled"
          />
        </el-select>
        <!-- SelectInput 下拉输入框 -->
        <em-select-input
            v-else-if="item.type === 'selectInput'"
            v-model="tempKeys[item.tempKey]"
            :url="item.url"
            :data="item.data"
            :select-width="item.selectWidth"
            :filterable="item.filterable"
            :option-filter="item.optionFilter"
            :option-val="item.optionVal"
            :option-label="item.optionLabel"
            :disabled="item.disabled || disabled"
            :select-placeholder="item.selectPlaceholder"
            :input-placeholder="item.inputPlaceholder"
            @on-change="onSelectInputChange"
        />
        <!--单选组-->
        <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="tempKeys[item.tempKey]"
            :size="item.size || 'medium'"
            :text-color="item.textColor || '#ffffff'"
            :fill="item.fill || '#409EFF'"
            :disabled="item.disabled || disabled"
            @input="itemChange($event,item)"
        >
          <template v-if="item.radioType === 'button'">
            <el-radio-button
                v-for="radioItem of item.options"
                :key="'radioItem'+radioItem.val"
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
                :key="'radioItem'+radioItem.val"
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
            v-model="tempKeys[item.tempKey]"
            :size="item.size || 'medium'"
            :text-color="item.textColor || '#ffffff'"
            :fill="item.fill || '#409EFF'"
            :disabled="item.disabled || disabled"
            @input="itemChange($event,item)"
        >
          <template v-if="item.checkboxType === 'button'">
            <el-checkbox-button
                v-for="checkItem of item.options"
                :key="'optionItem'+checkItem.val"
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
                :key="'optionItem'+checkItem.val"
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
            v-model="tempKeys[item.tempKey]"
            :autosize="item.autosize||{minRows: 2}"
            :maxlength="item.maxLength||null"
            :show-word-limit="item.showWordLimit || false"
            :placeholder="item.placeholder || t('em.pInput')"
            clearable
            :disabled="item.disabled || disabled"
            @blur="itemChange($event,item)"
        />
        <!--日期组件-->
        <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="tempKeys[item.tempKey]"
            :type="item.dateType"
            :align="item.align || 'left'"
            :range-separator="item.rangeSeparator || '-'"
            :placeholder="item.placeholder || t('el.datepicker.selectDate')"
            :start-placeholder="item.startPlaceholder || t('el.datepicker.startDate')"
            :end-placeholder="item.endPlaceholder || t('el.datepicker.endDate')"
            :picker-options="item.pickerOptions"
            :disabled="item.disabled || disabled"
            @change="itemChange($event,item)"
        >
        </el-date-picker>
        <!--时间组件-->
        <el-time-picker
            v-else-if="item.type === 'time'"
            v-model="tempKeys[item.tempKey]"
            :align="item.align || 'left'"
            :is-range="item.isRange || false"
            :range-separator="item.rangeSeparator || '-'"
            :placeholder="item.placeholder || t('el.datepicker.selectTime')"
            :start-placeholder="item.startPlaceholder || t('el.datepicker.startTime')"
            :end-placeholder="item.endPlaceholder || t('el.datepicker.endTime')"
            :picker-options="item.pickerOptions"
            :disabled="item.disabled || disabled"
            @change="itemChange($event,item)"
        >
        </el-time-picker>
        <!--上传组件-->
        <em-upload
            v-else-if="item.type === 'upload'"
            v-model="dataGroup[item.key]"
            :url="item.url"
            :auto-upload="item.autoUpload"
            :multiple="item.multiple"
            :format="item.format||[]"
            :headers="item.headers"
            :paramData="item.paramData"
            :fileName="item.fileName"
            :max-size="item.maxSize"
            :length="item.length"
            :list-type="item.listType"
            :disabled="item.disabled || disabled"
            :with-credentials="item.withCredentials"
            :upload-fetch="item.uploadFetch"
            @on-file-change="reValidateAndChangeHandle($event,item)"
        />
        <!--行政区域级联-->
        <em-cascader-area
            v-else-if="item.type === 'area'"
            v-model="dataGroup[item.key]"
            :level="item.level"
            :disabled="item.disabled || disabled"
            :filterable="item.filterable"
            :separator="item.separator"
            :size="item.size"
            :placeholder="item.placeholder"
            :show-all-levels="item.showAllLevels"
            @on-name-change="caNameChange($event,item)"
        />
        <!--自定义级联-->
        <em-cascader
            v-else-if="item.type === 'cascader'"
            v-model="dataGroup[item.key]"
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
            @on-name-change="caNameChange($event,item)"
        />
        <!--百度地图-->
        <em-baidu-map
            v-else-if="item.type === 'bdMap'"
            v-model="tempKeys[item.tempKey]"
            :placeholder="item.placeholder"
            :disabled="item.disabled || disabled"
            :width="item.mapWidth"
            :height="item.mapHeight"
            :ak="item.ak"
            @on-val-change="reValidateAndChangeHandle($event,item)"
        />
        <!--富文本框-->
        <em-editor
            v-else-if="item.type === 'editor'"
            v-model="dataGroup[item.key]"
            :placeholder="item.placeholder"
            :disabled="item.disabled || disabled"
            :toolbar-config="item.toolbarConfig"
            :editor-config="item.editorConfig"
            :mode="item.mode"
            :height="item.height"
            @on-val-change="reValidateAndChangeHandle($event,item)"
        />
        <!--颜色选择-->
        <el-color-picker
            v-else-if="item.type === 'colorPicker'"
            v-model="dataGroup[item.key]"
            :disabled="item.disabled || disabled"
            :size="item.size"
            :show-alpha="item.showAlpha"
            :color-format="item.colorFormat"
            :popper-class="item.popperClass"
            :predefine="item.predefine"
            @change="itemChange($event,item)"
        />
        <!--图标选择-->
        <em-icon-select
            v-else-if="item.type === 'selectIcon'"
            v-model="dataGroup[item.key]"
            :data="item.data"
            :background="item.background"
            :color="item.color"
            :disabled="item.disabled || disabled"
            :width="item.width"
            :trigger="item.trigger"
            :placeholder="item.placeholder"
            @on-val-change="itemChange($event,item)"
        />
        <!--表格选择-->
        <em-table-select
            v-else-if="item.type === 'tableSelect'"
            v-model="dataGroup[item.key]"
            :url="item.url"
            :search-form="item.searchForm"
            :columns="item.columns"
            :page-size="item.pageSize"
            :disabled="item.disabled || disabled"
            :width="item.width"
            :multiple="item.multiple"
            :label-key="item.labelKey"
            :val-key="item.valKey"
            :placeholder="item.placeholder"
            :placement="item.placement"
            @on-val-change="reValidateAndChangeHandle($event,item)"
        />
        <!--自定义选项-->
        <div v-else-if="item.type === 'custom'" class="inlineBlock">
          <slot :name="item.slotName" :data-group="dataGroup" />
        </div>
      </el-form-item>
      <!--长提交按钮-->
      <el-form-item v-if="showLongOkBt">
        <el-button type="primary" :loading="btnLoading&&showLoading" :disabled="disabled" @click="submit">
          {{ longOkBtTxt || t("em.button.confirm") }}
        </el-button>
      </el-form-item>
      <!--短提交按钮（提交）-->
      <el-form-item v-if="showInlineOkBt || showInlineClearBt">
        <el-button
            v-if="showInlineOkBt" type="primary" :icon="inlineOkBtIcon" :loading="btnLoading&&showLoading"
            :disabled="disabled" @click="submit"
        >
          {{ inlineOkBtTxt || $t("em.button.confirm") }}
        </el-button>
        <el-button v-if="showInlineClearBt" :icon="inlineClearBtIcon" @click="resetForm">{{
            inlineClearBtTxt || t("em.button.clear")
          }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {initFormItems, getTempKeyDefaultVal, updateTempKeys, initClearFormData} from './hooks'
  import {trimObj, myTypeof, isValidVal} from '../../methods'
  import Locale from '../../mixins/locale'
  import EmBaiduMap from "../EmBaiduMap"
  import EmCascader from "../EmCascader"
  import EmCascaderArea from "../EmCascaderArea"
  import EmEditor from "../EmEditor"
  import EmUpload from "../EmUpload"
  import EmIconSelect from "../EmIconSelect"
  import EmTableSelect from "../EmTableSelect"

  export default {
    name: "EmForm",
    mixins: [Locale],
    components: {
      EmBaiduMap,
      EmCascader,
      EmCascaderArea,
      EmEditor,
      EmUpload,
      EmIconSelect,
      EmTableSelect
    },
    props: {
      formData: {
        /*表单结构数据*/
        type: Array,
        default() {
          return []
        }
      },
      formRules: {
        /*表单结构规则*/
        type: Object,
        default() {
          return {}
        }
      },
      showMessage: {
        /*是否显示校验信息*/
        type: Boolean,
        default: true
      },
      inlineMessage: {
        /*是否以行内形式展示校验信息*/
        type: Boolean,
        default: false
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
      showLongOkBt: {
        /*是否展示长确定按钮*/
        type: Boolean,
        default: false
      },
      showInlineClearBt: {
        /*是否展示行内短清空按钮*/
        type: Boolean,
        default: false
      },
      showInlineOkBt: {
        /*是否展示行内短确定按钮*/
        type: Boolean,
        default: false
      },
      longOkBtTxt: {
        /*长确定按钮内容*/
        type: String,
        default: ''
      },
      inlineOkBtTxt: {
        /*短确定按钮内容*/
        type: String,
        default: ''
      },
      inlineClearBtTxt: {
        /*短清空按钮内容*/
        type: String
      },
      inlineOkBtIcon: {
        /*短确定按钮Icon*/
        type: String
      },
      inlineClearBtIcon: {
        /*短清空按钮Icon*/
        type: String
      },
      disabled: {
        /*整表禁用，仅展示*/
        type: Boolean,
        default: false
      },
      btnLoading: {
        /*提交按钮显示loading*/
        type: Boolean,
        default: false
      },
      trim: {
        /*是否去除提交数据中的字符串首尾空格*/
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dataGroup: {}, /*表单项值，对外公开，提交时传递到外层*/
        tempKeys: {}, /*临时使用对象的值*/
        formDataT: [], /*表单结构数据*/
        watchGroup: []/*需要监听的事件集合*/,
        showLoading: false,
        debounceCount: false
      }
    },
    computed: {
      formRulesT() { /*计算规则*/
        let t = _.cloneDeep(this.formRules)
        for (let k in t) {
          if (t.hasOwnProperty(k)) {
            if (Array.isArray(t[k])) {
              for (let e of t[k]) {
                if (!(e.message || e.validator)) {
                  e.message = '该项为必填'
                }
              }
            }
            else if (myTypeof(t[k]) === 'Object') {
              if (!(t[k].message || t[k].validator)) {
                t[k].message = '该项为必填'
              }
            }
          }
        }
        return t
      },
    },
    created() {
      this.initDataGroup()
      this.initFormDataT()
    },
    watch: {},
    methods: {
      /**
       * 初始化表单项
       */
      initDataGroup() {
        this.dataGroup = {}
        for (let root of this.formData) {
          if (root.key) {
            if (root.type === 'checkbox' ||
                ((root.type === 'select' || root.type === 'tableSelect') && root.multiple)) {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : [])
            }
            else if (root.type === 'editor') {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : '')
            }
            else if (root.type === 'inputNumber' || root.type === 'slider') {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : undefined)
            }
            else if (root.type === 'switch') {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : false)
            }
            else {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : null)
              if (root.key2) {
                this.$set(this.dataGroup, root.key2,
                    root.defaultVal2 !== undefined && root.show === undefined ? root.defaultVal2 : null)
              }
            }
          }
        }
      },
      /**
       * 初始化表单结构（私有）*
       */
      initFormDataT() {
        let t = _.cloneDeep(this.formData)
        initFormItems(t, this.tempKeys, this.dataGroup, this.watchGroup, this)
        this.formDataT = t
      },
      /**
       * 清空表单
       * @returns {Promise<unknown>}
       */
      resetForm() {
        return new Promise(r => {
          this.clearForm()
          this.$refs['elFormRef'].resetFields()
          r()
        })
      },
      /**
       * 重新渲染表单
       * @returns {Promise<unknown>}
       */
      reRenderForm() {
        return new Promise(r => {
          this.watchGroup = []
          this.tempKeys = {}
          this.initDataGroup()
          this.initFormDataT()
          r()
        })
      },
      /**
       * 清空表单值
       */
      clearForm() {
        let defaultV = this.getDefaultValues() //获取表单默认值
        for (let k in this.dataGroup) {
          if (defaultV.hasOwnProperty(k) && isValidVal(defaultV[k])) {
            this.$set(this.dataGroup, k, defaultV[k])
          }
          else {
            initClearFormData(this.formDataT, 'key', this.dataGroup, k)
          }
        }
        this.clearTempKeys(defaultV) //清理临时keys
      },
      /**
       * 判断是否展示表单项（私有，高频被调用方法，每次表单中有任何值更改，都会被调用formDataT的长度<formDataT.length>次，而且还可能触发连锁反应）
       * @param root 表单项结构数据
       */
      getFormItemIfVal(root) {
        let showing = true
        if (root.show) {
          if (myTypeof(root.show) === 'Object') {
            showing = this.dealIfItem(root.show)
          }
          else if (Array.isArray(root.show)) {
            if (root.showOr) {
              showing = false
              for (let x of root.show) {
                if (this.dealIfItem(x) === true) {//只要满足一个条件即可
                  showing = true
                  break
                }
              }
            }
            else {
              for (let x of root.show) {
                if (this.dealIfItem(x) === false) {
                  showing = false
                  break
                }
              }
            }
          }
          else if (myTypeof(root.show) === 'Function') {
            showing = root.show(this.dataGroup)
          }
        }
        this.$set(root, 'showing', showing)
        return showing
      },
      /**
       * 判断表单项是否展示（私有）
       * @param show 表单项的展示配置数据
       * @returns {boolean}
       */
      dealIfItem(show) {
        let isShow = false
        if (Array.isArray(show.val)) {
          for (let v of show.val) {
            if (this.dataGroup[show.key] === v) {
              isShow = true
              break
            }
          }
        }
        else {
          isShow = this.dataGroup[show.key] === show.val
        }
        return isShow
      },
      /**
       * 更新表单项的值（只能更新已有字段，公开）
       * @param data 新数据
       * @param notClearOthers 是否清空其他表单项，默认清空
       */
      updateDataGroup(data, notClearOthers = false) {
        updateTempKeys(this.formDataT, this.tempKeys, data, notClearOthers)
        for (let k in this.dataGroup) {
          if (data[k] !== undefined) {
            this.$set(this.dataGroup, k, data[k])
          }
          else if (!notClearOthers) {
            initClearFormData(this.formDataT, 'key', this.dataGroup, k)
          }
        }
      },
      /**
       * 更新表单结构，例如设置或取消禁用,或者给type为txt的表单项（没有key）赋值（公开）；
       * @param {Object|Array} d 为对象（改变单个）或数组（改变多个），支持的属性：index（必填）-需要改变的formData项的索引值、
       * 则为:{index:1,label:XXX,title:XXX}
       */
      updateFormDataT(d) {
        if (Array.isArray(d)) {
          for (let e of d) {
            this.changeDataHandle(e)
          }
        }
        else if (myTypeof(d) === 'Object') {
          this.changeDataHandle(d)
        }
      },
      /**
       * 清空缓存表单值
       * @param defaultV
       */
      clearTempKeys(defaultV) {
        for (let k in this.tempKeys) {
          if (defaultV.hasOwnProperty(k) && isValidVal(defaultV[k])) {
            this.$set(this.tempKeys, k, defaultV[k])
          }
          else {
            initClearFormData(this.formDataT, 'tempKey', this.tempKeys, k)
          }
        }
      },
      /**
       * 获取表单默认值
       * @returns {{}}
       */
      getDefaultValues() {
        let t = {}
        for (let root of this.formDataT) {
          if (root.tempKey && isValidVal(root.defaultVal)) {
            /*将默认值转换为表单项绑定值对应的格式*/
            getTempKeyDefaultVal(root, t)
          }
          if (root.key && isValidVal(root.defaultVal)) {
            t[root.key] = root.defaultVal
          }
          if (root.key2 && isValidVal(root.defaultVal2)) {
            t[root.key2] = root.defaultVal2
          }
          if (root.key3 && isValidVal(root.defaultVal3)) {
            t[root.key3] = root.defaultVal3
          }
        }
        return t
      },
      /**
       * 改变表单结构（私有）
       * @param d 同updateFormDataT的 d
       */
      changeDataHandle(d) {
        const {
          index,
          key,
          val
        } = d
        if (index || index === 0) {
          if (key && (val || val !== undefined)) {
            this.$set(this.formDataT[index], key, val)
          }
          else {
            for (let k of Object.keys(d)) {
              if (k !== 'index') {
                this.$set(this.formDataT[index], k, d[k])
              }
            }
          }
        }
      },
      /**
       * 主动改变表单按钮loading状态
       * @param v
       */
      changeLoading(v) {
        if (v === undefined) {
          return
        }
        this.showLoading = Boolean(v)
      },
      /**
       * 去除校验（私有）
       * 有些组件在数据发生变化时校验信息不会变化，例如 inputNumber
       * @param root 表单项结构数据
       */
      clearValidateHandle(root) {
        this.$nextTick(() => {
          if (isValidVal(root.target.value)) {
            this.$refs.elFormRef.clearValidate(root.key)
          }
        })
      },
      /**
       * 重新校验（私有）
       * 有些组件在数据发生变化后不会触发校验，需要手动触发，例如upload
       * @param root 表单项结构数据
       * @param item
       */
      reValidateAndChangeHandle(item, root) {
        this.$nextTick(() => {
          this.$refs.elFormRef.validateField(root.key)
          this.itemChange(item, root)
        })
      },
      /**
       * 更新选择输入框值(私有)
       * @param d
       */
      onSelectInputChange(d) {
        if (d.key) {
          this.itemChange('selectInput',  d)
        }
      },
      /**
       * 更新级联组件名称（私有）
       * @param name 行政区域名称
       * @param root
       */
      caNameChange(name, root) {
        if (root.key2) {
          this.dataGroup[root.key2] = name
        }
        this.itemChange(name, root)
      },
      /**
       * 表单项值更新（私有）
       * @param e 事件的$event对象，一般是组件change事件的值
       * @param root 表单项结构数据
       */
      itemChange(e, root) {
        setTimeout(() => {
          let d = {
            event: e
          }
          if (root.key) {
            d[root.key] = this.dataGroup[root.key]
          }
          if (root.key2) {
            d[root.key2] = this.dataGroup[root.key2]
          }
          if (root.key3) {
            d[root.key3] = this.dataGroup[root.key3]
          }
          if (root.collectLabel && root.collectLabel.key) {
            d[root.collectLabel.key] = this.dataGroup[root.collectLabel.key]
          }
          else if (Array.isArray(root.collectLabel)) {
            for (let l of root.collectLabel) {
              d[l.key] = this.dataGroup[l.key]
            }
          }
          this.$emit('on-item-change', d)
        }, 100)
      },
      /**
       * 获取需要提交的数据
       * @return {{}}submit的值
       */
      getDataGroup() {
        let keys = []
        for (let e of this.formDataT) {
          if (e['showing'] === true && e.key) {
            if(e.type === 'selectInput'){ //selectInput单独处理
              let si = this.dataGroup[e.key] || ''
              let siArr = si.split(':') || []
              if(siArr.length > 0){
                keys.push(siArr[0])
              }
            }else {
              keys.push(e.key)
              if (e.key2) {
                keys.push(e.key2)
              }
              if (e.key3) {
                keys.push(e.key3)
              }
              if (e.collectLabel) {
                if (myTypeof(e.collectLabel) === 'Object' && e.collectLabel.key) {
                  keys.push(e.collectLabel.key)
                }
                else if (Array.isArray(e.collectLabel)) {
                  for (let l of e.collectLabel) {
                    if (l.key) {
                      keys.push(l.key)
                    }
                  }
                }
              }
            }
          }
        }
        let t = {}
        for (let e of keys) {
          t[e] = this.dataGroup[e]
        }
        if (this.trim) {
          t = trimObj(t)
        }
        return t
      },
      /**
       * 提交事件
       */
      submit() {
        if (this.disabled) {
          return
        }
        this.$refs.elFormRef.validate(valid => {
          if (!this.debounceCount) {
            this.debounceCount = true
            if (valid) {
              this.showLoading = true
              this.$emit('on-submit', this.getDataGroup())
            }
            setTimeout(() => {
              this.debounceCount = false
            }, 2000)
          }
        })
      }
    }
  }
</script>
