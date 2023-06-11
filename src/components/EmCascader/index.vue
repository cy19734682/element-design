<template>
  <el-cascader
      v-bind="$attrs"
      v-on="$listeners"
      ref="areaRef"
      v-model="valueT"
      :options="options"
      :props="{
        checkStrictly: checkStrictly,
        multiple: multiple
      }"
      :show-all-levels="showAllLevels"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder || t('em.pInput')"
      :filterable="filterable"
      clearable
  />
</template>
<script>
  import _ from 'lodash'
  import Locale from '../../mixins/locale'
  import { myTypeof, findPath } from '../../methods'
  import request from '../../methods/request'

  export default {
    name: 'EmCascader',
    model: {
      prop: 'value',
      event: 'on-val-change'
    },
    mixins: [Locale],
    props: {
      url: {
        /*文件上传的地址*/
        type: String,
        default: ""
      },
      value: {
        /*组件绑定的值（v-model）*/
        type: [
          String, Number, Array
        ],
        default() {
          return null
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      optionVal: {
        /*v-model收集节点的哪些字段*/
        type: String,
        default: 'id'
      },
      optionLabel: {
        /*选项的标签对应接口字段*/
        type: String,
        default: 'name'
      },
      optionFilter: {
        /*筛选待选项的方法，入参是接口请求回来的待选项数据，返回处理后的待选项（仅进行筛选操作，不要做其它处理）*/
        type: Function
      },
      showAllLevels: {
        /*是否显示完整路径*/
        type: Boolean,
        default: true
      },
      separator: {
        /*地址名称分隔符*/
        type: String,
        default: '/'
      },
      size: {
        type: String,
        default: 'medium'
      },
      filterable: {
        /*是否可搜索*/
        type: Boolean,
        default: true
      },
      checkStrictly: {
        /*任意一级选项*/
        type: Boolean,
        default: false
      },
      multiple: {
        /*是否多选*/
        type: Boolean,
        default: false
      },
      disabled: {
        /*禁用组件*/
        type: Boolean,
        default: false
      },
      placeholder: {
        /*占位符*/
        type: String,
        default: ""
      }
    },
    computed: {
      valueT: {
        get() {
          let valProp = this.value
          if (Array.isArray(valProp)) {
            return [].concat(valProp)
          }
          else if (_.isNumber(valProp)) {
            return findPath({
              group: this.options,
              condition: item => item.value === valProp,
              pathKey: 'value'
            })
          }
          else if (_.isString(valProp)) {
            return valProp.split(this.separator)
          }
          else if (valProp === null) {
            return []
          }
        },
        set(val) {
          let labels = findPath({
            group: this.options,
            condition: item => item.value === val[val.length - 1],
            pathKey: 'label'
          })
          let v = null
          let l = null
          if (Array.isArray(this.value)) {
            v = val
            l = labels
          }
          else {
            v = _.last(val)
            l = labels[labels.length - 1]
          }
          this.$emit('on-val-change', v)
          this.$emit('on-name-change', l)
        }
      }
    },
    watch: {
      data: {
        handler(after) {
          if (after && after.length > 0) {
            this.options = this.dataFilter(after)
          }
        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {
        options: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      /**
       * 拉取数据
       */
      getData() {
        if (this.url && this.url !== '') {
          request.get(this.url).then(d => {
            if (d && d.code === 0) {
              let data = d.data || []
              if (myTypeof(this.optionFilter) === 'Function') {
                data = this.optionFilter(data)
              }
              this.options = this.dataFilter(data)
            }
          }).catch(e => {
            console.warn(e)
          })
        }
      },
      /**
       * 数据过滤
       * @param data
       * @returns {[]}
       */
      dataFilter(data) {
        let temp = []
        for (let item of data) {
          let tt = {
            value: item[this.optionVal],
            label: item[this.optionLabel]
          }
          if (item.children && (!_.isEmpty(item.children))) {
            tt.children = this.dataFilter(item.children)
          }
          temp.push(tt)
        }
        return temp
      },
    }
  }
</script>

