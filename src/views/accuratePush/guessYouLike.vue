<template class="totalWrapper">
  <div class="pushWrapper">
    <div class="pushWrapperHead">
      <h1>精准推荐</h1>
    </div>
    <!-- <div>
      <el-button @click="testDemo" type="primary">主要按钮</el-button>
    </div> -->
    <div class="clearfix" style="height:50px;background:#D7D7D7; line-height:50px; color:white;">
      <div style="height:100%; width:400px;float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;">猜你喜欢推荐点击比</span>
        <!-- <i class="el-icon-d-arrow-right" style="margin-left:50px; font-weight:bold;font-size:20px"></i> -->
      </div>
    </div>
    <div class="pushWrapperBodyTop clearfix">
      <div class="pushWrapperBodyTopLeft" ref="toatalPicOneCharts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/index.simple'
import { guessYouLikePort } from '@/api/pushBack/pushBack' //接口引入
import systemGuess from '../charts/pushBackSystem/guessYouLikeCharts' // 引入柱状图one
export default {
  data(){
    return {
        startTime: '',
        endTime: ''
    }
  },
  methods:{
    // 获取后台的数据
    getBackData () {
      systemGuess.xAxis[0].data = []
      guessYouLikePort({}) .then(res => {
      for(let i=0;i<res.length;i++){
        systemGuess.xAxis[0].data.push(res[i].scene)
        systemGuess.series[0].data.push(res[i].recPersonCount)
        systemGuess.series[1].data.push(res[i].clickPersonCount)
        systemGuess.series[2].data.push(res[i].recCommodityCount)
        systemGuess.series[3].data.push(res[i].clickCommodityCount)
        this.getEchartsOne()
      }
      })
      .catch(() => {
      })
    },

    getEchartsOne () {
      const boxOne = this.$refs.toatalPicOneCharts // 获取节点
      this.chartsOne = echarts.init (boxOne)
      this.chartsOne.setOption(systemGuess)
    }
  },
  mounted () {
    this.getBackData()
    this.getEchartsOne()
  }
}
</script>
<style lang="scss" scoped>
 .pushWrapper{
    border: 1px solid #ccc;
    height: 900px;
    width:980px;
    margin:0 auto;
    // background: #62C4C4;
  }
  .pushWrapperHead{
    margin-bottom:20px;
    color:#CDD3D6;
    line-height: 150px;
    height:150px;
    background: #D5EEFF;
    text-align: center;
  }
  .pushWrapperBodyTop{
    height: 300px;
  }
  .pushWrapperBodyTopLeft{
    margin-top: 150px;
    // float: left;
    // width: 470px;
    height:400px;
  }
  // .clearfix:after{
  //   content:"";
  //   display:block;
  //   height:0;
  //   clear:both;
  //   visibility:hidden
  // }
  // .pushWrapper{
  //   height:100%;
  //   width:980px;
  //   margin:0 auto;
  //   padding:0 20px;
  //   .pushWrapperHead{
  //     margin-bottom:20px;
  //     color:white;
  //     line-height: 150px;
  //     height:150px;
  //     background: #009999;
  //     text-align: center;
  //   }
  //   .pushWrapperBodyTop{
  //     height:100%;
  //     background: #D1F0F0;
  //     .pushWrapperBodyTopLeft{
  //       // float: left;
  //       // width: 470px;
  //       height:400px;
  //     }
  //   }
  // }
</style>
