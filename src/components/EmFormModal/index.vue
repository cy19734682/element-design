<template>
	<el-dialog
		ref="dialogRef"
		:title="title || t('em.button.title')"
		:visible.sync="openModal"
		:close-on-click-modal="false"
		append-to-body
		@close="closeCb"
		top="5vh"
		:width="width"
		custom-class="em-form-modal"
	>
		<em-form ref="formModalRef" v-bind="$attrs" v-on="$listeners" :form-data="formData" @on-submit="onSubmit">
			<template v-for="item in formDataC" #[item.slotName]="{ dataGroup }">
				<slot :name="item.slotName" :data-group="dataGroup" />
			</template>
		</em-form>
		<template #footer>
			<el-button type="primary" @click="submit" :loading="btnLoading && showLoading"
				>{{ okBtTxt || t('em.button.confirm') }}
			</el-button>
			<el-button @click="close">{{ cancelBtTxt || t('em.button.cancel') }}</el-button>
		</template>
	</el-dialog>
</template>

<script>
	import Locale from '../../mixins/locale'
	import EmForm from '../EmForm'

	export default {
		name: 'EmFormModal',
		components: {
			EmForm
		},
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
			},
			okBtTxt: {
				/*确定按钮内容*/
				type: String
			},
			cancelBtTxt: {
				/*取消按钮内容*/
				type: String
			}
		},
		computed: {
			formDataC() {
				return this.formData.filter((e) => e.type === 'custom')
			}
		},
		data() {
			return {
				openModal: false,
				showLoading: false
			}
		},
		mounted() {
			this.$refs.dialogRef.rendered = true // 防止dialog未显示时组件内的内容不加载
		},
		methods: {
			/**
			 * 重置表单
			 * @returns {Promise<unknown>}
			 */
			resetForm() {
				return new Promise((resolve) => {
					this.$refs.formModalRef.resetForm().then(() => {
						resolve()
					})
				})
			},
			/**
			 * 重新渲染表单
			 * @returns {Promise<unknown>}
			 */
			reRenderForm() {
				return new Promise((resolve) => {
					this.$refs.formModalRef.reRenderForm().then(() => {
						resolve()
					})
				})
			},
			updateDataGroup(data, notClearOthers) {
				/*更新表单项的值（只能更新已有字段），公开*/
				this.$refs.formModalRef.updateDataGroup(data, notClearOthers)
			},
			updateFormDataT(data) {
				/*更新表单结构，例如设置或取消禁用，公开*/
				this.$refs.formModalRef.updateFormDataT(data)
			},
			changeLoading(val) {
				/*改变弹框loading状态，私有*/
				this.showLoading = Boolean(val)
				this.$refs.formModalRef.changeLoading(val === undefined ? false : val)
			},
      getDataGroup() {
        /*获取用户已填数据*/
        return this.$refs.formModalRef.getDataGroup()
      },
			onSubmit() {
				/*响应提交事件提交数据，私有*/
				this.showLoading = true
			},
			open() {
				/*触发打开弹框事件，公开*/
				this.openModal = true
			},
			close() {
				/*触发关闭弹框事件，公开*/
				this.openModal = false
			},
			closeCb() {
				/*弹框关闭的回调事件*/
				this.$emit('on-close')
				setTimeout(() => {
					this.showLoading = false
					this.$refs.formModalRef && this.$refs.formModalRef.changeLoading(false)
				}, 800)
			},
			submit() {
				/*触发提交事件，公开*/
				this.$refs.formModalRef.submit()
			}
		}
	}
</script>
