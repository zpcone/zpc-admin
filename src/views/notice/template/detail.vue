<template>
  <div class="pushDetailPage">
    <div class="pushMessage">
      <span style="color:black;font-weight:bold;">消息ID：</span>
      <span>{{messageId}}</span>
      <span style="margin:0 50px 0 20px;">(推送批次号)</span>
      <span style="color:black;font-weight:bold;">推送渠道：</span>
      <span>{{channel | channelId}}</span>
    </div>
    <div class="pushMessageList">
      <div class="pushMessageListTitle">
        <span>总数：（{{total}}）</span>
        <span>已发送（{{send}}）</span>
        <span>已送达（{{get}}）</span>
      </div>
      <div class="pushMessageTable">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sendStates"
            label="发送状态"
            :formatter="formatterstatus"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sendTime"
            :formatter="sendTime"
            label='发送时间'>
          </el-table-column>
          <el-table-column
            prop="messageContext"
            label='发送内容'>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="float:right;margin-top:20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { searchflowtaskdetail } from '@/api/notice'
  import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        messageId: '',
        channel: '',
        // total: '',
        send: '',
        get: '',
        form: {
          id: this.$route.query.id,
          templateSystem: '2',
          pageNum: 1, // 当前页
          pageSize: '5' // 一页多少条
        },
        // pageNum: 1, // 当前页
        // pageSize: '5', // 一页多少条
        totalNum: '', // 总计多少条
        tableData: [{
          messageContext: '',
          sendStates: '',
          sendTime: '',
          userId: ''
        }]
      }
    },
    computed: {
      total: function () {
        var a = Number(this.get)
        var b = Number(this.send)
        return (a+b)
      }
    },
    filters: {
      channelId: function (value) {
        if (value == '1') {
          return '短信'
        } else if (value == '2') {
          return 'IOS'
        } else if (value == '3') {
          return '安卓'
        } else if (value == '4') {
          return '安卓 IOS'
        }
      }
    },
    mounted () {
      this.init()
      // var obj = {
      // }
      // obj.id = this.$route.params.id
      // obj.pageNum = this.pageNum
      // obj.pageSize = this.pageSize
      // obj.templateSystem = '2'
      // searchflowtaskdetail (this.form)
      // .then(res => {
      //   this.messageId = res.sid
      //   this.channel = res.data.channelIds
      //   this.get = res.data.reachNum
      //   this.send = res.data.sendNum
      //   this.totalNum = res.data.totalNum
      //   this.tableData = res.data.list
      //   this.$message({
      //     message: '获取详情成功!',
      //     type: 'success'
      //   })
      //   console.log(res)
      // })
      // .catch( () => {
      //   this.$message({
      //     message: '获取详情失败!',
      //     type: 'info'
      //   })
      // })
    },
    methods:{
      // 列表格式化
      formatterstatus (row,column) {
        if (row.sendStates == '1') {
          return '待发送'
        } else if (row.sendStates == '3') {
          return '发送成功'
        } else if (row.sendStates == '4') {
          return '发送失败'
        } else if (row.sendStates == '2') {
          return '取消发送'
        }
      },
      sendTime (row, column) {
        if (row.sendTime) {
          return parseTime(row.sendTime)
        } else {
          return ''
        }
      },
      // 接口请求
      init () {
        searchflowtaskdetail (this.form)
        .then(res => {
          this.messageId = res.sid
          this.channel = res.data.channelIds
          this.get = res.data.reachNum
          this.send = res.data.sendNum
          this.totalNum = res.data.totalNum
          this.tableData = res.data.list
          this.$message({
            message: '获取详情成功!',
              type: 'success'
            })
            console.log(res)
          })
          .catch( () => {
            this.$message({
              message: '获取详情失败!',
              type: 'error'
            })
          })
      },
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
        this.init()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        console.log(`当前页: ${val}`)
        this.init()
      }
    }
  }
</script>
<style scoped lang="scss">
  .pushDetailPage{
    padding: 0 20px;
    .pushMessage{
      color: #333;
      border-bottom: 1px solid #ccc;
      padding: 30px 0;
    }
    .pushMessageList{
      margin-top:30px;
      .pushMessageListTitle{
        margin-bottom: 30px ;
        span{
          margin-right:20px;
        }
      }
    }
  }
</style>
