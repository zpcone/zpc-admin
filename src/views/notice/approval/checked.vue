<template>
  <div class="inquire">
    <div class="inquireTitle">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="操作时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align:center;" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="模板类型">
          <el-select v-model="form.templateType" placeholder="选择模板">
            <el-option label="通知" value="1"></el-option>
            <el-option label="验证码" value="2"></el-option>
            <el-option label="营销" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="form.templateName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableList">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="模板ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="templateType"
          :formatter="formatterType"
          label="模板类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="templateSystem"
          :formatter="formatterChanel"
          label="渠道"
          width="120">
        </el-table-column>
        <el-table-column
          prop="subTime"
          :formatter="formatterTime1"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="operatorAudirStatus"
          :formatter="formatterStatus"
          label="审批状态">
        </el-table-column>
        <el-table-column
          prop="auditPerson"
          label="审批人">
        </el-table-column>
        <el-table-column
          prop="templateAuditTime"
          :formatter="formatterTimes"
          label="审批时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button  @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="float:right;margin-top:20px;"
      @size-change="handleSizeChange"
      :page-sizes="[5, 10, 15, 20]"
      @current-change="handleCurrentChange"
      :current-page="form.pageNum"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
</template>

<script>
// 已审核查询
  import { searchaudittemplate} from '@/api/notice'
  import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        totalPage: 100,  // 值必须是num
        form: {
          templateSystem: '2',
          templateType: '', // 模板类型
          templateName: '', // 模板名称
          startTime: '', // 开始时间
          endTime: '', // 开始时间
          pageSize: '5', // 每页多少条
          pageNum: 1 // 当前页
        },
        tableData: []
      }
    },
    methods:{
      onSubmit() {
        console.log(this.form)
        console.log('submit!')
        this.send ()
      },
      send () {
        searchaudittemplate (this.form)
        .then(response => {
          this.$message({
            message: '查询成功!',
            type: 'success'
          })
          console.log(response)
          this.totalPage = Number(response.total)
          // this.judge (response.lsit)
          this.tableData = response.lsit
        })
        .catch( () => {
          this.$message({
            message: '查询失败!',
            type: 'info'
          })
        })
      },
      // 下边是table格式化
      formatterTime1 (row,column) {
        if (row.subTime) {
          return parseTime(row.subTime)
        } else if (!row.subTime) {
          return ''
        }
      },
      formatterTimes (row,column) {
        if (row.templateAuditTime) {
          return parseTime(row.templateAuditTime)
        } else if (!row.templateAuditTime) {
          return ''
        }
      },
      formatterType (row,column) {
        if (row.templateSystem == '1') {
          return "电商"
        } else if (row.templateSystem == '2') {
          return '社交'
        }
      },
      formatterChanel (row,column) {
        if (row.templateType == '1'){
          return '通知'
        } else if (row.templateType == '2') {
          return '短信'
        } else if (row.templateType == '3') {
          return '营销'
        }
      },
      formatterStatus (row,column) {
        if (row.operatorAudirStatus == '1'){
          return '待提交'
        } else if (row.operatorAudirStatus == '2') {
          return '审核中'
        } else if (row.operatorAudirStatus == '3') {
          return '已通过'
        }  else if (row.operatorAudirStatus == '4') {
          return '已驳回'
        }
      },
      //     <el-option label="待提交" value="1"></el-option>
      //       <el-option label="审核中" value="2"></el-option>
      //       <el-option label="已通过" value="3"></el-option>
      //       <el-option label="已驳回" value="4"></el-option>
      judge (arr) {
        arr.forEach(el => {
        })
      },
      handleClick(row) {
        this.$router.push({
          path: '/noticeManageOneWrapper/notice/checkedetail',
          query: {
            id: row.id
          }
        })
      },
      // 下边是分页
      handleSizeChange(val) {
        this.form.pageSize = val
        this.send ()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        console.log(`当前页: ${val}`)
        this.send ()
      }
    },
    mounted () {
      this.send()
    }
  }
</script>

<style scoped lang="scss">
  .inquire{
    padding: 0 20px;
    .inquireTitle{
      margin: 20px 0;
      border-bottom: 1px solid #D7D7D7;
    }
  }
</style>
