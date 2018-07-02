<template>
  <div class="waitCheckPage">
    <div class="waitCheckPageHead">
      <div>
        <span>审核待办数量</span>
        <span style="color:red;">(备注-右侧类型可点击选择查看)</span>
      </div>
      <div @click="messageTem" :class="{ 'messbgColor': messisOrNo}">
        <span>短息模板:（{{waitCheckNum}}）</span>
      </div>
      <div @click="appTem" :class="{ 'appbgColor': appisOrNo}">
        <span >APP消息模板:（{{mesNum}}）</span>
      </div>
    </div>
    <div class="selectList">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模板类型">
          <el-select clearable v-model="formInline.templateType" placeholder="选择模板">
            <el-option label="通知" value="1"></el-option>
            <el-option label="验证码" value="2"></el-option>
            <el-option label="营销" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" v-model="formInline.startTime"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;padding-left:11px;">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="formInline.endTime"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="模板名称" style="margin-left:15px;">
          <el-input v-model="formInline.templateName" placeholder="请输入内容"></el-input>
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
          :formatter="formatterTemplate"
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
          :formatter="formatterSystem"
          label="系统"
          width="120">
        </el-table-column>
        <el-table-column
          prop="templateContext"
          label="模板内容"
          width="300">
        </el-table-column>
        <el-table-column
          prop="subtime"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="createdBy"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- <template slot-scope="scope" v-if="row.id"> -->
          <template slot-scope="scope">
            <el-button  @click="handleClick(scope.row)" type="text" size="small">去审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="float:right;margin-top:20px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="formInline.pageNum"
      layout="total,prev, pager, next"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
  // 去审核查询
  import { getMember} from '@/api/notice'
  export default{
    data(){
      return{
        appisOrNo: false,
        messisOrNo: false,
        waitCheckNum: '', // 短信模板数
        mesNum: '', // app模板数
        totalNum: '', // 总计多少页
        // appNum: '10',
        // emailNum: '10',
        formInline: {
          templateSystem: '1',
          channelId: '', // id
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          templateType: '', // 模板类型
          templateName: '', // name
          pageNum: '1', // 当前页
          pageSize: '5' // 每页条数
        },
         tableData: [{
          createdBy: '',
          templateName: '',
          templateType: '',
          templateSystem: '',
          templateContext: '',
          id: '',
          subTime: ''
        }]
      }
    },
    mounted () {
      this.send ()
    },
    methods:{
      // 点击短信模板
      messageTem () {
        this.messisOrNo = true
        this.appisOrNo = false
        this.formInline.channelId = '1'
        this.send ()
      },
      // 点击App消息模板
      appTem () {
        this.messisOrNo = false
        this.appisOrNo = true
        this.formInline.channelId = '2'
        this.send ()
      },
      // 点击查询
      onSubmit() {
        console.log(this.formInline)
        this.send ()
      },
      // 发送请求的函数
      send () {
        getMember (this.formInline)
         .then(response => {
            console.log(response)
            this.waitCheckNum = response.messageCount
            this.mesNum = response.appCount
            this.tableData = response.list
            this.totalNum = response.list.length
            this.$message({
              message: '查询成功!',
              type: 'success'
            })
          })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '查询失败'
          })
        })
      },
      handleClick(row) {
        this.$router.push(`/noticeManageOneWrapper/myMaonoticeManage/approvaldetail/${row.id}`)
      },
      // 下边是范翻页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.formInline.pageNum = val
        this.send ()
        console.log(`当前页: ${val}`);
      },
      // table表格内容格式化
      formatterSystem (row,column) {
        if (row.templateSystem == '1') {
          return '电商'
        } else if (row.templateSystem == '2') {
          return '社交'
        } else if (row.templateSystem == '3') {
          return '全部'
        }
      },
      formatterTemplate (row,column) {
        if (row.templateType == '1') {
          return '通知类'
        }
        if (row.templateType == '2') {
          return '验证码类'
        }
        if (row.templateType == '3') {
          return '营销类'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .messbgColor{
    background: #E0EAF4;
  }
  .appbgColor{
    background: #E0EAF4;
  }
  .waitCheckPage{
    padding: 0 20px;
  }
  .waitCheckPageHead{
    display: flex;
    height: 80px;
    background: #D7D7D7;
    margin-top:20px;
    div{
      flex: 1;
      line-height: 80px;
      text-align: center;
      span{
        cursor: pointer;
      }
      span:hover{
        color: green;
      }
    }
  }
  .selectList{
    padding: 20px 0 30px 0;
    border-bottom: 1px solid #D7D7D7;
  }
</style>
