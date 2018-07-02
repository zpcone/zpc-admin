<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="用户名：" prop="keyWord">
          <el-input placeholder=""  v-model="form.keyWord" clearable>
            <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="特权分类：" prop="privilegeId">
          <el-select clearable  placeholder="请选择" v-model="form.privilegeId">
              <el-option
                  v-for="item in dataklist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特权类型：" prop="userType">
          <el-select clearable  placeholder="请选择" v-model="form.userType">
              <el-option
                  v-for="item in tqTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
			  <!--<el-form-item label="活动时间">
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="form.begTime" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
			    <el-col :span="11">
			      <el-form-item prop="date2">
			        <el-date-picker type="date" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>-->
						  <!--<el-form-item label="添加时间：">
						    <el-col :span="5">
						      <el-form-item prop="begTime">
    								<el-date-picker v-model="form.begTime" type="datetime" placeholder="选择开始日期时间" @change="searchTimeChange(1)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="5" style="padding-left:10px;">------------------</el-col>
						    <el-col :span="5">
						      <el-form-item prop="endTime">
									<el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束日期时间" @change="searchTimeChange(2)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>	-->
					  <el-form-item label="筛选时间：" prop="time">
						    <el-date-picker
						      v-model="time"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期">
						    </el-date-picker>
					  </el-form-item>						  
        <el-form-item>
          <!--<el-button class="el-icon el-icon-search" @click="onSubmit('1')">查询</el-button>-->
          <el-button class="el-icon el-icon-search" @click="searchClick">查询</el-button>
          <el-button type="text" @click="searchAllClick">查询全部记录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
        <!--<el-table-column prop="id" label="订单ID"></el-table-column>-->   
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="用户"></el-table-column>    
        <el-table-column prop="phone" label="注册手机"></el-table-column>    
        <el-table-column prop="privilegeName" label="获得特权"></el-table-column>    
        <el-table-column prop="price" label="金额"></el-table-column>
        <el-table-column prop="userType" label="特权类型" :formatter="typeStatus"></el-table-column>
        <el-table-column prop="createTime" label="购买时间"></el-table-column>    
        <el-table-column prop="useTime" label="使用时间"></el-table-column>    
        <el-table-column prop="status" :formatter="statusFormat" label="使用状态"></el-table-column>    
        <el-table-column prop="consume" label="消耗情况"></el-table-column>   
        <el-table-column prop="surplus" label="剩余"></el-table-column>   
      </el-table>
    </div>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="form.pageNum" 
					:page-size="form.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
  </section>
</template>

<script>
	import { firstList,userLog } from '@/api/right'
	import { parseTime } from '@/utils'
  export default{
    watch: {
      time(){
        if(this.time){
          if(this.time.length == 2 ){
            this.form.begTime = parseTime(this.time[0])
            this.form.endTime = parseTime(this.time[1])
          }
          
        }else{
          this.form.begTime = ''
          this.form.endTime = ''
        }
        
      }
    },	
    data(){
      return{
      	time: [],
      	totalSize: '',
      	currentPage: '',
        form: {
        	keyWord: '',
        	channelId: 1,
        	pageSize: 10,
        	pageNum: 1,
        	begTime: '',
        	endTime: '',
        	privilegeId: '',
        	userType: ''
        },
        data: [],
        dataklist : [],
        tqTypes: [
          {
            label: '等级',
            value: '1'
          },
          {
            label: '活动',
            value: '2'
          },
          {
            label: '赠送',
            value: '3'
          }, 
          {
            label: '购买',
            value: '4'
          }        
        ]
      }
    },
    methods:{
    	typeStatus (row) {
    		if (row.userType == '1') {
    			return "等级"
    		} else if (row.userType == '2') {
    			return '活动'
    		} else if (row.userType == '3') {
    			return '赠送'
    		} else if (row.userType == '4') {
    			return '购买'
    		}
    	},
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.searchClick()
      },
      searchClick () {
      	userLog(this.form).then(res =>{
      		this.data = res.data.data
      		this.totalSize = Number(res.data.totalRecordCount)
      	})      	
      },
      searchAllClick () {
      	this.form.keyWord = ''
      	this.form.privilegeId = ''
      	this.form.userType = ''
      	this.form.begTime = ''
      	this.form.endTime = ''
      	userLog(this.form).then(res =>{
      		this.data = res.data.data
      		this.totalSize = Number(res.data.totalRecordCount)
      	})        	
      },
      getFirstListId(){
				 firstList({channelId:1}).then(res => {
      		this.dataklist=res.data.data
				})
      },
      handleQuery(){},
      statusFormat(val){
      	let status = val.status
      	if(status == "1"){
      		return "已启用"
      	}else{
      		return "未启用"
      	}
      }

    },
    created(){
		this.getFirstListId()
    },   
    mounted(){
  		this.searchClick()
//		this.addFirstList()
    }
  }
</script>

<style scoped lang="scss">
.textr {
  text-align: right;
}

.textl {
  text-align: left;
}

.textc {
  text-align: center;
}

.m20 {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>