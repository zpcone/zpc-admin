<template>
  <section>
    <div class="mb20" style="margin: 20px 20px;">
      <div style="margin-bottom: 20px;">
        <el-button type="primary">创建一级分类</el-button>
      </div>
      <el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 20px;" ref="searchForm" v-model="searchForm" label-width="140px">
        <el-form-item label="搜索：" prop="name">
          <el-input  v-model="searchForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="channel">
          <el-radio-group v-model="searchForm.channel" >
            <el-radio-button label="全部" value="1"></el-radio-button>
            <el-radio-button label="社交" value="2"></el-radio-button>
            <el-radio-button label="电商" value="3"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性质：" prop="type">
          <el-radio-group v-model="searchForm.type" >
            <el-radio-button label="全部" value="1"></el-radio-button>
            <el-radio-button label="群" value="2"></el-radio-button>
            <el-radio-button label="圈" value="3"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="级别：" prop="level">
          <el-radio-group v-model="searchForm.level" >
            <el-radio-button label="全部" value="1"></el-radio-button>
            <el-radio-button label="一级分类" value="2"></el-radio-button>
            <el-radio-button label="二级分类" value="3"></el-radio-button>
            <el-radio-button label="三级分类" value="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button  style="min-width: 120px;" type="info" @click="search('searchForm')">查找</el-button>
        </el-form-item>
      </el-form>
      <div class="setting" style="margin-top: 20px;padding-left: 20px;">
        <!--排序 + 全选 + 已选中项数-->
        <span>排序：</span>
        <el-select placeholder="请选择"  v-model="searchForm.sortBy">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
        <span>当前选中{{chooseLen}}项</span>
        <!--<el-button  type="info" @click= "deleteLimit">删除</el-button>-->
      </div>
      <div class="table" style="margin: 20px 10px;min-height: 100px;">
        <el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="分类ID"></el-table-column>
          <el-table-column prop="content" label="分类编码"></el-table-column>
          <el-table-column prop="by" label="渠道"></el-table-column>
          <el-table-column prop="by" label="性质"></el-table-column>
          <el-table-column prop="by" label="分类名称"></el-table-column>
          <el-table-column prop="by" label="级别"></el-table-column>
          <el-table-column prop="by" label="上级分类名"></el-table-column>
          <el-table-column prop="by" label="创建方式"></el-table-column>
          <el-table-column prop="by" label="创建时间"></el-table-column>
          <el-table-column prop="addByWho" label="人数上限"></el-table-column>
            <!--头像和名称-->
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button  type="text" @click="view(scope.$index,scope.row)">编辑</el-button>
              <el-button  type="text" @click="view(scope.$index,scope.row)">停用</el-button>
              <el-button  type="text" @click="view(scope.$index,scope.row)">启用</el-button>
              <el-button  type="text" @click="view(scope.$index,scope.row)">新增下级分类</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination center">
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page.sync="currentPage" 
          :page-size="10" layout="total, prev, pager, next" 
          :total="100">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    data(){
      return{
        searchForm: {
          groupid: '',
          time: '',
          quick: '',
          sortBy: '1'
        },
        chooseLen: 0,
        tableData: [],
        options: [
          {
            label: '全部',
            value: '1'
          },
          {
            label: '时间由近及远',
            value: '2'
          },
          {
            label: '级别由高到低',
            value: '3'
          }
        ],
        currentPage: 1
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
.create {
  margin: 20px 20px;
}
</style>