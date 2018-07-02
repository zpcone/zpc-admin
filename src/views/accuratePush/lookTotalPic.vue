<template>
  <div class="pushWrapper">
    <div class="pushWrapperHead">
      <h1>精准推荐</h1>
    </div>
    <div class="clearfix" style="height:50px;background:#D7D7D7; line-height:50px; color:#A5A5A5;">
      <div style="height:100%; width:200px;background:#D7D7D7; float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;">精准推荐-总览图</span>
        <!-- <i class="el-icon-d-arrow-right" style="margin-left:50px; font-weight:bold;font-size:20px"></i> -->
      </div>
      <div style="height:100%;float:right;width:560px;">
        <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          @change = "timeChange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
          <el-button @click="searchPieData" type="primary" plain size="small">查看</el-button>
          <el-button type="primary" round size="small" @click="productClick">商品列表</el-button>
      </div>
    </div>
    <div class="pushWrapperBodyTop clearfix">
      <div class="pushWrapperBodyTopLeft" ref="toatalPicOneCharts"></div>
      <div class="pushWrapperBodyTopRight" ref="toatalPicTwoCharts"></div>
    </div>
    <div class="pushWrapperBodyBot clearfix">
      <div class="pushWrapperBodyBotLeft" ref="toatalPicTheCharts"></div>
      <div class="pushWrapperBodyBotRight" ref="toatalPicForCharts"></div>
    </div>
  </div>
</template>

<script>
import { getTotalLookOne,getTotalLookTwo,getTotalLookThree,getTotalLookFour } from '@/api/pushBack/pushBack' // 引用接口
// var echarts = 'echarts/lib/chart/pie'
import echarts from 'echarts/index.simple'
import { parseTime } from '@/utils'
import pushPie from '../charts/pushBackSystem/totalPushPeoplePie' // 引入饼状图一
import shopPushPie from '../charts/pushBackSystem/totalPushShopPie' // 引入饼状图二
import systemMatchPushPie from '../charts/pushBackSystem/systemMatchNum' // 引入饼状图三
import systemMatchLightPie from '../charts/pushBackSystem/systemMatchLight' // 引入饼状图四
export default {
  data(){
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      time: '',
	    form: {
	      startDay: '',
	      endDay: ''
	    }
    }
  },
  methods:{
  // 点击查看按钮
  searchPieData() {
//		pushPie.series[0].data[0].value = 1000
//		this.getEchartsOne()
      this.oneClick()
      this.TwoClick()
      this.ThreeClick()
      this.FourClick()
  },
  oneClick () {
  	  getTotalLookOne(this.form).then(res => {
        pushPie.series[0].data[0].value = res.recPersonCount
        pushPie.series[0].data[1].value = res.recCollectCount
        pushPie.series[0].data[2].value = res.recAddCount
        pushPie.series[0].data[3].value = res.recBuyCount
        pushPie.series[0].data[4].value = res.recPayCount
        this.getEchartsOne()
  	  })
  },
  TwoClick () {
  	  getTotalLookTwo(this.form).then(res => {
        //总推荐商品数  收藏商品数  加购商品数  下单商品数  购买商品数
        shopPushPie.series[0].data[0].value = res.recCommodityCount
        shopPushPie.series[0].data[1].value = res.recCollectCount
        shopPushPie.series[0].data[2].value = res.recAddCount
        shopPushPie.series[0].data[3].value = res.recPayCount
        shopPushPie.series[0].data[4].value = res.recBuyCount
        this.getEchartsTwo()
  	  })
  },
  ThreeClick () {
  	  getTotalLookThree(this.form).then(res => {
        //系统匹配人数  接灯人数  转灯人数  点灯人数  作废人数
        systemMatchPushPie.series[0].data[0].value = res.recMatchPersonCount
        systemMatchPushPie.series[0].data[1].value = res.recPersonAcceptCount
        systemMatchPushPie.series[0].data[2].value = res.recPersonPassCount
        systemMatchPushPie.series[0].data[3].value = res.recPersonLightCount
        systemMatchPushPie.series[0].data[4].value = res.recPersonIgnoreCount
        this.getEchartsThe()
  	  })
  },
  FourClick () {
  	  getTotalLookFour(this.form).then(res => {
        //系统匹配点灯圈  点灯圈点灯数量
        systemMatchLightPie.series[0].data[0].value = res.recMatchCircleCount
        systemMatchLightPie.series[0].data[1].value = res.recCircleLightCount
        this.getEchartsFor()
  	  })
  },
	getEchartsOne () {
	  const boxOne = this.$refs.toatalPicOneCharts // 获取节点
	  this.chartsOne = echarts.init (boxOne)
	  this.chartsOne.setOption(pushPie)
	},
	getEchartsTwo () {
	  const boxTwo = this.$refs.toatalPicTwoCharts // 获取节点
	  this.chartsTwo = echarts.init (boxTwo)
	  this.chartsTwo.setOption(shopPushPie)
	},
	getEchartsThe () {
	  const boxThe = this.$refs.toatalPicTheCharts // 获取节点
	  this.chartsThe = echarts.init (boxThe)
	  this.chartsThe.setOption(systemMatchPushPie)
	},
	getEchartsFor () {
	  const boxFor = this.$refs.toatalPicForCharts // 获取节点
	  this.chartsFor = echarts.init (boxFor)
	  this.chartsFor.setOption(systemMatchLightPie)
	},
	//格式化时间
	timeChange (data) {
		if(data){
			this.form.startDay = parseTime(data[0])
			this.form.endDay = parseTime(data[1])
		}else{
  			this.form.startDay = ''
  			this.form.endDay = ''
  	}
	},
  //商品列表按钮
	productClick () {
		this.$router.push('/accuratePush/shopListLook')
	},

  //以下是代码备用   2018.6.15  xiu
    // 更改第图标的数据-参数-target
    // this.changeOneCharts(this.threePieData, systemMatchLightPie, '4')
    changeOneCharts(getParams, target, type) {
      if (type == '1') {
        console.log('hgkjgfdhkjh')
      }
      var total = 0 // 总推荐人数
      var buy = 0 // 购买人数
      var order = 0 // 下单人数
      var addBuy = 0 // 加购人数
      var collect = 0 // 收藏人数
      var active = 0 // 点击人数
      if (type == '1') {
        getParams.forEach(ele => {
          total = total + ele.recPersonCount // 总推荐人数
          buy = buy + ele.recBuyCount // 购买人数
          order = order + ele.recPayCount // 下单人数
          addBuy = addBuy + ele.recAddCount // 加购人数
          collect = collect + ele.recCollectCount // 收藏人数
          active = active + ele.recClickCount // 点击人数
        })
        target.series[0].data[0].value = total
        target.series[0].data[1].value = buy
        target.series[0].data[2].value = order
        target.series[0].data[3].value = addBuy
        target.series[0].data[4].value = collect
        target.series[0].data[5].value = active
      } else if (type == '2') {
        getParams.forEach(ele => {
          total = total + ele.recCommodityCount // 总推荐人数
          buy = buy + ele.recBuyCount // 购买人数
          order = order + ele.recPayCount // 下单人数
          addBuy = addBuy + ele.recAddCount // 加购人数
          collect = collect + ele.recCollectCount // 收藏人数
          active = active + ele.recClickCount // 点击人数
        })
        target.series[0].data[0].value = total
        target.series[0].data[1].value = buy
        target.series[0].data[2].value = order
        target.series[0].data[3].value = addBuy
        target.series[0].data[4].value = collect
        target.series[0].data[5].value = active
      } else if (type == '4') {
        getParams.forEach(ele => {
          total = total + ele.recCommodityCount // 总推荐人数
          buy = buy + ele.recBuyCount // 购买人数
          order = order + ele.recPayCount // 下单人数
          addBuy = addBuy + ele.recAddCount // 加购人数
          collect = collect + ele.recCollectCount // 收藏人数
          active = active + ele.recClickCount // 点击人数
        })
        target.series[0].data[0].value = total
        target.series[0].data[1].value = buy
        target.series[0].data[2].value = order
        target.series[0].data[3].value = addBuy
        target.series[0].data[4].value = collect
        target.series[0].data[5].value = active
      }
    },
  },
  mounted () {
		this.searchPieData()
    this.getEchartsOne ()
    this.getEchartsTwo ()
    this.getEchartsThe ()
    this.getEchartsFor ()
  }
}
</script>
<style  lang="scss" scoped>
  .clearfix:after{content:"";
    display:block;
    height:0;
    clear:both;
    visibility:hidden
  }
  .pushWrapper{
    border: 1px solid #CCCCCC;
    width:982px;
    margin:0 auto;
    padding:0 20px;
    .pushWrapperHead{
      margin-bottom:20px;
      color:#BCBCBC;
      line-height: 150px;
      height:150px;
      background: #D5EEFF;
      text-align: center;
    }
    .pushWrapperBodyTop{
      height:400px;
      // background: #D1F0F0;
      .pushWrapperBodyTopLeft, .pushWrapperBodyTopRight{
        float: left;
        width: 470px;
        height:400px;
      }
    }
    .pushWrapperBodyBot{
      height:400px;
      // background: #BFE9E9;
      .pushWrapperBodyBotLeft, .pushWrapperBodyBotRight{
        float: left;
        width: 470px;
        height:400px;
      }
    }
  }
</style>
