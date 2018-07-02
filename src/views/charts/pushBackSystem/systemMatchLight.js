const option = {
  title: {
    // text: '某站点用户访问来源',
    // subtext: '纯属虚构',
    // x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['系统匹配点灯圈', '点灯圈点灯数量']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 310, name: '系统匹配点灯圈' },
        { value: 234, name: '点灯圈点灯数量' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ],
  color: ['#D5EEFF', '#E0E0E0']
}
export default option
