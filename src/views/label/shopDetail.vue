<template>
  <div class="shopLabel">
    <!-- 商品详情 -->
    <div class="shopLabelHead">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:50px 0 0 20px">
        <el-form-item label="商品SKUID：">
            <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="一级类目：">
            <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="品牌：" style="margin-left:26px;">
            <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="商品SPUID：">
          <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="二级类目：">
          <el-input  clearablev-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="馆类型：" style="margin-left:13px;">
          <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="商品名称：" style="margin-left:15px;">
          <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="三级类目：">
          <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="销量占比：">
          <el-input clearable v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="shopLine"></div>
    <div class="shopTableList">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="属性名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="所属类目等级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="attributeValue"
          label="属性值">
        </el-table-column>
        <el-table-column
          prop="attributeTotalValue"
          label="属性值总数">
        </el-table-column>
        <el-table-column
          prop="attributeShopTotal"
          label="本属性值商品总数">
        </el-table-column>
        <el-table-column
          prop="classShopTotal"
          label="本类目商品总数">
        </el-table-column>
        <el-table-column
          prop="shopHold"
          label="本属性值商品占比">
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <div class="detailBtn">
        <el-button type="info" disabled>查看交易信息</el-button>
        <el-button type="info" style="margin-left:20px;" disabled>查看类似信息</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        currentPage4: '1',
        formInline: {
          classOne: '',
          classTwo: '',
          classThe: ''
        },
        tableData: [{
          grade: '1级',
          name: '品牌',
          attributeValue: '索尼',
          attributeTotalValue: '12',
          attributeShopTotal: '2',
          classShopTotal: '40',
          shopHold: '5%'
        }, {
          grade: '1级',
          name: '品牌',
          attributeValue: '索尼',
          attributeTotalValue: '12',
          attributeShopTotal: '2',
          classShopTotal: '40',
          shopHold: '5%'
        }]
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .shopLabel{
    padding: 20px 20px;
    .shopLabelHead{
      background: rgb(241, 241, 241);
      margin-bottom:10px;
    }
    .shopLine{
      border-bottom: 1px dotted gray;
    }
    .shopTableList{
      margin-top:10px;
    }
    .block{
      float: right;
      margin-top:20px;
    }
    .detailBtn{
      margin-top:70px;
      text-align: center;
      clear: both; // 开启BFC
    }
  }
</style>
