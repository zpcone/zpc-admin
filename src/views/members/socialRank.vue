<template>
  <div class="rankwrap">
    <div class="addGrade">
      <el-button type="primary" icon="el-icon-plus" @click="dialogAddFormVisible = true">添加等级</el-button>
    </div>
    <div class="tableList">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="grade"
          label="会员等级">
        </el-table-column>
        <el-table-column
          prop="range"
          label="币值范围">
        </el-table-column>
        <el-table-column
          prop="rights"
          label="会员权益">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-switch
              style="margin-right:10px;"
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <!-- <i class="el-icon-edit"></i> -->
            <!-- <i class="el-icon-delete"></i> -->
            <el-button type="" icon="el-icon-edit" size="mini" @click="dialogEditFormVisible = true"></el-button>
            <el-button type="" icon="el-icon-delete" size="mini" @click="deleta(scope.$index,scope.row)"></el-button>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
    <!-- 编辑会员等级弹出框 -->
    <el-dialog title="编辑会员等级" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="等级名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="币值范围" :label-width="formLabelWidth">
          <el-input style="width:80px;" v-model="editForm.input1"></el-input>
          <span>-</span>
          <el-input  style="width:80px;" v-model="editForm.input2"></el-input>
        </el-form-item>
        <el-form-item label="会员权益描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="editForm.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditFormVisible = false">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加等级弹出框 -->
    <el-dialog title="新增会员等级" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="等级名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="币值范围" :label-width="formLabelWidth">
          <el-input style="width:80px;" v-model="addForm.input1"></el-input>
          <span>-</span>
          <el-input  style="width:80px;" v-model="addForm.input2"></el-input>
        </el-form-item>
        <el-form-item label="会员权益描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="addForm.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddFormVisible = false">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        dialogEditFormVisible: false,
        dialogAddFormVisible: false,
        editForm: {
          name: '',
          input1: '1',
          input2: '100',
          textarea: ''
        },
        addForm: {
          name: '',
          input1: '',
          input2: '',
          textarea: ''
        },
        formLabelWidth: '120px',
        value: true,
        tableData: [{
          grade: '普通会员',
          range: '0-100',
          rights: '购物打折，发言气泡',
          status: '未生效'
        },{
          grade: '白银会员',
          range: '101-300',
          rights: '购物打折，发言气泡，贷款额度',
          status: '未生效'
        }]
      }
    },
    methods:{
    deleta(index, row) {
      console.log(index)
      console.log(row)
      this.$confirm('', '确定删除该等级?', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      })
        .then(() => {
          // 删除成功
          this.$message.success('删除成功')
        })
        .catch(() => {
          // 取消删除
          this.$message.info('已取消删除')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
$border:1px solid #ccc;
.block{
  float: right;
  margin-top: 20px;
}
.dialog-footer{
  text-align: center;
}
.rankwrap{
  padding: 0 20px;
  .tableList{
    margin-top:20px;
  }
  .addGrade {
    height: 70px;
    line-height: 70px;
    text-align: right;
    padding-right: 20px;
    border-bottom: $border;
  }
}

</style>
