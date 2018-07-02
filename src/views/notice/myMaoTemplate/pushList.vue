<template>
  <div class="pushData">
    <div class="pushTitle">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="发送内容">
          <el-input clearable v-model="form.messageContext" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align:center;" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.messageType" placeholder="请选择活动区域">
            <el-option label="定时推送" value="1"></el-option>
            <el-option label="及时推送" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="messageContext"
          label="消息内容">
        </el-table-column>
        <el-table-column
          prop="pushTime"
          :formatter="formatterPushTime"
          label="推送时间">
        </el-table-column>
        <el-table-column
          prop="messageType"
          :formatter="formatterType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="targetUssr"
          :formatter="formatterTargetUssr"
          label="用户范围">
        </el-table-column>
        <el-table-column
          :formatter="formatterStatus"
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="senfNumber"
          label="设备数">
        </el-table-column>
        <el-table-column
          prop="reachNumber"
          label="到达数">
        </el-table-column>
        <el-table-column
          prop="channelId"
          :formatter="formatterChannel"
          label="渠道">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.state == '3' && scope.row.targetUssr !== '1'">查看详情</el-button>
            <el-button @click="cancel(scope.row)" type="text" size="small" v-if="scope.row.state == '1'">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="block" style="margin:10px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCountTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 接口 查询--取消
  import { searchflowtask, cancelPush } from '@/api/notice'
  import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        pageCountTotal: '',
        form: {
          templateSystem: '1',
          startTime: '', // 开始时间
          endTime: '', // 截至时间
          messageType: '', // 消息类型(1定时2及时)
          messageContext: '', // 消息内容
          startTime: '', // 开始时间
          pageNum: 1, // 第几页
          pageSize: '10' //每页几条
        },
        tableData: []
      }
    },
    methods:{
      // 下边是分页
      handleSizeChange(val) {
        this.form.pageSize = val
        this.send (this.form)
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.send (this.form)
      },
      // 点击查询
      onSubmit() {
        console.log(this.form)
        this.send (this.form)
      },
      // 发送请求
      send (pushData) {
        searchflowtask (pushData)
          .then(res => {
            this.tableData = res.data
            this.pageCountTotal = Number(res.totalRecordCount)
            this.$message({
              message: '查询成功!',
              type: 'success'
            })
          })
          .catch( () => {
            this.$message({
              message: '查询失败!',
              type: 'error'
            })
          })
      },
      // 取消
      cancel (data) {
        console.log(data)
        var obj = {}
        obj.id = data.id
        obj.lastupdBy = '1'
        obj.templateSystem = '1'
        cancelPush (obj)
        .then (res => {
          this.$message({
            message: '成功取消!',
            type: 'success'
          })
          this.send (this.form)
          console.log(res)
        })
        .catch( () => {
          this.$message({
            message: '取消失败!',
            type: 'error'
          })
        })
      },
      // 跳转推送详情页面
      handleClick(row) {
        console.log(row)
        this.$router.push({
          path: '/noticeManageOneWrapper/myMaonoticeManage/detail',
          query: {
            id: row.id,
            channel: row.channelId
          }
        })
        // noticeManageOneWrapper/myMaonoticeManage/detail/:id
        // this.$router.push(`/notice/checkedetail/${row.id}`)
        // this.$router.push(`/noticeManageOneWrapper/myMaonoticeManage/detail/${row.id}`)
      },
      // table内容格式化
      formatterPushTime (row, column) {
        if (row.pushTime) {
          return parseTime(row.pushTime)
        } else {
          return ''
        }
      },
      formatterStatus (row, column) {
        if (row.state == '1') {
          return '待发送'
        } else if (row.state == '3') {
          return '发送成功'
        } else if (row.state == '4') {
          return '发送失败'
        } else if (row.state == '2') {
          return '取消发送'
        }
      },
      formatterTargetUssr (row, column) {
        if (row.targetUssr == '1') {
          return '全部用户'
        } else if (row.targetUssr == '2') {
          return '特定用户'
        }
      },
      formatterType (row, column) {
        if (row.messageType == '1') {
          return '定时'
        } else if (row.messageType == '2') {
          return '及时'
        }
      },
      formatterChannel (row, column) {
          if (row.channelId.length == 0) {
          return ''
        } else {
          for (let i = 0; i < row.channelId.length; i++) {
              if (row.channelId[i] == '1') {
              row.channelId[i] = '短信'
            } else if (row.channelId[i] == '2') {
              row.channelId[i] = 'IOS'
            } else if (row.channelId[i] == '3') {
              row.channelId[i] = '安卓'
            } else if (row.channelId[i] == '5') {
              row.channelId[i] = '站内信'
            }
          }
          return row.channelId
        }
      }
    },
    mounted () {
       this.send (this.form)
    }
  }
</script>

<style scoped lang="scss">
  .pushData{
    padding: 0 20px;
    .pushTitle{
      padding: 40px 0 20px 0;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
