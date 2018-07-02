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
      data: ['哈哈','嘎嘎']
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: '0'
//    max: '5000000',
    }
  ],
  series: [
    {
      name: '推荐人',
      type: 'bar',
      data: [],
      barMaxWidth: 30, // 最大宽度#D7D7D7
      itemStyle: {
        normal: {
          color: '#D5EEFF'
        }
      }
    },
    {
      name: '推荐人点击',
      type: 'bar',
      data: [],
      barMaxWidth: 30, // 最大宽度
      itemStyle: {
        normal: {
          color: '#D7D7D7'
        }
      }
    },
    {
      name: '推荐商品',
      type: 'bar',
      data: [],
      barMaxWidth: 30, // 最大宽度#D7D7D7
      itemStyle: {
        normal: {
          color: '#D5EEFF'
        }
      }
    },
    {
      name: '推荐商品点击',
      type: 'bar',
      data: [],
      barMaxWidth: 30, // 最大宽度#D7D7D7
      itemStyle: {
        normal: {
          color: '#D7D7D7'
        }
      }
    }
//    markPoint: {
//      data: [
//        { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
//        { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
//      ]
//    }
      // markLine: {
      //   data: [
      //     { type: 'average', name: '平均值' }
      //   ]
      // }
  ]
}
export default option
