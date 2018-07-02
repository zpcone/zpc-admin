<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="140px"
        style="background: #f1f1f1;padding: 20px 0;">
        <el-row>
          <el-col :span="15">
            <el-form-item prop="channel" label="渠道：">
              <el-radio-group v-model="form.channel">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">电商</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="" label="发生日期：">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="—"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                clearable>
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item prop="" label="账户主体名称：">
              <el-input class="searchInput" v-model="form.userName" placeholder="请输入用户名称查询"></el-input>
            </el-form-item> -->
          <!-- </el-col>
          <el-col :span="12"> -->
            <!-- <el-form-item prop="type" label="账户类型：">
              <el-radio-group v-model="form.type">
                <el-radio-button :label="0">全部</el-radio-button>
                <el-radio-button :label="1">个人</el-radio-button>
                <el-radio-button :label="2">平台</el-radio-button>
                <el-radio-button :label="3">圈</el-radio-button>
                <el-radio-button :label="4">供应商</el-radio-button>
              </el-radio-group>
            </el-form-item>  -->
            <!-- <el-form-item prop="sep" label="账户类别：">
              <el-radio-group v-model="form.sep">
                <el-radio-button :label="0">全部</el-radio-button>
                <el-radio-button :label="1">豆</el-radio-button>
                <el-radio-button :label="2">生豆</el-radio-button>
                <el-radio-button :label="3">币</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item prop="handleType" label="业务类别：">
              <el-radio-group v-model="form.handleType">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="-2">禁用</el-radio-button>
                <el-radio-button label="-1">删除</el-radio-button>
                <el-radio-button label="1">创建</el-radio-button>
                <el-radio-button label="2">解禁</el-radio-button>
                <el-radio-button label="20">修改信息</el-radio-button>
                <el-radio-button label="30">实名注册</el-radio-button>
                <el-radio-button label="31">实名更新注册</el-radio-button>
                <el-radio-button label="32">修改手机号</el-radio-button>
                <el-radio-button label="35">实名认证</el-radio-button>
                <el-radio-button label="-40">解绑银行卡</el-radio-button>
                <el-radio-button label="40">绑定银行卡</el-radio-button>
                <el-radio-button label="41">修改银行卡手机号</el-radio-button>
                <el-radio-button label="50">设置支付密码</el-radio-button>
                <el-radio-button label="51">修改支付密码</el-radio-button>
                <el-radio-button label="52">找回支付密码</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="launchUserRole" label="发起者身份：">
              <el-radio-group v-model="form.launchUserRole">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">系统</el-radio-button>
                <el-radio-button label="1">用户</el-radio-button>
                <el-radio-button label="2">平台</el-radio-button>
                <el-radio-button label="3">运营人员</el-radio-button>
                <el-radio-button label="4">客服</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
        <el-form-item style="margin: 15px 0;text-align: center;">
          <el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
          <el-button style="min-width: 120px;" @click="back">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 20px;">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="id" label="aid"></el-table-column>
        <el-table-column prop="aType" :formatter="aTypeFormatter" label="账户类型"></el-table-column>
        <el-table-column prop="created" label="发生时间"></el-table-column>
        <el-table-column prop="channel" :formatter="channelFormatter" label="渠道类型"></el-table-column>
        <el-table-column prop="handleName" label="操作名称"></el-table-column>
        <el-table-column prop="handleType" label="操作类型" :formatter="handleTypeFormat"></el-table-column>
        <el-table-column prop="userRealName" label="用户真实姓名"></el-table-column>
        <el-table-column prop="prevAccountStatus" :formatter="prevAccountFormat" label="变更前账户状态"></el-table-column>
        <el-table-column prop="afterAccountStatus" :formatter="afterAccountFormat" label="变更后账户状态"></el-table-column>
        <el-table-column prop="launchUserRole" :formatter="launchUser" label="发起者身份"></el-table-column>
        <el-table-column prop="payPwd" label="支付密码"></el-table-column>
        <el-table-column prop="modifyCause" label="变更原因"></el-table-column>
        <el-table-column prop="operDepict" label="操作描述"></el-table-column>
        <el-table-column prop="modifyCause" label="变更原因"></el-table-column>
        <el-table-column prop="createdby" label="操作人"></el-table-column>
      </el-table>
    </div>
    <div class="m20 center">
      <el-pagination
    	  @current-change="handleCurrentChange"
    	  :current-page.sync="form.pageNum"
    	  :page-size="form.pageSize"
    	  layout="total, prev, pager, next"
    	  :total="pageTotal">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { searchOperRecord } from '@/api/account'
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.create = this.time[0]
          this.form.created = this.time[1]
        } else {
          this.form.create = ''
          this.form.created = ''
        }
      }
    }
  },
  data() {
    return {
      pageTotal: '',
      form: {
        channel: '',
        create: '',
        created: '',
        launchUserRole: '',
        handleType: '',
        pageSize: 10,
        pageNum: 1
      },
      time: [],
      tableData: []
    }
  },
  methods: {
    // 获取列表
    conditionList() {
      searchOperRecord(this.form).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data
          this.pageTotal = Number(res.data.totalRecordCount)
        } else {
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    },
    streamType(row) {
      console.log(row.channel)
      if (row.channel === '1') {
        return '电商'
      } else if (row.channel === '2') {
        return '社交'
      }
    },
    launchUser(row) {
      const di = {
        '0': '系统',
        '1': '用户',
        '2': '后台'
      }
      return di[row.launchUserRole]
    },
    // 变更前
    prevAccountFormat(row) {
      const status = {
        '0': '正常',
        '1': '禁用'
      }
      return status[row.prevAccountStatus]
    },
    afterAccountFormat(row) {
      const status = {
        '0': '正常',
        '1': '禁用'
      }
      return status[row.afterAccountStatus]
    },
    // 账户类型
    aTypeFormatter(row) {
      const temp = {
        '0': '会员',
        '1': '圈子',
        '2': '平台',
        '3': '供应商'
      }
      return temp[row.aType]
    },
    // 渠道类型
    channelFormatter(row) {
      const temp = {
        '1': '电商',
        '2': '社交',
        '3': '游戏'
      }
      return temp[row.channel]
    },
    // 操作类型
    handleTypeFormat(row) {
      const temp = {
        '-40': '解绑银行卡',
        '-2': '禁用',
        '-1': '删除',
        '1': '创建',
        '2': '解禁',
        '30': '实名注册',
        '31': '实名更新注册信息',
        '32': '修改手机号',
        '35': '实名认证',
        '40': '绑定银行卡',
        '41': '修改绑卡手机号',
        '50': '设定支付密码',
        '51': '修改支付密码',
        '52': '找回支付密码'
      }
      return temp[row.handleType]
    },
    // 返回
    back() {
      this.$router.push({ path: '/account/index' })
    },
    // 搜索
    search() {
      this.conditionList()
    },
    // 重置
    reset() {
      this.time = []
      this.$refs['form'].resetFields()
    },
    // 翻页
    handleCurrentChange() {
      this.conditionList()
    }
  },
  mounted() {
    this.conditionList()
  }
}
</script>

<style scoped lang="scss">
.search {
  margin: 20px 0;
}
.searchInput.el-input {
  max-width: 400px;
}
.demo-table-expand {
  font-size: 0;
  lable {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
