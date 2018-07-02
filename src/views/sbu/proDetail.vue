<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="time" label="创建时间：">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="quickStatus" label="快速查看：">
          <el-radio-group v-model="form.quickStatus">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">今天</el-radio-button>
            <el-radio-button label="2">昨天</el-radio-button>
            <el-radio-button label="3">最近7天</el-radio-button>
            <el-radio-button label="4">最近30天</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="goodsId" label="商品ID：">
          <el-input v-model="form.goodsId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="goodsName" label="商品名称：">
          <el-input v-model="form.goodsName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="supplierId" label="供应商ID：">
          <el-input v-model="form.supplierId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="sellerName" label="供应商名称：">
          <el-input v-model="form.sellerName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="orderNo" label="业务订单号：">
          <el-input v-model="form.orderNo" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="payOrderNo" label="支付订单号：">
          <el-input v-model="form.payOrderNo" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="userId" label="分配对象：">
          <el-select v-model="form.userId" placeholder="请选择">
            <el-option
              v-for="item in persons"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item style="display: block;text-align: center;margin: 20px auto;">
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-setting" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <p>SBU名称：</p>
      <p>SBU ID：</p>
    </div>
    <div class="m20">
    	<el-table :data="data" border stripe style="width: 100%">
    	  <el-table-column prop="lastUpd" label="分配时间"></el-table-column>    
    	  <el-table-column prop="payOrderNo" label="支付订单号"></el-table-column>    
    	  <el-table-column prop="orderNo" label="业务订单号"></el-table-column>    
    	  <el-table-column prop="supplierId" label="供应商ID"></el-table-column>    
    	  <el-table-column prop="supplierName" label="供应商名称"></el-table-column>    
    	  <el-table-column prop="goodsId" label="商品ID"></el-table-column>    
    	  <el-table-column prop="goodsName" label="商品名称"></el-table-column>    
    	  <el-table-column prop="goodsCount" label="商品数量"></el-table-column>    
    	  <el-table-column prop="" label="本单分配金额（元）"></el-table-column>    
    	  <el-table-column prop="userName" label="分配对象"></el-table-column>    
    	  <el-table-column prop="accountPercent" label="分配比例"></el-table-column>    
    	  <el-table-column prop="splitAccount" label="分配金额（元）"></el-table-column>    
    	</el-table>
    </div>
    <div class="m20 center">
    	<el-pagination
    	  :current-page.sync="form.pageNumber" 
    	  :page-size="form.pageSize"
    	  @current-change="getList"
    	  layout="total, prev, pager, next" 
    	  :total="total">
    	</el-pagination>
    </div>
  </section>
</template>

<script>
  import { getAmountRecord,getPersons } from '@/api/sbu'
  export default{
    watch:{
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.form.startTime = this.time[0]
            this.form.endTime = this.time[1]
          }
          
        }else{
          this.form.startTime = ''
          this.form.endTime = ''
        }
        
      }
    },
    data(){
      return{
        query: {},
        form: {
          startTime: '',
          endTime: ''
        },
        persons: []
      }
    },
    methods:{
      handleQuery(){
        if(this.$router.currentRoute.query){
          this.query = this.$router.currentRoute.query
        }
        if(this.query.id){
          
        }else{
          this.back()
        }
      },
      getPersons(){
        console.log(this.query.id)
        getPersons({id: this.query.id}).then(res => {
          console.log(res)
        })
      },
      getList(){
        
      }
    },
    created(){
      this.handleQuery()
      this.getPersons()
    }
  }
</script>

<style scoped lang="scss">
</style>