<template>
  <el-popover
      placement="bottom-start"
      :width="width"
      :trigger="trigger"
  >
    <div class="icon-body">
      <el-input
          v-model="searchName" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons"
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
    <el-input slot="reference" v-model="valueT" placeholder="点击选择图标">
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
    props: {
      value: {
        /*文件上传的地址*/
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
      filterIcons() {
        this.iconList = iconList
        if (this.searchName) {
          this.iconList = this.iconList.filter(item => item.includes(this.searchName))
        }
      },
      selectedIcon(name) {
        this.valueT = name
        document.body.click()
      },
      reset() {
        this.searchName = ''
        this.iconList = icons
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;

    .icon-list {
      height: 200px;
      overflow-y: scroll;

      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }

      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
