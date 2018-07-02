<template>
	<section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
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
						<el-form-item label="搜索：">
							<el-row>
								<el-col :span="12">
								<el-select v-model="searchForm.statusCircle" placeholder="请选择"  style="width:40%">
									<el-option label="会员ID" value="1"></el-option>
									<el-option label="会员名称" value="2"></el-option>
								</el-select>
									<el-input placeholder="请选择输入会员ID或会员名称" style="width:51%"></el-input>
								</el-col>
							</el-row>
						</el-form-item>		
						<el-form-item label="搜索：">
							<el-row>
								<el-col :span="12">
								<el-select v-model="searchForm.statusCircle" placeholder="请选择"  style="width:40%">
									<el-option label="所在圈ID" value="1"></el-option>
									<el-option label="所在圈名称" value="2"></el-option>
								</el-select>
									<el-input placeholder="请选择输入圈ID或圈名称" style="width:51%"></el-input>
								</el-col>
							</el-row>
						</el-form-item>	
						<el-form-item label="搜索：">
							<el-row>
								<el-col :span="12">
								<el-select v-model="searchForm.statusCircle" placeholder="请选择"  style="width:40%">
									<el-option label="目标圈ID" value="1"></el-option>
									<el-option label="目标圈名称" value="2"></el-option>
								</el-select>
									<el-input placeholder="请选择输入目标圈ID或圈名称" style="width:51%"></el-input>
								</el-col>
							</el-row>
						</el-form-item>	
						<el-form-item label="所在圈层级：">
								<el-row>
									<el-col :span="7">
										<el-input placeholder="请输入圈层级"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input placeholder="请输入圈层级"></el-input>
									</el-col>
								</el-row>
						</el-form-item>


					</el-col>
					<el-col :span="12">
						<el-form-item label="快速查看：" prop="quick">
							<el-radio-group v-model="searchForm.quick">
								<el-radio-button label="全部" value="1"></el-radio-button>
								<el-radio-button label="今天" value="2"></el-radio-button>
								<el-radio-button label="昨天" value="3"></el-radio-button>
								<el-radio-button label="最近七天" value="4"></el-radio-button>
								<el-radio-button label="最近30天" value="5"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="路由状态：" prop="sep">
							<el-radio-group v-model="searchForm.sep">
								<el-radio-button label="全部" value="1"></el-radio-button>
								<el-radio-button label="自动路由" value="2"></el-radio-button>
								<el-radio-button label="待审核" value="3"></el-radio-button>
								<el-radio-button label="审核通过" value="4"></el-radio-button>
								<el-radio-button label="审核拒绝" value="5"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="路由时间：" prop="time">
							<el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="目标圈层级：">
								<el-row>
									<el-col :span="7">
										<el-input placeholder="请输入圈层级"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input placeholder="请输入圈层级"></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="签值关键词：" prop="groupid">
							<el-input v-model="searchForm.groupid"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="info" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>列表排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="primary" @click= "openConfirmModal('删除')">批量审核</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="渠道"></el-table-column>
					<el-table-column prop="id" label="申请人ID"></el-table-column>
					<el-table-column prop="sep" label="申请人名称"></el-table-column>
					<el-table-column prop="content" label="所在圈ID"></el-table-column>
					<el-table-column prop="content" label="圈名称"></el-table-column>
					<el-table-column prop="content" label="圈层级"></el-table-column>
					<el-table-column prop="content" label="圈标签"></el-table-column>
					<el-table-column prop="content" label="目标圈ID"></el-table-column>
					<el-table-column prop="content" label="圈名称"></el-table-column>
					<el-table-column prop="content" label="圈层级"></el-table-column>
					<el-table-column prop="content" label="圈标签"></el-table-column>
					<el-table-column prop="content" label="路由理由"></el-table-column>
					<el-table-column prop="content" label="路由时间"></el-table-column>
					<el-table-column prop="content" label="路由状态"></el-table-column>
					<el-table-column prop="content" label="路由时长"></el-table-column>
					<el-table-column prop="time" label="审核人"></el-table-column>
					<el-table-column prop="time" label="审核时间"></el-table-column>
					<el-table-column prop="time" label="管理">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="view(scope.row)">通过</el-button>
							<el-button size="mini" type="primary" @click="view(scope.row)">拒绝</el-button>
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
					:total="totalSize"></el-pagination>
			</div>
		</el-card>
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>
</template>

<script>
import confirmModal from '../components/confirmModal'
export default {
  data() {
    return {
      totalSize: '',
      searchForm: {
        groupid: '',
        groupname: '',
        memeberid: '',
        membername: '',
        sep: '',
        time: '',
        quick: '',
        pageNum: 1,
        pageSize: 10
      },
      chooseLen: 0,
      tableData: [],
      currentPage: 1,
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
      }
    }
  },
  methods: {
  	//搜索按钮
    search(name) {},
    //重置按钮
    reset(name) {},
    //勾选发生改变的值
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    //分页处理
    handleCurrentChange (val) {
    	this.searchForm.pageNum = val
    	this.search()
    },
    //批量审核按钮
    openConfirmModal(title) {
      this.confirmSetting.title = title
      this.confirmSetting.show = true
    },
    
    confirmOk() {
      this.$message.success('删除成功')
      console.log('**删除')
    }
  },
  components: {
    confirmModal
  }
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