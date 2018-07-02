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
									<el-input type="number" placeholder="请选择输入圈ID" v-model.trim="searchForm.id" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="圈名称：" prop="circleName">
							<el-row>
								<el-col :span="12">
									<el-input placeholder="请选择输入圈名称" v-model.trim="searchForm.circleName" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
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
						  
						<el-form-item label="快速查看：" prop="created2">
							<el-radio-group v-model="searchForm.created2" @change="searchTimeChange(1)">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">今天</el-radio-button>
								<el-radio-button label="2" value="">昨天</el-radio-button>
								<el-radio-button label="3" value="">最近七天</el-radio-button>
								<el-radio-button label="4" value="">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>

					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="info" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin-top: 20px;margin-left: 20px ;">
			  <!--<span>排序：</span>
			  <el-select placeholder="请选择" v-model="searchForm.sortBy" @change="sortChange" clearable>
			  	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			  	</el-option>
			  </el-select>-->
			  <!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
			  <span style="display: inline-block;margin-right:20px;">圈公告历史记录</span>
			  <span style="display: inline-block;margin-right:20px;">当前选中{{chooseLen}}项</span>
			  <el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal">删除</el-button>
			  <el-button type="primary" icon="el-icon-plus" @click= "newNotice">新增公告</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%" :default-sort="{prop: 'created', order: 'descending'}">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="ID"></el-table-column>
					<el-table-column prop="noticeContent" label="内容"></el-table-column>
					<el-table-column prop="publishType" label="公告的发布方式" :formatter="typeFormat"></el-table-column>
					<el-table-column prop="createdBy" label="添加人"></el-table-column>
					<el-table-column prop="created" label="添加时间" sortable></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button size="mini" @click="viewNotice(scope.row)" type="warning">查看</el-button>
							<!--<el-button size="mini" @click="editNoticeClick(scope.$index,scope.row)" type="warning">编辑</el-button>-->

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
		<!--</el-card>-->

		<!--新增圈公告-->
		<el-dialog title="新增公告" :visible.sync="noticeDlsg" width="30%">
			<div>
				<el-form v-model="noticeForm" ref="noticeForm" label-width="140px">
					<el-form-item prop="noticeContent" label="公告内容：">
						<el-input type="textarea" v-model.trim="noticeForm.noticeContent" placeholder="请输入公告内容" maxlength="100" resize=none rows=4></el-input>
						<p>*最多可输入100个字</p>
					</el-form-item>
					<el-form-item prop="publishType" label="公告的发布方式">
						<el-radio-group v-model="noticeForm.publishType">
							<el-radio label="1" value="">常规</el-radio>
							<!--<el-radio label="2" value="">背景图</el-radio>
							<el-radio label="3" value="">跑马灯</el-radio>-->
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="noticeDlsg = false">取 消</el-button>
			    <el-button type="primary" @click="saveNotice">确 定</el-button>
		    </span>
		</el-dialog>


		<!--查看圈公告-->
		<el-dialog :title="圈公告" :visible.sync="viewDlsg" width="30%">
			<div>
				<el-form v-model="viewForm" ref="viewForm" label-width="140px">
					<el-form-item prop="noticeContent" label="公告内容:">
						<el-input type="textarea" v-model.trim="viewForm.noticeContent" placeholder="公告内容" maxlength="100" resize=none rows=4 disabled></el-input>
					</el-form-item>
					<el-form-item prop="publishType" label="公告的发布方式">
						<!--<el-radio-group v-model="viewForm.publishType">
							<el-radio label="1" disabled>常规</el-radio>
							<el-radio label="2" disabled>背景图</el-radio>
							<el-radio label="3" disabled>跑马灯</el-radio>
						</el-radio-group>-->
						<el-radio v-model="viewForm.publishType" label="1" disabled>常规</el-radio>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="viewDlsg = false">关闭</el-button>
		    </span>
		</el-dialog>


		<!--<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>-->
	</section>
</template>

<script>
//import confirmModal from '../components/confirmModal'
import { searchNoticeAll,sortNotice,deleteNotice,addNotice} from '@/api/circle/business'
import { parseTime } from '@/utils'
export default {
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.addTime1 = parseTime(this.time[0])
            this.searchForm.addTime2 = parseTime(this.time[1])
          }
        }else{
          this.searchForm.addTime1 = ''
          this.searchForm.addTime2 = ''
        }

      }
    },
  data() {
    return {
      time: [],
      noticeDlsg: false,
      viewDlsg: false,
      channelType: '',
      totalSize: '',
      searchForm: {
//      groupid: '',
//      time: '',
//      quick: '',
//      sortBy: '1',
		createdBy: '212122',
		//id: '103',
//		id: '1454733806348197888',
//	    circleName: '-5圈',
		id: '',
		circleName: '',
		addTime1: '',
		addTime2: '',
        pageNum: 1,
        pageSize: 10,
        created2: ''
      },
      viewForm: {},
      chooseLen: 0,
      selections: [],
      tableData: [{id:'11'}],
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        }
      ],
      noticeForm: {
      	createdBy: '11111',
        noticeContent: '',
//      PublishType: '',
        id: '',
        circleName: ''
      },
      editForm: {},
      currentPage: 1,
      //isEditNotice: false,
      dlsgTitle:'新增公告'
//    confirmSetting: {
//      name: '',
//      title: '',
//      show: false
//    }
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
			searchNoticeAll(this.searchForm).then(res => {
				if(res.status == 200){
					this.tableData = res.data
					this.totalSize = Number(res.totalSize)
				}else if(res.status == 500){
					let errorMsg = res.errorMsg
					this.$message.warning(errorMsg)
				}
			})

    },
  	//排序
  	sortChange (val) {
  		let len = val
  		sortNotice({
  			orderByStr: len,
  			pageNum: 1,
  			pageSize: 10
  		}).then(res => {
  			this.tableData = res.data
			this.totalSize = Number(res.totalSize)
  		})
  	},

    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
      if (flag === 1) {
      	this.time = []
        this.searchForm.addTime1  = ''
        this.searchForm.addTime2  = ''
      } else if (flag === 2) {
      	this.searchForm.created2 = ''
      }
    },

	  //更改列表中的公告发布方式的状态
	typeFormat(row){
	    let type = row.publishType
	    if(type == 1){
	      return '常规'
	    }
	},
	//新增圈公告按钮
	newNotice () {
		this.noticeDlsg = true
	},
    saveNotice() {
        this.noticeForm.id = this.searchForm.id
        this.noticeForm.circleName = this.searchForm.circleName
			if (!this.noticeForm.noticeContent || !this.noticeForm.publishType || !this.noticeForm.id) {
              	this.$message.error('新增失败,请填写公告内容和方式!圈ID不能为空！')
              	return
            } else {
            	addNotice(this.noticeForm).then(res => {
            	  if(res.status == 200){
            	  	this.$message.success('新增公告成功！')
            	    this.search()
            	    this.noticeDlsg = false
            	    this.noticeForm.noticeContent = ''
            	    this.noticeForm.publishType = ''
            	  } else {
            	  		this.$message.error('新增失败,请刷新后重试！')
            	  }
            	})
            }
    },
    closeNotice() {
      this.$message.info('没有增加公告')
      this.noticeDlsg = false
    },
    viewNotice (row) {
    	this.viewDlsg = true
    	this.viewForm.noticeContent = row.noticeContent
    	this.viewForm.publishType = row.publishType + ''
    },
    //编辑按钮
//  editNoticeClick($index,row) {
//		if($index === 0){
//			this.noticeDlsg = true
//			this.isEditNotice = true
//		}else{
//			this.$message.warning('只有最近发布的公告可以编辑！')
//		}
//  },

    reset () {
    	//this.searchForm.id = ''
    	//this.searchForm.circleName = ''
    	this.searchForm.created2 = ''
    	this.searchForm.addTime1 = ''
    	this.searchForm.addTime2 = ''
    	this.time = []
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
      this.selections = selection
    },
    //分页处理
    handleCurrentChange (val) {
    	this.searchForm.pageNum = val
    	this.search()
    },
//	isEditNotice(){
//	    if(this.isEditNotice){
//	      this.dlsgTitle =  "编辑公告"
//	    }else{
//	      this.dlsgTitle =  "新增公告"
//	    }
//	},
    //删除按钮
    openConfirmModal () {
	  if(!this.selections.length){
	  	this.$message.warning('至少选一项！')
	  	return
	  }else{
	        let str = ''
	        let arr = []
	        for(let i=0,len=this.selections.length;i<len;i++){
	          arr.push(this.selections[i].id)
	        }
	        str = arr.join(',')
	        str = '您确定要删除'+ str + '吗？'
	        this.$confirm(str,'删除',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          // 点击确定
	          deleteNotice({ids:arr}).then(res => {
	          	if(res.errorMsg =='' && res.status == '200'){
	          		this.$message.success('删除成功！')
	          		this.search()
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
    }
  },
  	mounted () {
//		this.search()
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
