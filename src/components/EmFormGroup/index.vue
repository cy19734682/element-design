<template>
  <div class="form-group-container">
    <em-form
        ref="formGroupRef"
        v-bind="$attrs"
        v-on="$listeners"
        :show-inline-ok-bt="showInlineOkBt"
        :show-inline-clear-bt="showInlineOkBt"
        :form-data="formData"
        @on-submit="onSubmit"
    >
      <template :slot="item.slotName" v-for="item in formDataC" slot-scope="{dataGroup}">
        <slot :name="item.slotName" :data-group="dataGroup" />
      </template>
    </em-form>
  </div>
</template>

<script>
  import EmForm from "../EmForm"
  export default {
    name: 'EmFormGroup',
    components:{
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
      showInlineOkBt: {
        /*显示搜索按钮*/
        type: Boolean,
        default: true
      },
      showInlineClearBt: {
        /*显示清空按钮*/
        type: Boolean,
        default: true
      },
    },
    computed: {
      formDataC() {
        return this.formData.filter(e => e.type === 'custom')
      }
    },
    data() {
      return {
        showLoading: false
      }
    },
    methods: {
      /**
       * 重置表单
       * @returns {Promise<unknown>}
       */
      resetForm() {
        return new Promise(resolve => {
          this.$refs.formGroupRef.resetForm()
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
          this.$refs.formGroupRef.reRenderForm()
              .then(() => {
                resolve()
              })
        })
      },
      clear() {/*私有，可使用resetForm代替*/
        this.$refs.formGroupRef.clearForm()
      },
      updateValGroup(data, notClearOthers) { /*更新表单项的值（只能更新已有字段），公开*/
        this.$refs.formGroupRef.updateDataGroup(data, notClearOthers)
      },
      updateFormDataT(data) { /*更新表单结构，例如设置或取消禁用，公开*/
        this.$refs.formGroupRef.updateFormDataT(data)
      },
      validate() {/*验证表单，公开*/
        this.$refs.formGroupRef.validate()
      },
      changeLoading(val) {/*改变弹框loading状态，私有*/
        this.$refs.formGroupRef.changeLoading(val === undefined ? false : val)
      },
      onSubmit(data) { /*响应提交事件提交数据，私有*/
        this.$emit('on-search', data)
      },
      submit() {/*触发提交事件，公开*/
        this.$refs.formGroupRef.submit()
      }
    }
  }
</script>
