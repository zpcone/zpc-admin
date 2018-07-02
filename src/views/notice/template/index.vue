<template>
  <div style="padding:20px;">
    <div class="templateRule">
        <!-- <div></div> -->
        <i class="el-icon-warning" style="font-size:30px; color:white; margin:10px 0 0 20px"></i>
        <h3 style="display:inline">使用规则</h3>
        <p>模板需审核通过后才可调用，统一提交审核后，正常情况下10分钟内即可获得审核结果。</p>
    </div>
    <div class="informMessageList">
      <p>系统通知类消息列表</p>
    </div>
    <div class="templateType">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="模板类型">
          <el-select v-model="form.templateType" clearable placeholder="请选择模板类型">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="通知类" value="1"></el-option>
            <el-option label="验证码类" value="2"></el-option>
            <el-option label="营销类" value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="消息系统">
          <el-select v-model="form.templateSystem" clearable placeholder="请选择消息系统">
            <el-option label="电商" value="1"></el-option>
            <el-option label="社交" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="审核状态">
          <el-select v-model="form.templateStatus" clearable placeholder="请选择活动区域">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="待提交" value="1"></el-option>
            <el-option label="审核中" value="2"></el-option>
            <el-option label="已通过" value="3"></el-option>
            <el-option label="已驳回" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="form.templateName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="模板ID">
          <el-input v-model="form.id" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.createdBy" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align:center;" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="newSetTemplate">
      <el-button type="info" @click="creatNewTemplate">新建模板</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="模板id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="templateType"
          :formatter="templateTypeFormatter"
          label="模板类型">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称">
        </el-table-column>
        <el-table-column
          prop="templateSystem"
          :formatter="templateSystemFormatter"
          label="系统">
        </el-table-column>
        <el-table-column
          prop="list"
          :formatter="channelFormatter"
          label="渠道">
        </el-table-column>
        <el-table-column
          prop="messageContext"
          width="160"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="created"
          :formatter="submitTimeFormatter"
          width="160"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="templateStatus"
          :formatter="statusFormatter"
          label="审核状态（内部）">
        </el-table-column>
        <el-table-column
          prop="templateAuditTime"
          width="160"
          :formatter="auditTimeFormatter"
          label="审核时间">
        </el-table-column>
        <el-table-column
          prop="turnDown"
          label="驳回原因">
        </el-table-column>
        <el-table-column
          prop="createdBy"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="auditId"
          width="170"
          label="审批者">
        </el-table-column>
        <el-table-column
          prop="checkStatusBusiness"
          label="审核状态（运行商）">
        </el-table-column>
        <el-table-column
          prop="operation"
          width="200"
          label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="editClick(scope.row)" type="text" size="small" v-show="scope.row.templateStatus === '3'">编辑</el-button>
            <el-button @click="submitCheck(scope.row)" type="text" size="small" v-show="scope.row.templateStatus === '3' && scope.row.templateStatus === '2' && scope.row.templateStatus === '4'">提交审核</el-button>
            <el-button type="text" size="small" @click="deleteClick(scope.row)" v-show="scope.row.templateStatus === '3' && scope.row.templateStatus === '2'">删除</el-button> -->
            <el-button v-if="scope.row.templateStatus !== 3" @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <!-- <el-button @click="editClick(scope.row)" type="text" size="small" v-if="scope.row.templateStatus == '3'">编辑</el-button> -->
            <el-button v-if="scope.row.templateStatus !== 3" @click="submitCheck(scope.row)" type="text" size="small">提交审核</el-button>
            <el-button v-if="scope.row.templateStatus !== 3" type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="float:right; margin: 20px 20px 0 0;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
    <!-- 下边是删除的弹出框 -->
    <el-dialog width ="500px" title="删除理由:" :visible.sync="dialogDelete">
      <el-form :model="deleteForm" ref="deleteDom">
        <el-form-item label="删除原因" style="margin-left:10px;" :label-width="formLabelWidth"
            prop="information"
            :rules="{
              required: true, message: '内容不能为空', trigger: 'change'
            }">
          <el-input resize="none" type="textarea" v-model="deleteForm.information" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="cancelDialogDelete">取 消</el-button>
        <el-button type="primary" @click="saveDialogDelete('deleteDom')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑之后的弹出框 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editDom">
        <el-form-item label="内容编辑" :label-width="formLabelWidth"
            prop="templateContext"
           :rules="{
              required: true, message: '内容不能为空', trigger: 'change'
            }"
        >
          <el-input resize="none" type="textarea" v-model="editForm.templateContext" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改原因" :label-width="formLabelWidth"
          prop="information"
          :rules="{
            required: true, message: '内容不能为空', trigger: 'change'
          }"
          >
          <el-input resize="none" type="textarea" v-model="editForm.information" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit('editDom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 搜索模板，删除模板,修改模板，审核模板, 新建模板
import { searchTemplate, deleteTemplate, updateTemplate, auditTemplate, addTemplate } from '@/api/notice'
import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        deleteForm: {
          information: '',
          lastUpdBy: '1',
          templateSystem: '2'
        },
        editFormVisible: false,
        dialogDelete: false,
        checkParams: {
          id: '',
          turnDown: '',
          lastUpdBy: '1',
          templateStatus: '',
          templateSystem: '2'
        },
        editForm:{
          templateSystem: '2',
          lastUpdBy: '1',
          templateContext: '',
          information: '',
          id: ''
        },
        form: {
          templateSystem: '2', //
          templateType: '', // 模板类型
          templateName: '', // 模板名称
          createdBy: '', // 创建人
          startTime: '', // 创建时间
          endTime: '', // 结束时间
          templateStatus : '', // 审核状态
          pageNum: 1, // 当前页
          pageSize: 5, // 一页多少条
          id: ''
        },
        tableData: [],
        totalPage: '0' // 总条数
        // 下边是验证部分
        // editRules: {
        //   templateContext: [
        //     { required: true, message: '请输入内容', trigger: 'change' }
        //   ],
        //   information: [
        //     { required: true, message: '请填写编辑原因', trigger: 'change' }
        //   ]
        // }
      }
    },
    filters:{
    },

    methods: {
      // 点击删除
      deleteClick (row) {
        this.dialogDelete = true
        console.log(row)
        this.deleteForm.id = row.id
        this.deleteForm.information = ''
      },
      // 取消删除
      cancelDialogDelete () {
        this.dialogDelete = false
        this.deleteForm.information = ''
      },
      // 确定删除
      saveDialogDelete (deleteDom) {
        this.$refs[deleteDom].validate((valid) => {
          if (valid) {
            console.log(this.deleteForm)
            deleteTemplate (this.deleteForm)
              .then(response => {
                console.log(response)
                this.search ()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              })
              .catch( response => {
                this.$message({
                  message: '未成功删除',
                  type: 'error'
                })
              })
            this.dialogDelete = false
          } else {
            return false
          }
        });
      },
      onSubmit() {
        console.log(this.form)
        this.search()
      },
      // 搜索模板接口部分
      search () {
        searchTemplate(this.form)
          .then( response => {
            // console.log(response.data)
            // response.data.searchTemplateAndChannelVo.forEach(el => {
            //   if (el.created) {
            //     el.created = parseTime(el.created)
            //   }
            //   if (el.templateAuditTime) {
            //     el.templateAuditTime = parseTime(el.templateAuditTime)
            //   }
            //   // 对类型进行判断
            //   if(el.templateType == '1'){
            //     el.templateType = '通知类'
            //   }else if (el.templateType == '2') {
            //     el.templateType = '验证码类'
            //   } else if (el.templateType = '3') {
            //     el.templateType = '营销类'
            //   } else{
            //     el.templateType = ''
            //   }
            //   // 审核状态进行判断
            //   if(el.templateStatus == '1'){
            //     el.templateStatus = '待提交'
            //   }else if (el.templateStatus == '2') {
            //     el.templateStatus = '审核中'
            //   } else if (el.templateStatus = '3') {
            //     el.templateStatus = '已通过'
            //   } else if (el.templateStatus == '4') {
            //     el.templateStatus = '已驳回'
            //   }
            //   // 系统进行判断
            //   if(el.templateSystem == '1'){
            //     el.templateSystem = '电商'
            //   }else if (el.templateSystem == '2') {
            //     el.templateSystem = '社交'
            //   } else{
            //     el.templateSystem = ''
            //   }
            //   // 渠道进行判断
            //   (el.list).forEach(item => {
            //     if (item == '1') {
            //       el.channelNames = '短信'
            //     } else if (item == '2') {
            //       el.channelNames = el.channelNames + 'IOS'
            //     } else if (item == '3') {
            //       el.channelNames = el.channelNames + '安卓'
            //     }
            //   });
            //   if(el.templateSystem == '1'){
            //     el.templateSystem = '电商'
            //   }else if (el.templateSystem == '2') {
            //     el.templateSystem = '社交'
            //   } else{
            //     el.templateSystem = ''
            //   }
            // })
            this.tableData = response.data.searchTemplateAndChannelVo
            this.totalPage = Number(response.data.total)
            console.log('chenggong')
          })
          .catch( response => {
            this.$message({
              type: 'error',
              message:  response.message
            })
          })

      },
      // 下边是对table进行格式化
      // 模板类型
      templateTypeFormatter (row,column) {
        if(row.templateType == '1') {
          return '通知类'
        }else if (row.templateType == '2') {
          return '验证码类'
        } else if (row.templateType = '3') {
          return '营销类'
        } else{
          return ''
        }
      },
      // 系统
      templateSystemFormatter (row,column) {
        if(row.templateSystem == '1'){
           return '电商'
        }else if (row.templateSystem == '2') {
          return '社交'
        } else{
          return  ''
        }
      },
      // 渠道
      channelFormatter (row,column) {
        if (row.list.length == 0) {
          return ''
        } else {
          for (let i = 0; i < row.list.length; i++) {
              if (row.list[i] == 1) {
              row.list[i] = '短信'
            } else if (row.list[i] == 2) {
              row.list[i] = 'IOS'
            } else if (row.list[i] == 3) {
              row.list[i] = '安卓'
            } else if (row.list[i] == 5) {
              row.list[i] = '站内信'
            }
          }
          // debugger
          return row.list
        }
        // if (row.list.length == 0) {
        //   return ''
        // } else if (row.list.length == 1) {
        //   if (row.list.includes(1)) {
        //     return '短信'
        //   } else if (row.list.includes(2)) {
        //     return 'IOS'
        //   } else if (row.list.includes(3)) {
        //     return '安卓'
        //   }
        // } else if (row.list.length == 2) {
        //   if (row.list.includes(1) && row.list.includes(2)) {
        //     return '短信 IOS'
        //   } else if (row.list.includes(2) && row.list.includes(3)) {
        //     return 'IOS 安卓'
        //   } else if (row.list.includes(3) && row.list.includes(1)) {
        //     return '短信 安卓'
        //   }
        // } else if (row.list.length == 2) {
        //   if (row.list.includes(3) && row.list.includes(2) && row.list.includes(3)) {
        //     return '短信 IOS 安卓'
        //   }
        // }
        // if (row.list.includes(2,3)) {
        //   return 'IOS 安卓'
        // }
      },
      // 提交时间
      submitTimeFormatter (row,column) {
        if (row.created) {
          return parseTime(row.created)
        } else if(!row.created){
          return ''
        }
      },
      // 审核状态
      statusFormatter (row,column) {
        if(row.templateStatus == '1'){
         return '待提交'
        }else if (row.templateStatus == '2') {
          return  '审核中'
        } else if (row.templateStatus == '3') {
          return '已通过'
        } else if (row.templateStatus == '4') {
          return '已驳回'
        }
      },
      // 审核时间
      auditTimeFormatter (row,column) {
        if (row.templateAuditTime) {
          return parseTime(row.templateAuditTime)
        } else if (!row.templateAuditTime) {
          return ''
        }
      },
      creatNewTemplate() {
        console.log('新建模板!')
        this.$router.push('/noticeManageOneWrapper/notice/new')
      },
      // 点击提交审核
      submitCheck (row) {
        this.checkParams.id = row.id
        // this.checkParams.templateStatus = row.templateStatus
        this.checkParams.templateStatus = '2'
        // if(this.checkParams.templateStatus == '待提交'){
        //   this.checkParams.templateStatus = '1'
        // } else if (this.checkParams.templateStatus == '已驳回') {
        //   this.checkParams.templateStatus = '4'
        // }
        console.log(this.checkParams)
        this.$confirm('确定提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          auditTemplate (this.checkParams)
            .then(response => {
              this.search ()
              this.$message({
                message: '审核成功!',
                type: 'success'
              })
            })
            .catch (response => {
              this.$message({
                message: '审核失败！',
                type: 'info'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        })
      },
      // 点击编辑按钮
      editClick(row) {
        console.log(row.templateStatus == '3')
        this.editFormVisible = true
        this.editForm.id = row.id
        this.editForm.templateContext = row.messageContext
        this.editForm.information = '' // 重置编辑原因
      },
      // 保存编辑
      saveEdit (editDom) {
        this.$refs[editDom].validate((valid) => {
          if (valid) {
            updateTemplate (this.editForm)
            .then(response => {
              this.$message({
                message: '编辑成功!',
                type: 'success'
              })
              this.search ()
              this.editFormVisible = false
            })
            .catch(() => {
              console.log(this)
              this.$message({
                type: 'info',
                message: '编辑失败'
              })
            })
            // alert('submit!');
          } else {
            // console.log('error submit!!');
            return false
          }
        })
        console.log(this.editForm)
      },
      // 每页条数变化-触发
      handleSizeChange(val) {
        this.form.pageSize = val
        console.log(`每页 ${val} 条`)
        this.search ()
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        console.log(`当前页: ${val}`)
        this.search ()
      }
    },
    mounted () {
      this.search()
    }
  }
</script>

<style scoped lang="scss">
.templateRule {
  border: 1px solid  #CCCCCC;
  height:100px;
  background-color:#CCC;
  color:#333333;
  h3{
    margin: 15px 0 0 25px;
  }
  p{
    margin: 20px 0 0 50px;
  }
}
.informMessageList{
  border-bottom: 1px solid #CCC;
  p{
    margin-left: 10px;
  }
}
.newSetTemplate{
  margin: 15px 0;
}
.templateType{
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
