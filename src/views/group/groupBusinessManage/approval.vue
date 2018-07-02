<!--群主对进群邀请信息的审批-->
<template>
	<section>
		<!-- 筛选条件 -->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="群ID：" prop="crowdId">
							<el-input v-model.trim="searchForm.crowdId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
						</el-form-item>
						<el-form-item label="群名称：" prop="crowdName">
							<el-input v-model.trim="searchForm.crowdName" maxlength="8" clearable></el-input>
						</el-form-item>
						<el-form-item label="会员ID：" prop="mId">
							<el-input v-model.trim="searchForm.mId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
						</el-form-item>
						<!--<el-form-item label="会员名称：" prop="memberName">
							<el-input v-model="searchForm.memberName" clearable></el-input>
						</el-form-item>-->
						<el-form-item label="渠道：" prop="channelFlag">
							<el-radio-group v-model="searchForm.channelFlag">
								<el-radio-button label="0">全部</el-radio-button>
								<el-radio-button label="2">社交</el-radio-button>
								<el-radio-button label="1">电商</el-radio-button>
							</el-radio-group>
						</el-form-item>						
						
					</el-col>
					<el-col :span="12">

						<el-form-item label="快速查看：" prop="quickTime">
							<el-radio-group v-model="searchForm.quickTime" @change="searchTimeChange(1)">
								<el-radio-button label="0">全部</el-radio-button>
								<el-radio-button label="1">今天</el-radio-button>
								<el-radio-button label="2">昨天</el-radio-button>
								<el-radio-button label="3">最近七天</el-radio-button>
								<el-radio-button label="4">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="审核状态：" prop="statusFlag">
							<el-radio-group v-model="searchForm.statusFlag">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="0">待审核</el-radio-button>
								<el-radio-button label="1">已通过</el-radio-button>
								<el-radio-button label="2">已拒绝</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="添加时间：" prop="time">
							<el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>-->
					  <!--<el-form-item label="添加时间：">
					    <el-col :span="5">
					      <el-form-item prop="startTime">
					        <el-date-picker type="date" placeholder="选择开始日期" v-model="searchForm.startTime" style="width: 100%;"
					        	@change="searchTimeChange(2)" clearable></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="1" style="padding-left:10px;">-</el-col>
					    <el-col :span="5">
					      <el-form-item prop="endTime">
					        <el-date-picker type="date" placeholder="选择结束日期" v-model="searchForm.endTime" style="width: 100%;" @change="searchTimeChange(3)" clearable></el-date-picker>
					      </el-form-item>
					    </el-col>
					  </el-form-item>-->
						  <!--<el-form-item label="申请时间：">
						    <el-col :span="5">
						      <el-form-item prop="startTime">
    								<el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始日期时间" @change="searchTimeChange(2)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
						    <el-col :span="5">
						      <el-form-item prop="endTime">
									<el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束日期时间" @change="searchTimeChange(3)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>-->
						  <el-form-item label="申请时间：" prop="time">
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
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortFlag" @change="changeSortFlag">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span>当前选中{{chooseLen}}项</span>
				<!--<el-button type="success" icon="el-icon-more" @click="approvalDlsg=true">批量审核</el-button>-->
				<el-button type="success" icon="el-icon-more" @click="approvalListDlsg">批量审核</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="inviteId" label="编号"></el-table-column>
					<el-table-column prop="inviterMemberName" label="邀请人名称"></el-table-column>
					<el-table-column prop="inviteeMemberName" label="被邀请人名称"></el-table-column>
					<el-table-column prop="crowdId" label="群ID" width="170"></el-table-column>
					<!--<el-table-column prop="inviteReason" label="邀请理由"></el-table-column>-->
					<el-table-column prop="inviteTime" :formatter="formatterPlease" label="邀请时间"></el-table-column>
					<el-table-column prop="status"  :formatter="formatterStatus" label="审核状态"></el-table-column>
					<el-table-column prop="auditor" label="审核人"></el-table-column>
					<el-table-column prop="auditTime" :formatter="formatterAudi" label="审核时间"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="greeClick(scope.row)">通过</el-button>
							<el-button size="mini" type="text" @click="refuseClick(scope.row)">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="searchForm.pageNumber" 
					:page-size="searchForm.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
		<!--批量处理-->
		<el-dialog title="审核" width="30%" 
			:visible.sync="approvalDlsg">
			<el-form v-model="approvalForm"
				ref="approvalForm" label-width="140px">
				<div v-if="!isMany">
					<el-form-item prop="reason" label="申请原因：">
						<el-input v-model="approvalForm.reason"></el-input>
					</el-form-item>
					<el-form-item prop="tag" label="申请标签：">
						<el-input v-model="approvalForm.tag"></el-input>
					</el-form-item>
				</div>	
				
				<el-form-item prop="ps" label="备注：">
					<el-input v-model="approvalForm.ps"></el-input>
				</el-form-item>
				<el-form-item prop="action" label="操作">
					<el-select v-model="approvalForm.action">
						<el-option value="1" label="同意"></el-option>
						<el-option value="2" label="拒绝"></el-option>
					</el-select>
				</el-form-item>
				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<!--<el-button type="success" @click="agreeListClick">同意</el-button>
				<el-button type="danger" @click="refuseListClick">拒绝</el-button>-->
				<el-button type="success" @click="agreeAndrefuseClick">提交</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import { searchApproval,approval,refuse } from '@/api/group/business'
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
    		crowdId: '',//群id
    		crowdName: '',//群名称
    		mId: '',//会员ID
    		channelFlag: '0',//渠道标识0 1 2
    		statusFlag: '',//审核状态标识 0 1 2 3
    		quickTime: '0',//快速查看标识 0 1 2 3 4
    		startTime:'',
    		endTime: '',
    		sortFlag: '',//排序标识 1正序 2倒序
    	    pageSize: 10,
    	    pageNumber:1       
    	},
      agreeArray: [],
      agreeArrayList: [],
      refuseArray: [],
      mId: '',
      totalSize: '',
      chooseLen: 0,
      chooseLens: '',
      tableData: [{inviteId:'123'},{inviteId:'1256'},{inviteId:'454'},{inviteId:'5456'},{inviteId:'7878'},{inviteId:'96445'}],
      options: [
        {
          label: '正序',
          value: '0'
        },
        {
          label: '倒序',
          value: '1'
        }
      ],
      currentPage: 1,
      isMany: true,
      approvalDlsg: false,
      approvalForm: {
        ps: '',
        action: '',
        reason: '',
        tag: ''
      },
      inputNum: true
    }
  },
  methods: {
	inputNumCheck () {
		let reg = new RegExp(/^[0-9]*$/)
		if(!reg.test(this.searchForm.crowdId) || !reg.test(this.searchForm.mId)){
			this.inputNum = false
		}else{
			this.inputNum = true
		}
	},
	
    formatterStatus (row, column) {
    	if (row.status == '1') {
    			return "已通过"
    	} else if (row.status == '0') {
    			return '未处理'
    	} else if (row.status == '2'){
    		return '已拒绝'
    	}
    }, 	
    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
      if (flag === 1) {
      	this.time = []
        this.searchForm.startTime  = ''
        this.searchForm.endTime  = ''      	
      } else if (flag === 2) {
      	this.searchForm.quickTime = ''
      }
    },
  	// 邀请时间转换
  	formatterPlease (row, column) {
  	if (row.inviteTime) {
  		return parseTime(Number(row.inviteTime))
  	} else {
  		return ''
  	}
  	},
  	// 审核时间转换
  	formatterAudi (row, column) {
  	if (row.auditTime) {
  		return parseTime(Number(row.auditTime))
  	} else {
  		return ''
  	}
  	},
  	//批量审核按钮
  	approvalListDlsg(){
		if(this.chooseLen == 0){
			this.$message.warning('请至少选择一项！')
			return
		} else {
	  		for(let i=0;i<this.chooseLens.length;i++){
	  			if(this.chooseLens[i].status == '1' || this.chooseLens[i].status == '2'){
	  				this.$message.warning('选项中包含已处理信息，请重新选择！')
	  				return
	  			} else {
					this.approvalDlsg = true
	  			}
	  		}  					
		}  		
  	},
  	//单个通过
  	greeClick(row){
		if(row.status == '1'){
			this.$message.warning('当前状态已通过，请勿重复操作！')
			return
		} else if (row.status == '2') {
			this.$message.warning('当前状态为已拒绝，请勿重复处理！')
			return			
		} else {
	    	let obj = {}
	  		let agreeArray = []
			let WASCrowdNoticeDto  = {}
			WASCrowdNoticeDto.crowdId = row.crowdId
			WASCrowdNoticeDto.inviteeMemberId = row.inviteeMemberId
			WASCrowdNoticeDto.inviteId = row.inviteId
			WASCrowdNoticeDto.inviteTime = parseTime(Number(row.inviteTime))
			this.mId = '11111111'
			agreeArray.push(WASCrowdNoticeDto)
			obj.crowdNoticeDtos = agreeArray
			obj.mId = this.mId
	  		approval(obj).then(res => {
	  			//console.log(res)
	  			if(res.status == 200 && res.data.data == true){
					this.$message.success('操作成功！已通过！')
					this.search()	  				
	  			} else if (res.status == 500 && res.errorMsg == '同意失败') {
	  				this.$message.warning('操作失败！请检查当前状态是否为未处理！')
	  			}
	  		})   				
		}
  	},
  	//单个拒绝
  	refuseClick(row){
  		//console.log(row)
		if(row.status == '1'){
			this.$message.warning('当前状态已通过，请勿重复处理！')
			return
		} else if (row.status == '2') {
			this.$message.warning('当前状态为已拒绝，请勿重复操作！')
			return			
		} else {
			let obj = {}
			let inviteIds = []
			let WASCrowdNoticeDto  = {}
			WASCrowdNoticeDto.crowdId = row.crowdId
			WASCrowdNoticeDto.inviteeMemberId = row.inviteeMemberId
			this.mId = '11111111'
			inviteIds.push(WASCrowdNoticeDto)
			obj.crowdNoticeDtos = inviteIds
			obj.mId = this.mId
	  		refuse(obj).then(res => {
	  			//console.log(res)
	  			if(res.status == 200 && res.data.data == true){
					this.$message.success('操作成功！已拒绝！')
					this.search()	  				
	  			} else if (res.status == 500 && res.errorMsg == '同意失败') {
	  				this.$message.warning('操作失败！请检查当前状态是否为未处理！')
	  			}
	  		})   				
		}  		
  	},
  	//处理排序的正序倒序的传值
	changeSortFlag(val){
	//console.log(data)	
		this.searchForm.sortFlag =val
		this.search()
	},
  	//查找按钮
    search () {
    	if(this.inputNum == false){
    		this.$message.warning('ID类必须为数字')
    	}else{
    		searchApproval(this.searchForm).then(res => {
    			//console.log(res)
    			this.tableData = res.data
    			this.totalSize = Number(res.totalSize)
    		})
    	}
    },
    reset () {
    	this.searchForm.startTime = ''
    	this.searchForm.endTime = ''
    	this.searchForm.crowdId = ''
    	this.searchForm.crowdName = ''
    	this.searchForm.mId = ''
    	this.time = []
    	//this.searchForm.memberName = ''
    	this.searchForm.channelFlag = '0'
    	this.searchForm.quickTime = '0'
    	this.searchForm.statusFlag = ''
    	this.searchForm.sortFlag = '0'
    },
    
    //处理批量同意参数集合
    selectionChange(selection) {
  	//console.log(selection)
		  this.chooseLen = selection.length
		  this.chooseLens = selection
		  let agreeArray = []
		  this.refuseArray =[]
		  for(let i=0;i<selection.length;i++){
			let WASCrowdNoticeDto  = {}  
			WASCrowdNoticeDto.crowdId = selection[i].crowdId
			WASCrowdNoticeDto.inviteeMemberId = selection[i].inviteeMemberId
			WASCrowdNoticeDto.inviteId = selection[i].inviteId
			WASCrowdNoticeDto.inviteTime = parseTime(Number(selection[i].inviteTime))
			agreeArray.push(WASCrowdNoticeDto)
		}
			this.agreeArrayList = agreeArray
			
		  for(let k=0;k<selection.length;k++){
			let WASCrowdNoticeDto  = {}  
			WASCrowdNoticeDto.crowdId = selection[k].crowdId
			WASCrowdNoticeDto.inviteeMemberId = selection[k].inviteeMemberId
			this.refuseArray.push(WASCrowdNoticeDto)
		}
    },
    
    //分页
    handleCurrentChange(val) {
    	this.searchForm.pageNumber = val
    	this.search()
    },
     //批量同意或拒绝
    agreeAndrefuseClick() {
    	if(!this.approvalForm.ps || !this.approvalForm.action){
    		this.$message.warning('请填写备注并选择同意或拒绝！')
    		return
    	} else {
    		if(this.approvalForm.action == '1') {
		    	let obj = {}
		    	this.mId = '11111111'
		    	obj.mId = this.mId
		    	obj.crowdNoticeDtos = this.agreeArrayList
		    	approval(obj).then(res => {	
					//console.log(res)	
					if(res.data.data == true && res.status == 200){
						this.$message.success('批量同意成功！')
						this.approvalDlsg = false
						this.approvalForm = {}
						this.search()
					} else if(res.errorMsg == '同意失败' && res.status == 500){
						this.$message.error('批量同意失败，请刷新后重试')
					}
		    	})    			
    		} else if (this.approvalForm.action == '2'){
					let obj = {}
					this.mId = '11111111'
					obj.mId = this.mId
					obj.crowdNoticeDtos = this.refuseArray    			
			  		refuse(obj).then(res => {
			  			//console.log(res)
			  			if(res.status == '200' && res.data.data == true){
							this.$message.success('批量拒绝成功！')
							this.approvalDlsg = false
							this.approvalForm = {}
							this.search()	  				
			  			}else if(res.errorMsg == '修改失败' && res.status == 500){
			  				this.$message('批量拒绝失败，请刷新后重试')
			  			}
			  		})       			
    		}
    	}
	},
    //批量拒绝
//  refuseListClick() { 
//		let obj = {}
//		this.mId = '11111111'
//		obj.mId = this.mId
//		obj.inviteIds = this.refuseArray
// 		if(this.approvalForm.action == '2'){
//	  		refuse(obj).then(res => {
//	  			//console.log(res)
//	  			if(res.status == '200' && res.data.data == true){
//					this.$message('批量拒绝成功')
//					this.approvalDlsg = false
//					this.search()	  				
//	  			}else{
//	  				this.$message('批量拒绝失败，请刷新后重试')
//	  			}
//	  		})   				
//		}		
//  }
  },
  mounted () {
  	this.search()
  }
//components: {}
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