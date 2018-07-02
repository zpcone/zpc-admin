<template>
	<section>
		<!-- 筛选条件 -->
			<el-form class="" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="24">
				        <div style="float: right;margin-right: 30px;">
				        	<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
				        </div>	
					</el-col>
					<el-col :span="12">
						<el-form-item label="圈ID：" prop="id">
							<el-input v-model="searchForm.id" disabled></el-input>
						</el-form-item>
						<el-form-item label="圈名称：" prop="circleName">
							<el-input v-model="searchForm.circleName" disabled></el-input>
						</el-form-item>
						<el-form-item label="会员ID：" prop="circleId2">
							<!--<el-input type="number" v-model="searchForm.circleId2" :min="0"></el-input>-->
							<el-input v-model.trim="searchForm.circleId2" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="12">
						<el-form-item label="会员名称：" prop="memberName">
							<el-input v-model="searchForm.memberName" maxlength="10" clearable></el-input>
						</el-form-item>
						<el-form-item label="快速查看：" prop="quick">
							<el-radio-group v-model="searchForm.quick" @change="searchTimeChange(1)">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">今天</el-radio-button>
								<el-radio-button label="2" value="">昨天</el-radio-button>
								<el-radio-button label="3" value="">最近七天</el-radio-button>
								<el-radio-button label="4" value="">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>

						<!--<el-form-item label="添加时间：" prop="created">
							<el-date-picker v-model="searchForm.created" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>-->
						  <!--<el-form-item label="添加时间：">
						    <el-col :span="5">
						      <el-form-item prop="addTime1">
    								<el-date-picker v-model="searchForm.addTime1" type="datetime" placeholder="选择开始日期时间" @change="searchTimeChange(2)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
						    <el-col :span="5">
						      <el-form-item prop="addTime2">
									<el-date-picker v-model="searchForm.addTime2" type="datetime" placeholder="选择结束日期时间" @change="searchTimeChange(3)" :default-time="['','23:59:59']"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>-->
					  <el-form-item label="筛选时间：" prop="time">
						    <el-date-picker
						      v-model="time"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']"
						      @change="searchTimeChange(2)">
						    </el-date-picker>
					  </el-form-item>	
					  
					</el-col>
					<el-col :span="24">
						<el-form-item label="类别：" prop="logType">
							<el-radio-group v-model="searchForm.logType">
								<!--<el-radio-button label="全部" value="1"></el-radio-button>-->
								<el-radio-button label="1" value="">入圈信息</el-radio-button>
								<el-radio-button label="2" value="">退圈信息</el-radio-button>
								<el-radio-button label="3" value="">角色改变</el-radio-button>
								<el-radio-button label="4" value="">黑名单信息</el-radio-button>
								<el-radio-button label="5" value="">警告信息</el-radio-button>
								<el-radio-button label="6" value="">选拔PK</el-radio-button>
								<el-radio-button label="7" value="">圈务信息</el-radio-button>
								<el-radio-button label="8" value="">连坐机制</el-radio-button>
								<el-radio-button label="9" value="">能量值信息</el-radio-button>
								<el-radio-button label="10" value="">圈主转让</el-radio-button>
								<el-radio-button label="11" value="">邀请信息</el-radio-button>
								<el-radio-button label="12" value="">被邀信息</el-radio-button>
								<el-radio-button label="13" value="">特权信息</el-radio-button>
							</el-radio-group>
						</el-form-item>						
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>圈动态记录：</span>
				<!--<el-select placeholder="请选择" v-model="searchForm.sort" @change="sortChange">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span style="display: inline-block;margin-right: 20px;">当前选中{{chooseLen}}项</span>
				<el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal('删除')">删除</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%" :default-sort="{prop: 'created', order: 'descending'}">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="circleId" label="编号"></el-table-column>
					<el-table-column prop="logType" label="类别" :formatter="logFormat"></el-table-column>
					<el-table-column prop="content" label="内容"></el-table-column>
					<el-table-column prop="created" label="时间" sortable></el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="searchForm.pageNum" 
					:page-size="searchForm.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
		<!--<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>-->
	</section>
</template>

<script>
//import confirmModal from '../components/confirmModal'
import { searchDevelop,deleteDevelop,sortDevelop } from '@/api/circle/business'
import { parseTime } from '@/utils'
export default {
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.addTime1 = parseTime(this.time[0])
            this.searchForm.addTime2 = parseTime(this.time[1])
          }
          
        }else{
          this.searchForm.addTime1 = ''
          this.searchForm.addTime2 = ''
        }
      }
    },	
  data() {
    return {
      time: [],
      totalSize: '',
      currentPage: 1,
      channelType: '',
      inputValue: '',
      quick: '',
      searchForm: {
      	id: '',
      	circleName: '',
        quick: '',
        addTime1: '',
        addTime2: '',
        circleId2: '',
        memberName: '',
        logType: '', 
        pageNum: 1,
        pageSize: 10
      },
      chooseLen: 0,
      chooseSelection: [],
      tableData: [{id:'1111'}],
      currentPage: 2,
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        },
        {
          label: '按时间由远及近',
          value: '2'
        }        
      ],
      inputNum: true
//    confirmSetting: {
//      name: '',
//      title: '',
//      show: false
//    }
    }
  },
  methods: {
	inputNumCheck () {
		let reg = new RegExp(/^[0-9]*$/)
		if(!reg.test(this.searchForm.circleId2)){
			this.inputNum = false
		}else{
			this.inputNum = true
		}
	},
	backClick () {
		this.$router.push({
			path: '/circlemanage/manage/info/detail',
			query:{
				id: this.searchForm.id,
				channelType: this.channelType,
				channelName: this.searchForm.circleName
			}
		})
	},
    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
      if (flag === 1) {
      	this.time = []
        this.searchForm.addTime1  = ''
        this.searchForm.addTime2  = ''      	
      } else if (flag === 2) {
      	this.searchForm.qick = ''
      }
    },
    search () {
    	if(this.inputNum == false){
    		this.$message.warning('会员ID必须为数字！')
    	}else{
    		searchDevelop (this.searchForm).then(res => {
    			this.tableData = res.data
    			this.totalSize = Number(res.totalSize)
    		})
    	}
    },
    
    logFormat(row){
      if(row.logType === 1){
        return '入圈信息'
      }else if(row.logType === 2){
        return '退圈信息'
      }else if(row.logType === 3){
        return '角色升级信息'
      }else if(row.logType === 4){
        return '黑名单信息'
      }else if(row.logType === 5){
        return '警告信息'
      }else if(row.logType === 6){
        return '选拔PK'
      }else if(row.logType === 7){
        return '圈务信息'
      }else if(row.logType === 8){
        return '连坐机制'
      }else if(row.logType === 9){
        return '能量值信息'
      }else if(row.logType === 10){
        return '圈主转让'
      }else if(row.logType === 11){
        return '邀请信息'
      }else if(row.logType === 12){
        return '被邀信息'
      }else if(row.logType === 13){
        return '特权信息'
      } 
    },
   
    reset () {
    	this.searchForm.quick = ''
    	this.searchForm.addTime1 = ''
    	this.searchForm.addTime2 = ''
    	this.searchForm.circleId2 = ''
    	this.searchForm.memberName = ''
    	this.searchForm.logType = ''
    	this.time = []
    },
    selectionChange(selection) {
    	//console.log(selection)
      this.chooseLen = selection.length
      this.chooseSelection = selection
    },
    checkChoose(){
      // 已选择的 逻辑处理在这
      let len = this.chooseSelection.length
      if(len === 0){
        this.$message.warning('请至少选择一项')
        return false
      }else{
        return true
      }
    },
    handleCurrentChange (val) {
    	this.searchForm.pageNum = val
    	this.search()
    },
    openConfirmModal(title) {
      if(this.checkChoose()){
	        let str = ''
	        let arr = []
	        for(let i=0,len=this.chooseSelection.length;i<len;i++){
	          arr.push(this.chooseSelection[i].id)
	        }
	        str = arr.join(',')
	        str = '您确定要删除动态'+ str + '吗？'
	        let jsonData = arr
	        this.$confirm(str,'删除',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          // 点击确定
	          deleteDevelop({ids:jsonData}).then(res => {
		          	if(res.status == '200'){
		          		this.$message.success('删除成功！')
		          		this.search()
		          	}else{
		          		this.$message.warning('操作失败，请刷新后重试！')
		          	}
	          })
	        }).catch(() => {
	          // 点击取消
	        })				
		}
    },
    //排序值改变
    sortChange (val) {
//  	this.sort = val
//  	this.search()
//  	sortDevelop({
//  		quick: this.quick,
//  		pageNum: 1,
//  		pageSize: 10
//  	}).then(res => {
//			this.tableData = []
//			this.tableData = res.data
//  	})
    },
    
    handelQuery () {
		let query = this.$router.currentRoute.query
		this.searchForm.id = query.id 
		this.searchForm.circleName = query.name 
		this.channelType = query.channelType
		this.search()
		//this.searchForm.channelType = query.channelType 
    }
//  confirmOk() {
//    this.$message.success('删除成功')
//    console.log('**删除')
//  }
  },
	mounted () {
		this.handelQuery()
	}
//components: {
//  confirmModal
//}
}
</script>

<style scoped>
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
</style>