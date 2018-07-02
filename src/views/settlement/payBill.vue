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
              <el-col :span="12">
                <el-form-item prop="settlementCode" label="结算单号">
                  <el-input v-model="form.settlementCode" placeholder=""></el-input>
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
          <el-button type="success" icon="el-icon-search" @click="search('form')">查找</el-button>
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
    <div class="m20 center">
      <el-pagination
        @current-change="getList"
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
        <el-form ref="refuseForm" :model="refuseForm" label-width="180px">
          <el-form-item prop="rejectStatus" label="请选择未通过审核原因：">
            <el-select v-model="refuseForm.rejectStatus" placeholder="请选择">
              <el-option
                v-for="item in reasons"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="refuseForm.rejectStatus == '0'" prop="rejectReason" label="">
            <el-input v-model="refuseForm.rejectReason" type="textarea" :rows="4" placeholder=""></el-input>
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
import { searchAuditorList, searchPaymentList, approvalPayment } from '@/api/settlement'
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
        taxpayerCode: '',
        settlementCode: '',
        lastUpdBy: '',
        payer: '',
        invoiceNumber: '',
        invoiceCode: '',
        quickStatus: '',
        paymentStatus: '',
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
      chooseLen: 0,
      data: [],
      pageNumber: 1,
      pageSize: 10,
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
      idsStr: '',
      selectData: ''
    }
  },
  methods: {
    settlementStatusFormat(row) {
      if (row.paymentStatus === 1) {
        return '待审核'
      } else if (row.paymentStatus === 2) {
        return '未通过审核'
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
    // 审核通过
    agree() {
      // TODO 有些已经审核的数据不能再次发起审核
      if (this.idsStr) {
        console.log(this.selectData[0].paymentStatus)
        for (const i of this.selectData) {
          if (i.paymentStatus === 3 || i.paymentStatus === 2) {
            this.$message({
              type: 'warning',
              message: '已经审核的数据不能再次发起审核'
            })
            this.getList()
          } else {
            approvalPayment({
              paymentIds: this.idsStr,
              status: 3
            }).then(res => {
              if (res) {
                this.changeStatusSuccess()
                this.getList()
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
          if (i.paymentStatus === 3 || i.paymentStatus === 2) {
            this.$message({
              type: 'warning',
              message: '已经审核的数据不能再次发起审核'
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
      this.refuseForm.paymentIds = this.idsStr
      this.refuseForm.status = 2
      approvalPayment(this.refuseForm).then(res => {
        if (res) {
          this.changeStatusSuccess()
          this.getList()
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
        // this.getList()
        this.refuseDlsg = false
      })
    },
    setPersons() {
      searchAuditorList().then(res => {
        this.persons = res.data.data
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
        this.selectData = selection
        this.idsStr = arr.join(',')
      }
    },
    search(name) {
      this.getList()
    },
    resetForm(name) {
      this.time = []
      this.$refs['form'].resetFields()
      this.getList()
    },
    getList() {
      searchPaymentList(this.form).then(res => {
        this.data = res.data.data
        this.total = parseInt(res.totalSize)
      })
    },
    // 排序下拉框中选值的改变
    sortChange(val) {
      this.form.sortRule = val
      searchPaymentList(this.form).then(res => {
        if (res.status === 200) {
          this.data = res.data.data
          console.log(this.data)
        } else {
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    }
  },
  created() {
    this.setPersons()
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
