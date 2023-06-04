<template>
  <div class="em-editor">
    <Toolbar
        class="editor-pro-toolbar" :editor="editor" :defaultConfig="toolbarConfigT" :mode="mode" v-show="!disabled"
    />
    <Editor
        class="editor-pro-editor" v-model="valueT" :defaultConfig="editorConfigT" :mode="mode" @onCreated="onCreated"
        :style="{height:height}"
    />
  </div>
</template>

<script>
  import { t } from '@/locale'
  import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
  import '@wangeditor/editor/dist/css/style.css'
  export default {
    name: "EmEditor",
    components: {
      Editor,
      Toolbar
    },
    model: {
      prop: 'value',
      event: 'on-val-change'
    },
    props: {
      value: {
        /*绑定值*/
        type: String,
        default: ''
      },
      toolbarConfig: {
        /*toolbar配置*/
        type: Object,
        default() {
          return {}
        }
      },
      editorConfig: {
        /*编辑框配置*/
        type: Object,
        default() {
          return {}
        }
      },
      mode: {
        /*模式 default/simple */
        type: String,
        default: 'default'
      },
      height: {
        /*编辑框高度*/
        type: String,
        default: '300px'
      },
      placeholder: {
        /*占位符*/
        type: String,
        default: t('em.pInput')
      },
      disabled: {
        /*是否禁用编辑功能*/
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        firstLoad:false,
        editor: null,
      }
    },
    computed: {
      valueT: {
        get() {
          return this.value
        },
        set(v) {
          if(this.firstLoad){//由于初始化会给绑定的值赋值，然后会触发表单的校验，加个是否初始化的标识
            this.$emit('on-val-change', this.editor.isEmpty() ? '' : v)
          }
          this.firstLoad = true
        }
      },
      toolbarConfigT() {
        return Object.assign({}, this.toolbarConfig)
      },
      editorConfigT() {
        return Object.assign({
          autoFocus: false,
          placeholder: this.placeholder,
          insertKeys: {
            index: 31,
            keys: ['previewX']
          }
        }, this.toolbarConfig)
      }
    },
    beforeDestroy() {
      if (!this.editor) {
        return
      }
      this.editor.destroy()
      this.editor = null
    },
    watch: {
      disabled: {
        handler(a) {
          if (a) {
            this.editor.disable()
          }
          else {
            this.editor.enable()
          }
        }
      }
    },
    methods: {
      onCreated(d) {
        this.editor = Object.seal(d)
      }
    }
  }
</script>
