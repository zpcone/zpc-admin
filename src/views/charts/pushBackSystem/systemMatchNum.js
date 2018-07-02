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
    // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    data: ['系统匹配人数', '接灯人数', '转灯人数', '点灯人数', '作废人数']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 1458, name: '系统匹配人数' },
        { value: 310, name: '接灯人数' },
        { value: 234, name: '转灯人数' },
        { value: 135, name: '点灯人数' },
        { value: 135, name: '作废人数' }
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
  color: ['#E0E0E0', '#D5EEFF', '#F4FA3B', '#EDBA66', '#EB6E76']
}
export default option
