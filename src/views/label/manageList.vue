<template>
  <div class="wrapper">
    <div class="wrapperHead" ref="headCharts"></div>
    <div class="line"></div>
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item>
        <el-input style="width:300px;" v-model="form.name" placeholder="请输入搜索关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="wrapperBody">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="proportion"
          label="占比">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="addhandleClick(scope.row)" type="text" size="small">添加查询列表</el-button>
            <el-button @click="searchHandleClick(scope.row)" type="text" size="small">查询用户列表</el-button>
            <!-- <el-button type="text" size="small">查询关联图</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float:right;margin:20px 0;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import pushPie from '../charts/label/peopleLabelList' // 引入饼状图一
export default {
  components:{},
  props:{},
  data(){
    return {
      currentPage: 1, //  当前页
      form: {
        name: ''
      },
      // table列表的数据
      tableData: [{
        name: '北京',
        num: '100',
        proportion: '30%'
      }, {
        num: '50',
        name: '天津',
        proportion: '40%'
      }, {
        num: '60',
        name: '河北',
        proportion: '30%'
      }]
    }
  },
  watch:{},
  computed:{},

  methods:{
    // 加载echarts
    getEchartsOne () {
      const boxOne = this.$refs.headCharts // 获取节点
      this.chartsOne = echarts.init (boxOne)
      this.chartsOne.setOption(pushPie)
    },
    // table内部的点击事件
    addhandleClick () {
      console.log('添加')
    },
    searchHandleClick () {
      console.log('查询')
    },
    // 翻页事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // array.forEach(element => {

      // });
      console.log(`当前页: ${val}`);
    }
  },
  created(){},
  mounted(){
    this.getEchartsOne ()
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    padding: 20px;
    .wrapperHead{
      height:250px;
      background: #F2F2F2;
    }
    .line{
      margin-top:20px;
      border-bottom: 1px dashed #F2F2F2;
    }
    .wrapperBody{
      margin-top:20px;
    }
  }
</style>
