## EmCharts

图表组件

### 基本使用

````javascript
<em-charts 
    :config = "orderMonthChart"
width = "100%"
height = "350px"
id = "statusChart" / >
  
  data()
{
  return {
    orderMonthData: [],
  }
}

computed:{
  orderMonthChart()
  {//订单支付分布
    let xData = []
    let sData = []
    if (this.orderMonthData && this.orderMonthData.length) {
      for (const item of this.orderMonthData) {
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
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    }
  }
}

````

### 组件属性

|    参数     |           说明           |   类型   | 可选值 |  默认值  |
|:---------:|:----------------------:|:------:|:---:|:-----:|
|  config   |     配置项（同EChats配置）     | String |  —  | chart |
| className |        class样式         | String |  —  | chart |
|    id     | 图表Id(同一页面的不同图标设置不同的Id) | String |  —  | chart |
|   width   |          图表宽度          | string |  —  | 200px |
|  height   |          图表高度          | string |  —  | 200px |

