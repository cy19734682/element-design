<template>
  <div class="em-upload">
    <el-upload
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
      <i slot="default" class="el-icon-plus" v-if="listType === 'picture-card'"></i>
      <el-button size="small" type="primary" v-else>{{ t('em.button.clickUpload') }}</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" style="z-index: 999" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>

  import _ from 'lodash'
  import Locale from '../../mixins/locale'
  import request from '../../methods/request'
  import {imageSplicing} from '../../methods'

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
        type: [
          Array, Number, String, File
        ],
        default() {
          return null
        }
      },
      url: {
        /*文件上传的地址*/
        type: String,
        default() {
          return window.global && (window.global.server + '/upload') || '/upload'
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
        default: "file"
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
        default: "text"
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
          if (this.autoUpload) {//自动上传才需要处理数据
            let fileList = []
            if (after) {
              if (Array.isArray(after)) {
                for (let i = 0; i < after.length; i++) {
                  fileList.push({
                    url: imageSplicing(after[i])
                  })
                }
              }
              else {
                fileList.push({
                  url: imageSplicing(after)
                })
              }
            }
            this.fileData = fileList
          }
          else {
            if (_.isArray(after)) {
              this.fileData = after || []
            }
            else {
              this.fileData = after && [after] || []
            }
          }
        },
        deep: true
      }
    },
    computed: {
      headersT() {
        let header = {}
        if (request.config && request.config.store && request.config.store.getters.token) {
          header = {"x-oauth-token": request.config.store.getters.token}
        }
        for (const key in this.headers) {
          header[key] = this.headers[key]
        }
        return header
      }
    },
    data() {
      return {
        dialogVisible: false, //预览弹窗是否展示
        dialogImageUrl: null, //预览图片url
        fileData: [], //文件上传数据
        tempData: [] //临时上传数据
      }
    },
    methods: {
      /**
       * 手动上传
       * 手动上传不能触发beforeUpload事件，所以用on-change事件
       */
      handleChange(file, fileList) {
        if (this.autoUpload) {//自动上传有下面的钩子拦截，不需要这个函数判断
          return
        }
        if (file) {
          let type = file.name.split('.').pop().toLocaleLowerCase() || ''
          if (this.format.length > 0 && this.format.indexOf(type) < 0) {
            this.$message.warning('文件类型只支持' + (this.format.length > 0 && String(this.format) || '无'))
            fileList.splice(fileList.length - 1, 1)
            return false
          }
          if (file && this.maxSize && file.size > this.maxSize) {
            this.$message.warning('文件最大上传限制为' + (this.maxSize / 1024).toFixed(2) + 'kb')
            fileList.splice(fileList.length - 1, 1)
            return false
          }
        }
        this.emitFileChange(fileList.map(e => e.raw))
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
        }
        else if (this.format.length > 0 && this.format.indexOf(type) < 0) {
          this.$message.warning('文件类型只支持' + (this.format.length > 0 && String(this.format) || '无'))
          return false
        }
        else {
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
          let url = res.data
          this.tempData.push({
            uid: file.uid,
            name: file.name,
            url: url
          })
          this.emitFileChange(this.tempData.map(e => e.url))
        }
        else {
          this.$message.error(res.msg || '上传失败')
        }
      },
      /**
       * 向父组件传值
       * @param fileList
       */
      emitFileChange(fileList) {
        if (this.length > 1) {//返回数组
          this.$emit('on-file-change', fileList)
        }
        else {
          this.$emit('on-file-change', fileList && fileList[0] || null)
        }
      },
      /**
       * 图片预览
       * @param file
       */
      handlePreview(file) {
        if (/\.(gif|jpg|jpeg|png)$/i.test(file.url)) {//图片预览
          this.dialogVisible = true
          this.dialogImageUrl = file.url
        }
        else { //其它文件下载
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
       * @param fileList
       */
      handleRemove(file, fileList) {
        if (file) {
          if (this.autoUpload) {
            //tempData中的uid和fileData中的不一致，所以这里使用fileData查询下标
            let _index = this.fileData.findIndex(e => e.uid === file.uid)
            if (_index > -1) {
              this.tempData.splice(_index, 1)
              this.emitFileChange(this.tempData.map(e => e.url))
            }
          }
          else {
            let _index = this.fileData.findIndex(e => e.uid === file.uid)
            if (_index > -1) {
              this.fileData.splice(_index, 1)
              this.emitFileChange(this.fileData.map(e => e.raw))
            }
          }
        }
      }
    }
  }
</script>

