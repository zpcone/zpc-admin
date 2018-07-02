<template>
	<section>
		<div class="m20">
		  <el-form :inline="true" ref="form" v-model="form" label-width="80px">
        <el-form-item label="群ID：" prop="crowdId">
          <el-input v-model="form.crowdId" style="width:200px" disabled></el-input>
        </el-form-item>
        <el-form-item label="群名称：" prop="crowdName">
          <el-input v-model="form.crowdName" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
        </el-form-item>
        <div style="float: right;margin-right: 30px;">
        	<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
        </div>
      </el-form>
		</div>	
		<div class="m20">
		  <div class="table" style="margin: 20px;min-height: 100px;">
        <el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
          <el-table-column prop="crowdId" label="编号"></el-table-column>
          <el-table-column prop="crowdIntro" label="内容"></el-table-column>
          <el-table-column prop="createdBy" label="创建人"></el-table-column>
          <el-table-column prop="created" label="创建时间"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editDesc(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click= "deleteDesc(scope.row)">删除内容</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
		</div>	
		<el-dialog title="编辑简介" :visible.sync="descDlsg" width="30%">
			<div>
				<el-form v-model="descForm" ref="descForm" label-width="140px">
					<el-form-item prop="introduceContent" label="群简介内容">
						<el-input type="textarea" v-model="descForm.introduceContent" placeholder="请输入公告内容" maxlength="100" resize=none rows=4></el-input>
					</el-form-item>
				</el-form>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="saveDesc">保存</el-button>
				<el-button type="danger" @click="closeDesc">关闭</el-button>
			</span>
		</el-dialog>
		
    <!--分页-->
			<!--<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="form.pageNumber" 
					:page-size="form.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>  -->
	</section>
</template>

<script>
import { searchDesc, deleteDesc, editDesc } from '@/api/group/business'
export default {
  data() {
    return {
//    currentPage: 1,
//    totalSize: '1',
      form: {
        crowdId: '408720828511756288',
        crowdName:'',
        pageNumber: 1,
        pageSize: 10
      },
      //列表的数组
      tableData: [],
      descDlsg: false,
      //群简介绑定的表单
      descForm: {
        content: ''
      },
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      editIndex: '',
      crowdId: '',
      isSocialContact: true,
      channelId: ''
    }
  },
  methods: {
	backClick () {
		this.$router.push({
			path: '/group/manage/info/detail',
			query:{
		          crowdId: this.form.crowdId,
		          isSocialContact: this.isSocialContact,
		          channelId: this.channelId,
		          isViewOrManage: '2'
			}
		})
	},
  	
  	handelQuery () {
	  	let query = this.$router.currentRoute.query
	  	this.form.crowdId = query.crowdId 
	  	this.form.crowdName = query.crowdName
	  	this.channelId = query.channelId
	  	this.search()
  	},
    	//处理分页
   	 handleCurrentChange(val) {
    	//console.log(val)
    	this.form.pageNumber = val
		this.search()
    	},
    	
  	//保存群简介更改
    saveDesc() {
      // 还是编辑    
      this.$message.success('保存成功')
      this.descDlsg = false
//    console.log((this.descForm.crowdIntro = ''))
      editDesc(this.descForm).then(res=> {
//      console.log(res)
        this.search()
      })
      
    },
    //群简介编辑关闭
    closeDesc() {
      this.descDlsg = false
    },
    //群简介编辑
    editDesc(index, row) {
      // 给表单赋值
      // 打开dlsg
      this.editIndex = index
//    console.log(row)
      this.descForm.crowdId = row.crowdId
      this.descForm.mId = '155151'
      this.descForm.introduceContent = row.crowdIntro
      this.descDlsg = true
    },
    
    //查找按钮，后台返回的结果赋值给下面的表格
    search () {
    	if(!this.form.crowdId){
    		this.$message.warning("查找失败，群ID不能为空！")
    		return
    	} else {
		      searchDesc(this.form).then(res => {
		//      console.log(res)
		        this.tableData = []
		        this.tableData.push(res.data)
		        this.totalSize = Number(res.totalSize)
		      })
    	}
    },
    //重置按钮暂未实现  3.30
//  reset () {
//  	this.form.crowdId = ''
//  	this.form.crowdName = ''
//  },
    handleCurrentChange (val) {
    	this.form.pageNumber = val
    	this.search()
    },
    deleteDesc(row){
      deleteDesc({crowdId:row.crowdId,mId:'11111'}).then(res => {
//      console.log(res)
        if(res){
          this.$message.success("删除成功")
          this.search()
        }
      })
    },
  },
  mounted () {
  	this.handelQuery()
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