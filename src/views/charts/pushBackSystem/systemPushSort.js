const option = {
  title: {
    text: '排名前五【品类】推荐点击指数',
    subtext: '',
    show: false
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: false,
    data: ['推荐次数', '点击次数']
  },
  toolbox: {
    show: false,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '推荐次数',
      type: 'bar',
      data: [],
      barMaxWidth: 15, // 最大宽度#D7D7D7
      itemStyle: {
        normal: {
          color: '#D5EEFF'
        }
      }
    },
    {
      name: '点击次数',
      type: 'bar',
      data: [],
      barMaxWidth: 15, // 最大宽度
      itemStyle: {
        normal: {
          color: '#D7D7D7'
        }
      },
      markPoint: {
        data: [
          { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      }
      // markLine: {
      //   data: [
      //     { type: 'average', name: '平均值' }
      //   ]
      // }
    }
  ]
}
export default option
