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
    data: ['总推荐商品数', '收藏商品数', '加购商品数', '下单商品数', '购买商品数']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 458, name: '总推荐商品数' },
        { value: 310, name: '收藏商品数' },
        { value: 234, name: '加购商品数' },
        { value: 135, name: '下单商品数' },
        { value: 135, name: '购买商品数' }
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
