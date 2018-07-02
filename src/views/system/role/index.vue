<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item prop="name">
          <el-input clearable v-model="form.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchRole">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="edit">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteClick">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="tableData" border stripe  @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="roleId" label="角色ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogDelete"
      width="30%">
      <div style="text-align:center;">确定删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="saveDeleteDept">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div class="center m20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNumber"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div> -->
  </section>
</template>

<script>
// =============角色列表====查询角色列表====删除角色====修改角色==添加角色
import {
  getSearchFromName,
  searchRoleList,
  getRoleInfo,
  removeRole,
  updateRole,
  addRole
} from "@/api/system/dept";
export default {
  data() {
    return {
      dialogDelete: false,
      getChecked: [],
      form: {
        roleName: "" // 用户名
      },
      addForm: {
        deptId: '100',
        roleId: '100', //	角色id
        roleName: 'zpc', //	角色名称
        remark: '', //	备注
        deptName: '', //	部门名称
        menuIdList: '', //	菜单
        deptIdList: '' //	部门
      },
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 50,
      currentPath: this.$router.currentRoute.path
    };
  },
  methods: {
    // 删除弹框-确定事件
    saveDeleteDept() {
      this.deleteRole()
    },
    handleSelectionChange(data) {
      this.getChecked = data
      console.log(data)
    },
    // 查询角色点击事件
    searchRole() {
      this.searchRoleInfo();
    },
    // 点击删除 事件
    deleteClick() {
      if (this.getChecked.length <=  0) {
        this.$message.warning('请选择删除项')
        return
      }
      if (this.getChecked.length >  1) {
        this.$message.warning('每次只能删除一项')
        return
      }
      if (this.getChecked.length == 1) {
        this.dialogDelete = true
      }
    },
    // 删除角色=接口
    deleteRole() {
        var obj = {};
        obj.roleId = [this.getChecked[0].roleId];
        removeRole(obj.roleId)
          .then(res => {
            this.dialogDelete = false
            this.$message.success("删除成功");
            this.searchRoleInfo()
            console.log(res);
          })
          .catch(() => {
            this.$message.error("删除失败");
          })
    },
    // 查询角色==接口
    searchRoleInfo() {
      getSearchFromName(this.form)
        .then(res => {
          this.tableData = res.data;
          this.$message.success("查询成功")
        })
        .catch(() => {
          this.$message.error("查询失败")
        })
    },
    // 获取全部角色列表==接口
    getRole() {
      searchRoleList({})
        .then(res => {
          this.tableData = res.data;
          console.log(res);
          this.$message.success("角色查询成功")
        })
        .catch(() => {
          this.$message.error("角色查询失败")
        });
    },
    add() {
      // addRole(this.addForm)
      // .then(res => {
      //   this.$message.success("新增成功")
      // })
      // .catch(() => {
      //   this.$message.error("新增失败")
      // })
      this.$router.push(this.currentPath + "/add");
    },
    edit() {
      // var obj = {
      //   roleName: "", //	角色名称
      //   remark: "", //	备注
      //   deptId: "", //	部门id
      //   deptName: "", //	部门名称
      //   menuIdList: "", //	菜单
      //   deptIdList: "" //	部门
      // }
      // updateRole(obj)
      //   .then(res => {
      //     this.$message.success("编辑成功");
      //   })
      //   .catch(() => {
      //     this.$message.error("编辑失败");
      //   });
      if (this.getChecked.length == 1) {
        this.$router.push({
          path: '/system/role/edit',
          query: {
            roleName: this.getChecked[0].roleName,
            deptName: this.getChecked[0].deptName,
            id: this.getChecked[0].roleId,
            remark: this.getChecked[0].remark
          }
        })
      } else if (this.getChecked.length == 0) {
        this.$message.warning('请选择勾选项')
      } else if (this.getChecked.length > 1) {
        this.$message.warning('每次修改一项')
      }
    }
  },
  mounted() {
    this.getRole();
  }
};
</script>

<style scoped lang="scss">
.m20 {
  margin: 20px;
}
.center {
  text-align: center;
}
</style>
