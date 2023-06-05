<template>
  <el-cascader
      v-bind="$attrs"
      v-on="$listeners"
      ref="areaRef"
      v-model="valueT"
      :options="options"
      :show-all-levels="showAllLevels"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder"
      :filterable="filterable"
      clearable
  />
</template>
<script>
  import _ from 'lodash'
  import { t } from '../../locale'
  import {
    provinceAndCityData, regionData, CodeToText
  } from 'element-china-area-data'

  export default {
    name: 'EmCascaderArea',
    model: {
      prop: 'value',
      event: 'on-val-change'
    },
    props: {
      value: {
        /*组件绑定的值（v-model）*/
        type: [
          String, Number, Array
        ],
        default() {
          return null
        }
      },
      level: {
        /*精确至几级行政区域（省级，1：省市级，2：省市区）*/
        type: [
          Number, String
        ],
        default: 2
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
        default() {
          return true
        }
      },
      disabled: {
        /*禁用组件*/
        type: Boolean,
        default() {
          return false
        }
      },
      placeholder: {
        /*占位符*/
        type: String,
        default: t('em.pInput')
      }
    },
    computed: {
      valueT: {
        get() {
          if (this.value && (_.isNumber(this.value) || _.isString(this.value))) {
            let temp = String(this.value).trim()
            let regP = /^\d*$/
            if (regP.test(temp)) {
              let lv1 = temp.substr(0, 2) + '0000'
              let lv2 = temp.substr(0, 4) + '00'
              if(this.level === 1){
                return [lv1, lv2]
              }
              return [lv1, lv2, temp]
            }
            if (temp.indexOf(this.separator) !== -1) {
              /*以中文名称和分隔符拼接的String地址*/
              return temp.split(this.separator)
            }
            return [temp]
          }
          else if (Array.isArray(this.value)) {
            return _.cloneDeep(this.value)
          }
          else {
            return []
          }
        },
        set(val) {
          let code = null
          let name = null
          if (Array.isArray(val)) {
            name = val.map(item => {
              return item.name
            }).join(this.separator)
          }
          if (Array.isArray(this.value)) {
            code = val
            name = val.map(item => {
              return CodeToText[item]
            })
          }else {
            code = _.last(val)
            name = CodeToText[code]
          }
          this.$emit('on-val-change', code)
          this.$emit('on-name-change', name)
        }
      }
    },
    watch: {
      level: {
        handler(after) {
          if (after === 1) {
            this.options = provinceAndCityData
          }
          else if (after === 2) {
            this.options = regionData
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
    methods: {
    }
  }
</script>

