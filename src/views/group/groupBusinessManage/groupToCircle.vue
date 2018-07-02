<template>
	<section>
		<!-- 筛选条件 -->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
			<el-form-item label="渠道：" prop="channelType">
              <el-radio-group v-model="searchForm.channelType" @change="channelChange">
                <!--<el-radio-button label="">全部</el-radio-button>-->
                <el-radio-button label="1">电商</el-radio-button>
                <!--<el-radio-button label="2">社交</el-radio-button>-->
              </el-radio-group>
            </el-form-item>
			<el-form-item label="群ID：" prop="crowdId">
				<!--<el-input v-model="searchForm.crowdId" v-on:input="inputNumCheck" clearable maxlength="20"></el-input>-->
				<el-input v-model="searchForm.crowdId" v-on:input="inputNumCheck" clearable maxlength="19"></el-input>
			</el-form-item>
			<el-form-item label="群名称：" prop="crowdName">
				<el-input v-model="searchForm.crowdName" clearable maxlength="12"></el-input>
			</el-form-item>
			  <el-form-item label="申请时间：" prop="time">
				    <el-date-picker
				      v-model="time"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']"
				      @change="searchTimeChange(1)">
				    </el-date-picker>
			  </el-form-item>
		</el-col>
					<el-col :span="12">
						<el-form-item label="快速查看：" prop="quickTime">
							<el-radio-group v-model="searchForm.quickTime" @change="searchTimeChange(3)">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="0">今天</el-radio-button>
								<el-radio-button label="1">昨天</el-radio-button>
								<el-radio-button label="7">最近七天</el-radio-button>
								<el-radio-button label="30">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="审核方式：" prop="flowType">
							<el-radio-group v-model="searchForm.flowType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">系统自动审核</el-radio-button>
								<el-radio-button label="2">后台审核</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="创建方式：" prop="createdType">
							<el-radio-group v-model="searchForm.createdType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">会员自建</el-radio-button>
								<el-radio-button label="2">滤镜筛选</el-radio-button>
							</el-radio-group>
						</el-form-item>-->
						<el-form-item label="群类型：" prop="createdType" v-if="searchForm.channelType === '1'">
							<el-radio-group v-model="searchForm.createdType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1" >普通群</el-radio-button>
								<el-radio-button label="2">滤镜群</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="群类型：" prop="createdType" v-if="searchForm.channelType === '2'">
							<el-radio-group v-model="searchForm.createdType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1" >普通群</el-radio-button>
							</el-radio-group>
			            </el-form-item>
						<el-form-item label="审核状态：" prop="auditStatus">
							<el-radio-group v-model="searchForm.auditStatus">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="3">待审核</el-radio-button>
								<el-radio-button label="1">已通过</el-radio-button>
								<el-radio-button label="2">已拒绝</el-radio-button>
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
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortFlag" prop="sortFlag" @change="sortChange">
					<el-option v-for="item in optionsSort" :key="item.parmKey" :label="item.parmVal" :value="item.parmKey">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="success" icon="el-icon-more"  @click="review">批量审核</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="channelType" label="渠道" width="80" :formatter="channelFormat"></el-table-column>
					<el-table-column prop="crowdId" label="群ID" width="170"></el-table-column>
					<el-table-column prop="createdType" label="群类型" width="90" :formatter="createdTypeFormat"></el-table-column>
					<el-table-column prop="crowdName" label="群名称"></el-table-column>
					<el-table-column prop="membersTotal" label="群人数"></el-table-column>
					<el-table-column prop="activeVal" label="群活跃度"></el-table-column>
					<el-table-column prop="energyVal" label="群能量值"></el-table-column>
					<el-table-column prop="applicantId" label="申请人ID"></el-table-column>
					<el-table-column prop="applicantName" label="申请人名称"></el-table-column>
					<el-table-column prop="circleLable" label="标签" width="80"></el-table-column>
					<el-table-column prop="usedPrivilege" label="是否使用群升级圈特权" :formatter="usedFormat" width="100"></el-table-column>
					<el-table-column prop="created" label="申请时间" width="170"></el-table-column>
					<el-table-column prop="auditStatus" :formatter="statusFormat" label="审核状态" width="80"></el-table-column>
					<el-table-column prop="lastUpd" label="审核时间" width="170"></el-table-column>
					<el-table-column prop="auditorName" label="审核人" width="80"></el-table-column>
					<el-table-column label="审核管理">
						<template slot-scope="scope">
							<el-button type="text" size="mini" @click="manage(scope.row)">管理</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="searchForm.pageNum"
					:page-size="searchForm.pageSize"
					layout="total, prev, pager, next"
					:total="totalSize">
				</el-pagination>
			</div>

			<!--批量审核弹框-->
		<el-dialog title="审核" width="30%"
			:visible.sync="approvalDlsg">
			<el-form v-model="approvalForm"
				ref="approvalForm" label-width="140px">
				<!--<el-form-item prop="remark" label="备注：">
					<el-input v-model.trim="approvalForm.remark" maxlength="20" clearable></el-input>
				</el-form-item>-->
				<el-form-item prop="auditStatus" label="操作：">
					<el-select v-model="approvalForm.auditStatus" @change="changeSelect">
						<el-option value="1" label="同意"></el-option>
						<el-option value="2" label="拒绝"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="approvalForm.auditStatus == '2'" prop="rejectCause"  label="拒绝理由（必填）：">
					<el-input v-model="approvalForm.rejectCause" :disabled="disabled"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<!--<el-button type="success" @click="agree">同意</el-button>
				<el-button type="danger" @click="refuse">拒绝</el-button>-->
				<el-button type="success" @click="affirm">确认操作</el-button>
			</span>
		</el-dialog>


		<!--单个通过拒绝弹框-->
				<el-dialog title="审核" width="25%"
			:visible.sync="singleDlsg">
			<el-form v-model="singleList"
				ref="singleList" label-width="140px">
				<div>
					<el-form-item prop="reason" label="申请原因：">
						<el-input disabled v-model="singleList.reason"></el-input>
					</el-form-item>
					<el-form-item prop="circleLable" label="申请标签：">
						<el-input  disabled v-model="singleList.circleLable"></el-input>
					</el-form-item>
				</div>

				<!--<el-form-item prop="remark" label="备注：">
					<el-input v-model.trim="singleList.remark" maxlength="20" clearable></el-input>
				</el-form-item>-->
				<el-form-item prop="auditStatus" label="操作">
					<el-select v-model="singleList.auditStatus" @change="singleSelect">
						<el-option value="1" label="同意"></el-option>
						<el-option value="2" label="拒绝"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="singleList.auditStatus == '2'" prop="rejectCause"  label="拒绝理由（必填）：">
					<el-input v-model="singleList.rejectCause" :disabled="singleDis"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<!--<el-button type="success" @click="singleAgree">同意</el-button>
				<el-button type="danger" @click="singleRefuse">拒绝</el-button>-->
				<el-button type="success" @click="singleAffirm">确认操作</el-button>
			</span>
		</el-dialog>

		<!--群升级圈失败数据的弹框-->
		<el-dialog title="导入失败的数据" :visible.sync="dialogTableVisible" width="20%">
			<el-table :data="falseForm">
				<el-table-column prop="crowdId" label="群ID" width="200"></el-table-column>
				<el-table-column prop="crowdName" label="群名称" width="160"></el-table-column>
			</el-table>
		</el-dialog>

	</section>
</template>

<script>
//========查找渲染列表==单个YN===批量YN====排序=====按排序条件刷新列表
  import { getToCircle,singleAr,batchAr,querySort,SortList } from '@/api/group/info'
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
      falseForm: [],
      dialogTableVisible: false,
    	//保存通过或拒绝时的状态值
      auditStatus: '',
      totalSize: '',
      currentPage: 1,
      disabled: true,
      singleDis: true,
      searchForm: {
      	//渠道类型
      	channelType: '',
      	//进群方式
      	createdType: '',
      	quickTime: '',
      	//群编号
      	crowdId: '',
      	//开始时间
      	startTime: '',
      	//结束时间
      	endTime: '',
      	//审核方式 1-申请升级  2-自动升级
      	flowType: '',
      	//审核状态 0待审核 1已通过   2已拒绝
      	auditStatus: '',
      	//群id
      	crowdId: '',
      	//群名称
      	crowdName: '',
      	//天数
      	dayNumber: '',
      	pageNum: 1,
      	pageSize: 10,
      	userId: '12212121',
      	//排序方式 1按时间 2按群人数（默认时间）
      	sortFlag: ''
      },
      chooseLens: [],
      chooseLen: 0,
      tableData: [{appId:'21212121212'}],
      optionsSort: [
        {
          parmKey: '',
          parmVal: ''
        }
      ],
      singleDlsg: false,
      approvalDlsg: false,
      approvalForm: {
        rejectCause: '',
        auditStatus: '',
        remark: 'mabaoyu'
      },
      approvalArr:[],
      singleList: {
      	flowId: '',
      	auditor: '',
      	appId: '',
      	crowdId: '',
      	reason: '',
      	//拒绝理由
      	rejectCause: '',
      	//备注
      	remark: 'mabaoyu',
      	auditStatus: '',
      	circleLable:'',
      	channelType: '',
      	inputNum: true
      }
    }
  },

  methods: {
	inputNumCheck () {
		let reg = new RegExp(/^[0-9]*$/)
		if(!reg.test(this.searchForm.crowdId)){
			this.inputNum = false
		}else{
			this.inputNum = true
		}
	},

  	channelChange (val) {
  		if(val == ''){
  			this.searchForm.createdType = ''
  		}
  	},
  	//页面刷新，排序列表渲染
  	handleQuery(){
  		querySort({parmCategory:'crowdtocircle.sortFlag'}).then(res => {
  			//console.log(res)
  			this.optionsSort = res.data
  		})
  	},
    //列表中群类型过滤
    createdTypeFormat (row){
      if(row.createdType === 1){
        return '普通群'
      }else if(row.createdType === 2){
        return '滤镜群'
      }
    },
    // 列表中渠道项过滤
    channelFormat(row){
      if(row.channelType === 1){
        return '电商'
      }else if(row.channelType === 2){
        return '社交'
      }
    },

    // 列表中特权是否使用过滤
    usedFormat(row){
      if(row.usedPrivilege === 0){
        return '否'
      }else if(row.usedPrivilege === 1){
        return '是'
      }
    },

  	//排序下拉框中选值的改变
  	sortChange (val) {
  		//console.log(val)
		this.searchForm.sortFlag = val
		SortList(this.searchForm).then(res => {
			//console.log(res)
			this.tableData = res.data
			this.search()
		})
  	},

  	//查找按钮
    search() {
		if(this.inputNum == false){
		    this.$message.warning('ID类的必须为数字！')
		}else{
			getToCircle(this.searchForm).then(res =>{
				//console.log(res)
				this.tableData = res.data
				this.totalSize = Number(res.totalSize)
			})
		}

    },


    //批量弹框判断审核通过还是拒绝
    changeSelect (val) {
    	this.approvalForm.auditStatus = val
    	if(val == 2){
    		//拒绝--文本框不禁用
    		this.disabled = false
    	}else if(val == 1){
    		//通过--文本框禁用
    		this.disabled = true
    	}
    },

    //批量审核按钮
    review () {
	  if(this.chooseLen === 0){
        this.$message.warning('请选择需要批量审核的数据！')
        return
      }else{
      	for(let i=0;i<this.chooseLens.length;i++){
      		if(this.chooseLens[i].auditStatus == 1 || this.chooseLens[i].auditStatus == 2){
      			this.$message.warning('选项中有已处理数据，请重新选择！')
      			return
      		}
      	}
        this.approvalDlsg = true
      }
    },

    //勾选框的数据过滤
    selectionChange(selection) {
//  	console.log(selection)
    	this.chooseLens = selection
    	this.approvalArr = []
    	this.chooseLen = selection.length
    	for(let i=0;i<selection.length;i++){
    		let FlCrowdToCircleApplicationsDto = {}
    		FlCrowdToCircleApplicationsDto.flowId = selection[i].flowId
    		FlCrowdToCircleApplicationsDto.appId = selection[i].appId
    		FlCrowdToCircleApplicationsDto.auditor = selection[i].auditor
    		FlCrowdToCircleApplicationsDto.crowdId = selection[i].crowdId
    		FlCrowdToCircleApplicationsDto.circleLable = selection[i].circleLable
    		FlCrowdToCircleApplicationsDto.channelType = selection[i].channelType
    		FlCrowdToCircleApplicationsDto.crowdName = selection[i].crowdName
    		this.approvalArr.push(FlCrowdToCircleApplicationsDto)
    	}
    },

    //批量审核的确认
    affirm () {
    	//console.log(this.approvalArr)
		for(let i = 0; i < this.approvalArr.length;i++){
			this.approvalArr[i].rejectCause = this.approvalForm.rejectCause;
			this.approvalArr[i].auditStatus = this.approvalForm.auditStatus;
			this.approvalArr[i].remark = 'mabaoyu';
		}
		if(!this.approvalForm.auditStatus){
			this.$message.warning('请填写完整数据')
			return
		}else if(this.approvalForm.auditStatus == 2){
			if(this.approvalForm.rejectCause == ''){
				this.$message.warning('请填写拒绝原因')
				return
			}
		}
		batchAr(this.approvalArr).then(res => {
			if(res.data.length == 0){
				this.$message.success('批量操作成功！')
				this.approvalDlsg = false
				this.search()
			}else if(res.data.length != 0){
					this.approvalDlsg = false
					this.falseForm = res.data
					this.dialogTableVisible = true
				}
		})
    	this.approvalForm = {
    		rejectCause: '',
    		auditStatus: '',
    	}
    },

    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
//    if (flag === 1) {
//    	this.searchForm.quickTime = ''
//      this.searchForm.startTime  =  parseTime(this.searchForm.startTime)
//    } else if (flag === 2) {
//    	this.searchForm.quickTime = ''
//      this.searchForm.endTime  = parseTime(this.searchForm.endTime)
//    } else if (flag === 3) {
//    	//    	this.searchForm.addTime1 = parseTime(this.searchForm.addTime1)
//      this.searchForm.startTime  =  ''
//      this.searchForm.endTime  = ''
//    }
      if (flag === 1) {
      	this.searchForm.quickTime = ''
      } else if (flag === 3) {
      	//    	this.searchForm.addTime1 = parseTime(this.searchForm.addTime1)
      	this.time = []
        this.searchForm.startTime  =  ''
        this.searchForm.endTime  = ''
      }
    },


    //单个通过拒绝弹框判断审核通过还是拒绝
    singleSelect(val){
    	this.singleList.auditStatus = val
    	if(val == 2){
    		this.singleDis = false
    	}else{
    		this.singleDis = true
    	}
    },

    //单个通过拒绝的确认按钮
    singleAffirm () {
    	if(this.singleList.auditStatus == ''){
			this.$message.warning('请填写完整数据')
			return false
    	}else if(this.singleList.auditStatus == 2 && !this.singleList.rejectCause){
			this.$message.warning('拒绝理由不能为空！')
			return  false
    	}else{
			singleAr(this.singleList).then(res => {
				if(res.data == true && res.status == '200'){
					this.$message.success('操作成功')
					this.singleDlsg =false
					this.search()
					this.singleList = {}
				}else if(res.status == '500'){
					this.$message.warning('系统操作失败！暂不能升级为圈！')
					this.singleDlsg =false
				}
			})
    	}
    },

    //管理按钮
    manage (row) {
//    	console.log(row)
    	//弹框出现
    	if(row.auditStatus != 3){
    		this.$message.error('请检查审核状态！')
    		return false
    	}else{
			this.singleDlsg = true
			this.singleList.flowId = row.flowId
			this.singleList.auditor = row.auditor
			this.singleList.appId = row.appId
			this.singleList.crowdId = row.crowdId
			this.singleList.reason = row.reason
			this.singleList.circleLable = row.circleLable
			this.singleList.channelType = row.channelType
    	}
    },


    //列表中审核状态的动态修改
    statusFormat(row){
      if(row.auditStatus === 3){
        return '待审核'
      }else if(row.auditStatus === 1){
        return '已通过'
      }else if(row.auditStatus === 2){
        return '已拒绝'
      }
    },
    reset () {
    	this.searchForm.channelType = ''
    	this.searchForm.crowdId = ''
    	this.searchForm.crowdName = ''
    	this.time = []
    	this.searchForm.startTime = ''
    	this.searchForm.endTime = ''
    	this.searchForm.quickTime = ''
    	this.searchForm.flowType = ''
    	this.searchForm.auditStatus = ''
    	this.searchForm.createdType = ''

    },


    handleCurrentChange(val) {
    	this.searchForm.pageNum = val
    	this.search()
    }

  },
    mounted(){
  		this.handleQuery()
  		this.search()
    },
  components: {}
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
