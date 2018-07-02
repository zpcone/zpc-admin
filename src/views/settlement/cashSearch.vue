<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form"  label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="channelType" label="渠道：">
              <el-radio-group v-model="form.channelType">
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
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="center">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="mid" label="用户ID：">
              <el-input v-model.number="form.mid" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="factoryId" label="供应商Id：">
              <el-input v-model="form.factoryId" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号：">
              <el-input v-model="form.phone" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="goodsId" label="商品ID：">
              <el-input v-model="form.goodsId" placeholder=""></el-input>
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
            <el-form-item prop="businessType" label="业务类型：">
              <el-radio-group v-model="form.businessType">
                <el-radio-button v-for="item in businessTypes" :label="item.label" :key="item.label">{{item.value}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="payMode" label="支付方式：">
              <el-radio-group v-model="form.payMode">
                <el-radio-button v-for="item in payModes" :label="item.label" :key="item.label">{{item.value}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="orderType" label="订单类型：">
              <el-radio-group v-model="form.orderType">
                <el-radio-button v-for="item in orderTypes" :label="item.label" :key="item.label">{{item.value}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="orderStatus" label="订单状态：">
              <el-radio-group v-model="form.orderStatus">
                <el-radio-button v-for="item in orderStatuses" :label="item.label" :key="item.label">{{item.value}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="sortRule" label="排序方式">
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
          <el-button type="success" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-setting" @click="reset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="searchResult">
      <span>{{startDate}}</span> — <span>{{endDate}}</span>
      <div>
        <span>平台收入：
          <b>{{rIncome}}元</b>
        </span>
        <span>平台支出：
          <b>{{rPay}}元</b>
        </span>
        <el-button display="inline-block" class="filter-item" type="primary" :loading="downloadLoading" @click="downloadWater">下载流水</el-button>
      </div>
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="waterNo" label="流水号"></el-table-column>
        <el-table-column prop="number" label="支付/提款/退款单号"></el-table-column>
        <el-table-column prop="createTime" label="发生时间"></el-table-column>
        <el-table-column prop="businessNumber" label="业务订单号"></el-table-column>
        <el-table-column prop="channelType" label="渠道">
           <template slot-scope="scope">
            <span>{{scope.row.channelType | channelFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderType" :formatter="orderTypeFormat" label="订单类型"></el-table-column>
        <el-table-column prop="businessType" :formatter="businessTypeFormat" label="业务类型"></el-table-column>
        <el-table-column prop="mid" label="mid"></el-table-column>
        <el-table-column prop="goodsId" label="商品ID"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
        <el-table-column prop="payMoney" label="金额（元）"></el-table-column>
        <el-table-column prop="payMode" :formatter="payModeFormat" label="支付方式"></el-table-column>
        <el-table-column prop="orderStatus" :formatter="orderStatusFormat" label="订单状态"></el-table-column>
        <el-table-column prop="status" :formatter="statusFormat" label="对账状态"></el-table-column>
      </el-table>
    </div>
    <div class="center m20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNumber"
        :page-size="form.pageSize"
        layout="total, prev, pager, next"
        :total="pageTotal">
      </el-pagination>
    </div>
    <!-- <div class="m20 textc">
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div> -->
  </section>
</template>

<script>
import { getCashAcoount, downloadExcel } from '@/api/settlement'
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
    time: function(newVal, oldVal) {
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
      time: [],
      form: {
        channelType: '',
        mid: '',
        phone: '',
        goodsId: '',
        orderType: '',
        orderStatus: '',
        businessType: '',
        payMode: '',
        sortRule: '1',
        quickStatus: '',
        startTime: '',
        endTime: '',
        pageSize: 10,
        pageNumber: 1
      },
      downloadLoading: false,
      sorts: [
        {
          label: '按创建时间排序',
          value: '1'
        },
        {
          label: '按业务订单号排序',
          value: '2'
        }
      ],
      orderStatuses: [{ label: '', value: '全部' }, { label: 'SUCCESS', value: '成功' }, { label: 'FAILED', value: '失败' }, { label: 'WAITING', value: '等待/付款中' }],
      orderTypes: [{ label: '', value: '全部' }, { label: '1', value: '转账' }, { label: '2', value: '支付' }, { label: '3', value: '提现' }, { label: '4', value: '退款' }],
      payModes: [{ label: '', value: '全部' }, { label: 'WX', value: '微信' }, { label: 'HFB', value: '汇付宝' }, { label: 'ZFB', value: '支付宝' }, { label: 'DZ', value: '豆子' }],
      businessTypes: [{ label: '', value: '全部' }, { label: '1', value: '转账' }, { label: '2', value: '购买' }, { label: '3', value: '提现' }, { label: '45', value: '退款' }, { label: '8', value: '充值' }],
      rIncome: '',
      rPay: '',
      startDate: '',
      endDate: '',
      data: []
    }
  },
  methods: {
    // table格式化 start
    orderTypeFormat(row) {
      let str = ''
      for (let i = 0; i < this.orderTypes.length; i++) {
        if (row.orderType === this.orderTypes[i].label) {
          str = this.orderTypes[i].value
        }
      }
      return str
    },
    businessTypeFormat(row) {
      // let str = ''
      // for (let i = 0; i < this.businessTypes.length; i++) {
      //   if (row.businessType === this.businessTypes[i].label) {
      //     str = this.businessTypes[i].value
      //   }
      // }
      // return str
      const str = {
        '1': '转账',
        '10': '转钱',
        '11': '转普通豆',
        '12': '收益豆',
        '13': '生豆',
        '14': '豆转余额',
        '15': '分享商品奖励',
        '2': '购买',
        '21': '购买趣豆',
        '22': '购买许愿灯',
        '3': '提现',
        '4': '红包',
        '41': '发红包',
        '42': '领红包',
        '43': '转帐',
        '44': '确认转帐',
        '45': '退款',
        '5': '活动',
        '51': '楼花红包雨',
        '52': '楼花投票',
        '53': '楼花分润',
        '6': '发礼物',
        '61': '发鲜花',
        '62': '发炸弹',
        '63': '发饭票',
        '64': '发小纸条',
        '7': '领礼物',
        '71': '领鲜花',
        '72': '收炸弹',
        '8': '充值'
      }
      return str[row.businessType]
    },
    // 支付方式
    payModeFormat(row) {
      const str = {
        'WX': '微信',
        'HFB': '汇付宝',
        'ZFB': '支付宝',
        'DZ': '豆子',
        'DZ_1': '豆子',
        'DZ_2': '豆子',
        'DZ_3': '豆子'
      }
      return str[row.payMode]
      // let str = ''
      // for (let i = 0; i < this.payModes.length; i++) {
      //   if (row.payMode === this.payModes[i].label) {
      //     str = this.payModes[i].value
      //   }
      // }
      // return str
    },
    // 对账状态
    statusFormat(row) {
      const changeStatus = {
        '平': '平',
        'BANK_MISS': '单边',
        'PLATFORM_MISS': '单边',
        'PLATFORM_SHORT_STATUS_MISMATCH': '状态不符',
        'PLATFORM_OVER_STATUS_MISMATCH': '状态不符',
        'PLATFORM_SHORT_CASH_MISMATCH': '状态不符',
        'PLATFORM_OVER_CASH_MISMATCH': '状态不符'
      }
      return changeStatus[row.status]
    },
    orderStatusFormat(row) {
      let str = ''
      for (let i = 0; i < this.orderStatuses.length; i++) {
        if (row.orderStatus === this.orderStatuses[i].label) {
          str = this.orderStatuses[i].value
        }
      }
      return str
    },
    // table格式化 end
    view(index, row) {
      this.$router.push({
        path: '/settlement/back/orderglide'
      })
    },
    handleQuery() {
      this.getList()
    },
    // 获取列表
    getList() {
      getCashAcoount(this.form).then(res => {
        if (res.status === 200 && !res.data.errorMsg) {
          this.data = res.data.data.fundWaterVoList
          console.log(this.data[0].createTime)
          this.rIncome = res.data.data.rIncome
          this.rPay = res.data.data.rPay
          this.startDate = res.data.data.slice(0, 11)
          this.endDate = res.data.data.endDate.slice(0, 11)
          this.pageTotal = res.data.totalRecordCount
          for (const i of this.data) {
            i.createTime = i.createTime.slice(0, 19)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMsg
          })
        }
      })
    },
    // 排序下拉框中选值的改变
    sortChange(val) {
      this.form.sortRule = val
      this.getList()
      // getCashAcoount(this.form).then(res => {
      //   if (res.status === 200) {
      //     this.data = res.data.data.fundWaterVoList
      //     console.log(this.data)
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.errorMsg
      //     })
      //   }
      // })
    },
    search() {
      this.getList()
    },
    // 调用后台接口下载流水excel
    downloadWater() {
      const _this = this
      this.form.pageSize = this.form.pageSize
      this.form.pageNumber = this.form.pageNumber
      downloadExcel(this.form).then(res => {
        console.log(typeof (res))
        const blob = new Blob([res], { type: 'application/vdn.ms-excel' })
        console.log(blob)
        const reader = new FileReader()
        reader.readAsDataURL(blob) // 转换为base64，可以直接放入a表情href
        _this.downloadLoading = true
        // 文件读取成功的回调
        reader.onload = function(e) {
          console.log(blob.size)
          if (blob.size <= 0) {
            _this.$message.warning('没有内容导出')
            _this.downloadLoading = false
            return
          }
          _this.downloadLoading = false
          const a = document.createElement('a')
          a.download = 'waterTemplate.xls'
          a.href = e.target.result
          // $("body").append(a);  // 修复firefox中无法触发click
          a.click()
          // $(a).remove();
        }
        // 文件读取失败的回调
        reader.onerror = function(e) {
          _this.downloadLoading = false
          _this.$message.error('文件导出失败')
        }
      })
        .catch(() => {
          _this.downloadLoading = false
          _this.$message.error('导出失败')
        })
    },
    handleCurrentChange() {
      this.getList()
    },
    reset() {
      this.time = []
      this.$refs['form'].resetFields()
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
    max-width: 400px;
  }
}
.searchResult {
  margin: 20px;
  > div {
    margin: 20px 0;
    span {
      margin-right: 20px;
      b {
        font-size: 34px;
        line-height: 34px;
        color: #13ce66;
      }
    }
  }
  .el-table {
    margin-bottom: 40px;
  }
}
</style>
