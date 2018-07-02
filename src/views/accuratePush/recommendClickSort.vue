<template>
  <div class="pushWrapper">
    <div class="pushWrapperHead">
      <h1>精准推荐</h1>
    </div>
    <div class="clearfix" style="height:50px;line-height:50px; color:white;">
      <div style="height:100%; width:400px;background:#D7D7D7; float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;">排名前五【品类】推荐点击指数</span>
        <!-- <i class="el-icon-d-arrow-right" style="margin-left:50px; font-weight:bold;font-size:20px"></i> -->
      </div>
    </div>
    <div>
      <!-- <el-button @click="testBtn" type="success">成功按钮</el-button> -->
    </div>
    <div class="pushWrapperBodyTop clearfix">
      <div class="pushWrapperBodyTopLeft" ref="toatalPicOneCharts"></div>
      <!-- <div class="pushWrapperBodyTopRight" ref="toatalPicTwoCharts"></div> -->
    </div>
    <div style="height:50px; display:flex;line-height:50px;background:#D7D7D7;justify-content:center;">
      <span style="flex: 1; text-align:center;">
        <span>
          排名前五【品牌】推荐点击指数</span>
        </span>
      <span style="flex: 1;text-align:center;">
        <span>
          排名前二百【销量商品】推荐点击指数</span>
        </span>
    </div>
    <div class="pushWrapperBodyBot clearfix">
      <div class="pushWrapperBodyBotLeft" ref="toatalPicTheCharts"></div>
      <div class="pushWrapperBodyBotRight" ref="toatalPicForCharts"></div>
    </div>
  </div>
</template>

<script>
//=======推荐点击排行1========2===============3
import { recommendBMOne,recommendBMTwo,recommendBMThree } from '@/api/pushBack/pushBack'
import echarts from 'echarts'
import systemPushSortPie from '../charts/pushBackSystem/systemPushSort' // 引入柱状图one
import systemMatchPushPie from '../charts/pushBackSystem/systemPushSortTwo' // 引入饼状图三
import systemMatchLightPie from '../charts/pushBackSystem/systemPushSortThree' // 引入饼状图四
export default {
  data(){
    return {
    	
    }
  },
  methods:{
  	//页面刷新  加载柱状图一、柱状图二、柱状图三
  	handleQuery () {
  		this.sortOne()
  		this.sortTwo()
  		this.sortThree()
  	},
  	//柱状图一 接口渲染
  	sortOne () {
  		systemPushSortPie.xAxis[0].data = []
  		recommendBMOne({}).then(res => {
  			for(let i=0;i<res.length;i++){
  					systemPushSortPie.xAxis[0].data.push(res[i].hotCategory)
						systemPushSortPie.series[0].data.push(res[i].commodityRecCount)
						systemPushSortPie.series[1].data.push(res[i].commodityClickCount)
						this.getEchartsOne()
  			}
  		})
  	},
  	//柱状图二 接口渲染
  	sortTwo () {
  		systemMatchPushPie.xAxis[0].data =[]
  		recommendBMTwo({}).then(res => {
  			for(let i=0;i<res.length;i++){
  					systemMatchPushPie.xAxis[0].data.push(res[i].hotBrand)
						systemMatchPushPie.series[0].data.push(res[i].commodityRecCount)
						systemMatchPushPie.series[1].data.push(res[i].commodityClickCount)
						this.getEchartsThe()
  			}  			
  		})  		
  	},
  	//柱状图三 接口渲染
  	sortThree () {
  		systemMatchLightPie.xAxis[0].data = []
  		recommendBMThree({}).then(res => {
  			for(let i=0;i<res.length;i++){
					systemMatchLightPie.xAxis[0].data.push(res[i].hotBrand)
						systemMatchLightPie.series[0].data.push(res[i].commodityRecCount)
						systemMatchLightPie.series[1].data.push(res[i].commodityClickCount)
						this.getEchartsFor()
  			}  			
  		})  		
  	},
  	
    getEchartsOne () {
      const boxOne = this.$refs.toatalPicOneCharts // 获取节点
      this.chartsOne = echarts.init (boxOne)
      this.chartsOne.setOption(systemPushSortPie)
    },
    // getEchartsTwo () {
    //   const boxTwo = this.$refs.toatalPicTwoCharts // 获取节点
    //   this.chartsTwo = echarts.init (boxTwo)
    //   this.chartsTwo.setOption(shopPushPie)
    // },
    getEchartsThe () {
      const boxThe = this.$refs.toatalPicTheCharts // 获取节点
      this.chartsThe = echarts.init (boxThe)
      this.chartsThe.setOption(systemMatchPushPie)
    },
    getEchartsFor () {
      const boxFor = this.$refs.toatalPicForCharts // 获取节点
      this.chartsFor = echarts.init (boxFor)
      this.chartsFor.setOption(systemMatchLightPie)
    }
  },
  mounted(){
  	this.handleQuery()
    this.getEchartsOne ()
    // this.getEchartsTwo ()
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
      color:#CCCCCC;
      line-height: 150px;
      height:150px;
      background: #D5EEFF;
      text-align: center;
    }
    .pushWrapperBodyTop{
      height:400px;
      // background: #D1F0F0;
      .pushWrapperBodyTopLeft{
        // float: left;
        // width: 470px;
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
