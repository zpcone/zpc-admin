<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="time" label="发生日期：">
              <el-date-picker
                v-model="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="center"
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item prop="sellerName" label="供应商名称：">
                  <el-input v-model="form.sellerName" placeholder="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayerCode" label="纳税人识别号：">
                  <el-input v-model="form.taxpayerCode" placeholder="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="invoiceNumber" label="发票号：">
                  <el-input v-model="form.invoiceNumber" placeholder="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="invoiceCode" label="发票代码：">
                  <el-input v-model="form.invoiceCode" placeholder="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="settlementCode" label="结算单号">
                  <el-input v-model="form.settlementCode" placeholder="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lastUpdBy" label="审核人：">
                  <el-select v-model="form.lastUpdBy" placeholder="请选择">
                    <el-option
                      v-for="item in persons"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="payer" label="付款人：">
              <el-select v-model="form.payer" placeholder="请选择">
                <el-option
                  v-for="item in payers"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="quickStatus" label="快速查看：">
              <el-radio-group v-model="form.quickStatus">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">今天</el-radio-button>
                <el-radio-button label="2">昨天</el-radio-button>
                <el-radio-button label="3">最近7天</el-radio-button>
                <el-radio-button label="4">最近30天</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="paymentStatus" label="付款单状态：">
              <el-radio-group v-model="form.paymentStatus">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">待审核</el-radio-button>
                <el-radio-button label="2">未通过审核</el-radio-button>
                <el-radio-button label="3">审核通过</el-radio-button>
                <el-radio-button label="4">待付款</el-radio-button>
                <el-radio-button label="5">已付款</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="downloadStatus" label="下载状态：">
              <el-radio-group v-model="form.downloadStatus">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">已下载</el-radio-button>
                <el-radio-button label="2">未下载</el-radio-button>
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
          <el-button type="success" icon="el-icon-search" @click="getList('form')">查找</el-button>
          <el-button type="primary" icon="el-icon-setting" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <span>当前选中{{chooseLen}}项</span>
      <el-button type="primary"  icon="el-icon-download" @click="handleDownload">下载付款单</el-button>
      <el-button type="success" @click="doPay">立即支付</el-button>
    </div>
    <div class="m20">
      <el-table :data="paymentData" border stripe style="width: 100%" @selection-change="selectChange">
        <el-table-column prop="" type="selection" label=""></el-table-column>
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
        <el-table-column prop="paymentCode" label="付款单号"></el-table-column>
        <el-table-column prop="settlementCode" label="结算单号"></el-table-column>
        <el-table-column prop="sellerCode" label="供应商ID"></el-table-column>
        <el-table-column prop="sellerName" label="供应商名称"></el-table-column>
        <el-table-column prop="taxpayerCode" label="纳税人识别号"></el-table-column>
        <el-table-column prop="paymentStatus" :formatter="settlementStatusFormat" label="付款单状态"></el-table-column>
        <el-table-column prop="payAmount" label="付款金额"></el-table-column>
        <el-table-column prop="editTime" label="状态改变时间"></el-table-column>
        <el-table-column prop="lastUpdBy" label="审核人"></el-table-column>
        <el-table-column prop="payer" label="付款人"></el-table-column>
      </el-table>
    </div>
    <!-- 支付弹框 -->
    <!-- <el-dialog
      title="确定支付"
      :visible.sync="payDialogVisible"
      width="30%"
      :before-close="handleClose">
      <p style="text-align:center;">
        <span>是否立即支付</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePayDialogVisible">确 定</el-button>
      </span>
    </el-dialog> -->
    <div class="m20 center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="getList"
        :current-page.sync="form.pageNumber"
        :page-size="form.pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { searchAuditorList, searchPayeeList, searchPaymentList, payForPayment } from '@/api/settlement'
import { parseTime } from '@/utils'
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
      payDialogVisible: false,
      getChecked: [],
      form: {
        sortRule: '1',
        startTime: '',
        endTime: '',
        sellerName: '',
        taxpayerCode: '',
        settlementCode: '',
        lastUpdBy: '',
        payer: '',
        invoiceNumber: '',
        invoiceCode: '',
        quickStatus: '',
        paymentStatus: '',
        downloadStatus: '',
        pageNumber: 1,
        pageSize: 10
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
      persons: [],
      payers: [],
      chooseLen: 0,
      paymentData: [],
      pageNumber: 1,
      pageSize: 10,
      selectedData: []
    }
  },
  methods: {
    // 点击确定支付事件
    savePayDialogVisible() {
      this.payInterface()
    },
    // 立即支付
    doPay() {
      if (this.getChecked.length !== 1) {
        this.$message.warning('每次只能选中一项')
        return
      }
      if (this.getChecked[0].paymentStatus !== 3) {
        this.$message.warning('只有审核通过的付款单可以支付')
        return
      }
      this.$confirm('该订单是否立即支付', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const obj = {
          id: this.getChecked[0].id,
          paymentCode: this.getChecked[0].paymentCode,
          sellerCode: this.getChecked[0].sellerCode,
          settlementCode: this.getChecked[0].settlementCode,
          payAmount: this.getChecked[0].payAmount
        }
        payForPayment(obj).then(res => {
          if (res.status === 200) {
            this.$message.success('支付成功')
            this.getList()
          } else {
            this.$message.error(res.errorMsg)
          }
        })
      })
    },
    // payInterface() {
    //   var obj = {}
    //   obj.id = this.getChecked[0].id
    //   obj.paymentCode = this.getChecked[0].paymentCode
    //   obj.sellerCode = this.getChecked[0].sellerCode
    //   obj.payAmount = this.getChecked[0].payAmount
    //   payForPayment(obj).then(res => {
    //     if (res.data.errorCode !== '200') {
    //       this.$message.error(res.data.errorMsg)
    //     } else if (res.data.errorCode === '200') {
    //       this.$message.success('支付成功')
    //     }
    //     this.payDialogVisible = false
    //   })
    //     .catch(() => {
    //       this.$message.error('支付失败')
    //     })
    // },
    handleSelectionChange(val) {
      this.getChecked = val
      this.chooseLen = this.getChecked.length
      console.log('gjfld')
    },
    settlementStatusFormat(row) {
      if (row.paymentStatus === 1) {
        return '待审核'
      } else if (row.paymentStatus === 2) {
        return '审核未通过'
      } else if (row.paymentStatus === 3) {
        return '审核通过'
      } else if (row.paymentStatus === 4) {
        return '付款成功'
      } else if (row.paymentStatus === 5) {
        return '付款失败'
      } else {
        return ''
      }
    },
    setPersons() {
      searchAuditorList().then(res => {
        this.persons = res.data.data
      })
    },
    setPayer() {
      searchPayeeList().then(res => {
        this.payers = res.data.data
      })
    },
    // 获取支付列表
    getList() {
      searchPaymentList(this.form).then(res => {
        if (res.status === 200) {
          this.paymentData = res.data.data
          this.total = parseInt(res.totalSize)
        } else {
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    },
    // 排序下拉框中选值的改变
    sortChange(val) {
      this.form.sortRule = val
      searchPaymentList(this.form).then(res => {
        if (res.status === 200) {
          this.paymentData = res.data.data
          console.log(this.data)
        } else {
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    },
    // 选中付款单
    selectChange(selection) {
      this.getChecked = selection
    },
    resetForm(name) {
      this.time = []
      this.$refs['form'].resetFields()
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel')
        const tHeader = ['创建时间', '付款单号', '结算单号', '供应商ID', '供应商名称', '纳税人识别号', '付款单状态', '付款金额', '审核人', '付款人']
        const filterVal = ['createTime', 'paymentCode', 'settlementCode', 'sellerCode', 'sellerName', 'taxpayerCode', 'paymentStatus', 'payAccount', 'lastUpdBy', 'payer']
        const list = this.paymentData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '付款单')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'createTime') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  },
  created() {
    this.setPersons()
    this.setPayer()
    this.getList()
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
