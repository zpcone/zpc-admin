<template>
  <section>
    <div class="m20">
    	<el-button type="success" icon="el-icon-plus" @click="newCreate">新建规则</el-button>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="ruleChannel" label="渠道：">
              <el-radio-group v-model="form.ruleChannel">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
                <el-radio-button label="1">电商</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="ruleName" label="规则名称：">
              <el-input style="max-width: 400px;" v-model.trim="form.ruleName" placeholder="请输入规则ID或名称"></el-input>
            </el-form-item>
            <el-form-item prop="supplierId" label="供应商ID：">
              <el-input style="max-width: 400px;" v-model="form.supplierId" placeholder="请输入供应商ID或名称"></el-input>
            </el-form-item>
            <el-form-item prop="time" label="创建时间：">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="—"
                start-placeholder="请选择日期"
                end-placeholder="请选择日期"
                align="center">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="status" label="状态">
              <el-radio-group v-model="form.status">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">禁用</el-radio-button>
                <el-radio-button label="1">启用</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="quickStatus" label="快速查看">
              <el-radio-group v-model="form.quickStatus">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">今天</el-radio-button>
                <el-radio-button label="2">昨天</el-radio-button>
                <el-radio-button label="3">最近7天</el-radio-button>
                <el-radio-button label="4">最近30天</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="ruleType" label="规则类型">
              <el-radio-group v-model="form.ruleType" @change="getList">
                <el-radio-button label="1">商品购买</el-radio-button>
                <el-radio-button label="2">圈交易</el-radio-button>
                <el-radio-button label="3">许愿灯</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <hr class="m20" style="border-bottom: 1px dashed #f1f1f1;" />
        <el-form-item style="text-align: center;">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="warning" icon="el-icon-search" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border stripe style="width: 100%">
        <el-table-column prop="" type="selection" label=""></el-table-column>
        <el-table-column prop="id" label="规则id"></el-table-column>
        <el-table-column prop="ruleChannel" label="渠道">
          <template slot-scope="scope">
            <span v-if="scope.row.channelId">{{scope.row.channelId | channelFilter}}</span>
            <span v-if="scope.row.ruleChannel">{{scope.row.ruleChannel | channelFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ruleName" label="规则名称"></el-table-column>
        <el-table-column prop="ruleType" label="规则类型" :formatter="ruleTypeFormat"></el-table-column>
        <el-table-column prop="matchRange" v-if="form.ruleType != '3'" :formatter="matchRangeFormat" label="匹配对象"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="status" label="规则状态" :formatter="statusFormat"></el-table-column>
        <el-table-column prop="ruleDesc" label="规则简介" width="320">
          <template slot-scope="scope">
            <span class="product-buyer-name" v-if="scope.row.ruleIntroduction">{{scope.row.ruleIntroduction}}</span>
            <span class="product-buyer-name" v-if="scope.row.ruleDesc">{{scope.row.ruleDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="view(scope.$index,scope.row)">查看详情</el-button>
            <el-button v-if="scope.row.status == 0" type="success" size="mini" @click="changeStatus(scope.row,1)">启用</el-button>
            <el-button v-if="scope.row.status == 1" type="danger" size="mini" @click="changeStatus(scope.row,0)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="m20 center">
      <el-pagination
        :current-page.sync="form.pageNumber"
        :page-size="form.pageSize"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import {
  getSpiltList,
  ruleSwitch,
  checkMatchRangeEnable
} from '@/api/split'
import { getLightList, changeStatus } from '@/api/splitLight'
export default {
  filters: {
    channelFilter(val) {
      if (val === '1') {
        return '电商'
      } else if (val === '2') {
        return '社交'
      }
    }
  },
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.startTime = this.time[0]
          this.form.endTime = this.time[1]
          this.form.startDate = this.time[0]
          this.form.endDate = this.time[1]
        } else {
          this.form.startTime = ''
          this.form.endTime = ''
          this.form.startDate = ''
          this.form.endDate = ''
        }
      }
    }
  },
  data() {
    return {
      form: {
        ruleName: '',
        supplierId: '',
        ruleType: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        status: '',
        quickStatus: '',
        channelId: '',
        pageSize: 10,
        pageNumber: 1,
        ruleChannel: ''
      },
      time: [],
      data: []
    }
  },
  methods: {
    statusFormat(row) {
      if (row.status === '0') {
        return '禁用'
      } else if (row.status === '1') {
        return '启用'
      }
    },
    ruleTypeFormat(row) {
      if (row.ruleType === '1') {
        return '商品购买'
      } else if (row.ruleType === '2') {
        return '圈交易'
      } else if (row.ruleType === '3' || row.ruleType === '许愿灯') {
        return '许愿灯'
      }
    },
    matchRangeFormat(row) {
      if (row.matchRange === '1') {
        return '全部商品'
      } else if (row.matchRange === '2') {
        return '匹配供应商'
      } else if (row.matchRange === '3') {
        return '匹配商品'
      }
    },
    // 跳转新增规则页面
    newCreate() {
      this.$router.push({
        path: '/split/new'
      })
    },
    // 查看详情
    view(index, row) {
      this.$router.push({
        path: '/split/view',
        query: {
          ruleType: row.ruleType,
          id: row.id,
          channelId: row.channelId
        }
      })
    },
    // 搜索
    search() {
      if (this.form.ruleType === '3' && this.form.supplierId) {
        this.$message.warning('许愿灯模块没有供应商Id数据')
        return
      }
      this.getList()
    },
    // 分页
    handleCurrentChange() {
      this.getList()
    },
    // 获取列表
    getList() {
      if (this.form.ruleType === '3') {
        getLightList(this.form).then(res => {
          if (res) {
            this.data = res.data
            this.total = parseInt(res.totalSize)
          }
        })
      } else if (this.form.ruleType === '1' || this.form.ruleType === '2') {
        getSpiltList(this.form).then(res => {
          if (res) {
            this.data = res.data.data
            this.total = parseInt(res.data.totalRecordCount)
          }
        })
      }
    },
    // 修改状态
    changeStatus(row, flag) {
      if (this.form.ruleType === '3') {
        changeStatus({ id: row.id, status: flag }).then(res => {
          this.search()
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        checkMatchRangeEnable().then(res => {
          if (res.status === 200) {
            ruleSwitch({ id: row.id, status: String(flag) }).then(res => {
              if (res.data.data) {
                this.search()
              } else {
                this.$message.error('修改状态失败')
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.errorMsg
            })
          }
        })
      }
    },
    // 重置
    reset() {
      this.time = []
      this.form.ruleChannel = ''
      this.form.ruleName = ''
      this.form.quickStatus = ''
      this.form.supplierId = ''
      this.form.status = ''
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.product-buyer-name{
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
