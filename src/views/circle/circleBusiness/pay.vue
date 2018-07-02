<template>
	<section>
		<!-- 筛选条件 -->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="渠道：" prop="channelType">
							<el-radio-group v-model="searchForm.channelType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">电商</el-radio-button>
								<el-radio-button label="2">社交</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="圈ID：" prop="groupid">
							<el-input v-model="searchForm.groupid"></el-input>
						</el-form-item>-->
						<el-form-item label="圈层级：">
								<el-row>
									<el-col :span="5" prop="minHierarchy">
										<el-input clearable v-model="searchForm.minHierarchy"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="5" prop="maxHierarchy">
										<el-input clearable v-model="searchForm.maxHierarchy"></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="申请时间：" prop="applyTime">
							<el-date-picker v-model="searchForm.applyTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" clearable>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="快速查看：" prop="applyTime">
							<el-radio-group v-model="searchForm.applyTime">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">今天</el-radio-button>
								<el-radio-button label="2" value="">昨天</el-radio-button>
								<el-radio-button label="3" value="">最近七天</el-radio-button>
								<el-radio-button label="4" value="">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="类别：" prop="sep">
							<el-radio-group v-model="searchForm.sep">
								<el-radio-button label="全部" value="1"></el-radio-button>
								<el-radio-button label="入群信息" value="2"></el-radio-button>
								<el-radio-button label="退群信息" value="3"></el-radio-button>
								<el-radio-button label="群务信息" value="4"></el-radio-button>
								<el-radio-button label="角色升级" value="5"></el-radio-button>
								<el-radio-button label="群主转让" value="6"></el-radio-button>
							</el-radio-group>
						</el-form-item>-->
						<el-form-item label="审核状态：" prop="Status2">
							<el-radio-group v-model="searchForm.status2">
								<el-radio-button label="0" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">待审核</el-radio-button>
								<el-radio-button label="2" value="">已通过</el-radio-button>
								<el-radio-button label="3" value="">已拒绝</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="圈ID：" prop="circleId">
							<el-row>
								<el-col :span="12">
									<el-input v-model="searchForm.circleId" placeholder="请选择输入圈ID" style="width:50%" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>	
						<el-form-item label="圈名称：" prop="circleName">
							<el-row>
								<el-col :span="12">
									<el-input v-model="searchForm.circleName" placeholder="请选择输入圈名称" style="width:50%" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>							
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="info" icon="el-icon-setting" @click="resetClick">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>列表排序：</span>
				<el-select placeholder="请选择" v-model="applyTime" @change="sortChange" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="channelType" label="渠道" :formatter="channelStatus"></el-table-column>
					<el-table-column prop="circleId" label="圈ID"></el-table-column>
					<el-table-column prop="circleName" label="圈名称"></el-table-column>
					<el-table-column prop="Hierarchy" label="圈层级"></el-table-column>
					<el-table-column prop="" label="圈标签"></el-table-column>
					<el-table-column prop="buyMidName" label="购买申请人名称"></el-table-column>
					<el-table-column prop="buyRole" label="申请人角色"></el-table-column>
					<el-table-column prop="productId" label="申请购买物品"></el-table-column>
					<el-table-column prop="buyReason" label="申请理由"></el-table-column>
					<el-table-column prop="applyTime" label="申请时间" width="165"></el-table-column>
					<el-table-column prop="status" label="审核状态"></el-table-column>
					<el-table-column prop="circleName" label="审核状态">
						<template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					        	<!--鼠标经过中显示的字-->
					          <p>拒绝理由: {{ scope.row.circleName }}</p>
					          <div slot="reference" class="name-wrapper">
					          	<!--表格中显示的字-->
					            <el-tag size="medium">{{ scope.row.circleName }}</el-tag>
					          </div>
					        </el-popover>
				      </template>
					</el-table-column>					
					<el-table-column prop="" label="审核人"></el-table-column>
					<el-table-column prop="auditRole" label="审核人角色"></el-table-column>
					<el-table-column prop="auditTime" label="审核时间" width="165"></el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="searchForm.pageNum" 
					:page-size="searchForm.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
		
		<el-dialog title="审核" :visible.sync="approvalDlsg" width="30%">
			<el-form v-model="approvalForm" ref="approvalForm">
				<el-form-item prop="ps" label="备注：">
					<el-input v-model="approvalForm.ps"></el-input>
				</el-form-item>
				<el-form-item style="text-align: right;">
					<el-button @click="refuse">拒绝</el-button>
					<el-button @click="agree">同意</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
	//======搜索
import { searchAccount,sortAccount } from '@/api/circle/business'
export default {
  data() {
    return {
    	//排序的参数
      applyTime2: '',
      totalSize: '',
      currentPage: 1,
      searchForm: {
        pageNum: 1,
        pageSize:10
      },
      approvalForm: {
        ps: ''
      },
      chooseLen: 0,
      tableData: [],
      currentPage: 2,
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        }
      ],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      approvalDlsg: false
    }
  },
  methods: {
  	    // 列表渠道过滤
    channelStatus(row){
      if(row.channelType === '1'){
        return '电商'
      }else if(row.channelType === '2'){
        return '社交'
      } 
    },
    
    //排序
    sortChange (val) {
//  	console.log(val)
    	this.applyTime2 = val
    	sortAccount({
    		applyTime2: this.applyTime2,
    		pageNum: 1,
    		pageSize:10
    	}
    	).then(res => {
    		this.tableData = res.data
    		this.totalSize = res.totalSize
    	})
    	
    },
    
    //重置
    resetClick () {
  		this.searchForm.channelType = ''
  		this.searchForm.minHierarchy = ''
  		this.searchForm.maxHierarchy = ''
  		this.searchForm.applyTime = ''
  		this.searchForm.Status2 = ''
  		this.searchForm.circleId = ''
  		this.searchForm.circleName = ''
    },
    //查找按钮
    search () {
    	searchAccount(this.searchForm).then(res => {
    		this.tableData = res.data
    		this.totalSize = res.totalSize
    	})
    },
    reset(name) {},
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    handleSizeChange() {},
    handleCurrentChange() {
  		this.searchForm.pageNumber = val 
  		this.search ()
    },
    openConfirmModal(title) {
      this.confirmSetting.title = title
      this.confirmSetting.show = true
    },
    confirmOk() {
      this.$message.success('删除成功')
      console.log('**删除')
    },
    approvalMore() {
      this.approvalDlsg = true
    },
    agree() {
      this.approvalDlsg = false
      this.$message.success('审批成功')
    },
    refuse() {
      this.$prompt('请输入拒绝理由', '审核', {
        confirmButtonText: '确认',
        confirmCancelText: '取消'
      })
        .then(val => {
          this.approvalDlsg = false
          this.$message.success(val)
        })
        .catch(value => {
          this.approvalDlsg = false
          this.$message.info('您点击了取消')
        })
    }
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