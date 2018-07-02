<template>
  <div class="wrapper">
    <div class="pushWrapperHead">
      <h1>后台操作管理系统</h1>
    </div>
    <div style="height:20px;background:#A2E0E0;"></div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">公共参数配置</span>
    </div>
    <div class="tableList clearfix">
      <!--<div class="itemList historySpan">
        <span>无历史行为</span>
      </div>
      <div class="itemList historySpan">
        <span>有历史行为</span>
      </div>-->
      <el-form ref="form" :inline='true' :model="saveBackData" label-width="150px">
        <el-form-item label="基于平台爆款推荐:" class="itemList" prop="commonHot">
            <el-select v-model="saveBackData.commonHot" placeholder="请选择" clearable>
              <el-option
                v-for="item in terraceOption1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>           
        </el-form-item>
        <el-form-item label="行为对象数量:" class="itemList" prop="commonActionNum">
          <el-input placeholder="请输入" clearable v-model="saveBackData.commonActionNum" v-on:input="NumCheck" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="基于运营需求推荐:" class="itemList" prop="commonOperate">
            <el-select v-model="saveBackData.commonOperate" placeholder="请选择" clearable>
              <el-option
                v-for="item in operationOption1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>  
        </el-form-item>
        <el-form-item label="基于时间长度:" class="itemList" prop="commonTime">
            <el-select v-model="saveBackData.commonTime" placeholder="请选择" clearable>
              <el-option
                v-for="item in timeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>        
        </el-form-item>
        <el-form-item label="产生推荐商品数量:" class="itemList" prop="commonRecSize">
          <el-input placeholder="请输入" clearable v-model="saveBackData.commonRecSize" v-on:input="NumCheck" maxlength="7"></el-input>
        </el-form-item>
      </el-form>
    </div>
 
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">猜你喜欢配置</span>
    </div>
    <!--<div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <div style="height:100%; width:400px;background:#009999; float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;">猜你喜欢配置</span>
      </div>
    </div>-->
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="saveBackData" label-width="200px">
        <el-form-item label="基于历史行为的爆款推荐:" class="itemList" prop="likeHistory">
            <el-select v-model="saveBackData.likeHistory" placeholder="请选择" clearable>
              <el-option
                v-for="item in historyOption1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
        </el-form-item>
        <el-form-item label="用户协同过滤：" class="itemList" prop="likeCoordinationUser">
            <el-select v-model="saveBackData.likeCoordinationUser" placeholder="请选择" clearable>
              <el-option
                v-for="item in userOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
        </el-form-item>
      </el-form>
    </div>
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">发现好货配置</span>
    </div>
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="saveBackData" label-width="200px">
        <el-form-item label="基于历史行为的爆款推荐:" class="itemList" prop="goodsHistory">
            <el-select v-model="saveBackData.goodsHistory" placeholder="请选择" clearable>
              <el-option
                v-for="item in historyOption2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
        </el-form-item>
        <el-form-item label="基于平台爆款推荐：" class="itemList" prop="goodsHot">
            <el-select v-model="saveBackData.goodsHot" placeholder="请选择" clearable>
              <el-option
                v-for="item in terraceOption2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
        </el-form-item>
        <el-form-item label="基于运营需求推荐：" class="itemList" prop="goodsOperate">
            <el-select v-model="saveBackData.goodsOperate" placeholder="请选择" clearable>
              <el-option
                v-for="item in operationOption2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
        </el-form-item>       
      </el-form>
    </div>    
    <div class="clearfix" style="height:50px;background:#62C4C4; line-height:50px; color:white;">
      <span class="titleSpan">系统配置</span>
    </div>
    <div class="tableList clearfix">
      <el-form ref="form" :inline='true' :model="saveBackData" label-width="250px">
        <el-form-item label="系统匹配人数范围:" class="itemList">
									<el-row>
										<el-col :span="10" prop="personCountScopeStart">
											<el-input v-model.trim="saveBackData.personCountScopeStart" v-on:input="NumCheck" maxlength="7" clearable></el-input>
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
											<el-input v-model.trim="saveBackData.circleCountScopeStart" v-on:input="NumCheck" maxlength="7" clearable></el-input>
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
          <el-input placeholder="请输入" clearable v-model="saveBackData.configMaxMatchCount" v-on:input="NumCheck" maxlength="7"></el-input>
        </el-form-item>
      </el-form>
      
    </div>
    <div style="text-align: center;margin-top: 20px;">
      <el-button @click="testDemo" type="success">保存</el-button>
    </div>
  </div>
</template>

<script>
	//======页面渲染=====保存
import { listShow,saveList } from '@/api/pushBack/pushBack'
export default {
data(){
    return {
    	//公共参数配置---基于平台爆款推荐
    	terraceOption1: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	],
    	//发现好货配置---基于平台爆款推荐
    	terraceOption2: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	],    	
    	//基于时间长度数组
    	timeOption: [
    		{
    			value: '1',
    			label: '无'
    		},
    		{
    			value: '2',
    			label: '15天'
    		},    		
    		{
    			value: '3',
    			label: '30天'
    		},
    		{
    			value: '4',
    			label: '60天'
    		},
    		{
    			value: '5',
    			label: '90天'
    		},
    		{
    			value: '6',
    			label: '120天'
    		},
    		{
    			value: '7',
    			label: '150天'
    		},    		
    	],
    	//公共参数配置----基于运营需求推荐下拉
    	operationOption1: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	],  
    	//发现好货配置----基于运营需求推荐下拉
    	operationOption2: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	],  
    	//猜你喜欢配置的基于历史行为下拉
    	historyOption1: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	], 
    	//发现好货配置的基于历史行为下拉
    	historyOption2: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	], 
    	//用户协同过滤
    	userOption: [
    		{
    			value: '1',
    			label: '1'
    		} , 
    		{
    			value: '2',
    			label: '2'
    		},
    		{
    			value: '3',
    			label: '3'
    		},
    		{
    			value: '4',
    			label: '4'
    		}, 
    		{
    			value: '5',
    			label: '5'
    		}, 
    		{
    			value: '6',
    			label: '6'
    		}, 
    		{
    			value: '7',
    			label: '7'
    		},     		
    		{
    			value: '8',
    			label: '8'
    		}   		
    	], 
    	//系统匹配人数范围
    	numScopeOptions: [
    		{
    			value: '10',
    			label: '10'
    		} , 
    		{
    			value: '30',
    			label: '30'
    		},
    		{
    			value: '50',
    			label: '50'
    		},
    		{
    			value: '80',
    			label: '80'
    		}, 
    		{
    			value: '100',
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
      	commonHot: '3',//公共--基于平台爆款推荐
      	commonActionNum: '10',//公共--行为对象数量
      	commonOperate: '4',//公共--基于运营需求推荐
      	commonTime: '1',//公共--基于时间长度
      	commonRecSize: '200',//公共--产生推荐产品数量
      	likeHistory: '5',//猜你喜欢--基于历史行为的爆款推荐
      	likeCoordinationUser: '4',//猜你喜欢--用户协同过滤
      	goodsHistory: '5',//发现好货--基于历史行为的爆款推荐
      	goodsHot: '3',//发现好货--基于平台爆款推荐
      	goodsOperate: '4',//发现好货--基于运营需求推荐
      	personCountScopeStart: '1',//系统配置--匹配人数范围
      	personCountScopeEnd: '100',//系统配置--匹配人数范围
      	circleCountScopeStart: '1',//系统配置--点灯数量范围
      	circleCountScopeEnd: '100',//系统配置--点灯数量范围
      	configMaxMatchCount: '10'//系统配置---每人每天接灯匹配数量
      },
      personNum: false
    }
  },
  methods:{
  	//保存按钮
    testDemo () {
    	let obj ={}
    	obj.commonHot = this.saveBackData.commonHot
    	obj.commonActionNum = this.saveBackData.commonActionNum
    	obj.commonOperate = this.saveBackData.commonOperate
    	obj.commonTime = this.saveBackData.commonTime
    	obj.commonRecSize = this.saveBackData.commonRecSize
    	obj.likeHistory = this.saveBackData.likeHistory
    	obj.likeCoordinationUser = this.saveBackData.likeCoordinationUser
    	obj.goodsHistory = this.saveBackData.goodsHistory
    	obj.goodsHot = this.saveBackData.goodsHot
    	obj.goodsOperate = this.saveBackData.goodsOperate
    	obj.personCountScopeStart = this.saveBackData.personCountScopeStart
    	obj.personCountScopeEnd = this.saveBackData.personCountScopeEnd
    	obj.circleCountScopeStart = this.saveBackData.circleCountScopeStart
    	obj.circleCountScopeEnd = this.saveBackData.circleCountScopeEnd
    	obj.configMaxMatchCount = this.saveBackData.configMaxMatchCount
			saveList(obj).then(res => {
					if(res.status == '200'){
						this.$message.success('保存成功！')
						this.searchClick()
					}else{
						this.$message.warning(res.errorMsg)
					}
			})
    },
    
    //数字校验
//		NumCheck () {
//			let reg = new RegExp(/^[0-9]*$/)
//			if(!reg.test(this.saveBackData.commonActionNum) || !reg.test(this.saveBackData.commonRecSize) ||
//			!reg.test(this.saveBackData.personCountScopeStart) || !reg.test(this.saveBackData.circleCountScopeStart)
//			 || !reg.test(this.saveBackData.configMaxMatchCount)){
//				this.personNum = false
//			}else{
//				this.personNum = true
//			}
//		},
    
    //页面刷新渲染表单
    searchClick () {
    	listShow({}).then(res => {
    		this.saveBackData = res
    	})
    },
  },
  created(){},
  mounted(){
    this.searchClick()
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
