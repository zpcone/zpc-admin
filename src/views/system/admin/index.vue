<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="defaultForm" :inline="true">
        <el-form-item prop="name">
          <el-input clearable v-model="defaultForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchUserInfo">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="edit">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="userDelete">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="allUserData" @selection-change="handleSelectionChange" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <!-- 1正常0禁用 -->
        <el-table-column prop="status" label="状态"
        :formatter="statusFormatter">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
    </div>
    <div class="center m20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="defaultForm.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="defaultForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <!-- 下边是删除弹框 -->
    <el-dialog
    style="text-align:center;"
      title="信息"
      :visible.sync="dialogDelete"
      width="30%"
      :before-close="handleClose">
      <span>确定删除选中的记录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogDelete">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
// ==========================================查询角色列表=删除用户
import { getUserInfo, getAllUserInfo,test, getRoleList , deleteUser, logout} from '@/api/login'
import { getSearchFromName } from "@/api/system/dept"
  export default{
    data(){
      return{
        dialogDelete: false, // 删除弹框
        userIds: [],
        multipleSelection: [],
        pageTotal: '', // 总条数
        defaultForm: {
          userName: '',
          pageSize: '5',
          pageNum: 1
        },
        addForm: {
          username: '', //	用户名
          password: '', //	密码
          email: ''	, // 邮箱
          mobile: '',// 机号
          roleIdList: '' , // 角色
          deptId: '',  // 部门id
          deptNam: '', //	部门名称
          childDeptIds: '', // 子部门
          status: '' // 状态
        },
        allUser: {},
        allUserData: [],
        pageNumber: 1,
        pageSize: 10,
        total: 50,
        currentPath: this.$router.currentRoute.path
      }
    },
    methods:{
      getAllRole() {
        var _this = this
        var obj = {}
        obj.roleName = ''
        getSearchFromName(obj)
        .then(res => {
          var roleArr = []
          res.data.forEach(ele => {
            var obj = {}
            obj.lebel = ele.roleName
            obj.value = ele.roleId
            roleArr.push(obj)
          })
          _this.$store.commit('setgetAllRoleArr', roleArr)
          // console.log(_this.$store.state.getAllRoleArr)
          _this.$message.success("查询成功")
        })
        .catch(() => {
          _this.$message.error("查询失败")
        })
      },
      // 删除用户接口调用
      doDeleteUser() {
        deleteUser(this.userIds)
        .then(res => {
          this.$message.success('删除成功')
          this.searchUserInfo()
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
      },
      // 删除弹框确定
      saveDialogDelete(){
        this.dialogDelete = false
        this.doDeleteUser()
      },
      // table勾选框事件
      handleSelectionChange(val) {
        this.userIds = []
        this.multipleSelection = val
        console.log(this.multipleSelection)
        this.multipleSelection.forEach(ele => {
          this.userIds.push(ele.userId)
        })
      },
      // 翻页事件
      handleSizeChange(val) {
        this.defaultForm.pageSize = val
        this.searchUserInfo()
      },
      handleCurrentChange(val) {
        this.defaultForm.pageNum = val
        this.searchUserInfo()
      },
      // table格式化
      statusFormatter(row, column) {
        if (row.status == '1') {
          return '正常'
        } else if(row.status == '0') {
          return '禁用'
        } else {
          return ''
        }
      },
      searchUserInfo() {
        // var _this = this
        getAllUserInfo(this.defaultForm)
        .then(res => {
          var obj = JSON.parse(res)
          console.log(obj)
          this.allUserData = obj.data.list
          this.pageTotal = obj.data.totalCount
          this.$message.success('查询成功')
        })
        .catch(() => {
          this.$message.error('查询失败')
        })
      },
      // 新增事件
      add(){
        this.$router.push(this.currentPath + '/add')
      },
      // 修改事件
      edit(){
        if(this.multipleSelection.length <= 0) {
          this.$message.info('请选择修改项')
        } else if (this.multipleSelection.length > 1) {
          this.$message.info('只能选一条记录')
        } else {
          var userId = this.multipleSelection[0].userId
          this.$store.commit('setEditUser', this.multipleSelection)
          console.log(this.$store.state.editUser)
          this.$router.push(`/system/admin/update/${userId}`)
          // this.$router.push(this.currentPath + '/update/' + userId)
        }
      },
      userDelete() {
        if(this.multipleSelection.length > 0) {
          console.log('删除')
          this.dialogDelete = true
        } else {
          this.$message.info('请选择删除项')
        }
      }
    },
    mounted () {
      this.searchUserInfo()
      this.getAllRole()
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
