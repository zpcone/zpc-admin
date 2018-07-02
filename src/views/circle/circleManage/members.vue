<!--圈成员-->
<template>
	<section>
    <div style="margin-top:10px;height:50px;position:relative;">
    	<el-button style="position:absolute; left: 20px;" type="info" @click="backClick" icon="el-icon-back">返回</el-button>
      <!-- <el-button style="position:absolute; rigiht:20px;" @click="addMember" type="primary">新增添加成员</el-button> -->
      <el-button style="float:right;margin-right:20px;" @click="addMember" type="primary">新增圈成员</el-button>
    </div>
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item prop="roleType" label="角色筛选：">
							<el-radio-group v-model="searchForm.roleType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="5">圈主</el-radio-button>
								<el-radio-button label="4">群主</el-radio-button>
								<el-radio-button label="3">联席群主</el-radio-button>
								<el-radio-button label="2">行为会员</el-radio-button>
								<el-radio-button label="1">观摩会员</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="性别：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="男"></el-radio-button>
								<el-radio-button label="女"></el-radio-button>
							</el-radio-group>
						</el-form-item> -->
						<el-form-item prop="styleType" label="进圈风格：">
							<el-radio-group v-model="searchForm.styleType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">高调</el-radio-button>
								<el-radio-button label="2">低调</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item prop="intoMode" label="进圈方式：">
							<el-radio-group v-model="searchForm.intoMode">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">主动进圈</el-radio-button>
								<el-radio-button label="2">被邀请进圈</el-radio-button>
								<el-radio-button label="3">后台增设</el-radio-button>
								<el-radio-button label="4">扫码推荐</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="地区：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="省份"></el-radio-button>
								<el-radio-button label="城市"></el-radio-button>
							</el-radio-group>
						</el-form-item> -->
					</el-col>
					<el-col :span="10">
						<!--右侧-->
            <!--<el-form-item label="进圈时间：">
              <el-col :span="11">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="开始时间" v-model="searchForm.createBeginDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col style="margin-left:15px;" :span="1">-</el-col>
              <el-col :span="11">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="结束时间" v-model="searchForm.createEndDate" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>-->

			  <el-form-item label="进圈时间" prop="time">
				    <el-date-picker
				      v-model="time"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']">
				    </el-date-picker>
			  </el-form-item>

						<!-- <el-form-item label="筛选时间：">
							<div class="clearfix">
								<div class="fl">
									<el-select>
										<el-option>按日期排序</el-option>
									</el-select>
								</div>
								<div class="fl padLR15">
									<el-date-picker
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							    </el-date-picker>
								</div>
							</div>
						</el-form-item> -->
			<el-form-item prop="circleId" label="圈ID：">
              <el-row>
                <el-col :span="15">
                  <el-input placeholder="请输入圈ID" disabled v-model="searchForm.circleId"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
				<el-form-item prop="circleName" label="圈名称：">
              <el-row>
                <el-col :span="15">
                  <el-input disabled v-model="circleName"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- <el-form-item label="群名称：">
              <el-row>
                <el-col :span="15">
                  <el-input></el-input>
                </el-col>
              </el-row>
            </el-form-item> -->
            <!-- memberId; -->
            <el-form-item prop="memberId" label="会员ID：">
              <el-row>
                <el-col :span="15">
                  <el-input placeholder="请输入会员ID" clearable v-model="searchForm.memberId"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- <el-form-item label="会员名称：">
              <el-row>
                <el-col :span="15">
                  <el-input></el-input>
                </el-col>
              </el-row>
            </el-form-item> -->
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
        </el-form-item>
			</el-form>
			<div class="setting">
				<!--排序 + 全选 + 已选中项数-->
				<!-- <span>圈成员列表排序：</span>
				<el-select placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
				<span style="margin-right:10px;">当前选中{{chooseLen}}项</span>
				<el-button type="danger" @click="kickout" icon="el-icon-delete">踢出圈</el-button>
        <el-upload style="display:inline-block;float:right;margin-right:10px;"
          class='ensure ensureButt'
          :action="uploadExcelUrl()"
          :data="getdata"
          name="file"
          :show-file-list="isShowFiles"
          :onError="uploadError"
          :onSuccess="uploadSuccess"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv"
          :beforeUpload="beforeAvatarUpload"
          :auto-upload="true">
          <el-button @click="daoRuUser" type="success" icon="el-icon-setting">批量导入用户</el-button>
        </el-upload>
				<!-- <el-button type="danger" @click="showJoinBlackDiag" icon="el-icon-error">加入黑名单</el-button> -->
				<!-- <el-button type="warning" icon="el-icon-warning">发出警告</el-button> -->
				<!-- <el-button type="success" icon="el-icon-setting">设置履职周期</el-button> -->

        <el-button @click="showJoinBlackDiag" style="height:40px;" v-if="$route.query.channelType == '2'" size="small" type="primary">加入黑名单</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="memberId" label="会员ID" width="170"></el-table-column>
					<el-table-column prop="memberName" label="会员名称"></el-table-column>
					<el-table-column prop="roleType" label="圈内角色" :formatter="formatterRole"></el-table-column>
					<el-table-column prop="circleNickName" label="圈内昵称"></el-table-column>
					<el-table-column prop="isBlackList" :formatter="formatterBlack" label="是否在黑名单"></el-table-column>
					<el-table-column sortable prop="level" label="圈内等级"></el-table-column>
					<el-table-column sortable prop="personalValue" label="人脉值"></el-table-column>
					<el-table-column sortable prop="angelValue" label="天使值"></el-table-column>
					<el-table-column sortable prop="lightNumber" label="接灯数"></el-table-column>
					<el-table-column sortable prop="sendLightNumber" label="发灯数"></el-table-column>
					<el-table-column sortable prop="beansTotalNumber" label="豆总数"></el-table-column>
					<el-table-column sortable prop="coinTotalValue" label="币总数"></el-table-column>
					<!-- <el-table-column prop="realizationNumber" label="变现次数"></el-table-column> -->
					<!-- <el-table-column prop="realizationAmount" label="变现金额"></el-table-column> -->
					<!--<el-table-column sortable prop="warnNumber" label="警告次数"></el-table-column>-->
					<el-table-column sortable prop="intoCircleTime" label="进圈时间" width="170"></el-table-column>
					<el-table-column  prop="intoMode" label="进圈方式"></el-table-column>
					<el-table-column width="180">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewClick(scope.$index, scope.row)">查看</el-button>
							<el-button type="warning" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
      <el-dialog
        title="踢出圈子"
        :visible.sync="kickOutDialog"
        width="30%"
        :before-close="handleClose">
        <div style="text-align:center;">确定踢出圈子吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="kickOutDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveKickout">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="加入黑名单"
        :visible.sync="insertBlackDialog"
        width="30%"
        :before-close="handleClose">
        <div style="text-align:center;">确定把会员加入黑名单吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="insertBlackDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveInsertBlackDialog">确 定</el-button>
        </span>
      </el-dialog>
			<div class="pagination center">
				<el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchForm.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="searchForm.pageSize"
        :total="totalPage"></el-pagination>
			</div>
		</el-card>
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>

</template>

<script>
// ========查询圈成员=======踢出圈成员=====加入黑名单---导入用户
import { getCircleMember, kickOutMember, joinBlack, daoruUserExcel } from '@/api/circle/info'
import { userUploadExcelUrl } from '@/api/commUrl'
import confirmModal from '../components/confirmModal'
import { parseTime } from '@/utils'
export default {
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.searchForm.createBeginDate = parseTime(this.time[0])
            this.searchForm.createEndDate = parseTime(this.time[1])
          }

        }else{
          this.searchForm.createBeginDate = ''
          this.searchForm.createEndDate = ''
        }

      }
    },
  data() {
    return {
      isShowFiles: false,
      getdata:{
        circleId: this.$route.query.id
      },
    	circleOwner: false,
      channelType: '',
      time: [],
      getAlldata: [],
      gatChecked: [],
      circleName: '',
      status: true,
      kickOutDialog: false,
      insertBlackDialog: false,
      totalPage: '', // 总条数
      searchForm: {
      	memberId: '',
        roleType: '', // 角色帅选
        styleType: '', // 进圈风格
        intoMode: '', // 进圈方式
        createBeginDate: '', // 开始时间
        createEndDate: '', // 结束时间
        circleId: '',
        pageNum: '1',
        pageSize: '5'
      },
      tableData: [{id:123}],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      options: [
        {
          label: '按接灯数由高到低排序',
          value: '1'
        },
        {
          label: '按人脉值由高到低排序',
          value: '2'
        },
        {
          label: '按发灯数由高到低排序',
          value: '3'
        },
        {
          label: '按币总数由高到低排序',
          value: '4'
        },
        {
          label: '按豆总数由高到低排序',
          value: '5'
        },
        {
          label: '按会员等级排序',
          value: '6'
        },
        {
          label: '按变现次数由高到低排序',
          value: '7'
        },
        {
          label: '按变现金额由大到小排序',
          value: '8'
        }
      ],
      chooseLen: 0,
      pageSize: 10,
      pageNum: 2
    }
  },
  components: {
    confirmModal
  },
  methods: {
    //  <!-- action="https://dev.womaoapp.com//fwas-circle-admin/sys/circleMember/batchImportMembers" -->
    uploadExcelUrl(){
      return userUploadExcelUrl
    },
	backClick() {
		this.$router.push({
			path: '/circlemanage/manage/info/detail',
			query: {
				id: this.searchForm.circleId,
				channelType: Number(this.channelType),
				channelName: this.circleName,
			}
		})
	},
    // 黑名单格式化
    formatterBlack(row,column) {
      if (row.isBlackList == '0') {
        return '否'
      } else if (row.isBlackList == '1') {
        return '是'
      }
    },
    // 角色格式化
    formatterRole(row) {
      if (row.roleType == '1') {
        return '观摩'
      } else if (row.roleType == '2') {
        return '行为'
      } else if (row.roleType == '3') {
        return '联席群主'
      } else if (row.roleType == '4') {
        return '群主'
      } else if (row.roleType == '5') {
        return '圈主'
      }
    },
    // 重置按钮  2018.6.7 xiu
    reset() {
    	this.time = []
    	this.searchForm.roleType = ''
    	this.searchForm.styleType = ''
    	this.searchForm.intoMode = ''
    	this.searchForm.createBeginDate = ''
    	this.searchForm.createEndDate = ''
    	this.searchForm.memberId = ''
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload (file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log('上传模板只能是 xls、xlsx、格式!')
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 && isLt2M
    },
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      if (response.data.data) {
        this.$message.success('上传成功')
        this.isShowFiles = true
        this.getMember()
      } else {
        this.isShowFiles = false
        this.$message.error('上传失败')
      }
      // console.log('上传文件')
      console.log(response)
      // this.ruleForm.user = response
      // console.log(this.ruleForm)
    },
    // 上传错误
    uploadError (response, file, fileList) {
      this.$message.warning('上传失败，请重试！')
      // console.log('上传失败，请重试！')
    },
    // 添加成员
    addMember() {
      this.$router.push({
        path: '/circlemanage/manage/addMember',
        query: {
          id: this.$route.query.id,
          channelType: this.$route.query.channelType,
          circleName: this.$route.query.circleName
        }
      })
      // this.$router.push(`/circlemanage/manage/addMember/${this.status}`)
    },
    // 翻页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getMember()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = String(val)
      this.getMember()
    },
    // 点击查询事件
    search() {
      this.getMember()
    },
    // 查询圈成员
    getMember () {
      getCircleMember(this.searchForm)
      .then(res => {
        this.totalPage = Number(res.totalSize)
        this.tableData = res.data
        this.$message.success('成功获取圈成员')
      })
      .catch(() => {
        this.$message.error('查询圈成员失败')
      })
    },
    // 踢出圈成员
    kickout () {
	    if(!this.getAlldata.length){
	    	this.$message.info('请选择勾选项')
	    }else{
	    	for(let i=0;i<this.getAlldata.length;i++){
	    		this.gatChecked.push(this.getAlldata[i].memberId)
	    		if(this.getAlldata[i].roleType == '5'){
	    			this.$message.warning('圈主不可踢出！')
	    			this.kickOutDialog = false
	    			return
	    		}
	    	}
	    	this.kickOutDialog = true
	    }
    },
    // 加入黑名单
    showJoinBlackDiag() {
      var status = false
      this.getAlldata.forEach(ele => {
        if (ele.isBlackList == '1') {
          status = true
        }
      })
      if (status) {
        this.$message.warning('选项已经黑名单项,请重新选择')
        return
      }
      if(this.gatChecked.length > 0) {
        this.insertBlackDialog = true
      } else {
        this.$message.info('请选择勾选项')
      }
    },
    // 确定踢出-事件
    saveKickout() {
      var obj = {}
      obj.bePlayLists = this.gatChecked
      obj.circleId = this.$route.query.id
      kickOutMember(obj)
      .then(res => {
//    	if(res.status == '200'){}
        this.getMember()
        this.kickOutDialog = false
        this.$message.success('成功踢出')
      })
      .catch(() => {
        this.$message.error('踢出失败')
      })
    },
    // 确定加入黑名单-事件
    saveInsertBlackDialog() {
      var obj = {}
      // 确少userId
      obj.blackLists = this.gatChecked
      obj.circleId = this.$route.query.id
      console.log(obj)
      joinBlack(obj)
      .then(res => {
        this.insertBlackDialog = false
        this.$message.success('加入黑名单成功')
        this.search()
      })
      .catch(() => {
        this.$message.error('加入黑名单失败')
      })
    },
    // 详情查看是1 编辑是2
    viewClick(index, row) {
      this.status = false
      this.$router.push({
        path: '/circlemanage/manage/member/detail',
        query: {
          status: 1,
          id: this.$route.query.id,
          channelType: this.$route.query.channelType,
          memberId: row.memberId
        }
      })
      // this.$router.push(`/circlemanage/manage/addMember/${this.status}`)
      // this.$router.push(`/circlemanage/manage/member/detail/${this.status}`)
    },
    edit(index, row) {
      this.status = true
      this.$router.push({
        path: '/circlemanage/manage/member/edit',
        query: {
          status: 2,
          id: this.searchForm.circleId,
          channelType: this.$route.query.channelType,
          memberId: row.memberId

        }
      })
      // this.$router.push(`/circlemanage/manage/member/detail/${this.status}`)
    },
    selectionChange (data) {
    	this.getAlldata = data
    	this.chooseLen = data.length
    	var arr = []
	      data.forEach(ele => {
	      		arr.push(ele.memberId)
	      })
	      this.gatChecked = arr
    },
    // openConfirmModal(title) {
    //   console.log(title)
    //   // 获取要操作的群名称
    //   this.confirmSetting.title = title
    //   this.confirmSetting.show = true
    // },
    // selectionChange(selection) {
    //   this.chooseLen = selection.length
    // },
    confirmOk() {
      console.log('ok')
    }
  },
  mounted () {
    this.searchForm.circleId = this.$route.query.id
    // this.searchForm.circleId = '1445626278108614656'
    this.channelType = this.$route.query.channelType
    this.circleName = this.$route.query.circleName
    // var obj = {}
    // obj.circleId = '439455200533413888'
    // obj.pageNumber = '1'
    // obj.pageSize = '5'
    this.getMember()
  }
}
</script>

<style scoped>
.clearfix {
  zoom: 1;
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
.el-tag{
  display: inline-block;
  width: 70px;
  text-align: center;
}
</style>
