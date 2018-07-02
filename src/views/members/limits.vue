<template>
	<section>
		<div class="search">
			<el-form
				v-model="form"
				ref="form" inline>
				<el-form-item prop="userName" label="用户名：">
					<el-input clearable v-model="form.userName" placeholder="用户名/会员ID/手机号"></el-input>
				</el-form-item>
				<el-form-item prop="operator" label="操作人：">
					<el-input clearable v-model="form.operator" placeholder="请输入操作人"></el-input>
				</el-form-item>
        <el-form-item label="操作时间">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd hh:mm:ss" type="date" placeholder="选择开始日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" style="text-align:center;" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd hh:mm:ss" type="date" placeholder="选择结束日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
				<el-form-item>
					<el-button type="info" @click="getBanSearch" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="text" @click="resetForm">显示全部记录(重置)</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table :data="dataList" border>
				<el-table-column prop="userName" label="用户名"></el-table-column>
				<el-table-column prop="phone" label="手机"></el-table-column>
				<el-table-column prop="role" label="角色"></el-table-column>
				<el-table-column prop="rank" label="等级"></el-table-column>
				<!-- <el-table-column prop="currentstate" label="当前状态"></el-table-column> -->
				<el-table-column prop="creditLine" label="信用额度"></el-table-column>
				<el-table-column prop="peopleVal" label="人脉值"></el-table-column>
				<el-table-column prop="sendLightNumber" label="发灯数"></el-table-column>
				<el-table-column prop="clickLightNumber" label="点灯数"></el-table-column>
				<el-table-column prop="registerTime" label="注册日期"></el-table-column>
				<!-- <el-table-column prop="state" label="状态"></el-table-column> -->
				<el-table-column prop="lastUpdBy" label="操作人"></el-table-column>
				<el-table-column prop="lastUpd" :formatter="formatterTime" label="操作日期"></el-table-column>
				<el-table-column prop="bannedReason" label="封禁原因"></el-table-column>


				<el-table-column label="操作" width="120" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="resolveLimit(scope.$index,scope.row)">解封</el-button>
						<!-- <el-button type="text" @click="view(scope.$index,scope.row)">查看</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination center">
        <el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="form.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
					:page-size="form.pageSize"
					:total="totalPage">
				</el-pagination>
			</div>
		</div>
	</section>
</template>

<script>
//   ======解封==========封禁列表==========
import { unBanMember, getSocialBanMember } from '@/api/members'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      totalPage: '',
      form: {
        userName: '', // 昵称
        rate: '', // 等级
        role: '', // 角色
        operator: '', // 操作人
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        pageSize: '5', // 页条
        pageNum: 1 // hao
      },
      rates: [
        {
          value: '1',
          label: '全部等级'
        }
      ],
      roles: [
        {
          value: '1',
          label: '角色1'
        }
      ],
      channels: [
        {
          value: '1',
          label: '全部'
        }
      ],
      statuses: [
        {
          value: '1',
          label: '全部'
        }
      ],
      // dataList: {
      //   userName: '', //用户名
      //   phone: '', //	手机号
      //   role: '', // 角色
      //   rank: '', // 等级
      //   creditLine: '',	 // 信用额度
      //   peopleVal: '', //	人脉值
      //   sendLightNumber: '', //	发等数
      //   clickLightNumber: '',	// 点灯数
      //   registerTime: '', //	注册时间
      //   lastUpdBy: '', //	操作人
      //   lastUpd: '', //	操作时间
      //   bannedReason: '', //封禁原因
      //   total: '' //	总条数
      // }
      dataList: []
    }
  },
  mounted () {
    this.getBanSearch()
  },
  methods: {
    formatterTime(row,column) {
      if (row.lastUpd) {
        return parseTime(row.lastUpd)
      } else {
        return ''
      }
    },
    resetForm() {
        this.form = {
        userName: '', // 昵称
        rate: '', // 等级
        role: '', // 角色
        operator: '', // 操作人
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        pageSize: '5', // 页条
        pageNum: 1 // hao
      }
      this.$message.success('重置成功')
      this.getMember()
    },
    // 点击查询事件
    getBanSearch () {
      console.log(this.form)
      this.getMember()
    },
    // 会员封禁列表查询
    getMember () {
      getSocialBanMember (this.form)
      .then( res => {
        this.dataList = []
        if (res.length == 0) {
          this.dataList = []
          this.$message.warning('没有数据')
          return
        }
        if(res == 'systemError') {
          this.dataList = []
          this.$message.warning('系统错误，请联系管理员')
          return
        }
        console.log(res)
        this.dataList = res
        this.totalPage = Number(res[0].total)
        this.$message.success('获取封禁列表成功')
      })
      .catch(() => {
        this.$message.error('获取封禁列表失败')
      })
    },
    create() {
      this.$router.push('/staff/new')
    },
    resolveLimit(index, row) {
      this.$confirm('确定解封吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          unBanMember({mId: row.mId})
            .then(res => {
              this.getBanSearch()
              this.$message.success('解封成功')
            })
            .catch(() => {
              this.$message.error('解封失败')
            })
        })
        .catch(() => {
          // 取消
          this.$message.info('已取消')
        })
    },
    view(index, row) {
      this.$router.push('/staff/detail')
      console.log('查看')
    },
//  // 改变页条事件
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getBanSearch ()
    },
    // 翻页事件
    handleCurrentChange (val) {
      this.form.pageNum = val
      this.getBanSearch ()
    }
  }
}
</script>

<style scoped lang="scss">
.search,
.table {
  margin: 20px 20px;
}
.center {
  margin: 20px auto;
  text-align: center;
}
</style>
