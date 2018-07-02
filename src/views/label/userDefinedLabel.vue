<template>
  <div class="stageCreatwrapper">
    <div class="stageCreatHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="渠道类型:">
          <el-select disabled v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索关键字:">
          <el-input class="inputWidth" v-model="form.labelName" placeholder="请输入自定义标签关键字"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="btn">
      <!-- <el-button type="primary" @click="searchUserList">查看用户列表</el-button> -->
      <!-- <el-button type="primary" @click="onSubmit">查看用户详情</el-button> -->
    </div>
    <div class="stageCreatTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="标签ID"
          prop="labelId"
          width="120">
        </el-table-column>
        <el-table-column
          prop="labelName"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="创建者昵称">
        </el-table-column>
        <el-table-column
          prop="userCount"
          label="用户数量">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="searchUserList(scope.row)" type="text" size="small">查看用户列表</el-button>
            <el-button @click="searchUserDetail(scope.row)" type="text" size="small">查看用户详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 查询用户自定义标签列表
import { userDefined } from '@/api/label/peopleLabelManage/peopleLabelSearch'
export default {
  components:{},
  props:{},
  data(){
    return {
      totalPage: '',
      currentPage4: '1',
      tableData: [],
      multipleSelection: [],
      form: {
        labelName: '',	// 标签名称
        pageNum: 1,	// 当前页
        pageSize: 5	// 每页显示条数
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 点击查看用户列表事件
    searchUserList(row) {
      this.$router.push({
        path: '/label/peopleManage/userList',
        query: {
          name: row.labelName,
          channelId: '1',
          labelType: '1'
        }
      })
      console.log('查看用户列表')
      // this.$router.push(`/label/peopleManage/userList`)
    },
    // 查看用户详情事件
    searchUserDetail(row) {
      row.channelId = '1'
      row.mId = '1001'
      this.$router.push(`/label/peopleManage/userDetail/${row.mId}/${row.channelId}`)
    },
    // 查询事件
    search() {
      this.getData()
    },
    getData() {
      userDefined(this.form)
      .then(res => {
        this.tableData = res.data
        this.totalPage = Number(res.totalSize)
        this.$message({
          message: '查询成功!',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '查询失败!',
          type: 'error'
        })
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getData()
      console.log(`当前页: ${val}`)
    }
  },
  created(){},
  mounted(){
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
  .stageCreatwrapper{
    padding: 20px;
    .stageCreatHead{
      padding: 25px 0;
      background: #F2F2F2;
      height:100px;
    }
    .line{
      padding: 10px 0;
      border-bottom: 1px dashed gray;
    }
    .btn{
      margin: 20px 0 0 200px;
    }
    .stageCreatTable{
      margin-top:20px;
    }
    .block{
      margin-top:20px;
      float: right;
    }
  }
</style>
