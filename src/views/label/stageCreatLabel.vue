<template>
  <div class="stageCreatwrapper">
    <div class="stageCreatHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="渠道类型:">
          <el-select clearable v-model="form.channelId" placeholder="请选择">
            <el-option label="电商" value="1"></el-option>
            <el-option label="社交" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则类型:">
          <el-select disabled v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="btn">
      <!-- <el-button type="primary" @click="onSubmit">创建</el-button> -->
      <!-- <el-button type="primary" @click="onSubmit">编辑</el-button> -->
      <!-- @click="searchUserList(scope.row)" -->
      <!-- <el-button type="primary" @click="searchUserList">查看用户列表</el-button> -->
    </div>
    <div class="stageCreatTable">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="pId"
          prop="pId"
          width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
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
          prop="mName"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="actionName"
          label="规则名称">
        </el-table-column>
        <el-table-column
          prop="actionNum"
          label="下限值">
        </el-table-column>
        <el-table-column
          prop="status"
          :formatter="startFormatter"
          label="是否启用">
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="是否废弃">
        </el-table-column> -->
        <el-table-column
          :formatter="showFormatter"
          prop="isDelete"
          label="是否展示">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="searchUserList(scope.row)" type="text" size="small">查询用户列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑内容" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" :inline="true" label-width="100px">
        <el-form-item label="标签名称：">
          <el-input style="width:200px;" v-model="editForm.labelName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="editForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">废弃</el-radio>
          </el-radio-group>
        </el-form-item> <br>
        <!-- <el-form-item label="规则名称：">
          <el-select disabled clearable v-model="editForm.region" placeholder="请选择">
            <el-option label="1-第三方登录次数" value="1"></el-option>
            <el-option label="2-支付金额" value="2"></el-option>
            <el-option label="3-发红包次数" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <br>
        <el-form-item label="下限值：">
          <el-input style="width:200px;" v-model="editForm.actionNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="editForm.isDelete">
            <el-radio label="0">展示</el-radio>
            <el-radio label="1">不展示</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveEdit">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
// ==========查询=================配置=============
import { factorylabelSearch, factorylabelUpload } from '@/api/label/peopleLabelManage/peopleLabelSearch'
export default {
  components:{},
  props:{},
  data(){
    return {
      dialogFormVisible: false,
      totalPage: '',
      tableData3: [],
      multipleSelection: [],
//       pId	主键id
// labelName	标签名称
// actionNum	下限值
// status	是否启用的状态
// isDelete	是否展示
      editForm: {
        pId: '',
        labelName: '',
        actionNum: '',
        status: '',
        isDelete: '',
      },
      form: {
        channelId: '',
        pageSize: 5, // 每页多少条
        pageNum: 1 // 当前页
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    startFormatter(row) {
      if (row.status == '1'){
        return '已启用'
      } else if(row.status == '0') {
        return '未启用'
      }
    },
    showFormatter(row) {
      if (row.isDelete == '1'){
        return '不展示'
      } else if(row.isDelete == '0') {
        return '展示'
      }
    },
    // 弹出框确定事件
    saveEdit() {
      console.log(this.editForm)
      factorylabelUpload(this.editForm)
      .then(res => {
        this.dialogFormVisible = false
        this.getData()
        this.$message({
          message: '编辑成功!',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '编辑失败!',
          type: 'error'
        })
      })
    },
    // 查询事件
    search() {
      this.getData()
    },
    getData () {
      factorylabelSearch(this.form)
      .then(res => {
        this.tableData3 = res.data
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
    // table编辑事件
    handleClick(row) {
      console.log(row)
      this.editForm.pId = row.pId
      this.editForm.labelName = row.labelName
      this.editForm.actionNum = row.actionNum
      this.editForm.status = String(row.status)
      this.editForm.isDelete = String(row.isDelete)
      this.dialogFormVisible = true
      console.log(row)
    },
    // 查询用户列表事件
    searchUserList(row) {
      this.$router.push({
        path: '/label/peopleManage/userList',
        query: {
          name: row.labelName,
          channelId: String(row.channelId),
          labelType: '2'
        }
      })
      // this.$router.push(`/label/peopleManage/userList/${row.mId}/${row.channelId}`)
      // this.$router.push('/label/peopleManage/userList')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.form.pageNum = val
      this.getData()
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
