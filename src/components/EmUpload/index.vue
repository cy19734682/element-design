<template>
	<div class="em-upload">
		<div v-if="uploadFetch">
			<el-button size="small" type="primary" @click="openFetchModal">{{ t('em.button.clickUpload') }}</el-button>
			<div class="fetch-box">
				<div class="fetch-img" v-for="(item, index) in fileData" :key="index">
					<i class="el-icon-close" @click="removeFetchImg($event, index)" />
					<img :src="item.url || item" @click="handlePreview(item)" />
				</div>
			</div>
		</div>
		<el-upload
			v-else
			class="elm-uploader"
			:headers="headersT"
			:action="url"
			:data="paramData"
			:name="fileName"
			:list-type="listType"
			:file-list="fileData"
			:before-upload="beforeUpload"
			:on-change="handleChange"
			:on-success="handleUploadSuccess"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:limit="length"
			:on-exceed="handleExceed"
			:auto-upload="autoUpload"
			:multiple="multiple"
			:with-credentials="withCredentials"
			:disabled="disabled"
		>
			<template #default>
				<i class="el-icon-plus" v-if="listType === 'picture-card'"></i>
				<el-button size="small" type="primary" v-else>{{ t('em.button.clickUpload') }}</el-button>
			</template>
		</el-upload>
		<!-- 图片预览   -->
		<el-dialog :visible.sync="dialogVisible" style="z-index: 999" append-to-body>
			<img width="100%" :src="dialogImageUrl" alt="" />
		</el-dialog>
		<!--  网络图片抓取  -->
		<el-dialog
			:title="t('em.networkAddr')"
			width="520px"
			:visible.sync="fetchModalVisible"
			append-to-body
			:show-close="false"
		>
			<el-input class="wd70" v-model="fetchUrl" :placeholder="t('em.pInputFetchUrl')" />
			<template #footer>
				<el-button type="primary" @click="submitFetch">{{ t('em.button.confirm') }}</el-button>
				<el-button @click="fetchModalVisible = false">{{ t('em.button.cancel') }}</el-button>
			</template>
		</el-dialog>
	</div>
</template>
<script>
	import _ from 'lodash'
	import Locale from '../../mixins/locale'
	import request from '../../methods/request'
	import { imageSplicing, isValidVal } from '../../methods'

	export default {
		name: 'EmUpload',
		mixins: [Locale],
		model: {
			prop: 'fileValue',
			event: 'on-file-change'
		},
		props: {
			fileValue: {
				/*文件数据*/
				type: [Array, Number, String, File],
				default() {
					return null
				}
			},
			/*是否抓取网络图片上传*/
			uploadFetch: {
				type: Boolean,
				default: false
			},
			url: {
				/*文件上传的地址*/
				type: String,
				default() {
					return (window.global && window.global.server + '/upload') || '/upload'
				}
			},
			paramData: {
				/*文件上传接口其他参数*/
				type: Object,
				default() {
					return {}
				}
			},
			headers: {
				/*请求头额外参数*/
				type: Object,
				default() {
					return {}
				}
			},
			fileName: {
				/*上传文件的字段名*/
				type: String,
				default: 'file'
			},
			autoUpload: {
				/*是否在选取文件后立即进行上传*/
				type: Boolean,
				default: true
			},
			multiple: {
				/*是否支持多选*/
				type: Boolean,
				default: false
			},
			format: {
				/*限制文件上传类型*/
				type: Array,
				default() {
					return []
				}
			},
			maxSize: {
				/*单个文件大小限制*/
				type: Number,
				default: 0
			},
			length: {
				/*文件上传数量限制*/
				type: Number,
				default: 1
			},
			listType: {
				/*文件列表的类型 text/picture/picture-card*/
				type: String,
				default: 'text'
			},
			withCredentials: {
				/*是否直接跨域*/
				type: Boolean,
				default: true
			},
			disabled: {
				/*是否禁用*/
				type: Boolean,
				default: false
			}
		},
		watch: {
			fileValue: {
				handler(after) {
					if (this.autoUpload && !this.uploadFetch) {
						//自动上传且不是网络抓取才需要处理数据
						let fileList = []
						if (after) {
							if (Array.isArray(after)) {
								for (let i = 0; i < after.length; i++) {
									fileList.push({
										name: after[i],
										url: imageSplicing(after[i])
									})
								}
							} else {
								fileList.push({
									name: after,
									url: imageSplicing(after)
								})
							}
						}
						this.fileData = fileList
					} else {
            let fileList = []
						if (_.isArray(after)) {
							fileList = after || []
						} else {
							fileList = (after && [after]) || []
						}
						this.fileData = fileList.map((e) => {
							if (e instanceof File) {
								let imageUrl = URL.createObjectURL(new Blob([e])) //赋值图片的url，用于图片回显功能
								return {
									name: e.name,
									url: imageUrl
								}
							} else {
								return {
									name: e,
									url: imageSplicing(e)
								}
							}
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			headersT() {
				let header = {}
				if (request.config && request.config.store && request.config.store.getters.token) {
					header = { 'x-oauth-token': request.config.store.getters.token }
				}
				for (const key in this.headers) {
					header[key] = this.headers[key]
				}
				return header
			},
			cloneVal() {
				if (Array.isArray(this.fileValue)) {
					return this.fileValue
				} else if (isValidVal(this.fileValue)) {
					return [this.fileValue]
				} else {
					return []
				}
			}
		},
		data() {
			return {
				dialogVisible: false, //预览弹窗是否展示
				dialogImageUrl: null, //预览图片url
				fetchModalVisible: false, //网络图片抓取弹窗是否展示
				fetchUrl: null, //网络图片抓取弹窗是否展示
				fileData: [], //文件上传数据
				tempData: [] //临时上传数据
			}
		},
		methods: {
			/**
			 * 手动上传
			 * 手动上传不能触发beforeUpload事件，所以用on-change事件
			 */
			handleChange(file) {
				if (this.autoUpload) {
					//自动上传有下面的钩子拦截，不需要这个函数判断
					return
				}
				if (file) {
					let type = file.name.split('.').pop().toLocaleLowerCase() || ''
					if (this.format.length > 0 && this.format.indexOf(type) < 0) {
						this.$message.warning('文件类型只支持' + ((this.format.length > 0 && String(this.format)) || '无'))
						return false
					}
					if (file && this.maxSize && file.size > this.maxSize) {
						this.$message.warning('文件最大上传限制为' + (this.maxSize / 1024).toFixed(2) + 'kb')
						return false
					}
				}
				let _f = _.cloneDeep(this.cloneVal)
				_f.push(file?.raw)
				this.emitFileChange(_f)
			},
			/**
			 * 自动上传
			 * 上传文件前的钩子
			 * @param file
			 */
			beforeUpload(file) {
				let type = file.name.split('.').pop().toLocaleLowerCase() || ''
				if (file && this.maxSize && file.size > this.maxSize) {
					this.$message.warning('文件最大上传限制为' + (this.maxSize / 1024).toFixed(2) + 'kb')
					return false
				} else if (this.format.length > 0 && this.format.indexOf(type) < 0) {
					this.$message.warning('文件类型只支持' + ((this.format.length > 0 && String(this.format)) || '无'))
					return false
				} else {
					return true
				}
			},
			/**
			 * 文件超出个数限制时的钩子
			 * @param files
			 * @param fileList
			 */
			handleExceed(files, fileList) {
				this.$message.warning('最多只能上传' + this.length + '个文件')
			},
			/**
			 * 自动上传
			 * 上传成功回调
			 * @param res
			 * @param file
			 */
			handleUploadSuccess(res, file) {
				if (res.code === 0) {
					let _f = _.cloneDeep(this.fileData)
					file.url = res?.data?.url || res?.data || ''
					_f.push(file)
					this.emitFileChange(_f.map((e) => e.url))
				} else {
					this.$message.error(res.msg || res.message || '上传失败')
				}
			},
			/**
			 * 向父组件传值
			 * @param fileList
			 */
			emitFileChange(fileList) {
				if (this.length > 1) {
					//返回数组
					this.$emit('on-file-change', fileList)
				} else {
					this.$emit('on-file-change', (fileList && fileList[0]) || null)
				}
			},
			/**
			 * 图片预览
			 * @param file
			 */
			handlePreview(file) {
				let testRule = /\.(gif|jpg|jpeg|png|svg)$/i
				if (testRule.test(file.url) || testRule.test(file)) {
					//图片预览
					this.dialogVisible = true
					this.dialogImageUrl = file.url || file
				} else {
					//其它文件下载
					const a = document.createElement('a')
					a.style.display = 'none'
					a.setAttribute('target', '_blank')
					file.name && a.setAttribute('download', file.name)
					a.href = file.url
					document.body.appendChild(a)
					a.click()
					document.body.removeChild(a)
				}
			},
			/**
			 * 移除上传文件
			 * @param file
			 */
			handleRemove(file) {
				if (file) {
					let _index = this.fileData.findIndex((e) => e.uid === file.uid)
					if (_index > -1) {
						let _f = _.cloneDeep(this.cloneVal)
						_f.splice(_index, 1)
						this.emitFileChange(_f)
					}
				}
			},
			/**
			 * 打开网络抓取弹窗
			 */
			openFetchModal() {
				this.fetchModalVisible = true
				this.fetchUrl = null
			},
			/**
			 * 提交网络资源地址
			 */
			submitFetch() {
				if (!isValidVal(this.fetchUrl)) {
					this.$message.warning('地址不能为空')
					return
				}
				request
					.post(this.url, { url: this.fetchUrl, ...this.paramData }, { isShowLoading: true })
					.then((d) => {
						this.fileData = [d]
						this.emitFileChange(this.fileData.map((e) => e.url))
						this.$message.success('上传成功')
						this.fetchModalVisible = false
					})
					.catch((e) => {
						console.warn(e)
					})
			},
			/**
			 * 移除网络资源地址
			 * @param e
			 * @param index
			 */
			removeFetchImg(e, index) {
				e.stopPropagation()
				this.fileData.splice(index, 1)
				this.emitFileChange(this.fileData.map((e) => e.url))
			}
		}
	}
</script>
