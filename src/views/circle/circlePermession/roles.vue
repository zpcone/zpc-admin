<template>
	<section>
		<!-- 筛选条件 -->
		  	<div style="float: right; margin-right: 50px;" v-if="channelType == '2'">
		        <el-button type="info" @click="upgrade">观摩会员升级行为会员的规则设置</el-button>
		    </div>
			<div class="create">
				<el-button type="primary" icon="el-icon-plus" @click="create">新增角色</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-form-item label="搜索：" prop="queryData">
					<el-input v-model="searchForm.queryData" placeholder="请输入角色id或名称" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin: 30px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy" @change="seleChange" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal('删除')">删除</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="roleId" label="角色ID"></el-table-column>
					<el-table-column prop="name" label="角色名称"></el-table-column>
					<el-table-column prop="description" label="角色简介"></el-table-column>
					<el-table-column prop="crowdPermissions" label="群内权限"></el-table-column>
					<el-table-column prop="created" label="创建时间"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
							<el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
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

			<!--观摩会员升级行为会员的规则设置--弹框-->
		<el-dialog title="观摩会员升级行为会员的规则配置" :visible.sync="dialogFormVisible" width="30%">
			<div>
			  <el-form :model="ruleForm">
				    <el-form-item label="需满足入圈时长：">
				    	<div style="display:inline-block;width:150px">
				    		<el-input type="number" :min="0" :max="0" v-model="ruleForm.joinTime" auto-complete="off" @change="joinChange"></el-input>
				    	</div>
				      <span style="display:inline-block;margin-left: 10px;margin-right: 10px;">X</span>
				    	<div style="display:inline-block;width:150px">
				    		<el-input v-model="timeHour" auto-complete="off" disabled></el-input>
				    	</div>
				      <span style="display:inline-block;margin-left: 10px;">小时</span>
				    </el-form-item>
				    <el-form-item label="需满足趣币数：">
				    	<div style="display:inline-block;width:150px;margin-left: 12px;">
				    		<el-input type="number" :min="0" :max="0" v-model="ruleForm.coinTal" auto-complete="off" @change="coinChange"></el-input>
				    	</div>
				    	<span style="display:inline-block;margin-left: 10px;margin-right: 10px;">个</span>
				    </el-form-item>
			  </el-form>
			</div>
			  <div slot="footer" class="dialog-footer">
			  	 <el-button type="primary" @click="memberRuleClick">确 定</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
			  </div>
			</el-dialog>


	</section>
</template>

<script>
import { searchRole,detailRole,delRole,searchConfig,setConfig } from '@/api/circle/permession'
let selectionIds = new Array()
export default {
  data() {
    return {
    	//用来控制右上方的按钮是否展示
      dialogFormVisible: false,
      timeHour: 24,
      //观摩升级行为会员规则的表单
      ruleForm: {
      	joinTime: 3,//入圈时间
      	coinTal: 100//趣币总数
      },
      channelType: '2',
      searchForm: {
//    	角色id或名称
      	queryData: '',
      	pageNumber: 1,
      	pageSize: 10,
        id: '',
        time: '',
        sortFlag: '1',
        ccType : 1
      },
      chooseLen: 0,
      tableData: [],
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        }
//      {
//        label: '按角色等级排序',
//        value: '2'
//      }
      ],
      totalSize: '',
      currentPage: 1
    }
  },
  methods: {
  	//观摩会员升级行为会员的规则设置 按钮
	upgrade () {
		this.dialogFormVisible = true
		searchConfig({configureCode:'RoleToUp'}).then(res => {
			if(res.status == 200){
//				res.data.configureJson.coinTal
//				res.data.configureJson.joinTime
				this.ruleForm = JSON.parse(res.data.configureJson)
			}else if(res.status == 500){
				let errorMsg = res.errorMsg
				this.$message.warning(errorMsg)
			}
		})
	},

	joinChange (val){
		if(val<0){
			this.ruleForm.joinTime = 0
		}else{
			this.ruleForm.joinTime = parseInt(this.ruleForm.joinTime)
		}
	},

	coinChange (val){
		if(val<0){
			this.ruleForm.coinTal = 0
		}else{
			this.ruleForm.coinTal = parseInt(this.ruleForm.coinTal)
		}
	},

	//观摩会员升级行为会员的规则设置  弹框的  确定按钮
	memberRuleClick () {
		setConfig({
		    channelType: 2,
		    configureCode: 'RoleToUp',
		    configureName: '观摩会员升级行为会员的规则配置',
		    configureJson: JSON.stringify(this.ruleForm)
		}).then(res => {
			if(res.data == true && res.status == 200){
				this.$message.success('设置成功！')
				this.dialogFormVisible = false
			}
		})
	},

  	//新建角色
    create() {
      this.$router.push('/circlemanage/permession/role/new')
    },

    //查看角色详情
    view(row) {
		//console.log(row)
    	let roleId=row.roleId
    	this.$router.push(
    		{
    			path:'/circlemanage/permession/role/view',
    			query:{
    					roleId : roleId
    				}
    			}
    	)
    },

    //编辑角色详情
    edit(row) {
  	//console.log(row)
    	let roleId=row.roleId
    	this.$router.push(
    		{
    			path:'/circlemanage/permession/role/edit',
    			query:{
    					roleId : roleId
    				}
    		}
    	)
    },

    //排序值改变刷新列表
    seleChange (val) {
    	this.searchForm.sortFlag = val
    	this.search()
    },


    //处理分页
    handleCurrentChange(val) {
    	//console.log(val)
    	this.searchForm.pageNumber = val
    	this.search()
    },

    selectionChange(selection) {
    this.chooseLen = selection.length
  	this.selectionIds = new Array()
	  for(let i=0;i<selection.length;i++){
	  		this.selectionIds.push(selection[i].roleId)
		}
    },

    //删除角色按钮
    openConfirmModal(){
    	//console.log(this.selectionIds)
    	this.$message('删除失败，请选择角色')
    	if (this.selectionIds.length) {
				delRole({roleIds: this.selectionIds}).then(res => {
				if(res.data == true && res.status == '200'){
					this.$message.success('删除成功')
					this.search()
				}else if(res.status == '500' && res.errorMsg != ''){
					this.$message.warning('删除失败，该角色信息下有会员！')
				}
			})
			}
    	this.search()

    },

	// 查找按钮发送查询请求
    search() {
    	searchRole(this.searchForm).then(res => {
 		//console.log(res.data)
    		this.tableData = res.data
    		this.totalSize = Number(res.totalSize)
    	}).catch(error => {
    		console.log(error)
    	})
    }
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
.create {
  margin: 20px;
}
</style>
