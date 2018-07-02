<!--圈主对进圈邀请信息的审批-->
<template>
  <section>
    <!-- 筛选条件 -->
    <el-card class="mb20">
      <el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="会员ID：" prop="circleId">
              <el-input clearable placeholder="请输入会员ID" v-model="searchForm.memberId"></el-input>
            </el-form-item>
            <el-form-item label="会员名称：" prop="memberName">
              <el-input clearable placeholder="请输入会员名称" v-model="searchForm.memberName"></el-input>
            </el-form-item>
            <el-form-item label="圈ID：" prop="memberId">
              <el-input clearable placeholder="请输入圈ID" v-model="searchForm.circleId"></el-input>
            </el-form-item>
            <el-form-item label="圈名称：" prop="circleName">
              <el-input clearable placeholder="请输入圈名称" v-model="searchForm.circleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道：" prop="channeType">
              <el-radio-group v-model="searchForm.channelType">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">电商</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="角色筛选：" prop="roleType">
              <el-radio-group v-model="searchForm.roleType">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="5">圈主</el-radio-button>
                <el-radio-button label="4">群主</el-radio-button>
                <el-radio-button label="3">联席圈主</el-radio-button>
                <el-radio-button label="2">行为会员</el-radio-button>
                <el-radio-button label="1">观摩会员</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="进圈时间">
              <el-col :span="8">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" prop="intoCircleBeginTime" type="date" placeholder="选开始时间" v-model="searchForm.intoCircleBeginTime" style="width: 200px;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" style="margin-left:10px;">-</el-col>
              <el-col :span="8">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" prop="intoCircleEndTime" type="date" placeholder="选择结束时间" v-model="searchForm.intoCircleEndTime" style="width: 200px;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="当前是否在圈内：" prop="circleName">
              <el-radio-group v-model="searchForm.isInCircle">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">是</el-radio-button>
                <el-radio-button label="2">否</el-radio-button>
              </el-radio-group>
              <!-- <el-input clearable placeholder="请输入圈名称" v-model="searchForm.circleName"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
        <el-form-item style="margin: 15px 0;text-align: center;">
          <el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="setting" style="margin-top: 20px;padding-left: 20px;">
      </div>
      <div class="table" style="margin: 20px 10px;min-height: 100px;">
        <el-table  border :data="tableData" style="width:100%">
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column :formatter="channnelFormatter" prop="channelType" label="渠道"></el-table-column>
          <el-table-column prop="circleId" label="圈ID"></el-table-column>
          <el-table-column prop="circleName" label="圈名称"></el-table-column>
          <el-table-column prop="roleName" label="圈内角色"></el-table-column>
          <el-table-column prop="nickName" label="圈内昵称"></el-table-column>
          <el-table-column prop="level" label="圈内等级"></el-table-column>
          <el-table-column prop="isInCircle" :formatter="formatterInCircle" label="当前是否在圈内"></el-table-column>
          <el-table-column prop="intoCircleTime" label="进圈时间"></el-table-column>
          <el-table-column prop="intoMode" label="进圈方式">？？？</el-table-column>
          <el-table-column prop="role" label="角色历史">
            <template slot-scope="scope">
              <el-button type="info" size="mini" @click="lookHostiryRole(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="查看圈详情">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="view(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination center">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchForm.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="searchForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
      </div>
    </el-card>
    <!-- 查看角色历史的弹出框 -->
    <el-dialog
      title="角色历史"
      :visible.sync="lookRoleHistoryBox"
      width="30%"
      :before-close="handleClose">
      <el-table
        :data="spanHistoryMessage"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="historyName"
          label="历史名称">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookRoleHistoryBox = false">确 定</el-button>
        <el-button @click="lookRoleHistoryBox = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--批量处理-->
    <el-dialog title="审核" width="30%"
      :visible.sync="approvalDlsg">
      <el-form v-model="approvalForm"
        ref="approvalForm" label-width="140px">
        <div v-if="!isMany">
          <el-form-item prop="ps" label="申请原因：">
            <el-input v-model="approvalForm.reason"></el-input>
          </el-form-item>
          <el-form-item prop="ps" label="申请标签：">
            <el-input v-model="approvalForm.tag"></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="ps" label="备注：">
          <el-input v-model="approvalForm.ps"></el-input>
        </el-form-item>
        <el-form-item prop="action" label="操作">
          <el-select v-model="approvalForm.action">
            <el-option value="1" label="同意"></el-option>
            <el-option value="2" label="拒绝"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="agree">同意</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
//  ============会员对圈的信息管理==角色历史=======
import { memberToCircleManage, historyLook } from '@/api/circle/info'
export default {
  data() {
    return {
      spanHistoryMessage: [],
      lookRoleHistoryBox: false,
      totalPage: '', // 总页数
      searchForm: {
        memberName: '',
        isInCircle: '',
        channelType: '', //1电商 2社交
        pageNum: '1', //页码
        pageSize: '5', //	条数
        circleId: '', //	圈id
        memberId: '', //	会员编号
        roleType: '', //	角色类型
        circleName: '', //	圈子名称
        intoCircleBeginTime: '',	 // 进圈开始时间
        intoCircleEndTime: ''	// 进圈结束时间
      },
      chooseLen: 0,
      tableData: [{groupId:123456}],
      options: [
        {
          label: '按进圈时间由近及远排序',
          value: '1'
        }
      ],
      currentPage: 2,
      isMany: true,
      approvalDlsg: false,
      approvalForm: {
        ps: '',
        action: '',
        reason: '',
        tag: ''
      }
    }
  },
  methods: {
    formatterInCircle(row,column) {
      if (row.isInCircle == '1') {
        return '在'
      } else if(row.isInCircle == '2'){
        return '否'
      }
    },
    channnelFormatter(row, column) {
      if (row.channelType == '1') {
        return '电商'
      } else if (row.channelType == '2') {
        return '社交'
      }
    },
    lookHostiryRole(row) {
      console.log(row)
      console.log('查看历史角色')
      var obj = {}
      obj.circleId = row.circleId
      obj.memberId = row.memberId
      historyLook(obj)
      .then(res => {
        this.spanHistoryMessage = res.data
        this.$message.success('获取历史信息成功')
        this.lookRoleHistoryBox = true
      })
      .catch(() => {
        this.$message.error('获取历史信息失败')
      })
    },
    search() {
      memberToCircleManage(this.searchForm)
      .then(res => {
        this.totalPage = Number(res.totalSize)
        this.tableData = res.data
        console.log(res)
        this.$message.success('查询成功')
      })
      .catch(() => {
        this.$message.error('查询失败')
      })
    },
    reset(formName) {
      // this.$refs[formName].resetFields()
      this.searchForm.circleId = ''
      this.searchForm.memberId = ''
      this.searchForm.roleType = ''
      this.searchForm.circleName = ''
      this.searchForm.intoCircleBeginTime = ''
      this.searchForm.intoCircleEndTime = ''
      this.searchForm.channelType = ''
      this.searchForm.isInCircle = ''
      this.searchForm.memberName = ''
      this.$message.success('重置成功')
      console.log('重置')
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.search()
    },
    agree() {
      this.$message.success('圈已成功升级为圈')
      this.approvalDlsg = false
    },
    refuse() {
      this.$message.success('批量拒绝成功')
      this.approvalDlsg = false
    },
    view(row) {
      console.log(row)
      if(!row.channelType || !row.circleId) {
        this.$message.warning('不存在渠道ID或者圈ID')
        return
      }
      this.$router.push({
        path: '/circlemanage/manage/info/detail',
        query: {
          id: row.circleId,
          channelType: row.channelType
        }
      })
      // console.log(row)
      // this.$router.push(`/circlemanage/manage/info/detail/${row.channelId}/${row.circleId}`)
    }
  },
  mounted () {
    this.search()
  },
  components: {}
}
</script>

<style scoped>
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
.historySpan{
  text-align: center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  margin-left:40px;
}
</style>
