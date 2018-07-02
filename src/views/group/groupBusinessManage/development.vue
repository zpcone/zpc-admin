<template>
	<section>
		<!-- 筛选条件 -->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="24">
				        <div style="float: right;margin-right: 30px;">
				        	<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
				        </div>					
					</el-col>
					<el-col :span="12">
						<el-form-item label="群ID：" prop="crowdId">
							<el-input v-model="searchForm.crowdId" disabled></el-input>
						</el-form-item>
						<el-form-item label="群名称：" prop="crowdName">
							<el-input v-model="searchForm.crowdName" disabled></el-input>
						</el-form-item>
						<el-form-item label="会员ID：" prop="mId">
							<!--<el-input v-model="searchForm.mId" type="number" :min="0" :max="0"></el-input>-->
							<el-input v-model.trim="searchForm.mId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
						</el-form-item>
						<!--<el-form-item label="会员名称：" prop="memberName">
							<el-input v-model="searchForm.memberName"></el-input>
						</el-form-item>-->
						
					</el-col>
					<el-col :span="12">
						<el-form-item label="快速查看：" prop="quickTime">
							<el-radio-group v-model="searchForm.quickTime" @change="searchTimeChange(1)">
								<el-radio-button label="0" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">今天</el-radio-button>
								<el-radio-button label="2" value="">昨天</el-radio-button>
								<el-radio-button label="3" value="">最近七天</el-radio-button>
								<el-radio-button label="4" value="">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="类别：" prop="dynamicType">
							<el-radio-group v-model="searchForm.dynamicType">
								<!--<el-radio-button label="0">全部</el-radio-button>-->
								<el-radio-button label="1">入群信息</el-radio-button>
								<el-radio-button label="2">退群信息</el-radio-button>
								<el-radio-button label="3">群务信息</el-radio-button>
								<el-radio-button label="4">角色升级</el-radio-button>
								<el-radio-button label="5">群主转让</el-radio-button>
								<el-radio-button label="6">特权信息</el-radio-button>
								<el-radio-button label="7">审核信息</el-radio-button>
								<el-radio-button label="8">邀请信息</el-radio-button>
								<el-radio-button label="9">被邀信息</el-radio-button>
							</el-radio-group>
						</el-form-item>
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
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<!--<span>排序：</span>-->
				<!--<el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span>当前选中{{chooseLen}}项</span>
				<!--<el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal('删除')">删除</el-button>-->
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="msgId" label="编号"></el-table-column>
					<el-table-column prop="msgType" label="类别" :formatter="typesSreening"></el-table-column>
					<el-table-column prop="message" label="内容"></el-table-column>
					<el-table-column prop="msgDatetime" label="时间"></el-table-column>
				</el-table>
			</div>
			<!--<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="searchForm.pageNumber" 
					:page-size="searchForm.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>-->
		<!--<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>-->
	</section>
</template>

<script>
//import confirmModal from '../components/confirmModal'
import { searchDevelop } from '@/api/group/business'
import { parseTime } from '@/utils'
export default {
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.startTime = parseTime(this.time[0])
            this.searchForm.endTime = parseTime(this.time[1])
          }
          
        }else{
          this.searchForm.startTime = ''
          this.searchForm.endTime = ''
        }
        
      }
    },	
  data() {
    return {
      time: [],
      searchForm: {
      	//crowdId: '2428188264222818304',
//    	crowdId: '2450989058336710656',
      	crowdId: '',
      	crowdName: '',
      	mId: '',
      	memberName: '',
      	//快速查看标识
      	quickTime: '0',
      	//动态类别
      	dynamicType: '0',
      	pageNumber: 1,
      	pageSize: 10,
      	startTime: '',
      	endTime: ''
      },
      chooseLen: 0,
      tableData: [],
      //totalSize: '',
      //currentPage: 1,
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        }
      ],
      isSocialContact: true,
      channelId: '',
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
		if(!reg.test(this.searchForm.mId)){
			this.inputNum = false
		}else{
			this.inputNum = true
		}
	},
	backClick () {
		this.$router.push({
			path: '/group/manage/info/detail',
			query:{
		          crowdId: this.searchForm.crowdId,
		          isSocialContact: this.isSocialContact,
		          channelId: this.channelId,
		          isViewOrManage: '2'
			}
		})
	},
	
  	//查找按钮
    search() {
    	if(!this.searchForm.crowdId) {
    		this.$message.warning('查找失败，群ID必填！')
    	} else if(this.searchForm.crowdId) {
    		if(this.inputNum == false){
    			this.$message.warning('会员ID必须为数字！')
    		}else{
    			searchDevelop(this.searchForm).then(res => {
    				//console.log(res)
    				this.tableData = res .data
    				//this.totalSize = Number(res.totalSize)
    			})
    		}
    	}
    },
    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
      if (flag === 1) {
      	this.time =[]
        this.searchForm.startTime  = ''
        this.searchForm.endTime  = ''      	
      } else if (flag === 2) {
      	this.searchForm.quickTime = ''
      }
    },
    //类别筛选
    typesSreening (row) {
      if(row.msgType === '1'){
        return '入群信息'
      }else if(row.msgType === '2'){
        return '退群信息'
      }else if(row.msgType === '3'){
        return '群务信息'
      }else if(row.msgType === '4'){
        return '角色升级'
      }else if(row.msgType === '5'){
        return '群主转让'
      }else if(row.msgType === '6'){
        return '特权信息'
      } 
    },
    reset () {
//  	this.searchForm.crowdId = ''
//  	this.searchForm.crowdName = ''
    	this.searchForm.mId  = ''
    	this.searchForm.memberName = ''
    	this.searchForm.quickTime = '0'
    	this.searchForm.dynamicType = 0
    	this.searchForm.startTime = ''
    	this.searchForm.endTime = ''
    	this.time = []
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    
    //处理分页
    handleCurrentChange(val) {
        this.searchForm.pageNumber = val
        this.search()    	
    },
	handleQuery(){
	  	let query = this.$router.currentRoute.query
	  	this.searchForm.crowdId = query.crowdId
	  	this.searchForm.crowdName = query.crowdName
	  	this.channelId = query.channelId
	  	this.search()
	},
  },
  mounted () {
	this.handleQuery()
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