<template>
  <el-dialog
      ref="dialogRef"
      :title="title|| t('em.button.title')"
      :visible.sync="openModal"
      :close-on-click-modal="false"
      @close="close"
      top="5vh"
      :width="width"
      custom-class="em-form-modal"
  >
    <em-form
        ref="formGroupRef"
        v-bind="$attrs"
        v-on="$listeners"
        :form-data="formData"
        @on-submit="onSubmit"
    >
      <template :slot="item.slotName" v-for="item in formDataC" slot-scope="{dataGroup}">
        <slot :name="item.slotName" :data-group="dataGroup" />
      </template>
    </em-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :loading="btnLoading&&showLoading">{{ t("em.button.confirm") }}</el-button>
      <el-button @click="close">{{ t("em.button.cancel") }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Locale from '@/mixins/locale'

  export default {
    name: 'EmFormModal',
    mixins: [Locale],
    props: {
      title: {
        /*弹框标题*/
        type: String
      },
      width: {
        /*弹框宽度*/
        type: String,
        default: '750px'
      },
      formData: {
        /*搜索表单结构数据*/
        type: Array,
        default() {
          return []
        }
      },
      btnLoading: {
        /*提交按钮显示loading*/
        type: Boolean,
        default: false
      }
    },
    computed: {
      formDataC() {
        return this.formData.filter(e => e.type === 'custom')
      }
    },
    data() {
      return {
        openModal: false,
        showLoading: false
      }
    },
    mounted() {
      this.$refs.dialogRef.rendered = true
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
        this.showLoading = Boolean(val)
        this.$refs.formGroupRef.changeLoading(val === undefined ? false : val)
      },
      onSubmit() { /*响应提交事件提交数据，私有*/
        this.showLoading = true
      },
      open() { /*触发打开弹框事件，公开*/
        this.openModal = true
      },
      close() { /*触发关闭弹框事件，公开*/
        this.openModal = false
        this.$emit('on-close')
        setTimeout(() => {
          this.showLoading = false
          this.$refs.formGroupRef.changeLoading(false)
        }, 800)
      },
      submit() {/*触发提交事件，公开*/
        this.$refs.formGroupRef.submit()
      }
    }
  }
</script>
<style lang="scss">
  .em-form-modal{
    .el-dialog__body{
      padding-right: 100px;
      max-height: calc(100vh - 240px);
      overflow-y: auto;
    }
  }
</style>
