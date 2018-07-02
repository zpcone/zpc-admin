<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="">
        <el-form-item prop="changeProject" label="变更项目：">
          <el-radio-group v-model="form.changeProject" @change="project">
            <el-radio-button v-for="item in changeProjects" :label="item.label" :key="item.label">{{item.value}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div>
          <span>排序：</span>
          <el-select v-model="form.sortRule">
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form>
    </div>
    <div class="searchResult">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="number" label="支付/提款/退款单号"></el-table-column>
        <el-table-column prop="createTime" label="发生时间"></el-table-column>
        <el-table-column prop="businessNumber" label="业务订单号"></el-table-column>
        <el-table-column prop="orderType" :formatter="orderTypeFormat" label="订单类型"></el-table-column>
        <el-table-column prop="businessType" :formatter="businessTypeFormat" label="业务类型"></el-table-column>
        <el-table-column prop="mid" label="mid"></el-table-column>
        <el-table-column prop="goodsId" label="商品Id"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
        <el-table-column prop="orderMoney" label="订单金额"></el-table-column>
        <!-- <el-table-column prop="" label="营销活动"></el-table-column> -->
        <el-table-column prop="subsidyMoney" label="补贴金额（元）"></el-table-column>
        <el-table-column prop="payMoney" label="支付金额（元）"></el-table-column>
        <el-table-column prop="payMode" :formatter="payModeFormat" label="支付方式"></el-table-column>
        <el-table-column prop="changeProject" :formatter="changeProjectFormat" label="变更项目"></el-table-column>
        <el-table-column prop="orderStatus" :formatter="orderStatusFormat" label="订单状态"></el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import { getOrderRecord } from '@/api/settlement'
export default {
  data() {
    return {
      form: {
        changeProject: '',
        sortRule: '1'
      },
      sorts: [
        {
          label: '按发生时间排序',
          value: '1'
        }
      ],
      changeProjects: [{ label: '', value: '全部' }, { label: 'SUCCESS', value: '成功' }, { label: 'FAILED', value: '失败' }, { label: 'WAITING', value: '创建' }],
      orderStatuses: [{ label: '', value: '全部' }, { label: 'SUCCESS', value: '成功' }, { label: 'FAILED', value: '失败' }, { label: 'WAITING', value: '等待/付款中' }],
      orderTypes: [{ label: '', value: '全部' }, { label: '1', value: '转账' }, { label: '2', value: '支付' }, { label: '3', value: '提现' }, { label: '4', value: '退款' }],
      payModes: [{ label: '', value: '全部' }, { label: 'WX', value: '微信' }, { label: 'HFB', value: '汇付宝' }, { label: 'ZFB', value: '支付宝' }, { label: 'DZ', value: '豆子' }],
      businessTypes: [{ label: '', value: '全部' }, { label: '1', value: '购买' }, { label: '2', value: '重置' }, { label: '3', value: '提现' }, { label: '45', value: '退款' }, { label: '5', value: '转账' }],
      data: [],
      query: {}
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
    // 业务类型
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
      // let str = ''
      // for (let i = 0; i < this.businessTypes.length; i++) {
      //   if (row.businessType === this.businessTypes[i].label) {
      //     str = this.businessTypes[i].value
      //   }
      // }
      // return str
    },
    // 订单状态
    orderStatusFormat(row) {
      let str = ''
      for (let i = 0; i < this.orderStatuses.length; i++) {
        if (row.orderStatus === this.orderStatuses[i].label) {
          str = this.orderStatuses[i].value
        }
      }
      return str
    },
    // 变更方式
    changeProjectFormat(row) {
      let str = ''
      for (let i = 0; i < this.changeProjects.length; i++) {
        if (row.changeProject === this.changeProjects[i].label) {
          str = this.changeProjects[i].value
        }
      }
      return str
    },
    // 变更项目
    project() {
      this.handleQuery()
    },
    // table格式化 end
    handleQuery() {
      this.query = this.$router.currentRoute.query
      this.getData()
    },
    // 获取流水
    getData() {
      // console.log(this.query)
      const searchParams = {
        payNo: this.query.payNo,
        sortRule: 1,
        changeProject: ''
      }
      if (this.form.changeProject === 'SUCCESS') {
        searchParams.changeProject = 'SUCCESS'
      } else if (this.form.changeProject === 'FAILED') {
        searchParams.changeProject = 'FAILED'
      } else if (this.form.changeProject === 'WAITING') {
        searchParams.changeProject = 'WAITING'
      }
      getOrderRecord(searchParams).then(res => {
        if (res.status === 200) {
          this.data = res.data.data
        } else {
          this.$message.error(res.errorMsg)
        }
      })
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
