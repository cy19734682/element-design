<template>
  <div class="container">
    <el-row :gutter="40" style="margin-bottom: 20px;max-height: 400px;overflow: hidden">
      <el-col :span="12" :xs="24">
        <em-charts :config="orderStatusChart" width="100%"  height="350px" id="statusChart"/>
      </el-col>
      <el-col :span="12" :xs="24">
        <em-charts :config="orderMonthChart" width="100%"  height="350px" id="monthChart"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'emChartsEx',
    data() {
      return {
        value: "hello",
        orderMonthData:[],
        orderStatusData:[],
      }
    },
    computed:{
      orderMonthChart(){//订单支付分布
        let xData = []
        let sData = []
        if(this.orderMonthData && this.orderMonthData.length){
          for (const item of this.orderMonthData){
            xData.push(item.date)
            sData.push(parseFloat((item.total / 100).toFixed(2)))
          }
        }
        return {
          title: {
            text: "近一月销售情况",
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '日期：{b}<br/> 金额：{c}'
          },
          xAxis: {
            type: 'category',
            data: xData
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            data: sData,
            type: 'bar'
          }]
        }
      },
      orderStatusChart(){//订单状态分布
        let lData = []
        let sData = []
        if(this.orderStatusData && this.orderStatusData.length){
          for (const item of this.orderStatusData){
            lData.push(item.name)
            sData.push({
              value: item.count, name: item.name
            })
          }
        }
        return {
          title: {
            text: "订单分布",
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: lData
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '40%'],
              data: sData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.orderMonthData = [
        {
          "date": "2023-05-10",
          "total": 0
        },
        {
          "date": "2023-05-11",
          "total": 0
        },
        {
          "date": "2023-05-12",
          "total": 0
        },
        {
          "date": "2023-05-13",
          "total": 0
        },
        {
          "date": "2023-05-14",
          "total": 0
        },
        {
          "date": "2023-05-15",
          "total": 0
        },
        {
          "date": "2023-05-16",
          "total": 0
        },
        {
          "date": "2023-05-17",
          "total": 0
        },
        {
          "date": "2023-05-18",
          "total": 0
        },
        {
          "date": "2023-05-19",
          "total": 0
        },
        {
          "date": "2023-05-20",
          "total": 0
        },
        {
          "date": "2023-05-21",
          "total": 0
        },
        {
          "date": "2023-05-22",
          "total": 0
        },
        {
          "date": "2023-05-23",
          "total": 0
        },
        {
          "date": "2023-05-24",
          "total": 0
        },
        {
          "date": "2023-05-25",
          "total": 0
        },
        {
          "date": "2023-05-26",
          "total": 0
        },
        {
          "date": "2023-05-27",
          "total": 0
        },
        {
          "date": "2023-05-28",
          "total": 0
        },
        {
          "date": "2023-05-29",
          "total": 0
        },
        {
          "date": "2023-05-30",
          "total": 0
        },
        {
          "date": "2023-05-31",
          "total": 0
        },
        {
          "date": "2023-06-01",
          "total": 0
        },
        {
          "date": "2023-06-02",
          "total": 0
        },
        {
          "date": "2023-06-03",
          "total": 0
        },
        {
          "date": "2023-06-04",
          "total": 0
        },
        {
          "date": "2023-06-05",
          "total": 0
        },
        {
          "date": "2023-06-06",
          "total": 0
        },
        {
          "date": "2023-06-07",
          "total": 0
        },
        {
          "date": "2023-06-08",
          "total": 0
        },
        {
          "date": "2023-06-09",
          "total": 0
        }
      ]
      this.orderStatusData =  [
        {
          "status": 102,
          "count": 5,
          "name": "用户取消"
        },
        {
          "status": 103,
          "count": 6,
          "name": "系统取消"
        },
        {
          "status": 201,
          "count": 15,
          "name": "已付款"
        },
        {
          "status": 203,
          "count": 1,
          "name": "已退款"
        },
        {
          "status": 401,
          "count": 1,
          "name": "已发货"
        },
        {
          "status": 502,
          "count": 3,
          "name": "系统收货"
        },
        {
          "status": 601,
          "count": 6,
          "name": "已评价"
        }
      ]
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
  .container{
    padding: 40px;
  }
</style>
