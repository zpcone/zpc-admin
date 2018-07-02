<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="用户名、用户操作"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userId" label="ID"></el-table-column>
        <el-table-column prop="" label="用户名"></el-table-column>
        <el-table-column prop="" label="用户操作"></el-table-column>
        <el-table-column prop="" label="请求方法"></el-table-column>
        <el-table-column prop="" label="请求参数"></el-table-column>
        <el-table-column prop="" label="执行时长（ms）"></el-table-column>
        <el-table-column prop="" label="IP地址"></el-table-column>
        <el-table-column prop="" label="创建时间"></el-table-column>
      </el-table>
    </div>
    <div class="center m20">
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page.sync="pageNumber" 
        :page-size="pageSize" 
        layout="total, prev, pager, next" 
        :total="total">
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
        pageNumber: 1,
        pageSize: 10,
        total: 50
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
.m20{
  margin: 20px;
}
.center{
  text-align: center;
}
</style>