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
          v-model="searchName" style="position: relative;" clearable :placeholder="t('em.pInputIcon')"
          @clear="filterIcons"
          @input.native="filterIcons"
      >
        <i slot="suffix" class="el-icon-search el-input__icon" />
      </el-input>
      <div class="icon-list" :style="listStyle">
        <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
          <template v-if="data">
            <img :src="item.icon" style="height: 30px;width: 16px;" />
            <span style="margin-left: 2px">{{ item.name }}</span>
          </template>
          <template v-else>
            <em-icons :icon-class="item" style="height: 30px;width: 16px;" />
            <span style="margin-left: 2px">{{ item }}</span>
          </template>
        </div>
      </div>
    </div>
    <el-input
        slot="reference" v-model="valueT" :placeholder="placeholder || t('em.cSelectIcon')" clearable
        :disabled="disabled"
    >
      <img v-if="valueT && data" :src="curIcon" slot="prefix" style="height: 30px;width: 16px;" :style="listStyle" />
      <em-icons
          v-else-if="valueT"
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
      data: {
        /*图标集合*/
        type: Array
      },
      width: {
        /*弹出层宽度*/
        type: String,
        default: "450"
      },
      trigger: {
        /*弹出层触发方式*/
        type: String,
        default: "click"
      },
      placeholder: {
        /*是否禁用*/
        type: String,
        default: ''
      },
      background: {
        type: String,
        default: '#FFF'
      },
      color: {
        type: String,
        default: '#606266'
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
      },
      curIcon() {
        if (this.data) {
          let data = this.iconList.find(e => e.name === this.valueT)
          return data && data.icon
        }
      },
      listStyle() {
        return {
          backgroundColor: this.background,
          color: this.color
        }
      }
    },
    data() {
      return {
        searchName: '',
        iconList: this.data || iconList || []
      }
    },
    methods: {
      /**
       * 搜索过滤图标列表
       */
      filterIcons() {
        this.iconList = this.data || iconList || []
        if (this.searchName) {
          if (this.data) {
            this.iconList = this.iconList.filter(item => item.name.includes(this.searchName))
          }
          else {
            this.iconList = this.iconList.filter(item => item.includes(this.searchName))
          }
        }
      },
      /**
       * 选择图标
       * @param item
       */
      selectedIcon(item) {
        if (this.data) {
          this.valueT = item.name
        }
        else {
          this.valueT = item
        }
        document.body.click()
      },
      /**
       * 关闭时重置搜索框
       */
      reset() {
        this.searchName = ''
        this.iconList = this.data || iconList || []
      }
    }
  }
</script>
