<template>
	<section>
		<div class="create">
			<!-- <el-button type="primary" icon="el-icon-plus" @click="create">添加用户</el-button> -->
		</div>
		<hr />
		<div class="search">
			<el-form v-model="form"
				ref="ruleForm" inline>
				<el-form-item prop="user" label="用户：">
					<el-input clearable v-model="form.user" placeholder="ID/用户名/手机号"></el-input>
				</el-form-item>
				<!-- <el-form-item prop="rate" label="等级：">
					<el-select clearable v-model="form.rate">
						<el-option v-for="item in levels" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
				</el-form-item> -->
				<!-- <el-form-item prop="createLimit" label="信用额度大于：">
					<el-input v-model="form.createLimit" placeholder=""></el-input>
				</el-form-item> -->
				<!-- <el-form-item prop="peopleValue" label="人脉值大于：">
					<el-input v-model="form.peopleValue" placeholder=""></el-input>
				</el-form-item> -->
				<!-- <el-form-item prop="currentstate" label="当前状态：">
					<el-select clearable v-model="form.currentstate">
						<el-option v-for="item in currentstates" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item prop="state" label="状态：">
					<el-select clearable v-model="form.state">
						<el-option v-for="item in statuses" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="注册日期：">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align:center;" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="info" icon="el-icon-search" @click="searchClick">查询</el-button>
					<!-- <el-button type="info" icon="el-icon-search" @click="searchClickTest">test</el-button> -->
					<el-button type="text" @click="resetForm()">显示全部记录（重置）</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table :data="data" border>
				<el-table-column prop="mId" label="用户MID"></el-table-column>
				<el-table-column prop="userId" label="用户ID"></el-table-column>
				<el-table-column prop="inviteCode" label="邀请码"></el-table-column>
				<el-table-column prop="userName" label="用户名"></el-table-column>
				<el-table-column prop="phone" label="手机"></el-table-column>
				<el-table-column prop="registrySource" label="注册应用"></el-table-column>
				<el-table-column prop="userRate" label="等级"></el-table-column>
				<el-table-column prop="currentstate" label="当前状态"></el-table-column>
				<!-- <el-table-column prop="createLimit" label="信用额度"></el-table-column> -->
				<!-- <el-table-column prop="peopleValue" label="人脉值"></el-table-column> -->
				<el-table-column prop="sendLightNumber" label="发灯数"></el-table-column>
				<el-table-column prop="clickLightNumber" label="点灯数"></el-table-column>
				<!-- <el-table-column prop="registerTime" label="注册日期"></el-table-column> -->
				<el-table-column prop="state" label="状态"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="resetPass(scope.$index,scope.row)">重置密码</el-button>
						<el-button type="text" @click="limitMember(scope.$index,scope.row)">封</el-button>
						<!-- <el-button type="text" @click="deletaMem(scope.$index,scope.row)">删除</el-button> -->
						<el-button type="text" @click="view(scope.$index,scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
      <!-- 翻页 -->
			<div style="text-align:center;" class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="form.pageNumber"
					:page-size="pageSize" layout="total, prev, pager, next"
					:total="totalPage">
				</el-pagination>
			</div>
		</div>
		<!--封禁对话框-->
		<el-dialog
			title="封禁操作"
			:visible.sync="dialogLimit"
			width="40%">
      <p class="reminderSpan">说明:封禁操作是指禁止客户端操作</p>
			<el-form style="margin-left:50px;" v-model="person" ref="person" label-width="200">
				<el-form-item label="用户ID">
					<soan>{{person.id}}</soan>
				</el-form-item>
				<el-form-item label="用户名">
					<span>{{person.name}}</span>
				</el-form-item>
				<el-form-item label="封禁原因" >
          <el-radio-group v-model="person.reason">
            <div style="margin-top:10px;"></div>
            <el-radio :label="1">发广告</el-radio>
            <el-radio :label="2">发政治内容</el-radio>
            <el-radio :label="3">发色情内容</el-radio>
            <div style="padding:10px;"></div>
            <el-radio :label="4">辱骂他人</el-radio>
            <el-radio :label="5">其他</el-radio>
          </el-radio-group>
					<!-- <el-radio-group v-model="person.reason">
						<el-radio v-for="item in reasons" :label="item.label" :key="item.label">{{item.value}}</el-radio>
					</el-radio-group> -->
				</el-form-item>
				<!-- <el-form-item prop="day" label="封禁时长">
					<el-select disabled v-model="person.day">
						<el-option v-for="item in days" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
				</el-form-item> -->
			</el-form>
			<span slot="footer">
				<el-button type="success" @click="limitblocked">封禁</el-button>
				<el-button type="info" @click="dialogLimit=false">取消</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
// =========查询 ======重置密码  ===========封号=======删除======   解封====
import { getMallMember, resetMemberPassword, banMember, deleteMember, unBanMember } from '@/api/members'
export default {
  data() {
    return {
      limitId: '',
      dialogLimit: false,
      // createLimit: '', // 信用额度
      // peopleValue: '', // 人脉值大于
      totalPage: '', // 总条数
      form: {
        user: '', // 支持用户 id,用户名,手机号搜索
        rate: '', // 等级
        currentstate: '', // 当前状态
        state: '', // 状态
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        pageSize: '10', // 每页条数
        pageNumber: '1', // 页数
      },
      levels: [
        {
          value: '1',
          label: '等级1'
        },
        {
          value: '2',
          label: '等级2'
        }
      ],
      currentstates: [
        {
          value: '1',
          label: '在线'
        },
        {
          value: '2',
          label: '离线'
        }
      ],
      // channels: [
      //   {
      //     value: '1',
      //     label: '全部'
      //   }
      // ],
      statuses: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '已经封禁'
        }
      ],
      data: [
      ],
      dialog: false,
      person: {
        id: '54654654564',
        name: '',
        reason: '',
        day: ''
      },
      days: [
        {
          value: '1',
          label: '1天'
        },
        {
          value: '2',
          label: '7天'
        },
        {
          value: '3',
          label: '10天'
        },
        {
          value: '4',
          label: '一个月'
        },
        {
          value: '5',
          label: '永久'
        }
      ],
      currentPage: 2
    }
  },
  methods: {
    // 点击封禁
    limitblocked () {
      console.log(this.person)
      var obj = {
        mId: this.limitId,
        banReasonType: this.person.reason
      }
      if (this.person.reason) {
        banMember (obj)
        .then(res => {
          this.$message.success('封禁成功')
          this.person.reason = ''
          this.dialogLimit = false
        })
        .catch(() => {
          this.$message.error('封禁失败')
        })
      } else {
        this.$message({
          message: '请确定封禁原因',
          type: 'info'
        })
      }
      console.log(this.person)
    },
    // 点击重置form表单
    resetForm (formName) {
      this.form.user = ''
      this.form.rate = ''
      this.form.currentstate = ''
      this.form.state = ''
      this.form.startTime = ''
      this.form.endTime = ''
      this.$message.success('重置成功')
      this.search()
    },
    // 点击查询
    searchClick() {
      this.search()
    },
    // 调用搜索接口
    search () {
      var _this = this
      getMallMember (this.form)
      .then(res => {
        _this.data = []
        if (!res.length) {
          _this.totalPage = 0
          _this.$message.warning('没有数据')
          return
        }
        if (res == 'systemError') {
          _this.totalPage = 0
          _this.$message.warning('系统错误，请联系管理员')
          return
        }
        _this.$message.success('查询成功')
        _this.totalPage = Number(res[0].total)
        _this.data = res
      })
      .catch(() => {
        _this.$message({
          message: '查询失败',
          type: 'error'
        })
      })
    },
    create() {
      this.$router.push('/myMao/new')
    },
    resetPass(index, row) {
      console.log(index)
      console.log(row)
      this.$confirm('（重置后密码统一设置为：w12345）', '确定重置该用户密码?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          // resetMemberPassword({memberId: "424242130987126784"})
          var obj = {memberId: row.mId}
          resetMemberPassword(obj)
          .then(res => {
            this.$message.success('重置成功')
          })
          .catch(() => {
            this.$message.error('重置失败')
          })
        })
        .catch(() => {
          this.$message.info('已取消重置')
        })
    },
    limitMember(index, row) {
      this.dialogLimit = true
      this.limitId = row.mId
      this.person.id = row.userId
      this.person.name = row.userName
    },
    deletaMem(index, row) {
      this.$confirm('（删除将不可恢复，请谨慎操作）', '确定删除用户?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          deleteMember({mId: row.mId})
          .then(res => {
            this.$message.success('删除成功')
            this.search()
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 点击查看详情
    view(index, row) {
      this.$router.push(`/myMao/detail/${row.mId}`)
      // this.$router.push('/staff/detail')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 点击翻页
    handleCurrentChange(val) {
      this.form.pageNumber = val
      console.log(`当前页: ${val}`)
      this.search()
    }
    // ajax() {
    //   console.log('(((((((((((((')
    //   getMember({ id: '1' })
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  },
  created() {
    this.search()
  }
}
</script>

<style scoped lang="scss">
.create {
  height: 70px;
  line-height: 70px;
  text-align: right;
  padding-right: 20px;
}
hr {
  height: 2px;
  border: none;
  border-top: 1px solid #ccc;
}
.search,
.table {
  padding: 0 20px;
}
.center {
  float: right;
  margin:20px  20px 0  0;
}
.reminderSpan{
  color: red;
  margin-left: 20px;
  font-weight: bold;
  font-size: 16px;
}
</style>
