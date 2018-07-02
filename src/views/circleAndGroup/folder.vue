<template>
	<section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
			<div class="create">
				<el-button type="primary" icon="el-icon-setting" @click="create">分组文件夹管理</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-form-item label="搜索：" prop="groupName">
					<el-input v-model="searchForm.groupName" placeholder="请输入分组文件夹名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="渠道：" prop="channleId">
					<el-radio-group v-model="searchForm.channleId">
						<el-radio-button label="" value="">全部</el-radio-button>
						<el-radio-button label="2" value="">社交</el-radio-button>
						<el-radio-button label="1" value="">电商</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<!--<el-form-item label="分组文件夹名称：" prop="groupName">
					<el-radio-group v-model="searchForm.groupName">
						<el-radio-button label="全部" value="1"></el-radio-button>
						<el-radio-button label="系统分组文件夹" value="2"></el-radio-button>
						<el-radio-button label="自定义分组文件夹" value="3"></el-radio-button>
					</el-radio-group>
				</el-form-item>-->
				<el-form-item>
					<el-button style="min-width: 120px;margin-left: 150px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
					<el-button style="min-width: 120px;margin-left: 20px;" type="primary" icon="el-icon-search" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<!--<span>列表排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<!--<span>当前选中{{chooseLen}}项</span>-->
				<!--<el-button type="info" @click= "deleteLimit">删除</el-button>-->
			</div>
			<div class="table" style="margin: 20px 5px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<!--<el-table-column type="selection" width="55"></el-table-column>-->
					<el-table-column prop="channleId" label="渠道" :formatter="channelFormat"></el-table-column>
					<el-table-column prop="groupId" label="编号"></el-table-column>
					<el-table-column prop="groupName" label="分组文件夹"></el-table-column>
					<el-table-column prop="memberNumber" label="关联人数"></el-table-column>
					<!--<el-table-column prop="createdBy" label="关联会员" width="600"></el-table-column>-->
						<!--头像和名称-->
					</el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
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
		</el-card>
	</section>
</template>

<script>
//	======查找
import { getList } from '@/api/circleAndGroup'
export default {
  data() {
    return {
      currentPage: 1,
      totalSize: '',
      searchForm: {
      	channleId: '',
      	//分组名称
      	groupName: '',
      	//分组类别
      	groupType: '',
      	pageNum: 1,
      	pageSize: 10
        //time: '',
        //quick: '',
        //sortBy: '1'
      },
      chooseLen: 0,
      tableData: [{id:'123456'}],
      options: [
        {
          label: '全部',
          value: '1'
        },
        {
          label: '按关联人数由高到低排序',
          value: '2'
        }        
      ],
    }
  },
  methods: {
    // 列表中渠道项过滤
    channelFormat(row){
      if(row.channleId === '1'){
        return '电商'
      }else if(row.channleId === '2'){
        return '社交'
      } 
    },
    //分组文件夹管理按钮
    create() {
      this.$router.push('/circleandgroup/team/folder/manage')
    },
    //点击查看按钮
    view(row) {
    	let groupId = row.groupId
		this.$router.push(
			{
				path:'/circleandgroup/team/folder/member',
				query:{
 					groupId : groupId
				}
			}
		)
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    handleCurrentChange(val) {
    	this.searchForm.pageNum = val
    	this.search()
    },
    search() {
    	getList(this.searchForm).then(res => {
    		//console.log(res)
    		this.tableData = res.data
    		this.totalSize = Number(res.totalSize)
    	})
    },
    //重置
    reset () {
    	this.searchForm.channleId = ''
    	this.searchForm.groupName = ''
    	this.search()
    },
    deleteLimit() {}
  },
  mounted () {
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
.create {
  margin: 20px 0;
}
</style>