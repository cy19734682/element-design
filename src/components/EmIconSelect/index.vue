<template>
  <el-popover
      placement="bottom-start"
      :width="width"
      :trigger="trigger"
      :disabled="disabled"
      @hide="reset"
  >
    <div class="em-icon-body">
      <el-input
          v-model="searchName" style="position: relative;" clearable :placeholder="t('em.pInputIcon')" @clear="filterIcons"
          @input.native="filterIcons"
      >
        <i slot="suffix" class="el-icon-search el-input__icon" />
      </el-input>
      <div class="icon-list">
        <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
          <em-icons :icon-class="item" style="height: 30px;width: 16px;" />
          <span style="margin-left: 2px">{{ item }}</span>
        </div>
      </div>
    </div>
    <el-input slot="reference" v-model="valueT" :placeholder="t('em.cSelectIcon')" clearable :disabled="disabled">
      <em-icons
          v-if="valueT"
          slot="prefix"
          :icon-class="valueT"
          class="el-input__icon"
          style="height: 40px;width: 16px; "
      />
      <i v-else slot="prefix" class="el-icon-search el-input__icon" />
    </el-input>
  </el-popover>
</template>

<script>
  import Locale from '../../mixins/locale'
  import icons from '../../style/iconfont/iconfont.json'
  let iconList = []
  if (icons && icons.glyphs) {
    iconList = icons.glyphs.map(e => e.font_class)
  }
  export default {
    name: 'EmIconSelect',
    model: {
      prop: 'value',
      event: 'on-val-change'
    },
    mixins: [Locale],
    props: {
      value: {
        /*绑定值*/
        type: String,
        default: ""
      },
      width: {
        /*弹出层宽度*/
        type: String,
        default: "450"
      },
      trigger: {
        /*文件上传的地址*/
        type: String,
        default: "click"
      },
      disabled: {
        /*是否禁用*/
        type: Boolean,
        default: false
      },
    },
    computed: {
      valueT: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('on-val-change', val)
        }
      }
    },
    data() {
      return {
        searchName: '',
        iconList: iconList
      }
    },
    methods: {
      /**
       * 搜索过滤图标列表
       */
      filterIcons() {
        this.iconList = iconList
        if (this.searchName) {
          this.iconList = this.iconList.filter(item => item.includes(this.searchName))
        }
      },
      /**
       * 选择图标
       * @param name
       */
      selectedIcon(name) {
        this.valueT = name
        document.body.click()
      },
      /**
       * 关闭时重置搜索框
       */
      reset() {
        this.searchName = ''
        this.iconList = iconList
      }
    }
  }
</script>
