<template>
	<section>

		<!-- 筛选条件 -->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="24">
				        <div style="float: right;margin-right: 30px;">
				        	<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
				        </div>
					</el-col>
					<el-col :span="12">
						<el-form-item label="群ID：" prop="crowdId">
							<el-input v-model="searchForm.crowdId" disabled></el-input>
						</el-form-item>
						<el-form-item label="快速查看：" prop="quickTime">
							<el-radio-group v-model="searchForm.quickTime" @change="timeChange(1)">
								<el-radio-button label="0">全部</el-radio-button>
								<el-radio-button label="1">今天</el-radio-button>
								<el-radio-button label="2">昨天</el-radio-button>
								<el-radio-button label="3">最近七天</el-radio-button>
								<el-radio-button label="4">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<!--<el-col :span="12">
						<el-form-item label="筛选时间：" prop="time">
							<el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"  @change="timeChange(2)">
							</el-date-picker>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item label="群名称：" prop="crowdName">
							<el-input v-model="searchForm.crowdName" disabled></el-input>
						</el-form-item>
				  <!--<el-form-item label="筛选时间" >
				    <el-col :span="5">
				      <el-form-item prop="startTime">
				        <el-date-picker type="date" placeholder="选择开始日期" v-model="searchForm.startTime" style="width: 100%;"
				        	@change="timeChange(2)" clearable clearable></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="1" style="padding-left:10px;">-</el-col>
				    <el-col :span="5">
				      <el-form-item prop="endTime">
				        <el-date-picker type="date" placeholder="选择结束日期" v-model="searchForm.endTime" style="width: 100%;" @change="timeChange(3)" clearable clearable></el-date-picker>
				      </el-form-item>
				    </el-col>
				  </el-form-item>-->
				  <!--<el-form-item label="筛选时间">
				    <el-col :span="5">
				      <el-form-item prop="addTime1">
							<el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始日期时间" @change="timeChange(2)"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
				    <el-col :span="5">
				      <el-form-item prop="addTime2">
							<el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束日期时间" @change="timeChange(3)" :default-time="['','23:59:59']"></el-date-picker>
				      </el-form-item>
				    </el-col>
				  </el-form-item>-->

					  <el-form-item label="筛选时间：" prop="time">
						    <el-date-picker
						      v-model="time"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']"
						      @change="timeChange(2)">
						    </el-date-picker>
					  </el-form-item>
				  </el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
					<el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin-top: 20px;margin-left: 30px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy" @change="sortChange">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button style="margin-left: 20px;" type="danger" icon="el-icon-delete" @click= "openConfirmModal">删除</el-button>
				<el-button type="success" icon="el-icon-plus" @click= "noticeDlsg=true">新增公告</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%" :default-sort = "{prop: 'date', order: 'descending'}">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="noticeId" label="编号"></el-table-column>
					<el-table-column prop="content" label="内容"></el-table-column>
					<el-table-column prop="noticeType" :formatter="typeFormat" label="公告的发布方式"></el-table-column>
					<el-table-column prop="publishId" label="添加人"></el-table-column>
					<el-table-column prop="publishTime" label="添加时间" sortable></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<!--<el-button v-if="scope.$index == 0 && searchForm.pageNumber == 1" size="mini" @click="editNoticeClick(scope.$index,scope.row)" type="primary">编辑</el-button>
							<el-button v-else size="mini" @click="view(scope.row)" type="info">查看</el-button>-->
							<el-button size="mini" @click="view(scope.row)" type="info">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="searchForm.pageNumber"
					:page-size="searchForm.pageSize" layout="total, prev, pager, next"
					:total="pageTotal">
				</el-pagination>
			</div>
		<el-dialog :title="dlsgTitle" :visible.sync="noticeDlsg" width="30%">
			<div>
				<el-form v-model="noticeForm" ref="noticeForm" label-width="140px">
					<el-form-item prop="content" label="群公告内容">
						<el-input type="textarea" v-model.trim="noticeForm.content" placeholder="请输入公告内容" maxlength="100" resize=none rows=4></el-input>
						<p>*最多可输入100个字</p>
					</el-form-item>
					<el-form-item prop="noticeType" label="公告的发布方式">
						<el-radio-group v-model="noticeForm.noticeType"  >
							<el-radio label="0">常规</el-radio>
							<!--<el-radio label="1">聊天背景</el-radio>
							<el-radio label="2">气泡通知</el-radio>-->
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="saveNotice">保存</el-button>
				<el-button type="danger" @click="closeNotice">关闭</el-button>
			</span>
		</el-dialog>

		<el-dialog title="群公告" :visible.sync="viewDlsg" width="30%">
			<div>
				<el-form v-model="viewForm" ref="viewForm" label-width="140px">
					<el-form-item prop="content" label="群公告内容">
						<el-input type="textarea" v-model="viewForm.content" placeholder="请输入公告内容" maxlength="100" resize=none rows=4 disabled></el-input>
						<p>*最多可输入100个字</p>
					</el-form-item>
					<el-form-item prop="noticeType" label="公告的发布方式">
						<el-radio-group v-model="viewForm.noticeType" disabled>
							<el-radio label="0">常规</el-radio>
							<!--<el-radio label="1">聊天背景</el-radio>
							<el-radio label="2">气泡通知</el-radio>-->
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="viewDlsg = false">关闭</el-button>
			</span>
		</el-dialog>

		<!--<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>-->
	</section>
</template>

<script>
//import confirmModal from '../components/confirmModal'
 // ===========搜索=========新增=======编辑========删除（未调）
  import { searchNotice, addNotice, editNotice, deleteNotice } from '@/api/group/business'
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
      },
      isEditNotice(){
        if(this.isEditNotice){
          this.dlsgTitle =  "编辑公告"
        }else{
          this.dlsgTitle =  "新增公告"
        }
      }
    },
    data() {
      return {
      	time: [],
      	//保存勾选的所有数据
      	selections: [],
      	viewDlsg: false,
      	viewForm: {},
		channelId: '',

        searchForm: {
        	//群id
          //crowdId: '408720828511756288',
          crowdId: '',
       	  crowdName: '',
       	  quickTime: 0,
          startTime: '',
          endTime: '',
          pageSize:10,
          pageNumber:1,
          sortFlag: ''
        },
        time:[],
        pageTotal: 0,
        chooseLen: 0,
        tableData: [],
        options: [
          {
            label: '按时间由近及远',
            value: '1'
          },
          {
            label: '按时间由远及近',
            value: '0'
          }
        ],
        isEditNotice: false,
        dlsgTitle: '新增公告',
        noticeDlsg: false,
        noticeForm: {
          mId:'1234',
          crowdId: '',
          content: '',
          noticeType: ''
          //noticeId: ''
        },
        isSocialContact: true
        //删除的弹出框
//      confirmSetting: {
//        name: '',
//        title: '',
//        show: false
//      }
      }
    },
    methods: {
	backClick () {
		this.$router.push({
			path: '/group/manage/info/detail',
			query:{
		          crowdId: this.searchForm.crowdId,
		          isSocialContact: this.isSocialContact,
		          channelId: this.channelId,
		          isViewOrManage: '2'
			}
		})
	},
	  handelQuery () {
	  	let query = this.$router.currentRoute.query
	  	this.searchForm.crowdId = query.crowdId
	  	this.searchForm.crowdName = query.crowdName
	  	this.channelId = query.channelId
	  	this.search()
	  },

	  //排序
	  sortChange (val) {
	  	this.searchForm.sortFlag = val
	  	this.search()
	  },
      //搜索按钮  查询公告信息
      search () {
      	if (!this.searchForm.crowdId) {
      		this.$message.warning('查找失败,群ID必填！')
      		return
      	}else {
      		searchNotice(this.searchForm).then(res => {
      		//console.log(res)
      		  this.tableData = res.data
      		  this.pageTotal = parseInt(res.totalSize)
      		})
      	}
      },

      //重置按钮
      reset () {
			this.searchForm.quickTime = 0
			this.searchForm.startTime = ''
			this.searchForm.endTime = ''
			this.time = []
      },

      //表格绑定的 changge事件  chooselen 是当前选中XX项的双向绑定数据
      selectionChange(selection) {
      	this.selections = selection
        this.chooseLen = selection.length
      },

      //删除按钮
      openConfirmModal() {
	  if(!this.chooseLen){
	  	this.$message.warning('至少选一项！')
	  	return
	  }else{
	        let str = ''
	        let arr = []
	        for(let i=0,len=this.selections.length;i<len;i++){
	          arr.push(this.selections[i].noticeId)
	        }
	        str = arr.join(',')
	        str = '您确定要删除'+ str + '吗？'
	        this.$confirm(str,'删除',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          // 点击确定
	          deleteNotice(
	          	{
	          		noticeIds: arr,
	          		mId: '11111111'
	          	}
	          	).then(res => {
	          	if(res.data.data == true && res.status == 200){
	          		this.$message.success('删除成功！')
	          		this.search()
	          	}
	          })
	        }).catch(() => {
	          // 点击取消
	        })
	  }
      },

	  view (row) {
	  	this.viewDlsg = true
	  	this.viewForm.content = row.content
	  	this.viewForm.noticeType = row.noticeType

	  },

    	//新增和编辑公告按钮
      saveNotice() {
        // 判断是新增 还是编辑
//      this.$message.success('保存成功')
//      this.noticeDlsg = false
        this.noticeForm.crowdId = this.searchForm.crowdId
        if(!this.isEditNotice){
			if (!this.noticeForm.content || !this.noticeForm.noticeType || !this.noticeForm.crowdId) {
              	this.$message.error('新增失败,请填写公告内容和方式！群ID不能为空！')
              	return
            } else {
            	addNotice(this.noticeForm).then(res => {
            	  if(res.status == 200 && res.data.data == true){
            	    this.search()
            	    this.$message.success('新增公告成功！')
            	    this.noticeForm.content = ''
            	    this.noticeForm.noticeType = ''
            	    this.noticeDlsg = false
            	  } else {
            	  		this.$message.error('新增失败,请刷新后重试！')
            	  }
            	})
            }
        } else if(this.isEditNotice) {
			if(!this.noticeForm.content || !this.noticeForm.noticeType ){
              	this.$message.error('编辑失败,请填写公告内容和方式！')
              	return
            } else {
            	editNotice(this.noticeForm).then(res => {
            	  if(res.status == 200 && res.data.data == true){
            	  	this.noticeForm.content = ''
            	  	this.noticeForm.noticeType = ''
            	    this.search()
            	    this.$message.success('编辑成功!')
            	    this.noticeDlsg = false
            	  }else{
            	    this.$message.error('编辑失败,请刷新后重试！')
            	  }
            	})
            }
        }
      },

      //筛选快速查看和筛选时间
      timeChange (flag) {
      	if(flag === 1){
      		this.time = []
      		this.searchForm.startTime = ''
      		this.searchForm.endTime = ''
      	}if(flag === 2){
      		this.searchForm.quickTime = ''
      	}
      },
      //新增公告弹框的关闭按钮
      closeNotice() {
        this.$message.info('没有增加公告')
        this.noticeDlsg = false
      },
      // 公告的编辑按钮
      editNoticeClick(index, row) {
      	this.noticeForm.noticeId = row.noticeId
      	this.noticeForm.content  = row.content
      	this.noticeForm.noticeType = row.noticeType
        // 给表单赋值
        // 打开dlsg
        this.isEditNotice = true
        this.noticeDlsg = true
      },
      //更改列表中的公告发布方式的状态
      typeFormat(row){
        let type = row.noticeType
        if(type == '0'){
          return '常规'
        }else if(type == '1'){
          return '聊天背景'
        }else if(type == '2'){
          return '气泡通知'
        }
      },





      //分页的当前页码的值
      handleCurrentChange(val) {
        this.searchForm.pageNumber = val
        this.search()
      },


      confirmOk() {
        this.$message.success('删除成功')
        console.log('**删除')
      }
    },
    mounted(){
    	this.handelQuery()
    }
//  components: {
//    confirmModal
//  }
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
