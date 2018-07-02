<template>
	<section>
		<!-- 筛选条件 -->
		<!--<el-card class="mb20">-->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="24">
				        <div style="float: right;margin-right: 30px;">
				        	<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
				        </div>	
					</el-col>
					<el-col :span="12">
						<el-form-item label="圈ID：" prop="id">
							<el-row>
								<el-col :span="12">
									<el-input v-model="searchForm.id" placeholder="请选择输入圈ID" style="width:57%" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>	
						<el-form-item label="快速查看：" prop="created2">
							<el-radio-group v-model="searchForm.created2" @change="searchTimeChange(1)">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">今天</el-radio-button>
								<el-radio-button label="2" value="">昨天</el-radio-button>
								<el-radio-button label="3" value="">最近7天</el-radio-button>
								<el-radio-button label="4" value="">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="圈名称：" prop="circleName">
							<el-row>
								<el-col :span="12">
									<el-input v-model="searchForm.circleName" placeholder="请选择输入圈名称" style="width:57%" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>	
						<!--<el-form-item label="筛选时间：" prop="created">
							<el-date-picker v-model="searchForm.created" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>-->
						
						  <!--<el-form-item label="添加时间：">
						    <el-col :span="5">
						      <el-form-item prop="addTime1">
						        <el-date-picker type="date" placeholder="选择开始日期" v-model="searchForm.addTime1" style="width: 100%;"
						        	@change="searchTimeChange(2)" clearable></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="1" style="padding-left:10px;">-</el-col>
						    <el-col :span="5">
						      <el-form-item prop="addTime2">
						        <el-date-picker type="date" placeholder="选择结束日期" v-model="searchForm.addTime2" style="width: 100%;" @change="searchTimeChange(3)" clearable></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>-->
						  <!--<el-form-item label="添加时间：">
						    <el-col :span="5">
						      <el-form-item prop="addTime1">
    								<el-date-picker v-model="searchForm.addTime1" type="datetime" placeholder="选择开始日期时间" @change="searchTimeChange(2)"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
						    <el-col :span="5">
						      <el-form-item prop="addTime2">
									<el-date-picker v-model="searchForm.addTime2" type="datetime" placeholder="选择结束日期时间" @change="searchTimeChange(3)" :default-time="['','23:59:59']"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>						  -->
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
         			 <el-button style="min-width: 120px;" type="info" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left:20px ;">
				<!--排序 + 全选 + 已选中项数-->
				<!--<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sort" @change="sortChange" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<span style="display: inline-block;margin-right: 20px;">当前选中{{chooseLen}}项</span>
				<el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal">删除</el-button>
				<el-button type="primary"  class="el-icon-edit"  @click= "editDescClick">创建</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="circleId" label="编号"></el-table-column>
					<el-table-column prop="content" label="内容"></el-table-column>
					<el-table-column prop="createdBy" label="创建人"></el-table-column>
					<el-table-column prop="created" label="创建时间"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<!--<el-button v-if="scope.$index == 0 && searchForm.pageNum == 1" type="warning" size="mini" @click="editDescClick(scope.$index,scope.row)">编辑</el-button>-->
							<!--<el-button v-if="scope.$index == tableData.length-1 && searchForm.sort == '2' && searchForm.pageNum == totalSizePage" type="warning" size="mini" @click="editDescClick(scope.$index,scope.row)">编辑</el-button>-->
							<el-button size="mini" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
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
			
			
		<!--</el-card>-->
		<!--<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>-->
		<el-dialog title="编辑简介" :visible.sync="descDlsg" width="30%">
			<div>
				<el-form v-model="descForm" ref="descForm" label-width="140px">
					<el-form-item prop="content" label="圈简介内容：">
						<el-input type="textarea" v-model="descForm.content" placeholder="请输入简介内容（最多100字）"  maxlength="100" resize=none rows=4></el-input>
					</el-form-item>
				</el-form>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="saveDesc">保存</el-button>
				<el-button type="danger" @click="closeDesc">关闭</el-button>
			</span>
		</el-dialog>

			<!--查看圈简介-->
		<el-dialog title="圈简介" :visible.sync="viewdescDlsg" width="30%">
			<div>
				<el-form v-model="viewForm" ref="viewForm" label-width="140px">
					<el-form-item prop="content" label="圈简介内容：">
						<el-input type="textarea" v-model="viewForm.content" placeholder="请输入简介内容（最多100字）"  maxlength="100" resize=none rows=4 disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="viewdescDlsg = false">关闭</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
//import confirmModal from '../components/confirmModal'
import { searchDesc,deleteDesc,sortDesc,editDesc } from '@/api/circle/business'
import { parseTime } from '@/utils'
export default {
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.addTime1  = parseTime(this.time[0])
            this.searchForm.addTime2  = parseTime(this.time[1])
          }
          
        }else{
          this.searchForm.addTime1  = ''
          this.searchForm.addTime2  = ''
        }
      }
    },	
  data() {
    return {
      time: [],
      viewdescDlsg: false,
      totalSize: '',
      currentPage: 1,
      channelType: '',
      searchForm: {
      	createdBy3: '12121323521',
      	sort:'',
//    	id: '2453128184280272896',
      	id: '',
      	created2: '',
      	circleName: '',
      	addTime1: '',
      	addTime2: '',
//      quick: '',
        pageNum: 1,
        pageSize: 10
      },
      chooseLen: 0,
      chooseSelection: '',
      tableData: [{}],
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        },
//      {
//        label: '按时间由远及近',
//        value: '2'
//      }        
      ],
      descDlsg: false,
      //编辑圈简介的内容
      descForm: {
        content: ''
      },
      viewForm: {
      	content: ''
      },
      editIndex: ''
    }
  },
  methods: {
	backClick () {
		this.$router.push({
			path: '/circlemanage/manage/info/detail',
			query:{
				id: this.searchForm.id,
				channelType: this.channelType,
				channelName: this.searchForm.circleName
			}
		})
	},
	
    search () {
    	searchDesc(this.searchForm).then(res => {
    		this.tableData = res.data
    		this.totalSize = Number(res.totalSize)
    	})
    },
    
  	//编辑
    saveDesc() {
    	if(!this.searchForm.id || !this.descForm.content){
    		this.$message.warning('圈ID和简介内容不能为空!')
    		return false
    	}else{
    		editDesc(
	    			{
	    				id:	this.searchForm.id,
	    				content:this.descForm.content,
	    				createdBy3: '12121212'
	    			}
    			).then(res => {
    			if(res.status == 200){
    				this.$message.success('新建成功！')
    				this.descDlsg = false
    				this.search()
    				this.descForm.content = ''
    			}
    		})
    	}
      // 还是编辑
//    this.tableData[this.editIndex].content = this.descForm.content
//    this.$message.success('保存成功')
//    this.descDlsg = false
//    console.log((this.descForm.content = ''))
    },
    sortChange (val) {
    	this.searchForm.sort = val
    	this.search()
    },
    view (row) {
    	this.viewdescDlsg = true
    	this.viewForm.content = row.content
    },
    closeDesc() {
      this.$message.info('没有增加公告')
      this.descDlsg = false
    },
   	searchTimeChange (flag) {
   		if(flag == 1){
   			this.time = []
   			this.searchForm.addTime1 = ''
   			this.searchForm.addTime2 = ''
   		}else if(flag == 2){
   			this.searchForm.created2 = ''
   		}
   	},
    editDescClick(index, row) {
      // 给表单赋值
      // 打开dlsg
//    this.editIndex = index
      //this.descForm.content = row.content
      this.descDlsg = true
    },

    reset () {
    	this.time = []
    	this.searchForm.created2 = ''
    	this.searchForm.addTime1 = ''
    	this.searchForm.addTime2 = ''
//  	this.search()
    },
    handleCurrentChange (val) {
    	this.searchForm.pageNum = val
    	this.search()
    },
    //勾选框发生改变时值得变化处理
    selectionChange(selection) {
    	//console.log(selection)
	      // 全选 或者选择几项
	    this.chooseLen = selection.length
	    this.chooseSelection = selection
	},
    checkChoose(){
      // 已选择的 逻辑处理在这
      let len = this.chooseSelection.length
      if(len === 0){
        this.$message.warning('请至少选择一项')
        return false
      }else{
        return true
      }
    },
    openConfirmModal(title) {
      if(this.checkChoose()){
			        let str = ''
			        let arr = []
			        for(let i=0,len=this.chooseSelection.length;i<len;i++){
			          arr.push(this.chooseSelection[i].id)
			        }
			        str = arr.join(',')
			        str = '您确定要删除圈简介【'+ str + '】吗？'
			        let jsonData = arr
			        this.$confirm(str,'删除',{
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          // 点击确定
			          deleteDesc({ids:jsonData}).then(res => {
				          	if(res.status == '200'){
				          		this.$message.success('删除成功！')
				          		this.search()
				          	}else if(res.status == '500'){
				          		let errorMsg = res.errorMsg
				          		this.$message.warning(errorMsg)
				          	}
			          })
			        }).catch(() => {
			          // 点击取消
			        })		      			
      }       	
    },
    handelQuery () {
		let query = this.$router.currentRoute.query
		this.searchForm.id = query.id 
		this.searchForm.circleName = query.name 
		this.channelType = query.channelType
		this.search()
		//this.searchForm.channelType = query.channelType 
    }
//  confirmOk() {
//    this.$message.success('删除成功')
//    console.log('**删除')
//  }
  },
  mounted () {
//	this.search()
	this.handelQuery()
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