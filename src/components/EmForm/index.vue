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
          v-for="(item,index) in formDataT" :key="item.key + index" :prop="item.key" :label="item.label"
          :label-width="item.labelWidth || labelWidth" :disabled="item.disabled || disabled"
          :show-message="item.showMessage || showMessage"
      >
        <!--纯文本,也可以不传label和val,单纯用来布局占位-->
        <div v-if="item.type === 'txt'" style="display: inline-block;color: #606266;">{{ item.val }}</div>
        <!-- inupt输入框 -->
        <el-input
            v-if="item.type === 'input'" v-model="tempKeys[item.tempKey]" :maxlength="item.maxLength || null"
            :minlength="item.minLength || null"
            :placeholder="item.placeholder || t('em.pInput')" clearable :show-password="item.showPassword"
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
            v-else-if="item.type === 'inputNumber'" v-model="tempKeys[item.tempKey]"
            :min="(item.min||item.min===0)?item.min:-Infinity"
            :max="(item.max||item.max===0)?item.max:Infinity"
            :step="item.step || 1"
            :precision="item.precision" :placeholder="item.placeholder|| t('em.pInput')"
            :controls="item.controls || true"
            :controls-position="item.controlsPosition || 'right'"
            @blur="itemChange($event,item)"
            @input.native="clearValidateHandle"
        />

        <!-- Select 下拉框 -->
        <el-select
            v-else-if="item.type === 'select'" v-model="tempKeys[item.tempKey]"
            :filterable="item.filterable || true"
            :multiple="item.multiple || false"
            clearable
            :placeholder="item.placeholder|| t('em.pSelect')"
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
        <!--单选组-->
        <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="tempKeys[item.tempKey]"
            :size="item.size || 'medium'"
            :text-color="item.textColor || '#ffffff'"
            :fill="item.fill || '#409EFF'"
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
            @change="itemChange($event,item)"
        >
        </el-time-picker>
        <!--上传组件-->
        <em-upload
            v-else-if="item.type === 'upload'"
            v-model="dataGroup[item.key]"
            :url="item.url"
            :auto-upload="Boolean(item.autoUpload)"
            :multiple="Boolean(item.multiple)"
            :format="item.format||[]"
            :data="item.data"
            :fileName="item.fileName"
            :max-size="item.maxSize||0"
            :length="item.length||0"
            :list-type="item.listType"
            :disabled="Boolean(item.disabled) || disabled"
            :with-credentials="item.withCredentials!==false"
            @change="itemChange($event,item)"
            @on-file-change="reValidateAndChangeHandle($event,item)"
        />
        <!--行政区域级联-->
        <em-cascader-area
            v-else-if="item.type === 'area'"
            v-model="dataGroup[item.key]"
            :level="item.level"
            :disabled="Boolean(item.disabled) || disabled"
            :filterable="item.filterable!==false"
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
            :disabled="Boolean(item.disabled) || disabled"
            :filterable="item.filterable!==false"
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
            :disabled="Boolean(item.disabled) || disabled"
            :width="item.mapWidth"
            :height="item.mapHeight"
            @on-val-change="reValidateAndChangeHandle($event,item)"
        />
        <!--富文本框-->
        <em-editor
            v-else-if="item.type === 'editor'"
            v-model="dataGroup[item.key]"
            :placeholder="item.placeholder"
            :disabled="Boolean(item.disabled) || disabled"
            :toolbar-config="item.toolbarConfig"
            :editor-config="item.editorConfig"
            :mode="item.mode"
            :height="item.height"
            @on-val-change="reValidateAndChangeHandle($event,item)"
        />
        <!--自定义组件-->
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
            @click="submit"
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
  import moment from 'moment'
  import _ from 'lodash'
  import Locale from '@/mixins/locale'
  export default {
    name: "EmForm",
    mixins: [Locale],
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
        /*显示校验信息*/
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
      itemWidth: {
        /*表单项内容宽度,用于行内表单*/
        type: Number,
        default: 200
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
            else if (this.myTypeof(t[k]) === 'Object') {
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
            if (root.type === 'checkbox' || root.type === 'select' && root.multiple) {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : [])
            }
            else if (root.type === 'editor') {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : '')
            }
            else if (root.type === 'inputNumber') {
              this.$set(this.dataGroup, root.key,
                  root.defaultVal !== undefined && root.show === undefined ? root.defaultVal : undefined)
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
        this.initFormItems(t)
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
        let defaultV = this.getDefaultValues()
        for (let k in this.dataGroup) {
          if (this.dataGroup.hasOwnProperty(k)) {
            if (this.isValidValue(defaultV[k])) {
              this.$set(this.dataGroup, k, defaultV[k])
            }
            else {
              this.initClearDataGroup(this.dataGroup, k)
            }
          }
        }
        this.clearTempKeys(defaultV)
      },
      /**
       * 更新表单项的值（只能更新已有字段，公开）
       * @param data 新数据
       * @param notClearOthers 是否清空其他表单项，默认清空
       */
      updateDataGroup(data, notClearOthers = false) {
        this.updateTempKeys(data, notClearOthers)
        for (let k in this.dataGroup) {
          if (data[k] !== undefined) {
            this.$set(this.dataGroup, k, data[k])
          }
          else if (!notClearOthers) {
            this.initClearDataGroup(this.dataGroup, k)
          }
        }
      },
      /**
       * 更新表单结构，例如设置或取消禁用,或者给type为txt的表单项（没有key）赋值（公开）；
       * @param {Object|Array} d 为对象（改变单个）或数组（改变多个），支持的属性：index（必填）-需要改变的formData项的索引值、
       * indexB-当表单为`分组表单`时必填（表示表单项的二位数组索引第二位）、需要改变的属性，如要改变第二个表单组件的label和title,
       * 则为:{index:1,label:XXX,title:XXX}
       */
      updateFormDataT(d) {
        if (Array.isArray(d)) {
          for (let e of d) {
            this.changeDataHandle(e)
          }
        }
        else if (this.myTypeof(d) === 'Object') {
          this.changeDataHandle(d)
        }
      }, /**
       * 重置表单，会清空表单值并刷新表单dom
       * @returns {Promise<unknown>}
       */
      /**
       * 清空缓存表单值
       * @param defaultV
       */
      clearTempKeys(defaultV) {
        for (let k in this.tempKeys) {
          if (this.tempKeys.hasOwnProperty(k)) {
            if (this.isValidValue(defaultV[k])) {
              this.$set(this.tempKeys, k, defaultV[k])
            }
            else {
              this.initClearDataGroup(this.tempKeys, k)
            }
          }
        }
      },
      /**
       * 初始化表单默认值
       * @param d 初始化对象
       * @param k key值
       */
      initClearDataGroup(d, k) {
        if (Array.isArray(d[k])) {
          this.$set(d, k, [])
        }
        else {
          const formItem = this.formDataT.find(e => (e.tempKey || e.key) === k)
          if (formItem && (formItem.type === 'editor')) {
            this.$set(d, k, '')
          }
          else if (formItem && (formItem.type === 'inputNumber')) {
            this.$set(d, k, undefined)
          }
          else {
            this.$set(d, k, null)
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
          if (root.tempKey && this.isValidValue(root.defaultVal)) {
            /*将默认值转换为表单项绑定值对应的格式*/
            this.getTempKeyDefaultVal(root, t)
          }
          if (root.key && this.isValidValue(root.defaultVal)) {
            t[root.key] = root.defaultVal
          }
          if (root.key2 && this.isValidValue(root.defaultVal2)) {
            t[root.key2] = root.defaultVal2
          }
        }
        return t
      },
      /**
       * 初始化表单项tempKeys值
       * @param d
       */
      initFormItems(d) {
        for (let root of d) {
          switch (root.type) {
            case 'bdMap':
              const tempKeyE = 'inputMap' + Math.floor(Math.random() * 100000000)
              if (root.key) {
                root.tempKey = tempKeyE
                this.$set(this.tempKeys, tempKeyE, root.defaultVal !== undefined && root.defaultVal2 !== undefined ? {
                  lng: root.defaultVal,
                  lat: root.defaultVal2,
                  name: root.defaultVal3 || ''
                } : {
                  lng: null,
                  lat: null,
                  name: null
                })
                this.watchGroup.push(this.$watch(() => this.tempKeys[tempKeyE], after => {
                  this.tempKeysWatchHandle(after, root)
                }, {immediate: true}))
              }
              break
            case 'input':
            case 'inputNumber':
            case 'textarea':
              const tempKeyD = 'inputT' + Math.floor(Math.random() * 100000000)
              if (root.key) {
                root.tempKey = tempKeyD
                if (root.type === 'inputNumber') {
                  this.$set(this.tempKeys, tempKeyD, root.defaultVal !== undefined ? root.defaultVal : undefined)
                }
                else {
                  this.$set(this.tempKeys, tempKeyD, root.defaultVal !== undefined ? root.defaultVal : null)
                }
                this.watchGroup.push(this.$watch(() => this.tempKeys[tempKeyD], after => {
                  this.tempKeysWatchHandle(after, root)
                }, {immediate: true}))
              }
              break
            case 'select':
            case 'radio':
            case 'checkbox':
              if (!root.options) {
                root.options = []
              }
              const tempKeyC = 'opEle' + Math.floor(Math.random() * 100000000)
              if (root.key) {
                root.tempKey = tempKeyC
                if (root.type === 'select' && root.multiple || root.type === 'checkbox') {
                  this.$set(this.tempKeys, tempKeyC, root.defaultVal !== undefined ? root.defaultVal : [])
                }
                else if (root.booleanVal) {
                  this.$set(this.tempKeys, tempKeyC,
                      root.defaultVal !== undefined ? (Boolean(root.defaultVal) ? 1 : 0) : null)
                }
                else {
                  this.$set(this.tempKeys, tempKeyC, root.defaultVal !== undefined ? root.defaultVal : null)
                }
                this.watchGroup.push(this.$watch(() => this.tempKeys[tempKeyC], after => {
                  this.tempKeysWatchHandle(after, root)
                }, {
                  immediate: true
                }))
              }
              break
            case 'date':
            case 'time':
              const tempKeyB = 'date' + Math.floor(Math.random() * 100000000)
              root.tempKey = tempKeyB
              if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType ===
                  'monthrange') {
                this.$set(this.tempKeys, tempKeyB, root.defaultVal && root.defaultVal2 && [
                  root.defaultVal, root.defaultVal2
                ] || [])
              }
              else if (root.type === 'time') {
                let constTime = '1970-01-01 ' //时间类型的不能直接赋值，需要拼接年月日
                if (root.isRange) {
                  this.$set(this.tempKeys, tempKeyB, root.defaultVal && root.defaultVal2 && [
                    constTime + root.defaultVal, constTime + root.defaultVal2
                  ] || null)
                }
                else {
                  this.$set(this.tempKeys, tempKeyB, constTime + root.defaultVal || null)
                }
              }
              else {
                this.$set(this.tempKeys, tempKeyB, root.defaultVal || null)
              }
              this.watchGroup.push(this.$watch(() => this.tempKeys[tempKeyB], after => {
                this.tempKeysWatchHandle(after, root)
              }))
              break
          }
        }
      },
      /**
       * 监听tempKeys项的值，然后赋值给dataGroup
       * @param after
       * @param root
       */
      tempKeysWatchHandle(after, root) {
        switch (root.type) {
          case 'bdMap':
            if (after) {
              this.dataGroup[root.key] = after.lng
              this.dataGroup[root.key2] = after.lat
              if (root.key3) {
                this.dataGroup[root.key3] = after.name
              }
            }
            else {
              this.dataGroup[root.key] = null
              this.dataGroup[root.key2] = null
              if (root.key3) {
                this.dataGroup[root.key3] = null
              }
            }
            break
          case 'input':
          case 'inputNumber':
          case 'textarea':
            if (after || after === 0) {
              this.dataGroup[root.key] = after
            }
            else {
              if (root.type === 'inputNumber') {
                this.dataGroup[root.key] = undefined
              }
              else {
                this.dataGroup[root.key] = null
              }
            }
            break
          case 'select':
          case 'radio':
          case 'checkbox':
            if (root.booleanVal && (!root.multiple)) {
              this.dataGroup[root.key] =
                  ((after === undefined || after === '' || after === null) ? null : Boolean(after))
            }
            else if (root.multiple || root.type === 'checkbox') {
              this.dataGroup[root.key] = Object.assign([], after)
            }
            else {
              this.dataGroup[root.key] = after
            }
            break
          case 'date':
          case 'time':
            let tp = root.dateType || 'date'
            const fm = {
              year: 'YYYY',
              month: 'MM',
              date: 'YYYY-MM-DD',
              time: 'HH:mm:ss',
              datetime: 'YYYY-MM-DD HH:mm:ss',
              daterange: 'YYYY-MM-DD',
              monthrange: 'YYYY-MM',
              datetimerange: 'YYYY-MM-DD HH:mm:ss',
            }
            if (tp === 'daterange' || tp === 'datetimerange' || tp === 'monthrange' ||
                (root.type === 'time' && root.isRange)) {
              if (after && after[0] && after[1]) {
                if ((root.type === 'time' && root.isRange)) {
                  this.dataGroup[root.key] = moment(after[0]).format(root.format || fm[root.type])
                  this.dataGroup[root.key2] = moment(after[1]).format(root.format || fm[root.type])
                }
                else {
                  this.dataGroup[root.key] = moment(after[0]).format(root.format || fm[tp])
                  this.dataGroup[root.key2] = moment(after[1]).format(root.format || fm[tp])
                }
                if (tp === 'daterange' && root.addTime) {
                  this.dataGroup[root.key] += ' 00:00:00'
                  this.dataGroup[root.key2] += ' 23:59:59'
                }
              }
              else {
                this.dataGroup[root.key] = null
                this.dataGroup[root.key2] = null
              }
            }
            else {
              if (after) {
                if (root.type === 'time') {
                  this.dataGroup[root.key] = moment(after).format(root.format || fm[root.type])
                }
                else {
                  this.dataGroup[root.key] = moment(after).format(root.format || fm[tp])
                }
                if (tp === 'date' && root.addTime) {
                  this.dataGroup[root.key] += ' 00:00:00'
                }
              }
              else {
                this.dataGroup[root.key] = null
              }
            }
            break
        }
      },
      /**
       * 将使用tempKey的表单项的默认值赋转换成对应格式并储存(私有)
       * @param root 表单项结构数据
       * @param a 储存默认值的容器
       */
      getTempKeyDefaultVal(root, a) {
        switch (root.type) {
          case 'bdMap':
            a[root.tempKey] = {
              lng: root.defaultVal || 0,
              lat: root.defaultVal2 || 0
            }
            if (root.key3) {
              a[root.tempKey]['name'] = root.defaultVal3 || ''
            }
            break
          case 'input':
          case 'inputNumber':
          case 'textarea':
            a[root.tempKey] = root.defaultVal
            break
          case 'radio':
          case 'select':
          case 'checkbox':
            if (root.booleanVal) {
              a[root.tempKey] = Boolean(root.defaultVal) ? 1 : 0
            }
            else {
              a[root.tempKey] = root.defaultVal
            }
            break
          case 'date':
          case 'time':
            const tempKeyB = 'date' + Math.floor(Math.random() * 100000000)
            root.tempKey = tempKeyB
            if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType === 'monthrange') {
              a[root.tempKey] = root.defaultVal && root.defaultVal2 && [
                root.defaultVal, root.defaultVal2
              ] || []
            }
            else if (root.type === 'time' && root.isRange) {
              a[root.tempKey] = root.defaultVal && root.defaultVal2 && [
                root.defaultVal, root.defaultVal2
              ] || null
            }
            else {
              a[root.tempKey] = root.defaultVal
            }
            break
        }
      },
      /**
       * 更新tampKey
       * @param d 新数据
       * @param notClearOthers 是否清空其他表单项，默认清空
       */
      updateTempKeys(d, notClearOthers = false) {
        for (let root of this.formDataT) {
          if ((notClearOthers && (d[root.key] !== undefined || d[root.key2] !== undefined) || !notClearOthers) &&
              root.tempKey) {
            switch (root.type) {
              case 'bdMap':
                if (this.myTypeof(d[root.key]) === 'Number' && this.myTypeof(d[root.key2] === 'Number')) {
                  this.tempKeys[root.tempKey] = {
                    lng: d[root.key],
                    lat: d[root.key2]
                  }
                  if (root.key3) {
                    this.tempKeys[root.tempKey]['name'] = d[root.key3] || ''
                  }
                }
                else {
                  this.tempKeys[root.tempKey] = {
                    lng: null,
                    lat: null
                  }
                  if (root.key3) {
                    this.tempKeys[root.tempKey]['name'] =  ''
                  }
                }
                break
              case 'input':
              case 'inputNumber':
              case 'textarea':
                if (d[root.key] || d[root.key] === 0) {
                  this.tempKeys[root.tempKey] = d[root.key]
                }
                else {
                  if (root.type === 'inputNumber') {
                    this.tempKeys[root.key] = undefined
                  }
                  else {
                    this.tempKeys[root.key] = null
                  }
                }
                break
              case 'select':
              case 'radio':
              case 'checkbox':
                if (d[root.key] || d[root.key] === 0 || d[root.key] === false) {
                  if (root.multiple || root.type === 'checkbox') {
                    this.$set(this.tempKeys, root.tempKey, [...d[root.key]])
                  }
                  else if (root.booleanVal) {
                    this.$set(this.tempKeys, root.tempKey, Boolean(d[root.key]) ? 1 : 0)
                  }
                  else {
                    this.$set(this.tempKeys, root.tempKey, d[root.key])
                  }
                }
                else {
                  if (root.multiple || root.type === 'checkbox') {/*当notClearOthers为false时用来清空*/
                    this.$set(this.tempKeys, root.tempKey, [])
                  }
                  else {
                    this.$set(this.tempKeys, root.tempKey, null)
                  }
                }
                break
              case 'date':
              case 'time':
                if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType ===
                    'monthrange') {
                  this.tempKeys[root.tempKey] = d[root.key] && d[root.key2] && [d[root.key], d[root.key2]] || []
                }
                else if (root.type === 'time') {
                  let constTime = '1970-01-01 ' //时间类型的不能直接赋值，需要拼接年月日
                  if (root.isRange) {
                    this.tempKeys[root.tempKey] =
                        d[root.key] && d[root.key2] && [constTime + d[root.key], constTime + d[root.key2]] || null
                  }
                  else {
                    this.tempKeys[root.tempKey] = constTime + d[root.key] || null
                  }
                }
                else {
                  this.tempKeys[root.tempKey] = d[root.key] || null
                }
                break
            }
          }
        }
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
          if (this.isValidValue(root.target.value)) {
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
      reValidateAndChangeHandle(root, item) {
        this.$nextTick(() => {
          this.$refs.elFormRef.validateField(item.key)
          this.itemChange(item, root)
        })
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
          this.$emit('on-item-change', d)
        }, 200)
      },
      /**
       * 提交事件
       */
      submit() {
        if (this.disabled) {
          return
        }
        let t = this.dataGroup
        if (this.trim) {
          t = this.trimObj(t)
        }
        this.$refs.elFormRef.validate(valid => {
          if (!this.debounceCount) {
            this.debounceCount = true
            if (valid) {
              this.showLoading = true
              this.$emit('on-submit', t)
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

<style lang="scss">
  .em-form {
    overflow: hidden;

    .el-form-item {
      .el-input-number {
        .el-input__inner {
          text-align: left;
        }
      }

      .el-input-number,
      .el-select,
      .el-cascader,
      .el-date-editor.el-input,
      .el-range-editor.el-input__inner {
        width: 100% !important;
      }
    }
  }
</style>
