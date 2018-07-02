<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="time" label="发生日期：">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="center">
              </el-date-picker>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item prop="sellerName" label="供应商名称：">
                  <el-input v-model="form.sellerName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayerCode" label="纳税人识别号：">
                  <el-input v-model="form.taxpayerCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="invoiceNumber" label="发票号：">
                  <el-input v-model="form.invoiceNumber" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="invoiceCode" label="发票代码：">
                  <el-input v-model="form.invoiceCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="logisticsId" label="快递单号">
              <el-input v-model="form.logisticsId" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="quickStatus" label="快速查看：">
              <el-radio-group v-model="form.quickStatus">
                <el-radio-button label="0">全部</el-radio-button>
                <el-radio-button label="1">今天</el-radio-button>
                <el-radio-button label="2">昨天</el-radio-button>
                <el-radio-button label="3">最近7天</el-radio-button>
                <el-radio-button label="4">最近30天</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="settlementStatus" label="结算单状态：">
              <el-radio-group v-model="form.settlementStatus">
                <el-radio-button label="0">全部</el-radio-button>
                <el-radio-button label="1">待审核</el-radio-button>
                <el-radio-button label="2">未通过审核</el-radio-button>
                <el-radio-button label="3">审核通过</el-radio-button>
                <el-radio-button label="4">待付款</el-radio-button>
                <el-radio-button label="5">已付款</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="sortRule" label="排序：">
              <el-select v-model="form.sortRule" @change="sortChange">
                <el-option
                  v-for="item in sorts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
        <el-form-item style="text-align: center;margin-top: 20px;">
          <el-button type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button type="primary" icon="el-icon-setting" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
    	<span>当前选中{{chooseLen}}项</span>
    	<el-button type="primary" @click="agree">审核通过</el-button>
    	<el-button type="danger" @click="refuse">审核未通过</el-button>
    </div>
    <div class="m20">
    	<el-table :data="data" border style="width: 100%" @selection-change="selectChange">
        <el-table-column prop="" type="selection" label=""></el-table-column>
        <!--展开-->
        <el-table-column type="expand" label="发票详情" width="100">
          <template slot-scope="scope">
            <el-table :data="scope.row.invoiceList" border style="width: 100%">
              <el-table-column prop="invoiceNumber" label="发票号"></el-table-column>
              <el-table-column prop="invoiceCode" label="发票代码"></el-table-column>
              <el-table-column prop="invoiceAmount" label="发票金额"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="settlementCode" label="结算单号"></el-table-column>
        <el-table-column prop="sellerCode" label="供应商ID"></el-table-column>
        <el-table-column prop="sellerName" label="供应商名称"></el-table-column>
        <el-table-column prop="taxpayerCode" label="纳税人识别号"></el-table-column>
        <el-table-column prop="settlementStatus" :formatter="settlementStatusFormat" label="结算单状态"></el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
        <el-table-column prop="logisticsId" label="快递单号"></el-table-column>
        <el-table-column prop="editTime" label="状态改变时间"></el-table-column>
        <el-table-column prop="lastUpdBy" label="最近处理人"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="view(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
    	</el-table>
    </div>
    <div class="m20 center">
    	<el-pagination
    	  @current-change="handleCurrentChange"
    	  :current-page.sync="form.pageNumber"
    	  :page-size="form.pageSize"
    	  layout="total, prev, pager, next"
    	  :total="total">
    	</el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="refuseDlsg"
      width="30%">
      <div>
        <el-form ref="refuseForm" :model="refuseForm" label-width="200px">
          <el-form-item prop="reason" label="请选择未通过审核原因：">
            <el-select v-model="refuseForm.rejectStatus" placeholder="请选择">
              <el-option
                v-for="item in reasons"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="refuseForm.rejectStatus == '0'">
            <el-input v-model="refuseForm.rejectReason" type="textarea" :rows="5" style="max-width: 400px;" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="refuseDlsg = false">取 消</el-button>
        <el-button type="success" @click="confirmRefuse">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { searchSettlementList, approvalSettment } from '@/api/settlement'
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.startTime = this.time[0]
          this.form.endTime = this.time[1]
        } else {
          this.form.startTime = ''
          this.form.endTime = ''
        }
      }
    }
  },
  data() {
    return {
      form: {
        sortRule: '1',
        startTime: '',
        endTime: '',
        sellerName: '',
        taxpayerCode: '', // 纳税人识别号
        invoiceNumber: '', // 发票号
        invoiceCode: '',
        logisticsId: '',
        quickStatus: '0',
        settlementStatus: '0',
        pageSize: 10,
        pageNumber: 1
      },
      time: [],
      sorts: [
        {
          label: '按创建时间排序',
          value: '1'
        },
        {
          label: '按状态改变时间排序',
          value: '2'
        },
        {
          label: '按结算单号排序',
          value: '3'
        },
        {
          label: '按纳税人识别号排序',
          value: '4'
        }
      ],
      chooseLen: 0,
      data: [],
      idsStr: '',
      refuseDlsg: false,
      refuseForm: {
        rejectStatus: ''
      },
      reasons: [
        {
          label: '其他',
          value: '0'
        },
        {
          label: '发票内容错误',
          value: '1'
        },
        {
          label: '快递包装袋内未找到发票',
          value: '2'
        }
      ],
      selectData: []
    }
  },
  methods: {
    settlementStatusFormat(row) {
      if (row.settlementStatus === 1) {
        return '待审核'
      } else if (row.settlementStatus === 2) {
        return '未审核通过'
      } else if (row.settlementStatus === 3) {
        return '审核通过'
      } else if (row.settlementStatus === 4) {
        return '待付款'
      } else if (row.settlementStatus === 5) {
        return '已付款'
      } else {
        return ''
      }
    },
    // 获取结算单列表
    getTableData() {
      searchSettlementList(this.form).then(res => {
        this.data = res.data.data
        console.log(this.data)
        if (res.totalSize) {
          this.total = parseInt(res.totalSize)
        } else {
          this.$message({
            tyep: 'error',
            warning: res.errorMsg
          })
        }
      })
    },
    handleQuery() {
      this.getTableData()
    },
    // 排序下拉框中选值的改变
    sortChange(val) {
      this.form.sortRule = val
      searchSettlementList(this.form).then(res => {
        this.data = res.data.data
        console.log(this.data)
      })
    },
    selectChange(selection) {
      if (selection) {
        const len = selection.length
        this.chooseLen = len
        const arr = []
        for (const item of selection) {
          arr.push(item.id)
        }
        console.log(selection)
        this.idsStr = arr.join(',')
        this.selectData = selection
      }
    },
    // 审核通过
    agree() {
      // TODO 有些已经审核的数据不能再次发起审核
      if (this.idsStr) {
        for (const i of this.selectData) {
          if (i.settlementStatus === 2) {
            this.$confirm('结算单状态为未审核通过的，不可再进行操作', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            })
            this.getTableData()
          } else {
            approvalSettment({
              settlementIds: this.idsStr,
              status: 3
            }).then(res => {
              if (res) {
                this.changeStatusSuccess()
                this.getTableData()
              }
            }).catch(error => {
              this.$message.error(error)
            })
          }
        }
      } else {
        this.$message.warning('请先选择一项！')
      }
    },
    // 审核未通过
    refuse() {
      if (this.idsStr !== '') {
        for (const i of this.selectData) {
          if (i.settlementStatus === 3 || i.settlementStatus === 2) {
            this.$message({
              type: 'warning',
              message: '已经审核过的数据不能再次发起审核'
            })
            this.getList()
          } else {
            this.refuseDlsg = true
          }
        }
      } else {
        this.$message.warning('请先选择一项！')
      }
    },
    confirmRefuse() {
      if (!this.refuseForm.rejectStatus) {
        this.$message({
          type: 'warning',
          message: '请选择未通过审核原因'
        })
        return
      }
      this.refuseForm.settlementIds = this.idsStr
      this.refuseForm.status = 2
      approvalSettment(this.refuseForm).then(res => {
        if (res) {
          this.changeStatusSuccess()
          this.getTableData()
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    changeStatusSuccess() {
      this.$confirm('结算单状态修改成功', '提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        // this.getTableData()
        this.refuseDlsg = false
      })
    },
    // 查看详情
    view(row) {
      console.log(row.settlementCode)
      this.$router.push({ path: '/settlement/finance/billDetail', query: { settlementCode: row.settlementCode }})
      // dev开发环境
      // if (process.env.NODE_ENV === 'development') {
      //   window.location.href = 'http://dev.business.womaoapp.com/supplier/#/accounts/detail?id=' + row.settlementCode
      // } else {
      //   window.location.href = 'http://qa.womaoapp.com/supplier/#/accounts/detail?id=' + row.settlementCode
      // }
    },
    // 搜索
    search() {
      this.getTableData()
    },
    handleCurrentChange() {
      this.getTableData()
    },
    // 重置
    resetForm() {
      this.time = []
      this.$refs['form'].resetFields()
      // this.handleQuery()
    }
  },
  created() {
    this.handleQuery()
  }
}
</script>

<style scoped lang="scss">
.center {
  text-align: center;
}
.m20 {
  margin: 20px;
}
.search {
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  background: #f1f1f1;
  .el-input {
    max-width: 200px;
  }
}
</style>
