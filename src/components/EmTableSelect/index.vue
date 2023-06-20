<template>
  <div class="em-table-select">
    <!-- 弹出框 -->
    <el-popover
        ref="table-popover"
        v-model="visible"
        :placement="placement"
        :width="width"
        popper-class="cat-table-popover"
        :disabled="disabled"
    >
      <!--搜索栏-->
      <el-form
          v-if="searchForm && searchForm.length>0"
          ref="queryFormRef"
          size="mini"
          :model="queryParams"
          :inline="true"
      >
        <el-form-item v-for="(item,index) in searchForm" :key="index">
          <el-input
              v-if="item.type ==='input'"
              v-model="queryParams[item.key]"
              :placeholder="item.label"
              clearable
          />
          <el-select
              v-else-if="item.type ==='select'"
              v-model="queryParams[item.key]"
              :placeholder="item.label"
              clearable
              :filterable="item.filterable || true"
              :multiple="item.multiple || false"
          >
            <el-option
                v-for="optionItem in item.options"
                :key="'selectItem'+optionItem.val"
                :label="optionItem.label"
                :value="optionItem.val"
                :disabled="!!optionItem.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">{{ $t('button.search') }}</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">{{ $t('button.reset') }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <em-table-page
          ref="tableRef"
          v-bind="$attrs"
          v-on="$listeners"
          :selection="multiple"
          :radio="!multiple"
          :url="url"
          :columns="columns"
          pageLayout="prev, pager, next"
          :searchData="searchData"
          @row-click="handleRowClick"
          @selection-change="selectionChange"
          @on-data-change="onDataChange"
          :show-page="false"
          :page-size="pageSize"
          orderKey=""
      />
    </el-popover>
    <!-- 标签显示（多选） -->
    <div
        ref="tagsRef"
        v-if="multiple"
        class="cat-table-select__tags"
        :style="{'max-width': 'calc(100% - 65px)' ,width: '100%' }"
    >
      <transition-group v-if="valueT && valueT.length">
        <el-tag
            v-for="(item, index) in valueT"
            :key="'tag-'+index"
            size="small"
            type="info"
            :closable="!disabled"
            @close="deleteTag($event, item)"
            disable-transitions
        >
          <span class="cat-table-select__tags-text">{{ item[labelKey] }}</span>
        </el-tag>
      </transition-group>
    </div>
    <!-- 输入框 -->
    <el-input
        ref="inputRef"
        :class="{ 'is-focus': visible }"
        v-popover:table-popover
        v-model="valueT[labelKey]"
        type="text"
        :placeholder="currentPlaceholder"
        readonly
        :disabled="disabled"
    >
      <template slot="suffix">
        <i
            v-if="showClose && !disabled" class="el-select__caret el-input__icon el-icon-circle-close"
            @click="handleClearClick"
        ></i>
        <i :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
      </template>
    </el-input>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {t} from '../../locale'

  export default {
    name: 'EmTableSelect',
    model: {
      prop: 'value',
      event: 'on-val-change'
    },
    props: {
      value: {//绑定值
        type: [
          String, Number, Array
        ],
        required: true,
      },
      url: {//接口请求地址
        type: String,
        default: ''
      },
      searchForm: {//搜索条件
        type: Array,
        default() {
          return []
        }
      },
      columns: {//表格标题
        type: Array,
        default() {
          return []
        }
      },
      pageSize: { //查询数量
        type: Number,
        default: -1
      },
      width: {//表格宽度
        type: Number,
        default: 500
      },
      multiple: {//是否多选
        type: Boolean,
        default: false
      },
      valKey: { //绑定值的key
        type: String,
        default: 'id'
      },
      labelKey: { //展示值的key
        type: String,
        default: 'name'
      },
      placeholder: {//占位符
        type: String,
        default() {
          return t('em.pSelect')
        }
      },
      placement: {//从哪里弹出
        type: String,
        default: 'bottom'
      },
      disabled: {// 是否禁用
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        initialInputHeight: 36, //input默认高度
        dataList: [],
        visible: false, // 弹出框显示
        queryParams: {},//表单搜索数据
        searchData: {}, //列表触发查询数据
        rowSelectFlag: false,
        delTagFlag: false,
      }
    },
    computed: {
      valueT: {
        get() {
          if (this.multiple) {//多选
            if (this.value && this.dataList) {
              return this.dataList.filter(e => this.value.filter(x => e[this.valKey] === x).length > 0) || []
            }
            else {
              return []
            }
          }
          else {
            if (this.value && this.dataList) {
              return this.dataList.find(e => e[this.valKey] === this.value) || {}
            }
            else {
              return {}
            }
          }
        },
        set(val) {
          this.$emit('on-val-change', val)
        }
      },
      /**
       * 输入框箭头朝向
       * @returns {string}
       */
      iconClass() {
        return this.visible ? 'arrow-up is-reverse' : 'arrow-up'
      },
      /**
       * 是否显示清空按钮
       * @returns {boolean}
       */
      showClose() {
        return !_.isEmpty(this.valueT)
      },
      /**
       * 占位符处理
       * @returns {string|string}
       */
      currentPlaceholder() {
        if (this.multiple) {
          return _.isEmpty(this.valueT) ? this.placeholder : ''
        }
        else {
          return this.placeholder
        }
      }
    },
    watch: {
      /**
       * 监听表单搜索项
       */
      searchForm: {
        handler(after) {
          if (after && after.length) {
            let param = {}
            after.forEach(e => {
              param[e.key] = null
            })
            this.queryParams = param
          }
        },
        immediate: true
      },
      /**
       * 监听多选值的变化，修改input高度
       */
      valueT: {
        handler(after) {
          if (this.multiple) {//多选才需要修改高度
            this.rowSelectFlag = true
            this.$nextTick(() => {
              if (!this.visible && !this.delTagFlag) {
                if (!_.isEmpty(after)) {
                  after.forEach(item => {
                    this.$refs.tableRef.handleRowClick(item)
                  })
                }
                else {
                  this.$refs.tableRef.handleClearSelection()
                }
              }
              this.rowSelectFlag = false
              this.delTagFlag = false
            })
            this.resetInputHeight()
          }
          else {
            this.$nextTick(() => {
              this.$refs.tableRef.onlyId = after[this.valKey]
            })
          }
        },
        immediate: true
      }
    },
    mounted() {
      const inputRef = this.$refs.inputRef
      if (inputRef && inputRef.$el) {
        const input = inputRef.$el.querySelector('input')
        this.initialInputHeight = input.getBoundingClientRect().height
      }
    },
    methods: {
      handleRowClick(row) {
        if (!this.multiple) {//单选
          this.valueT = row[this.valKey]
          this.visible = false
        }
      },
      /**
       * 多选事件选择回调
       * @param selection
       */
      selectionChange(selection) {
        if (this.multiple) {//多选
          if (this.rowSelectFlag) {
            return
          }
          this.valueT = selection.map(e => e[this.valKey])
        }
      },
      /**
       * 点击清空按钮触发
       * @param event
       */
      handleClearClick(event) {
        event.stopPropagation()
        if (this.multiple) {//多选
          this.$refs.tableRef.handleClearSelection()
        }
        else {
          this.valueT = null
        }
      },
      /**
       * 删除标签
       * @param event
       * @param item
       */
      deleteTag(event, item) {
        event.stopPropagation()
        this.delTagFlag = true
        this.$refs.tableRef.handleRowClick(item)
      },
      /**
       * 多选时重置输入框高度
       */
      resetInputHeight() {
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.$refs.inputRef || !this.$refs.tagsRef) {
              return
            }
            const inputChildNodes = this.$refs.inputRef.$el.childNodes
            const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
            const tags = this.$refs.tagsRef
            const height = tags.clientHeight > this.initialInputHeight ? (tags.clientHeight + 6) :
                this.initialInputHeight
            input.style.height = height + 'px'
          }, 10)
        })
      },
      /**
       * 搜索
       * @returns {Promise<void>}
       */
      search() {
        this.searchData = _.cloneDeep(this.queryParams)
      },
      /**
       * 重置搜索
       */
      handleReset() {
        for (let key in this.queryParams) {
          this.queryParams[key] = null
        }
        this.search()
      },
      /**
       * 列表加载完成回调
       */
      onDataChange() {
        this.dataList = this.$refs.tableRef.dataS
      }
    }
  }
</script>
