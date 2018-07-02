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
    data: ['北京', '天津', '上海']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 310, name: '北京' },
        { value: 234, name: '天津' },
        { value: 234, name: '上海' }
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
  color: ['#F7D205', '#98B7B7']
}
export default option
