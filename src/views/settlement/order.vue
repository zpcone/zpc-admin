<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form"  label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="channelType" label="渠道">
              <el-radio-group v-model="form.channelType">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">电商</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="time" label="创建日期：">
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
              <el-input placeholder="请输入用户ID" v-model.trim="form.mid" v-on:input="NumCheck" maxlength="18"></el-input>
            </el-form-item>
            <el-form-item prop="factoryId" label="供应商ID：">
              <el-input v-model="form.factoryId" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号：">
              <el-input v-model.trim="form.phone" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item prop="businessNumber" label="订单号：">
              <el-input v-model.trim="form.businessNumber" v-on:input="NumCheck" maxlength="18"></el-input>
            </el-form-item>
            <el-form-item prop="marketCampaign" label="营销活动：">
              <el-input v-model="form.marketCampaign" placeholder=""></el-input>
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
          <el-button type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="searchResult">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="number" label="支付/提款/退款单号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="businessNumber" label="业务订单号"></el-table-column>
        <el-table-column prop="editTime" label="状态改变时间"></el-table-column>
        <el-table-column prop="orderType" :formatter="orderTypeFormat" label="订单类型"></el-table-column>
        <el-table-column prop="businessType" :formatter="businessTypeFormat" label="业务类型"></el-table-column>
        <el-table-column prop="mid" label="mid"></el-table-column>
        <el-table-column prop="goodsId" label="商品ID"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
        <el-table-column prop="orderMoney" label="订单金额"></el-table-column>
        <el-table-column prop="marketCampaign" label="营销活动"></el-table-column>
        <el-table-column prop="subsidyMoney" label="补贴金额（元）"></el-table-column>
        <el-table-column prop="payMoney" label="支付金额（元）"></el-table-column>
        <el-table-column prop="payMode" :formatter="payModeFormat" label="支付方式"></el-table-column>
        <el-table-column prop="orderStatus" :formatter="orderStatusFormat" label="订单状态"></el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="view(scope.$index,scope.row)">查看流水</el-button>
            <el-button v-if="scope.row.orderStatus == 'FAILED'" type="primary" size="mini" @click="changeStatus(scope.$index,scope.row)">修改状态</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="center m20">
    	<el-pagination
    	  @size-change="handleSizeChange"
    	  @current-change="handleCurrentChange"
    	  :current-page.sync="form.pageNumber"
    	  :page-size="form.pageSize"
    	  layout="total, prev, pager, next"
    	  :total="total">
    	</el-pagination>
    </div>
  </section>
</template>

<script>
import { getOrderList, changeOrderStatus } from '@/api/settlement'
export default {
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
        orderType: '',
        orderStatus: '',
        businessType: '',
        payMode: '',
        sortRule: '1',
        quickStatus: '',
        startTime: '',
        endTime: '',
        marketCampaign: '',
        pageSize: 10,
        pageNumber: 1
      },
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
          label: '按业务订单号排序',
          value: '3'
        }
      ],
      orderStatuses: [{ label: '', value: '全部' }, { label: 'SUCCESS', value: '成功' }, { label: 'FAILED', value: '失败' }, { label: 'WAITING', value: '等待/付款中' }],
      orderTypes: [{ label: '', value: '全部' }, { label: '1', value: '转账' }, { label: '2', value: '支付' }, { label: '3', value: '提现' }, { label: '4', value: '退款' }],
      payModes: [{ label: '', value: '全部' }, { label: 'WX', value: '微信' }, { label: 'HFB', value: '汇付宝' }, { label: 'ZFB', value: '支付宝' }, { label: 'DZ', value: '豆子' }],
      businessTypes: [{ label: '', value: '全部' }, { label: '1', value: '转账' }, { label: '2', value: '购买' }, { label: '3', value: '提现' }, { label: '45', value: '退款' }, { label: '8', value: '充值' }],
      data: [],
      pageNumber: 1,
      pageSize: 10,
      idNum: true
    }
  },
  methods: {
    // Id、订单号、手机号校验
    NumCheck() {
      const reg = new RegExp(/^[0-9]*$/)
      if (!reg.test(this.form.mid) || !reg.test(this.form.businessNumber) || !reg.test(this.form.phone)) {
        this.idNum = false
      } else {
        this.idNum = true
      }
    },
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
        path: '/settlement/back/orderglide',
        query: {
          payNo: row.number
        }
      })
    },
    changeStatus(index, row) {
      changeOrderStatus({ payNo: row.number }).then(res => {
        if (res.status === 200) {
          this.$message.success('修改订单状态成功')
          this.getList()
        } else {
          this.$message.error('修改订单状态成功')
        }
      })
    },
    handleQuery() {
      this.getList()
    },
    // 获取列表
    getList() {
      getOrderList(this.form).then(res => {
        if (res.status === 200) {
          this.data = res.data.data
          this.total = res.data.totalRecordCount
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
      this.getList()
    },
    search() {
      if (this.idNum === false && this.form.mid) {
        this.$message.warning('ID、订单号、手机号必须为数字！')
      } else {
        this.handleQuery()
      }
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
  }
  .el-table {
    margin-bottom: 40px;
  }
}
</style>
