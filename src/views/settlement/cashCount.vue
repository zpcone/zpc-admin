<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="userName" label="用户名称：">
              <el-input v-model="form.userName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="userId" label="用户ID：">
              <el-input v-model="form.userId" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="platformName" label="平台账户名称：">
              <el-input v-model="form.platformName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="platformId" label="平台ID：">
              <el-input v-model="form.platformId" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="count" label="统计：">
              <el-radio-group v-model="form.count">
                <el-radio-button label="1">7天</el-radio-button>
                <el-radio-button label="2">30天</el-radio-button>
                <el-radio-button label="3">90天</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="channelId" label="渠道：">
              <el-radio-group v-model="form.count">
                <el-radio-button label="1">全部</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
                <el-radio-button label="3">电商</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="type" label="账户类型：">
              <el-radio-group v-model="form.type">
                <el-radio-button label="1">全部</el-radio-button>
                <el-radio-button label="2">个人</el-radio-button>
                <el-radio-button label="3">平台</el-radio-button>
                <el-radio-button label="4">圈</el-radio-button>
                <el-radio-button label="5">供应商</el-radio-button>
                <el-radio-button label="6">SBU</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="behavior" label="用户行为：">
              <el-radio-group v-model="form.behavior">
                <el-radio-button label="1">全部</el-radio-button>
                <el-radio-button label="2">充值</el-radio-button>
                <el-radio-button label="3">提现</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="sort" label="排序：">
              <el-select v-model="form.sort" @change="sortChange">
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
          <el-button type="success" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-setting">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="bean" style="width: 100%;height: 600px;margin: 40px auto;"></div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="mid" label="mid"></el-table-column>
        <el-table-column prop="mid" label="账户类型"></el-table-column>
        <el-table-column prop="mid" label="用户名"></el-table-column>
        <el-table-column prop="mid" label="渠道"></el-table-column>
        <el-table-column prop="mid" label="创建日期"></el-table-column>
        <el-table-column prop="mid" label="账户类型"></el-table-column>
        <el-table-column prop="mid" label="账户状态"></el-table-column>
        <el-table-column prop="mid" label="余额（豆）"></el-table-column>
        <el-table-column prop="mid" label="可用（豆）"></el-table-column>
        <el-table-column prop="mid" label="冻结（豆）"></el-table-column>
        <el-table-column prop="mid" label="今日充值（豆）"></el-table-column>
        <el-table-column prop="mid" label="今日提现（豆）"></el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      form: {
        sort: '1',
        count: '1',
        type: '1',
        behavior: '1'
      },
      sorts: [
        {
          label: '按创建时间排序',
          value: '1'
        },
        {
          label: '按账户余额排序',
          value: '2'
        },
        {
          label: '按用户名排序',
          value: '3'
        },
        {
          label: '按今日充值排序',
          value: '4'
        },
        {
          label: '按今日提现排序',
          value: '5'
        }
      ],
      data: [{ mid: 123456 }],
      legendData: ['今日账户余额', '今日提现总额', '今日充值总额'],
      xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {
    drawHisto(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {},
        legend: {
          data: this.lengendData
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          name: '余额',
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        series: [
          {
            name: '今日账户余额',
            type: 'bar',
            data: [12, 11, 20, 34, 23, 46, 76]
          },
          {
            name: '今日提现总额',
            type: 'line',
            data: [2, 1, 2, 3, 2, 4, 7]
          },
          {
            name: '今日充值总额',
            type: 'line',
            data: [12, 10, 20, 30, 23, 6, 7]
          }
        ]
      })
    },
    // 排序
    sortChange() {
      // this.form.sortRule = val
      // searchPaymentList(this.form).then(res => {
      //   if (res.status === 200) {
      //     this.data = res.data.data
      //     console.log(this.data)
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.errorMsg
      //     })
      //   }
      // })
    }
  },
  created() {
    this.$nextTick(() => {
      this.drawHisto('bean')
    })
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
</style>
