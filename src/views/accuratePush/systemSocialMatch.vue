<template>
  <div class="wrapper">
    <div class="pushWrapperHead">
      <h1>精准推荐</h1>
    </div>
    <div style="height:20px;background:#A2E0E0;"></div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">系统匹配许愿灯</span>
    </div>
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="saveBackData" label-width="250px">
        <el-form-item label="系统匹配人数范围:" class="itemList">
									<el-row>
										<el-col :span="10" prop="personCountScopeStart">
											<el-input v-model.trim="saveBackData.personCountScopeStart" v-on:input="NumCheck" maxlength="6" clearable></el-input>
										</el-col>
										<el-col :span="2" style="text-align: center;">-</el-col>
										<el-col :span="12" prop="personCountScopeEnd">
							          <el-select v-model="saveBackData.personCountScopeEnd" placeholder="请选择">
							            <el-option
							              v-for="item in numScopeOptions"
							              :key="item.value"
							              :label="item.label"
							              :value="item.value">
							            </el-option>
							          </el-select>
										</el-col>
									</el-row>
        </el-form-item>
        <el-form-item label="系统匹配点灯圈数量范围:" class="itemList">
									<el-row>
										<el-col :span="10" prop="circleCountScopeStart">
											<el-input v-model.trim="saveBackData.circleCountScopeStart" v-on:input="NumCheck" maxlength="6" clearable></el-input>
										</el-col>
										<el-col :span="2" style="text-align: center;">-</el-col>
										<el-col :span="12" prop="circleCountScopeEnd">
							          <el-select v-model="saveBackData.circleCountScopeEnd" placeholder="请选择">
							            <el-option
							              v-for="item in lightOptions"
							              :key="item.value"
							              :label="item.label"
							              :value="item.value">
							            </el-option>
							          </el-select>
										</el-col>
									</el-row>
        </el-form-item>
        <el-form-item label="每人每天最多接到匹配灯数量:" style="margin-left: 7.4%;" prop="configMaxMatchCount">
          <el-input placeholder="请输入" clearable v-model="saveBackData.configMaxMatchCount"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center;margin-top: 20px;">
      <el-button @click="saveClick" type="success">保存</el-button>
    </div>
  </div>
</template>

<script>
import { searchLightList,saveLightList } from '@/api/pushBack/pushBack'
export default {
  components:{},
  props:{},
  data(){
    return {
    	//系统匹配人数范围
    	numScopeOptions: [
    		{
    			value: '1',
    			label: '10'
    		} ,
    		{
    			value: '2',
    			label: '30'
    		},
    		{
    			value: '3',
    			label: '50'
    		},
    		{
    			value: '4',
    			label: '80'
    		},
    		{
    			value: '5',
    			label: '100'
    		}
    	],
    	//每人每天接灯
    	lightOptions: [
    		{
    			value: '1',
    			label: '10'
    		} ,
    		{
    			value: '2',
    			label: '30'
    		},
    		{
    			value: '3',
    			label: '50'
    		},
    		{
    			value: '4',
    			label: '80'
    		},
    		{
    			value: '5',
    			label: '100'
    		}
    	],
      // 保存后台数据
      saveBackData: {
      	personCountScopeStart: '1',
      	personCountScopeEnd: '100',
      	circleCountScopeStart: '1',
      	circleCountScopeEnd: '100',
      	configMaxMatchCount: '10',
      },
    }
  },
  watch:{},
  computed:{},
  methods:{
  	//页面刷新渲染表单
  	handelQuery () {
  		searchLightList({}).then(res => {
  			this.saveBackData = res
  		})
  	},
  	//保存按钮
  	saveClick () {
  		let obj = {}
  		obj.personCountScopeStart = this.saveBackData.personCountScopeStart
  		obj.personCountScopeEnd = this.saveBackData.personCountScopeEnd
  		obj.circleCountScopeStart = this.saveBackData.circleCountScopeStart
  		obj.circleCountScopeEnd = this.saveBackData.circleCountScopeEnd
  		obj.configMaxMatchCount = this.saveBackData.configMaxMatchCount
  		saveLightList(obj).then(res => {
  			if(res.status == '200'){
  				this.$message.success('保存成功！')
  				this.handelQuery()
  			}else{
  				this.$message.warning(res.errorMsg)
  			}
  		})
  	}
  },
  mounted(){
    this.handelQuery()
  }
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
