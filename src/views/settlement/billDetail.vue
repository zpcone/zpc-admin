<template>
  <div class="accountDet">
    <div class="BillTitle">
      <div class="title">结算详情</div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            结算编号： {{ billData.settlementCode }}
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button @click="backToList">返回结算列表</el-button>
            <!-- <el-button type="primary">导出Excel</el-button> -->
          </div>
        </el-col>
      </el-row>
      <div class="payOrderNum">付款单号： {{billData.paymentCode}}</div>
      <div class="payStatus">结算状态： {{billData.settlementStatus | settlementStatusFilter}}</div>
      <div class="payStatus">结算单金额（元）： {{billData.settlementPrice}}</div>
    </div>
    <div class="Content">
      <!-- show-summary :summary-method="getSummaries" -->
      <el-table :data="billDataList" border style="width: 100%; margin-top: 20px" empty-text="暂无可结算订单，每个月的结算日为5日、20日">
        <el-table-column type="expand" prop="subOrderDetailList">
          <template slot-scope="scope">
            <el-table :data="scope.row.subOrderDetailList" border>
              <el-table-column prop="skuName" label="商品名称"></el-table-column>
              <el-table-column prop="skuSpecRel" label="规格"></el-table-column>
              <el-table-column prop="skuPrice" label="结算单价（元）"></el-table-column>
              <el-table-column prop="skuNum" label="数量"></el-table-column>
              <el-table-column prop="skuSumPrice" label="金额合计（元）"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="交易日期">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTimeStr}}
          </template>
        </el-table-column>
        <el-table-column prop="orderCode" label="订单编号"></el-table-column>
        <el-table-column prop="orderGoodsNum" label="订单商品数量"></el-table-column>
        <el-table-column prop="orderSumMoney" :formatter="handleMoney" label="金额合计（元）"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="settlementHandleSizeChange"
          @current-change="settlementHandleCurrentChange"
          :current-page.sync="settlementCurrentPage"
          :page-size="settlementPageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="settlementTotalCount">
        </el-pagination>
      </div>
    </div>
    <!-- 开票信息 show-summary :summary-method="getSummaries1"-->
    <div class="Content billInfo">
      <div class="title">
        <h2>开票信息</h2>
        <p class="normalP">请严格按照以下内容进行开票：</p>
        <p class="normalP">总计金额：{{billData.settlementPrice}}</p>
        <el-table :data="invoiceDataList" border style="width: 100%; margin-top: 20px">
          <el-table-column label="序号" width="180">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="skuName" label="商品名称">.</el-table-column>
          <el-table-column prop="skuSpecRel" label="规格"></el-table-column>
          <el-table-column prop="skuPrice" label="结算单价（元）"></el-table-column>
          <el-table-column prop="skuNum" label="数量"></el-table-column>
          <el-table-column prop="skuSumPrice" label="金额合计（元）"></el-table-column>
        </el-table>
        <div class="pagination">
        <el-pagination
          @size-change="invoiceHandleSizeChange"
          @current-change="invoiceHandleCurrentChange"
          :current-page.sync="invoiceCurrentPage"
          :page-size="invoicePageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="invoiceTotalCount">
        </el-pagination>
      </div>
      </div>
    </div>
    <!-- 发票信息 -->
    <div class="Content billInfo">
      <div class="title">
        <h2>发票信息</h2>
        <div>发票合计金额：{{invoiceSumPrice}}元</div>
        <el-table :data="invoiceInfo" border style="width: 100%; margin-top: 20px" >
          <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
          <el-table-column prop="payTaxes" label="纳税人识别号">.</el-table-column>
          <el-table-column prop="invoiceCode" label="发票代码"></el-table-column>
          <el-table-column prop="invoiceNum" label="发票号码"></el-table-column>
          <el-table-column prop="expressCompany" label="快递公司"></el-table-column>
          <el-table-column prop="expressNum" label="快递单号"></el-table-column>
          <el-table-column prop="invoicePrice" label="发票金额（元）"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 发票审核结果 -->
    <div class="checkResult Content" v-if="this.billData.examineContent">
      <div class="title">审核未通过原因</div>
      <div class="reason">{{this.billData.examineContent}}</div>
    </div>

    <div class="last-btns-wrapper">
      <el-button :disabled="canEditSettlementStatus" class="btn" @click="editBill">修改结算单</el-button>
      <el-button @click="backToList">返回结算列表</el-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import {
  findSettlementRelationApi,
  findOrderIdApi,
  openInvoiceInfoApi,
  findInvoiceResApi
} from '@/api/financeDetail'
export default {
  data() {
    return {
      canEditSettlementStatus: false, // 修改结算单按钮disabled，为false可以修改编辑结算单
      // 结算单id
      settlementId: '',
      // 结算单每页显示条数
      settlementPageSize: 10,
      // 结算单数据总条数
      settlementTotalCount: 0,
      // 结算单当前页
      settlementCurrentPage: 1,
      // 结算单的列表信息
      billDataList: [],
      // 查看开票信息的接口传的列表入参
      checkInvoiceList: [],
      // 订单编号的数组：
      orderIdArray: [],
      // 开票信息每页显示条数
      invoicePageSize: 10,
      // 开票信息当前页
      invoiceCurrentPage: 1,
      // 开票信息总条数
      invoiceTotalCount: 0,
      // 开票信息
      invoiceDataList: [],

      // 结算单信息
      billData: {
        settlementCode: '',
        settlementStatus: '',
        paymentCode: '',
        settlementPrice: ''
      },

      // 发票信息
      invoiceInfo: [],
      // 发票合计金额
      invoiceSumPrice: 0,
      // 审核信息
      examineContent: '',
      openId: ''
    }
  },

  filters: {
    settlementStatusFilter(val) {
      val += ''
      const map = {
        '0': '未结算',
        '1': '待审核',
        '2': '审核未通过',
        '3': '审核通过',
        '4': '待付款',
        '5': '已付款'
      }
      if (!val || !map[val]) {
        return ''
      }
      return map[val]
    },

    parseTimeFilter(val) {
      return parseTime(val)
    },
    formatTimeStr(val) {
      if (val === null) {
        return ''
      }
      return val.substring(0, val.length - 2)
    }
  },
  mounted() {
    const settlementCode = this.$route.query.settlementCode
    // const settlementCode = '456477954742931456'
    if (settlementCode) {
      this.settlementCode = settlementCode
      // 结算单信息
      this.findSettlementRelation({ settlementCode: settlementCode })
      // 发票信息
      this.findInvoiceRes({ settlementCode: settlementCode })
    }
  },

  methods: {
    // 保留两位有效数字
    handleMoney(row, column) {
      return Number(row.orderSumMoney).toFixed(2)
    },
    // 处理结算单订单的每条订单的金额和数量,把子订单的sku的金额和数量相加
    handleOrderMoneySum(data) {
      if (typeof data === 'object' && data.length === 0) {
        return false
      }
      data.forEach((item, index) => {
        if (item.subOrderDetailList && item.subOrderDetailList.length > 0) {
          item.orderSumMoney = 0
          item.orderGoodsNum = 0
          item.subOrderDetailList.forEach((subItem, subIndex) => {
            item.orderSumMoney = item.orderSumMoney + Number(subItem.skuSumPrice)
            item.orderGoodsNum = item.orderGoodsNum + Number(subItem.skuNum)
          })
        }
      })
      console.log(data)
    },
    // 结算单信息
    findSettlementRelation(obj) {
      findSettlementRelationApi(obj).then(res => {
        console.log('结算单信息')
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          const info = res.data
          this.openId = info.settlementId
          this.billData.settlementCode = info.settlementCode
          this.billData.settlementStatus = info.settlementStatus
          this.billData.paymentCode = info.paymentCode
          this.billData.settlementPrice = info.settlementPrice
          this.billData.examineContent = info.examineContent
          if (this.billData.settlementStatus && (this.billData.settlementStatus === '0' || this.billData.settlementStatus === '2')) {
            this.canEditSettlementStatus = false
          } else {
            this.canEditSettlementStatus = true
          }
          this.openId = info.settlementId
          // 结算单列表 （开票信息在结算单列表中回掉中调用）
          const _paramOrderObj = {
            settlementCode: this.openId,
            pageNumber: this.settlementCurrentPage + '',
            pageSize: this.settlementPageSize + ''
          }
          // console.log(_paramOrderObj)
          this.findOrderId(_paramOrderObj)
        }
      })
        .catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: '网络错误，请重试'
          })
        })
    },

    // 结算单信息显示条数发生变化
    settlementHandleSizeChange(val) {
      this.settlementCurrentPage = 1
      this.settlementPageSize = val
      const obj = {
        pageNumber: '1',
        pageSize: val + '',
        settlementCode: this.openId
      }
      this.findOrderId(obj)
    },
    // 结算单页码发生变化
    settlementHandleCurrentChange(val) {
      const obj = {
        pageNumber: val + '',
        pageSize: this.settlementPageSize + '',
        settlementCode: this.openId
      }
      this.findOrderId(obj)
    },

    // 结算单对应的主订单信息
    // settlementId,pageNum,pageSize 都不能缺少
    findOrderId(obj) {
      if (!obj.settlementCode || !obj.pageNumber || !obj.pageSize) {
        this.$message({
          type: 'error',
          message: '请以正确方式打开'
        })
        return
      }
      findOrderIdApi(obj).then(res => {
        console.log('结算单对应的主订单消息')
        console.log(res)
        if (res.status === 200) {
          const info = res.data
          console.log(info)
          this.handleOrderMoneySum(info.orderListRes)
          this.settlementTotalCount = parseInt(info.totalCount)
          this.billDataList = info.orderListRes

          // 记录下订单id
          this.checkInvoiceList = []
          info.orderListRes.forEach(item => {
            this.checkInvoiceList.push(item.orderId + '')
          })
          // 请求开票信息
          const invoiceObj = {
            pageNum: this.invoiceCurrentPage + '',
            pageSize: this.invoicePageSize + '',
            list: this.checkInvoiceList
          }
          this.openInvoiceInfo(invoiceObj)
        }
      })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '网络错误，请重试'
          })
        })
    },

    // 开票信息显示条数发生变化
    invoiceHandleSizeChange(val) {
      this.invoiceCurrentPage = 1
      this.invoicePageSize = val
      const obj = {
        pageNum: '1',
        pageSize: val + '',
        list: this.checkInvoiceList
      }
      // console.log(obj)
      this.openInvoiceInfo(obj)
    },

    // 开票页码发生变化
    invoiceHandleCurrentChange(val) {
      const obj = {
        pageNum: val + '',
        pageSize: this.invoicePageSize + '',
        list: this.checkInvoiceList
      }
      // console.log(obj)
      this.openInvoiceInfo(obj)
    },

    // 开票信息
    openInvoiceInfo(obj) {
      if (obj.list && obj.list.length === 0) {
        return
      }
      console.log(obj)
      if (!obj.pageNum || !obj.pageSize) {
        this.$message({
          type: 'error',
          message: '请以正确的方式打开'
        })
        return
      }
      openInvoiceInfoApi(obj).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          const info = res.data
          this.invoiceTotalCount = parseInt(res.totalSize)
          this.invoiceDataList = info.subOrderDetailListRes
        }
      })
        .catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: '网络错误，请重试'
          })
        })
    },

    // 发票信息
    findInvoiceRes(obj) {
      if (!obj.settlementCode) {
        this.$message({
          type: 'error',
          message: '请以正确的方式打开'
        })
        return
      }
      findInvoiceResApi(obj).then(res => {
        if (res.status === 200) {
          const info = res.data
          this.invoiceInfo = info

          let _total = 0
          info.forEach(item => {
            _total = _total + parseFloat(item.invoicePrice)
          })
          this.invoiceSumPrice = _total.toFixed(2)
        }
      })
        .catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: '网络错误，请重试'
          })
        })
    },

    // 计算表格小计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '结算单小计'
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] += ''
        } else {
          // sums[index] = 'N/A'
        }
      })

      return sums
    },
    // 发票金额小计
    getSummaries1(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '结算单小计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] += ''
        } else {
          // sums[index] = 'N/A'
        }
      })

      return sums
    },

    // 修改结算单
    editBill() {
      const route = this.$route
      const view = {
        name: route.name,
        path: route.path,
        title: route.meta.title
      }
      this.$store.dispatch('delVisitedViews', view).then(view => {
        this.$router.push({
          path: '/settlement/finance/bill',
          query: {
            id: this.settlementId
          }
        })
      })
    },

    // 返回结算列表
    backToList() {
      const route = this.$route
      const view = {
        name: route.name,
        path: route.path,
        title: route.meta.title
      }
      this.$store.dispatch('delVisitedViews', view).then(view => {
        this.$router.push({
          path: '/settlement/finance/bill'
        })
      })
    }
  }
  /* methods: {
     // 返回
     goback (count) {
       this.$router.go(count)
     }
   } */
}
</script>

<style lang="scss" scoped>
.normalP {
  line-height:30px;
}
.accountDet {
  margin: 20px;
  .BillTitle {
    line-height: 40px;
    margin-bottom: 10px;
    .title {
      font-weight: 700;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .billCon {
    img {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
.pagination {
  text-align: center;
  margin-top: 30px;
}
.Content {
  padding: 20px;
  margin-top: 20px;
  background-color: #f2f2f2;
}
.billInfo {
  .tips {
    font-size: 14px;
  }
  .infoTitle {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
  }
  .title {
    h2 {
      float: left;
      width: 100%;
      font-size: 18px;
      text-align: center;
      font-weight: normal;
    }
  }
}
.checkResult {
  .title {
    text-align: center;
  }
  .reason {
    color: #666;
    margin-top: 30px;
  }
}
.last-btns-wrapper {
  margin-top: 30px;
  text-align: center;
  .btn {
    margin-right: 30px;
  }
}
</style>
