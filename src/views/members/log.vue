<template>
	<section>
		<div class="search">
			<el-form
				v-model="form"
				ref="form" inline>
				<el-form-item prop="userName" label="用户名：">
					<el-input v-model="form.userName" placeholder="ID/用户名/手机号"></el-input>
				</el-form-item>
				<!-- <el-form-item prop="channel" label="渠道：">
					<el-select v-model="form.applicationId">
						<el-option v-for="item in channels" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
				</el-form-item> -->
        <el-form-item label="登录时间：">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.loginStartTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left: 10px;">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
				<el-form-item>
					<el-button @click="search" type="info" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="text">显示全部记录</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table :data="tableData" border>
				<el-table-column prop="userName" label="用户名"></el-table-column>
				<el-table-column prop="phone" label="手机"></el-table-column>
				<el-table-column prop="loginTime" label="登录时间" :formatter="timeFormatter"></el-table-column>
				<!-- <el-table-column prop="ip" label="IP"></el-table-column> -->
				<el-table-column prop="loginType" label="登录方式"></el-table-column>
				<el-table-column prop="osType" label="设备"></el-table-column>
				<!-- <el-table-column prop="apply" label="应用"></el-table-column> -->
			</el-table>
			<div class="pagination center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50]"
          :current-page.sync="form.pageNum"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
			</div>
		</div>
	</section>
</template>
<script>
import { loginLog} from '@/api/members'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      pageTotal: '',
      tableData: [],
      form: {
        userName: '',
        applicationId: '',
        loginStartTime: '',
        loginEndTime: '',
        pageSize: '5',
        pageNum: '1'
      },
      time: [],
      channels: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '电商'
        },
        {
          value: '2',
          label: '社交'
        },
      ],
      data: [],
      pageSize: 10,
      pageNum: 1
    }
  },
  computed: {},
  watch: {
    // time() {
    //   this.form.startTime = this.time[0]
    //   this.form.endTime = this.time[1]
    // },
    // pageSize() {
    //   this.form.pageSize = this.pageSize
    // },
    // pageNumber() {
    //   this.form.pageNum = this.pageNum
    // }
  },
  methods: {
    timeFormatter(row,column) {
      if (row.loginTime) {
        return parseTime(row.loginTime)
      } else {
        return ''
      }
    },
    search() {
      console.log('搜索')
      this.getata()
    },
    getata () {
      loginLog(this.form)
      .then(res =>{
        this.pageTotal = res.totalRecordCount
        this.tableData = res.data
        this.$message.success('查询成功')
      })
      .catch(() => {
        this.$message.error('查询失败')
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getata()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getata()
    }
  },
  mounted () {
    this.getata()
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
