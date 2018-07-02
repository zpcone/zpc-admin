<template>
	<section>
		<el-card class="mb20" style="padding-top: 20px;">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="会员ID：" prop="mId">
							<el-row>
								<el-col :span="8">
									<el-input v-model.trim="searchForm.mId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>								
						<el-form-item label="会员名称：" prop="memberName">
							<el-row>
								<el-col :span="8">
									<el-input v-model="searchForm.memberName" clearable disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
			            <el-form-item label="渠道：" prop="channleId">
			              <el-radio-group v-model="searchForm.channleId">
			                <el-radio-button label="1">电商</el-radio-button>
			                <el-radio-button label="2">社交</el-radio-button>
			              </el-radio-group>
			            </el-form-item>		
			            <el-form-item label="类别：" prop="ccType"> 
			              <el-radio-group v-model="searchForm.ccType">
			                <el-radio-button label="">全部</el-radio-button>
			                <el-radio-button label="0">群</el-radio-button>
			                <el-radio-button label="1">圈</el-radio-button>
			              </el-radio-group>
			            </el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="index" width="55" label="编号"></el-table-column>
					<el-table-column prop="groupName" label="分组文件夹名称"></el-table-column>
					<el-table-column prop="created" label="创建时间"></el-table-column>
					<el-table-column prop="ccName" label="所含圈群ID及名称"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			
		<el-dialog title="该群内设置此分组的会员" :visible.sync="dialogTableVisible"  width="40%">
		  <el-table :data="gridData" @selection-change="selectionChange" border style="width:100%" center>
		  	<!--<el-table-column type="selection" width="55"></el-table-column>-->
		  	<el-table-column type="index" width="50" label="编号"></el-table-column>
		    <el-table-column property="groupName" label="分组文件夹名称" width="200"></el-table-column>
		    <el-table-column property="ccLogo" label="头像" width="200">
            	<template slot-scope="scope">
            		<img :src="scope.row.ccLogo" style="width: 40px;height: 40px;display: block;"/>
		    	</template>
		    </el-table-column>
		    <el-table-column property="ccId" label="圈群ID" width="200"></el-table-column>
		    <el-table-column property="ccName" label="圈群名称"></el-table-column>
		  </el-table>
		</el-dialog>
			<div class="pagination center">
				<el-pagination 
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
import { memberForCircleAndGroup } from '@/api/circleAndGroup'
export default {
  watch(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.starDateStr = this.time[0]
            this.searchForm.endDateStr = this.time[1]
          }
        }else{
          this.searchForm.starDateStr = ''
          this.searchForm.endDateStr = ''
        }  	
  },
  data() {
    return {
	  currentPage: 1,
	  inputNum: true,
	  totalSize: '',
	  dialogTableVisible: false,
	  memberName: '',
	  tableData: [],
	  folder: [],
	  gridData: [],
      searchForm: {
        //会员id
        memberName: '',
//        mId: '429243571099340800',
        mId: '',
        pageNum: 1,
        pageSize: 10
      }
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
  	//查看按钮
  	view (index,row) {
//		console.log(index,row)
		let indexs = index
		this.gridData = this.folder[index].cCAndGroupVoList
		for(let i=0;i<this.gridData.length;i++){
			this.gridData[i].groupName = row.groupName
		}
		this.dialogTableVisible = true
  	},
  	
  	handleCurrentChange (val) {
  		this.pageNum = val
  		this.search()
  	},
 
	//查找按钮
    search () {
    	var _this = this
    	if(!_this.searchForm.mId || !_this.searchForm.channleId){
    		_this.$message.warning('会员ID和渠道必填！')
    		return
    	}else if(_this.inputNum == false){
    		_this.$message.warning('ID必须为数字！')
    	}else{
    		memberForCircleAndGroup(_this.searchForm).then(res => {
    			_this.searchForm.memberName = res.data.memberName
    			_this.tableData = res.data.crowdAndCircleGroupVoList
    			_this.folder = res.data.crowdAndCircleGroupVoList
    			_this.totalSize = Number(res.data.pageTatol)
    		})
    	}
    },
  	
  	
  	
  	
//	handelQuery () {
//	  	let query = this.$router.currentRoute.query
//	  	this.searchForm.crowdId = query.crowdId 
//	  	this.searchForm.channnelType = query.channnelType
//	},
	handleChange (val) {
		console.log(val)
	},

    //重置按钮
    reset () {
    	this.searchForm.mId = '' 
    	this.searchForm.ccType = '' 
    	this.searchForm.channleId = ''
    }
    
  },
	mounted(){
		//this.search()
		//this.handelQuery()
	}
}
</script>

<style scoped>
.clearfix {
  zoom: 1;
}

.el-upload-list {
	width: 18%;
}
.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
  height: 0;
}

.fl {
  float: left;
}

.padLR15 {
  padding: 0 15px;
}


.searchInput.el-input {
  max-width: 300px;
}

.center {
  text-align: center;
}
.mb20 {
  margin-bottom: 20px;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: 101%;
}

.setting .el-upload-list {
	width:18%;
}
</style>
