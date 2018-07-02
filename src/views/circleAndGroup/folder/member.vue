<template>
  <section>
 	<div class="m20">
 	   <h3>关联会员列表</h3>
 	   <!--<div style="margin-left: 200px;margin-top: -50px;">-->
 	   	<div style="position: absolute;right:100px;top:62px">
 	   	<el-button type="primary" icon="el-icon-setting" @click="back">返回</el-button>
 	   </div>
    <!--<el-form ref="form" :model="form" :inline="true">
      <el-form-item prop="" label="排序：">
        <el-select v-model="form.sort" placeholder="请选择">
          <el-option
            v-for="item in sorts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </el-form-item>
      <el-button type="primary" icon="el-icon-setting" @click="back">返回</el-button>
    </el-form>-->
    <el-table :data="dataTable" border style="width: 100%">
      <el-table-column prop="mId" label="关联会员ID"></el-table-column>    
      <el-table-column prop="memberName" label="会员名称"></el-table-column>    
      <el-table-column prop="groupName" label="分组文件夹名称"></el-table-column>    
      <el-table-column prop="created" label="关联时间"></el-table-column>   
      <el-table-column prop="ccDate" label="所含群圈名称"></el-table-column>         
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>    
    </el-table>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="form.pageNum" 
					:page-size="form.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
 	</div>
  </section>
</template>

<script>
import { memberList } from '@/api/circleAndGroup'

  export default{
    data(){
      return{
	      currentPage: 1,
	      totalSize: '',
        form:{
        	pageNum: 1,
        	pageSize: 10,
        	groupId:''
        },
        sorts:[],
        dataTable: [{id:123456}],
      }
    },
    methods:{
      view (row) {
      	//console.log(row)
    	let groupId = row.groupId
    	let mId = row.mId
			this.$router.push(
				{
					path:'/circleandgroup/team/folder/circle',
					query:{
	 					groupId : groupId,
	 					mId: mId
					}
				}
			)
    },
    back () {
    	 this.$router.push('/circleandgroup/team/folder')
    },
    //circle 关联会员列表返回之后将id带回来，刷新列表   否则列表是空
//  handleBack () {
//    	let query = this.$router.currentRoute.query
//    	this.form.groupId = query.groupId
//				memberList(this.form).then(res => {
//					//console.log(res)
//					this.dataTable = res.data 
//					this.totalSize = Number(res.totalSize)
//				}) 	
//  },
    handleCurrentChange(val) {
    	this.form.pageNum = val
    	this.handleQuery()
    },
    handleQuery(){
      	let query = this.$router.currentRoute.query
//    	let groupId = query.groupId
      	this.form.groupId = query.groupId
				memberList(this.form).then(res => {
					//console.log(res)
					this.dataTable = res.data 
					this.totalSize = Number(res.totalSize)
				})
      }
    },
    mounted () {
    	this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>