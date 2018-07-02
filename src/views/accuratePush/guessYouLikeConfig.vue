<template>
  <div class="wrapper">
    <div class="pushWrapperHead">
      <h1>后台操作管理系统</h1>
    </div>
    <div style="height:20px;background:#A2E0E0;"></div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <div style="height:100%; width:400px;background:#009999; float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;">公共参数</span>
        <i class="el-icon-d-arrow-right" style="margin-left:200px; font-weight:bold;font-size:20px"></i>
      </div>
    </div>
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="form" label-width="150px">
        <el-form-item label="时间系数:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="行为权重系数:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="多条记录权重:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="页面深度系数:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">商品权重重衰减</span>
    </div>
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="form" label-width="150px">
        <el-form-item label="浏览1次:" class="itemListWeightTop">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="收藏1次:" class="itemListWeightTop">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="加购1次:" class="itemListWeightTop">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="购买1次:" class="itemListWeightBottom">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="每天无任何操作:" class="itemListWeightBottom">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">策略分配比例</span>
    </div>
    <div class="tableList clearfix">
      <div class="itemList historySpan">
        <span>无购买历史行为</span>
      </div>
      <div class="itemList historySpan">
        <span>有购买历史行为</span>
      </div>
      <el-form ref="form" :inline='true' :model="form" label-width="150px">
        <el-form-item label="基于平台爆款推荐:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="行为对象数量:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="基于运营需求推荐:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="基于时间长度:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产生推荐商品数量:" class="itemList">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
  .wrapper{
    padding: 0 20px;
    .pushWrapperHead{
      color:white;
      line-height: 150px;
      height:150px;
      background: #009999;
      text-align: center;
    }
    .clearfix:after {
      content:"";
      display: block;
      clear:both;
    }
    .tableList{
      background: #A2E0E0;
      padding-top:20px;
    }
    .itemList{
      text-align: center;
      width: calc(50% - 20px);
      float: left;
    }
    .historySpan{
      font-weight: bold;
      font-size: 25px;
      height:50px;
      line-height: 50px;
      margin-bottom: 20px;
      color: rgba($color: #009999, $alpha: 1.0)
    }
    .titleSpan{
      margin-left: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .itemListWeightTop{
      width: calc(33% - 10px);
      text-align: center;
    }
    .itemListWeightBottom{
      width: calc(50% - 20px);
      text-align: center;
    }
  }
</style>
