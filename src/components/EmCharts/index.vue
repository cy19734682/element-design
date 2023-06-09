<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    name: "EmCharts",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      config: Object,
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      config: {
        handler(after) {   //静态对象变更
          if (after) {
            this.initChart()
          }
        },
        deep: true
      }
    },
    mounted() {
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        let option = {}
        if (this.config) {
          option = this.config
        }
        this.chart.setOption(option)
      }
    }
  }
</script>
