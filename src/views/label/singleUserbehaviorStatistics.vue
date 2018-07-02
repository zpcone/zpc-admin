<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="渠道类型：" prop="channel">
				<el-select placeholder="请选择" v-model="form.channel" @change="channelChange" clearable>
					<el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入手机号" :disabled="forbidden"></el-input>
        </el-form-item>
        <el-form-item label="用户行业：" prop="industry">
          <el-input v-model="form.industry" placeholder="请输入用户行业" :disabled="forbidden"></el-input>
        </el-form-item> <br>
        <el-form-item label="用户ID：" prop="mid">
          <el-input placeholder="请输入用户ID"  style="width:200px" v-model.trim="form.mid" @change="midCahnge" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户年龄：" prop="age">
          <el-input placeholder="请输入用户年龄" v-model="form.age" :disabled="forbidden"></el-input>
        </el-form-item>
        <el-form-item label="用户职业：" prop="occupation">
          <el-input v-model="form.occupation" placeholder="请输入用户职业" :disabled="forbidden"></el-input>
        </el-form-item> <br>
        <el-form-item label="登录用户名：" prop="loginName">
          <el-input class="inputWidth" v-model="form.loginName" placeholder="请输入用户ID" :disabled="forbidden"></el-input>
        </el-form-item>
        <el-form-item label="用户性别：" prop="sex">
        	<el-input class="inputWidth" v-model="form.sex" placeholder="请输入性别" :disabled="forbidden"></el-input>
        </el-form-item>
        <el-form-item label="教育水平：" prop="education">
          <el-input placeholder="请输入教育水平" class="inputWidth" v-model="form.education" :disabled="forbidden"></el-input>
        </el-form-item> <br>
        <el-form-item label="用户昵称：" prop="nickName">
          <el-input placeholder="请输入用户名" class="inputWidth" v-model="form.nickName" :disabled="forbidden"></el-input>
        </el-form-item>
        <el-form-item label="当前所在地：" prop="regionName">
        	<el-input class="inputWidth" v-model="form.regionName" placeholder="请输入所在地" :disabled="forbidden"></el-input>
        </el-form-item>
        <!--<el-form-item label="圈内角色" prop="circleRole">
          <el-select  v-model="form.circleRole" placeholder="请选择" :disabled="forbidden">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
			  <el-form-item class="block" label="查询时间：" prop="time">
			    <el-date-picker
			      v-model="time"
			      type="daterange"
			      value-format="yyyy-MM-dd"
			      @change="timeChange"
			      :picker-options="pickerOptions2"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right">
			    </el-date-picker>
			  </el-form-item><br>

        <el-form-item label="一级模块：" prop="moduleCode1" v-if="form.channel">
          <el-select v-model="form.moduleCode1" placeholder="请选择" @change="moduleChangeOne" clearable>
              <el-option
                v-for="item in options1"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级模块：" prop="moduleCode2" v-if="showTwo">
          <el-select v-model="form.moduleCode2" placeholder="请选择" @change="moduleChangeTwo" clearable>
              <el-option
                v-for="item in options2"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级模块：" prop="moduleCode3" v-if="showThree">
          <el-select v-model="form.moduleCode3" placeholder="请选择" clearable>
              <el-option
                v-for="item in options3"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行为名称：" prop="actionCode" v-if="showFor">
          <el-select v-model="form.actionCode" placeholder="请选择" @change="nameCahnge" style="width:350px;" clearable>
              <el-option
                v-for="item in options4"
                :key="item.actionCode"
                :label="item.actionName"
                :value="item.actionCode">
              </el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="行为名称" prop="actionName">
          <el-input v-model="form.actionName" placeholder="请输入行为名称"></el-input>
        </el-form-item> <br>-->
        <el-form-item label="关键字查询：">
          <el-input class="inputWidth" placeholder="请输入行为组/行为名称" maxlength="14" clearable style="width:250px" v-model.trim="form.keyWord"></el-input>
        </el-form-item><br>
        	<div style="margin-left: 25%;">
        		<el-button type="primary" @click="onSubmit">查询</el-button>
        		<el-button type="info" @click="reset">重置</el-button>
        	</div>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="wrapperBody">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      	<el-button v-if="activeName == 'first'" type="info" style="float:left;margin-left:48%;margin-bottom: 10px;" @click="viewUser">查看行为用户</el-button>
        <el-tab-pane label="行为" name="first">
          <el-table :data="statisticsData" border style="width: 100%" @selection-change="selectionChange1">
          	<el-table-column type="selection"></el-table-column>
            <el-table-column prop="channelName" label="渠道类型" :formatter="channelFormatter" width="100"></el-table-column>
            <el-table-column prop="actionName" label="行为名称"></el-table-column>
            <el-table-column prop="actionCode" label="行为编码"></el-table-column>
            <el-table-column prop="beginDate" label="开始时间" width="170"></el-table-column>
            <el-table-column prop="endDate" label="结束时间" width="170"></el-table-column>
            <el-table-column prop="countAll" label="总次数"></el-table-column>
            <el-table-column prop="countDayAvg" label="日均次数"></el-table-column>
            <el-table-column prop="countDayMax" label="单日最高次数"></el-table-column>
            <!--<el-table-column prop="amount3" label="总金额"></el-table-column>
            <el-table-column prop="amount3" label="日均金额"></el-table-column>
            <el-table-column prop="amount3" label="单日最高金额"></el-table-column>
            <el-table-column prop="amount3" label="单次最高金额"></el-table-column>-->
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日志" name="second">
          <el-table ref="multipleTable" :data="logsData" style="width: 100%">
          	<el-table-column type="selection"></el-table-column>
            <el-table-column prop="channelName" label="渠道类型" :formatter="channelFormatter" width="100"></el-table-column>
            <el-table-column prop="actionName" label="行为名称"></el-table-column>
            <el-table-column prop="actionCode" label="行为编码"></el-table-column>
            <el-table-column prop="module1Name" label="一级模块"></el-table-column>
            <el-table-column prop="module2Name" label="二级模块"></el-table-column>
            <el-table-column prop="module3Name" label="三级模块"></el-table-column>
            <el-table-column prop="actionTime" label="发生时间" width="170"></el-table-column>
            <el-table-column prop="parameters" label="行为参数" width="300"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="m20 center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNum"
        :page-size="form.pageSize"
        layout="total, prev, pager, next,jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
	getUserInfo,//输入用户id 渲染被禁掉的条件选项
  listUserActionStatistics,//行为列表
  listUserActionLogs,//日志列表
  getAllModuleLabels//1-3级模块渲染
} from '@/api/label/behaviorStatisticsManage/userBehavior'
import { parseTime } from '@/utils'
export default {
  data() {
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
    	time: [],
    	options1: [
	      {
	        moduleCode: '',
	        moduleName: ''
	      }
	    ],
    	options2: [
	      {
	        moduleCode: '',
	        moduleName: ''
	      }
	    ],
    	options3: [
	      {
	        moduleCode: '',
	        moduleName: ''
	      }
	    ],
    	options4: [
	      {
	        actionCode: '',
	        actionName: ''
	      }
	    ],
	    channelOptions: [
	    	{
	    		value:'1',
	    		label: '我茂'
	    	},
	    	{
	    		value:'2',
	    		label: '我鸽'
	    	}
	    ],
	    form: {
	    	channel: '',//渠道类型
	    	mid: '',//用户id  448486683692699648
	    	loginName: '',//登录用户名
	    	nickName: '', //用户昵称
	    	moduleCode1: '',//一级模块
	    	moduleCode2: '',//二级模块
	    	moduleCode3: '',//三级模块
	    	actionCode: '',//行为编码
	    	keyWord: '',//关键字查询
	    	phone: '',//手机号
	    	age: '',//用户年龄
	    	sex: '',//性别
	    	regionName: '',//当前所在地
	    	industry: '',//用户行业
	    	occupation: '',//用户职业
	    	education: '',//教育水平
	    	beginDate: '',//开始时间
	    	endDate: '',//结束时间
	    	pageNum: '1',
	    	pageSize: '10'
	    },
	    inputNum: true,
	    totalSize: '',
	    currentPage: 1,
	    statisticsData: [],//行为表格
	    logsData: [],//日志表格
	    selections1: '',//行为勾选数组
      activeName: 'first',//表格上方的tab名称
      forbidden: true,//处理隐藏
      showTwo: false,
      showThree: false,
      showFor: false
    }
  },
  methods: {
		channelChange(val) {
			this.form.channel = val + ''
			if(!val){
		      this.form.moduleCode1 = ""; //一级模块
		      this.form.moduleCode2 = ""; //二级模块
		      this.form.moduleCode3 = ""; //三级模块
		      this.form.actionCode = ""; //行为代码		
		      this.showTwo = false
		      this.showThree = false
		      this.showFor = false
			}else{
					this.form.moduleCode1 = ""; //一级模块
		      this.form.moduleCode2 = ""; //二级模块
		      this.form.moduleCode3 = ""; //三级模块
		      this.form.actionCode = ""; //行为代码			
		      this.showTwo = false
		      this.showThree = false
		      this.showFor = false
		      getAllModuleLabels({ channel:this.form.channel,parentCode: "" }).then(res => {
		        if (res.status == "200") {
		          this.options1 = res.data.modules;
		        } else {
		          this.$message.warning(res.errorMsg);
		        }
		      });				
			}
		},
		
  	//行为名称下拉框值改变  2018.6.21 xiu
  	nameCahnge (val) {
  		this.form.actionCode = val + ''
  	},
  	//格式化时间  2018.6.21  xiu
  	timeChange (data) {
  		if(data){
  			this.form.beginDate = data[0]
  			this.form.endDate = data[1]
  		}else{
   			this.form.beginDate = ''
  			this.form.endDate = ''
  		}
  	},
  	//校验用户ID必须为数字  2018.6.21 xiu
		inputNumCheck () {
			let reg = new RegExp(/^[0-9]*$/)
			if(!reg.test(this.form.mid)){
				this.inputNum = false
			}else{
				this.inputNum = true
			}
		},
		//用户id的文本框值发生改变的时候  渲染被禁掉的列表  2018.6.21 xius
  	midCahnge (val) {
  		if(this.inputNum == false){
  			this.$message.warning('用户ID必须为数字')
  		}else{
  			getUserInfo({mId:this.form.mid}).then(res => {
  				if(res.status == '200'){
  					if(res.data.sex){
  						if(res.data.sex == 0){
  							res.data.sex = '男'
  						}else if(res.data.sex == 1){
  							res.data.sex = '女'
  						}
  						this.form = res.data
  					}else{
  						this.form = res.data
  					}
  				}
  			})
  		}
  	},
    // 切换表格
    handleClick(tab, evewnt) {
      this.activeName = tab.name
      this.form.pageNum = '1'
      this.form.pageSize = '10'
      if (this.activeName === 'second') {
        listUserActionLogs(this.form).then(res => {
          if (res.status === 200) {
            this.logsData = res.data.list
          }
        })
      }
    },

  	handelQueryList () {
  		let query = this.$router.currentRoute.query
  		if(query.mId && query.channel){
					this.form.channel  = query.channel + ''
					this.form.mid  = query.mId
	  			getUserInfo({mId:this.form.mid}).then(res => {
	  				if(res.status == '200'){
	  					if(res.data.sex){
	  						if(res.data.sex == 0){
	  							res.data.sex = '男'
	  						}else if(res.data.sex == 1){
	  							res.data.sex = '女'
	  						}
	  						this.form = res.data
	  					}else{
	  						this.form = res.data
	  					}
	  				}
	  			})
	  			this.conditionList() 
  		}else if(!query.actionCode && !query.channel){
  				this.conditionList()
  		}
  	},

    // 获取列表
    conditionList() {
      if (this.activeName === 'first') {
        listUserActionStatistics(this.form).then(res => {
          if (res.status === 200) {
            this.statisticsData = res.data.list
            this.totalSize = Number(res.data.total)
          }
        })
      } else {
      	let obj = {
      		channel:this.form.channle,
      		mId:this.form.mid,
      		loginName:this.form.loginName,
      		nickName:this.form.nickName,
      		moduleCode1:this.form.moduleCode1,
      		moduleCode2:this.form.moduleCode2,
      		moduleCode3:this.form.moduleCode3,
      		actionCode:this.form.actionCode,
      		keyWord:this.form.keyWord,
      		phone:this.form.phone,
      		age:this.form.age,
      		sex:this.form.sex,
      		regionName:this.form.regionName,
      		industry:this.form.industry,
      		occupation:this.form.occupation,
      		education:this.form.education,
      		beginDate:this.form.beginDate,
      		endDate:this.form.endDate,
      		pageNum:this.pageNum,
      		pageSize:this.pageSize
      	}
        listUserActionLogs(obj).then(res => {
          if (res.status === 200) {
            this.logsData = res.data.list
            this.totalSize = Number(res.data.total)
          }
        })
      }
    },

    //查询按钮
    onSubmit () {
    	if(this.inputNum == false){
    		this.$message.warning('ID必须为数字！')
    	}else{
    		this.conditionList ()
    	}
    },

    //分页处理
    handleCurrentChange (val) {
    	this.form.pageNum = val + ''
    	this.conditionList ()
    },

    moduleChangeOne (val) {
    	console.log(val)
    	let parentCode = val + ''
    	getAllModuleLabels({channel:this.form.channel,parentCode: parentCode}).then(res => {
    		if(res.status == '200'){
    			this.options2 = res.data.modules
    			this.showTwo = true
    		}
    	})
    },

    moduleChangeTwo (val) {
    	console.log(val)
    	let parentCode = val + ''
    	getAllModuleLabels({channel:this.form.channel,parentCode: parentCode}).then(res => {
    		if(res.status == '200'){
    			if(res.data.modules.length){
    				this.options3 = res.data.modules
    				this.showThree = true
    			}
    			if(res.data.behaviors.length){
    				this.options4 = res.data.behaviors
    				this.showFor = true
    			}
    		}
    	})
    },

    channelFormatter (row) {
    	if(row.channel == '1'){
    			return '我茂'
    	}else if(row.channel == '2'){
    			return '我鸽'
    	}
    },

    //重置
		reset () {
			this.form.channel = ''//渠道类型
			this.form.mid = ''//用户ID
			this.form.beginDate = ''//开始时间
			this.form.endDate = ''//结束时间
			this.form.moduleCode1 = ''//一级模块
			this.form.moduleCode2 = ''//二级模块
			this.form.moduleCode3 = ''//三级模块
			this.form.actionCode = ''//行为名称
			this.form.keyWord = ''//关键字查询
			this.showTwo = false
      this.showThree = false
      this.showFor = false
      this.inputNum = true
		},

		//行为列表的勾选
		selectionChange1 (val) {
			this.selections1 = val
		},

		//查看行为用户按钮
		viewUser () {
				if(this.selections1.length == 0 || this.selections1.length > 1){
						this.$message.warning('请勾选数据，只能选一项！')
				}else{
					let channel = ''
					let actionCode = ''
						this.actionformatter(channel,actionCode,this.selections1)
				}
		},

		//查看行为用户按钮的公用方法
		actionformatter (val1,val2,arrayList) {
				for(let i=0;i<arrayList.length;i++){
					val1 = arrayList[i].channel
					val2 = arrayList[i].actionCode
				}
    		this.$router.push(
    			{
    				path:'/label/behaviorStatisticsManage/behaviorUserList',
    				query:{
    					channel : val1,
	 						actionCode : val2,
    				}
    			}
    		)
		}


  },
  mounted() {
    this.handelQueryList()
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  text-align: center;
}
.selectWidth {
  width: 185px;
}
.inputWidth {
  width: 200px;
}
.wrapper {
  padding: 20px;
  .wrapperHead {
    padding-top: 20px;
    border-radius: 5px;
    height: 400px;
    background: #f2f2f2;
  }
  .line {
    margin-top: 20px;
    border-bottom: 1px dashed gray;
  }
  .wrapperBody {
    margin-top: 20px;
  }
}
</style>
