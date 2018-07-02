<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="用户名：">
          <el-input placeholder="">
            <i slot="prefix" v-model="form.name" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        
        <el-form-item label="特权类型：">
          <el-select  placeholder="请选择" v-model="form.rigthType">
              <el-option
                  v-for="item in rigthTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获得日期">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="mm/dd/yyyy"
            end-placeholder="mm/dd/yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="el-icon el-icon-search">查询</el-button>
          <el-button type="text">查询全部记录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="订单ID"></el-table-column>    
        <el-table-column prop="" label="下单用户"></el-table-column>    
        <el-table-column prop="" label="注册手机"></el-table-column>    
        <el-table-column prop="" label="购买特权"></el-table-column>    
        <el-table-column prop="" label="购买金额"></el-table-column>    
        <el-table-column prop="" label="购买时间"></el-table-column>    
        <el-table-column prop="" label="使用时间"></el-table-column>    
        <el-table-column prop="" label="使用状态"></el-table-column>    
        <el-table-column prop="" label="消耗情况"></el-table-column>   
        <el-table-column prop="" label="剩余"></el-table-column>   
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
    
  </section>
</template>

<script>
  export default{
    data(){
      return{
        form: {},
        data: [],
        rigthTypes: [
          {
            label: '全部',
            value: '1'
          },
          {
            label: '会员特权',
            value: '2'
          },
          {
            label: '圈子特权',
            value: '3'
          },
          {
            label: '许愿灯特权',
            value: '4'
          },
          {
            label: '提现特权',
            value: '5'
          }
        ]
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
.textr {
  text-align: right;
}

.textl {
  text-align: left;
}

.textc {
  text-align: center;
}

.m20 {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>