<template>
  <div class="search-container">
    <em-form
        ref="searchFormRef"
        v-bind="$attrs"
        v-on="$listeners"
        :form-data="formDataT"
        inline
        show-inline-ok-bt
        show-inline-clear-bt
        :inline-ok-bt-txt="inlineOkBtTxt"
        :inline-clear-bt-txt="inlineClearBtTxt"
        :inline-ok-bt-icon="inlineOkBtIcon"
        :inline-clear-bt-icon="inlineClearBtIcon"
        @on-submit="onSubmit"
    >
      <template :slot="item.slotName" v-for="item in formDataC" slot-scope="{dataGroup}">
        <slot :name="item.slotName" :data-group="dataGroup" />
      </template>
    </em-form>
  </div>
</template>

<script>
  import {t} from '../../locale'
  import EmForm from "../EmForm"

  export default {
    name: 'EmSearchForm',
    components: {
      EmForm
    },
    props: {
      formData: {
        /*搜索表单结构数据*/
        type: Array,
        default() {
          return []
        }
      },
      inlineOkBtTxt: {
        /*显示清空按钮*/
        type: String,
        default: t('em.button.search')
      },
      inlineClearBtTxt: {
        /*显示清空按钮*/
        type: String,
        default: t('em.button.reset')
      },
      inlineOkBtIcon: {
        /*显示清空icon*/
        type: String,
        default: 'el-icon-search'
      },
      inlineClearBtIcon: {
        /*显示清空icon*/
        type: String,
        default: 'el-icon-refresh'
      },
      showBeginBtn: {
        /*是否展示开头标签*/
        type: Boolean,
        default: true
      },
    },
    computed: {
      formDataC() {
        if(this.showBeginBtn){
          let startCustom = {
            type: "custom",
            slotName: "beginBtnGroup"
          }
          this.formDataT.unshift(startCustom)
        }
        return this.formDataT.filter(e => e.type === 'custom')
      }
    },
    data() {
      return {
        formDataT: []
      }
    },
    created() {
      this.initFormDataT()
    },
    methods: {
      /**
       * 初始化表单结构（私有）*
       */
      initFormDataT() {
        this.formDataT = window._.cloneDeep(this.formData)
      },
      /**
       * 重置表单
       * @returns {Promise<unknown>}
       */
      resetForm() {
        return new Promise(resolve => {
          this.$refs.searchFormRef.resetForm()
              .then(() => {
                resolve()
              })
        })
      },
      /**
       * 重新渲染表单
       * @returns {Promise<unknown>}
       */
      reRenderForm() {
        return new Promise(resolve => {
          this.$refs.searchFormRef.reRenderForm()
              .then(() => {
                resolve()
              })
        })
      },
      updateDataGroup(data, notClearOthers) { /*更新表单项的值（只能更新已有字段），公开*/
        this.$refs.searchFormRef.updateDataGroup(data, notClearOthers)
      },
      updateFormDataT(data) { /*更新表单结构，例如设置或取消禁用，公开*/
        this.$refs.searchFormRef.updateFormDataT(data)
      },
      changeLoading(val) {/*改变弹框loading状态，私有*/
        this.$refs.searchFormRef.changeLoading(val === undefined ? false : val)
      },
      onSubmit(data) { /*响应提交事件提交数据，私有*/
        this.$emit('on-search', data)
      },
      submit() {/*触发提交事件，公开*/
        this.$refs.searchFormRef.submit()
      }
    }
  }
</script>
