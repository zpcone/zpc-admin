<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="140px"
        style="background: #f1f1f1;padding: 20px 0;">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="channel" label="渠道：">
              <el-radio-group v-model="form.channel">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="2">社交</el-radio-button>
                <el-radio-button label="1">电商</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="" label="创建日期：">
              <el-date-picker
                v-model="createTime"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="—"
                start-placeholder="请选择日期"
                end-placeholder="请选择日期"
                align="right"
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="" label="认证日期：">
              <el-date-picker
                v-model="authTime"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="—"
                start-placeholder="请选择日期"
                end-placeholder="请选择日期"
                align="right"
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="userRealNameLIKE" label="用户名称：">
              <el-input class="searchInput" v-model="form.userRealNameLIKE" placeholder="请输入用户名称查询" clearable></el-input>
            </el-form-item>
            <el-form-item prop="mId" label="用户mID：">
              <el-input class="searchInput" v-model="form.mId" placeholder="请输入用户mID查询" clearable></el-input>
            </el-form-item>
            <el-form-item prop="phoneLIKE" label="手机号：">
              <el-input class="searchInput" v-model="form.phoneLIKE" placeholder="请输入用户手机号查询" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="days" label="快速查看：">
              <el-radio-group v-model="form.days">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">今天</el-radio-button>
                <el-radio-button label="-1">昨天</el-radio-button>
                <el-radio-button label="-7">最近7天</el-radio-button>
                <el-radio-button label="-30">最近30天</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="aType" label="账户类型：">
              <el-radio-group v-model="form.aType" @change="handleQuery">
                <el-radio-button label="0">会员</el-radio-button>
                <el-radio-button label="1">圈子</el-radio-button>
                <!-- <el-radio-button label="2">平台</el-radio-button> -->
                <el-radio-button label="3">供应商</el-radio-button>
                <!-- <el-radio-button label="4">SBU</el-radio-button> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="authStatus" label="账户类别：">
              <el-radio-group v-model="form.authStatus">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">未实名认证</el-radio-button>
                <el-radio-button label="1">已实名认证</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="status" label="账户状态：">
              <el-radio-group v-model="form.status">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">禁用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
        <el-form-item style="margin: 15px 0;text-align: center;">
          <el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 20px;">
      <span>排序：</span>
      <el-select v-model="form.ORDER" placeholder="请选择">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="margin: 0 20px;">当前选择{{hasChoose}}项</span>
      <el-button type="danger" @click="disableUser">禁用</el-button>
      <el-button type="success" @click="usableUser">解禁</el-button>
      <!-- <el-button type="danger" @click="freeze">冻结</el-button>
      <el-button type="success" @click="unfreeze">解冻</el-button> -->
      <el-button type="warning" @click="addNumber">增加</el-button>
      <el-button type="primary" @click="reduceBtn">扣减</el-button>
    </div>
    <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
    <div style="margin: 20px;">
      <el-table :data="accountData" border stripe fit    style="width: 100%" @selection-change="selectionChange" @expand-change="getId">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" width="170"></el-table-column>
        <el-table-column prop="channel" :formatter="channnelFormat"  label="渠道"></el-table-column>
        <el-table-column prop="created" label="创建日期" width="160"></el-table-column>
        <el-table-column prop="status" :formatter="accountStatus" label="账户状态"></el-table-column>
        <el-table-column width="120" prop="" type="expand" label="账户类型详情">
          <template slot-scope="props">
            <el-table
              :data="props.row.addArr"
              style="width: 100%">
              <el-table-column prop="name" label="账户类型"></el-table-column>
              <el-table-column prop="status" label="账户状态" :formatter="accountStatus"></el-table-column>
              <el-table-column prop="total" label="账户余额"></el-table-column>
              <el-table-column prop="usableBeans" label="可用"></el-table-column>
              <el-table-column prop="freezeBeans" label="冻结"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <div style="disaplay: inline-block" v-if="form.aType !== '3'">
          <el-table-column prop="mId" label="mId" width="170">
            <template slot-scope="scope">
              <el-button type="text" @click="goToStream(scope.$index,scope.row)">{{scope.row.mId}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pwdStatus" :formatter="pwdFormat" label="支付密码"></el-table-column>
        </div>
        <div style="disaplay: inline-block" v-if="form.aType === '0'">
          <el-table-column prop="userRealName" label="用户名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="authStatus" :formatter="authFormat" label="认证状态"></el-table-column>
          <el-table-column prop="authRealTime" label="认证日期" width="160"></el-table-column>
        </div>
        <el-table-column prop="circleId" label="圈子Id" v-if="form.aType === '1'"></el-table-column>
        <el-table-column prop="supplierId" label="供应商Id" v-if="form.aType === '3'"></el-table-column>
        <el-table-column prop="rdType" label="收支类别" v-if="form.aType === '3'"></el-table-column>
      </el-table>
    </div>
    <!-- 冻结、解冻 -->
    <el-dialog
      :title="title"
      :visible.sync="operateShow"
      width="30%">
      <operate :freezeType="freezeType" @cancel="operateCancel" @confirm="operateConfirm" :accounts="accountsList"></operate>
    </el-dialog>
    <!-- 添加、扣减 -->
    <el-dialog
      :title="title"
      :visible.sync="addNumShow"
      width="30%">
      <addNum :numberChange="numberChange" @cancel="addNumCancel" @confirm="addNumConfirm" :addNum="addNumList"></addNum>
    </el-dialog>
    <div class="center m20">
    	<el-pagination
    	  @current-change="handleCurrentChange"
    	  :current-page.sync="form.pageNum"
    	  :page-size="form.pageSize"
    	  layout="total, prev, pager, next"
    	  :total="totalPage">
    	</el-pagination>
    </div>
  </section>
</template>

<script>
import { searchAccounts,
  searchCircleAccounts,
  changeAccountStatus,
  updateAccountCircle,
  searchSupplierAccounts,
  updateAccountSupplier,
  searchSBUAccounts,
  updateAccountSBU,
  searchPlatformAccounts,
  updateAccountPlatform } from '@/api/account'
import operate from './operate.vue'
import addNum from './addNum.vue'
export default {
  components: {
    operate,
    addNum
  },
  data() {
    return {
      title: '批量管理',
      createTime: '',
      authTime: '',
      form: {
        mId: '', // 用户id
        channel: '',
        ORDER: 'created desc',
        days: '', // 快速查看
        create: '',
        created: '',
        authRealTime: '',
        authRealTimed: '',
        // authTime: [], // 认证日期
        // createTime: [], // 创建日期
        phoneLIKE: '', // 手机号
        userRealNameLIKE: '',
        aType: '0', // 账户类型
        status: '',
        authStatus: '', // 类别
        pageNum: 1,
        pageSize: 10
      },
      sorts: [
        {
          label: '按创建时间排序',
          value: 'created desc'
        },
        {
          label: '按认证排序',
          value: 'authRealTime desc'
        },
        {
          label: '按用户名排序',
          value: 'userRealName desc'
        },
        {
          label: '按余额排序',
          value: 'pbUsableBeans desc'
        }
      ],
      accountsList: {},
      addNumList: {},
      hasChoose: 0,
      selectData: [], // 保存列表选择的数据项
      accountData: [],
      accountId: '',
      operateShow: false,
      addNumShow: false,
      numberChange: '',
      freezeType: ''
    }
  },
  watch: {
    'createTime': function(val) {
      if (val.length > 0) {
        this.form.create = val[0]
        this.form.created = val[1]
      } else {
        this.form.create = ''
        this.form.created = ''
      }
    },
    'authTime': function(val) {
      console.log(val)
      if (val.length > 0) {
        this.form.authRealTime = val[0]
        this.form.authRealTimed = val[1]
      } else {
        this.form.authRealTime = ''
        this.form.authRealTimed = ''
      }
    }
  },
  methods: {
    // 获取mID、渠道
    getId(row, expandedRows) {
      console.log(expandedRows[0].mId)
      this.accountId = expandedRows[0].mId
      this.channel = expandedRows[0].channel
    },
    channnelFormat(row, column) {
      if (row.channel === '1') {
        return '电商'
      } else if (row.channel === '2') {
        return '社交'
      }
    },
    accountStatus(row) {
      if (row.status === '0') {
        return '正常'
      } else if (row.status === '1') {
        return '禁用'
      }
    },
    // 状态
    statusFormat(row) {
      if (row.status === '0') {
        return '正常'
      } else if (row.status === '1') {
        return '禁用'
      }
    },
    // 认证
    authFormat(row) {
      if (row.authStatus === '0') {
        return '未实名认证'
      } else if (row.authStatus === '1') {
        return '已实名认证'
      }
    },
    // 支付密码
    pwdFormat(row) {
      if (row.pwdStatus === '0') {
        return '未设置支付密码'
      } else if (row.pwdStatus === '1') {
        return '已设置支付密码'
      }
    },
    // 查看流水
    goToStream(index, row) {
      console.log(row)
      this.$router.push({
        path: '/account/stream',
        query: {
          id: row.mId,
          channel: row.channel,
          aType: this.form.aType
        }
      })
    },
    // 查看
    view(row) {
      console.log(row)
      this.$router.push({
        path: '/account/detail',
        query: {
          name: row.name,
          type: this.form.aType,
          channel: this.channel,
          mId: this.accountId
        }
      })
    },
    // 查询
    search() {
      this.handleQuery()
    },
    // 重置
    reset() {
      this.authTime = []
      this.createTime = []
      // this.$refs['form'].resetFields()
      this.form.authStatus = ''
      this.form.channel = ''
      this.form.days = ''
      this.form.phoneLIKE = ''
      this.form.userRealNameLIKE = ''
      this.form.status = ''
      this.form.mId = ''
    },
    // 列表多选
    selectionChange(selection) {
      this.selectData = []
      if (selection) {
        this.hasChoose = selection.length
        if (this.form.channel === '') {
          for (let i = 0; i < selection.length; i++) {
            const channelOne = selection[0].channel
            if (channelOne !== selection[i].channel) {
              this.$message.warning('选中账号渠道不一致')
              return false
            }
          }
        }
        const arr = []
        for (const item of selection) {
          arr.push(item.mId)
        }
        this.idsStr = arr.join(',')
        this.selectData = selection
      }
    },

    // 冻结
    // freeze() {
    //   let str = '只能对同一类型、同一状态的账户进行批量操作，请重新筛选账户，如仅选中正常状态的豆账户，谢谢！'
    //   let types = ['type', 'sep', 'type']
    //   this.confirmBox(str, types)
    // },

    // 禁用
    disableUser() {
      if (this.selectData.length > 0) {
        for (const i of this.selectData) {
          if (i.status !== '0') {
            this.$message.warning('请选择账户状态正常的账户')
          } else {
            // 会员
            if (this.form.aType === '0') {
              this.$confirm('是否禁用该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const obj = {
                  mId: this.idsStr,
                  channel: i.channel,
                  status: 1
                }
                changeAccountStatus(obj).then(res => {
                  if (res.status === 200) {
                    this.getList()
                  }
                })
              })
              return
            }
            // 圈子
            if (this.form.aType === '1') {
              this.$confirm('是否禁用该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const obj = {
                  mId: this.idsStr,
                  channel: i.channel,
                  circleId: i.circleId,
                  status: 1
                }
                updateAccountCircle(obj).then(res => {
                  if (res.status === 200) {
                    this.circleList()
                  }
                })
              })
              return
            }
            // 平台
            if (this.form.aType === '2') {
              this.$confirm('是否禁用该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const obj = {
                  mId: this.idsStr,
                  channel: i.channel,
                  circleId: i.circleId,
                  status: 1
                }
                updateAccountPlatform(obj).then(res => {
                  if (res.status === 200) {
                    this.platformList()
                  }
                })
              })
              return
            }
            // 供应商
            if (this.form.aType === '3') {
              this.$confirm('是否禁用该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const supplierIds = []
                for (const item of this.selectData) {
                  supplierIds.push(item.supplierId)
                }
                this.suppliersStr = supplierIds.join(',')
                const obj = {
                  mId: this.suppliersStr,
                  channel: i.channel,
                  status: 1
                }
                updateAccountSupplier(obj).then(res => {
                  if (res.status === 200) {
                    this.supplierList()
                  }
                })
              })
              return
            }
            // SBU
            if (this.form.aType === '3') {
              this.$confirm('是否禁用该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const SBUIds = []
                for (const item of this.selectData) {
                  SBUIds.push(item.SBUId)
                }
                this.SBUStr = SBUIds.join(',')
                const obj = {
                  mId: this.SBUStr,
                  channel: i.channel,
                  status: 1
                }
                updateAccountSBU(obj).then(res => {
                  if (res.status === 200) {
                    this.SBUList()
                  }
                })
              })
            }
          }
        }
      } else {
        this.$message.warning('请选择账户')
      }
    },
    // 解禁
    usableUser() {
      if (this.idsStr) {
        for (const i of this.selectData) {
          if (i.status !== '1') {
            this.$message.warning('请选择账户状态为禁用的账户')
          } else {
            // 会员
            if (this.form.aType === '0') {
              this.$confirm('是否解禁该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const obj = {
                  mId: this.idsStr,
                  channel: i.channel,
                  status: 0
                }
                changeAccountStatus(obj).then(res => {
                  if (res.status === 200) {
                    this.getList()
                  }
                })
              })
              return
            }
            // 圈子
            if (this.form.aType === '1') {
              this.$confirm('是否解禁该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const obj = {
                  mid: this.idsStr,
                  channel: i.channel,
                  status: 0
                }
                updateAccountCircle(obj).then(res => {
                  if (res.status === 200) {
                    this.circleList()
                  }
                })
              })
              return
            }
            // 供应商
            if (this.form.aType === '3') {
              this.$confirm('是否解禁该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const supplierIds = []
                for (const item of this.selectData) {
                  supplierIds.push(item.supplierId)
                }
                this.suppliersStr = supplierIds.join(',')
                const obj = {
                  mId: this.suppliersStr,
                  channel: i.channel,
                  status: 0
                }
                updateAccountSupplier(obj).then(res => {
                  if (res.status === 200) {
                    this.supplierList()
                  }
                })
              })
              return
            }
            // SBU
            if (this.form.aType === '3') {
              this.$confirm('是否解禁该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                const SBUIds = []
                for (const item of this.selectData) {
                  SBUIds.push(item.SBUId)
                }
                this.SBUStr = SBUIds.join(',')
                const obj = {
                  mId: this.SBUStr,
                  channel: i.channel,
                  status: 0
                }
                updateAccountSBU(obj).then(res => {
                  if (res.status === 200) {
                    this.SBUList()
                  }
                })
              })
            }
          }
        }
      } else {
        this.$message.warning('请选择账户')
      }
    },
    // 传值
    initDom() {
      this.acccountsList = {
        mId: this.selectData[0].mId,
        channel: this.selectData[0].channel,
        aType: this.form.aType,
        createdby: 0,
        type: '2'
      }
      console.log(this.accountsList)
    },
    // 冻结
    freeze() {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择账户')
        return
      }
      if (this.selectData.length > 1) {
        this.$message.warning('只能选择一个账户')
      } else {
        this.initDom()
        this.freezeType = 'freezes'
        this.operateShow = true
      }
    },
    // 确定
    operateConfirm() {
      this.operateShow = false
      this.handleQuery()
    },
    // 取消
    operateCancel() {
      this.operateShow = false
      this.handleQuery()
    },
    // 解冻
    unfreeze() {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择账户')
        return
      }
      if (this.selectData.length > 1) {
        this.$message.warning('只能选择一个账户')
      } else {
        this.initDoms()
        this.freezeType = 'unfreezes'
        this.operateShow = true
      }
    },
    // 传值
    initDoms() {
      this.accountsList = {
        mId: this.selectData[0].mId,
        channel: this.selectData[0].channel,
        aType: this.form.aType,
        createdby: 0,
        type: '3'
      }
      console.log(this.accountsList)
    },
    // 传值
    initNum() {
      this.$set(this.addNumList, 'mId', this.selectData[0].mId)
      this.$set(this.addNumList, 'channel', this.selectData[0].channel)
      this.$set(this.addNumList, 'aType', this.form.aType)
      this.$set(this.addNumList, 'type', '1')
      this.$set(this.addNumList, 'createdby', 0)
      console.log(this.addNumList)
    },
    // 增加
    addNumber() {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择账户')
        return
      }
      if (this.selectData.length > 1) {
        this.$message.warning('只能选择一个账户')
      } else {
        this.initNum()
        this.numberChange = 'add'
        this.addNumShow = true
      }
    },
    // 扣减
    reduceBtn() {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择账户')
        return
      }
      if (this.selectData.length > 1) {
        this.$message.warning('只能选择一个账户')
      } else {
        // debugger
        this.initReduce()
        this.numberChange = 'reduce'
        this.addNumShow = true
        console.log('扣减')
      }
    },
    initReduce() {
      this.$set(this.addNumList, 'mId', this.selectData[0].mId)
      this.$set(this.addNumList, 'channel', this.selectData[0].channel)
      this.$set(this.addNumList, 'aType', this.form.aType)
      this.$set(this.addNumList, 'type', '-1')
      this.$set(this.addNumList, 'createdby', 0)
      console.log(this.addNumList)
    },
    // 确定
    addNumConfirm() {
      this.addNumShow = false
      this.handleQuery()
    },
    // 取消
    addNumCancel() {
      this.addNumShow = false
      this.handleQuery()
    },
    // 禁用，解禁，冻结提示信息
    // confirmBox(str, typeArr) {
    //   if (this.selectData && this.selectData.length !== 0) {
    //     const isSameType = sameArrLabel(this.selectData, typeArr)
    //     if (!isSameType) {
    //       this.$confirm(str, '提示', {
    //         confirmButtonText: '确定',
    //         type: 'warning',
    //         showCancelButton: false,
    //         center: true
    //       }).then(() => { }).catch(() => { })
    //     }
    //   } else {
    //     this.$message.warning('未选择，请选择数据进行处理')
    //   }
    // },
    // 获取账户管理列表
    getList() {
      const _this = this
      // const authRealTime = this.form.authTime ? this.form.authTime[0] : '' // 创建日期
      // const authRealTimed = this.form.authTime ? this.form.authTime[1] : ''
      // const create = this.form.createTime ? this.form.createTime[0] : '' // 认证日期
      // const created = this.form.createTime ? this.form.createTime[1] : ''
      // // const searchParam = {
      //   pageNum: this.form.pageNum + '',
      //   pageSize: this.form.pageSize + '',
      //   channel: this.form.channel,
      //   userRealName: this.form.userRealName,
      //   authRealTime: authRealTime,
      //   authRealTimed: authRealTimed,
      //   create: create,
      //   created: created,
      //   status: this.form.status,
      //   authStatus: this.form.authStatus,
      //   mId: this.form.mId,
      //   phone: this.form.phoneLIKE
      // }
      searchAccounts(this.form).then(res => {
        if (res.status === 200) {
          _this.accountData = res.data.data
          this.totalPage = res.data.totalRecordCount
          var arr = res.data.data
          arr.forEach(ele => {
            ele.profitCoins.freezeBeans = ele.profitCoins.freezeCoins
            ele.profitCoins.usableBeans = ele.profitCoins.usableCoins
            ele.accrueBeans.total = Number(ele.accrueBeans.usableBeans) + Number(ele.accrueBeans.freezeBeans)
            ele.profitBeans.total = Number(ele.profitBeans.usableBeans) + Number(ele.profitBeans.freezeBeans)
            ele.profitCoins.total = Number(ele.profitCoins.usableBeans) + Number(ele.profitCoins.freezeBeans)
            ele.addArr = []
            ele.accrueBeans.name = '生豆账户'
            ele.profitBeans.name = '盈豆账户'
            ele.profitCoins.name = '盈币账户'
            ele.addArr.push(ele.accrueBeans)
            ele.addArr.push(ele.profitBeans)
            ele.addArr.push(ele.profitCoins)
          })
          // console.log(_this.accountData)
        } else {
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    },
    // 获取圈子列表
    circleList() {
      // const create = this.form.createTime ? this.form.createTime[0] : ''
      // const created = this.form.createTime ? this.form.createTime[1] : ''
      // const circleParams = {
      //   create: create,
      //   created: created,
      //   mId: this.form.mId,
      //   circleId: '',
      //   status: this.form.status,
      //   channel: this.form.channel,
      //   authStatus: this.form.authStatus,
      //   pageNum: 1,
      //   pageSize: 10
      // }
      searchCircleAccounts(this.form).then(res => {
        if (res.status === 200) {
          this.accountData = res.data.data
          console.log(this.accountData)
          this.totalPage = res.data.totalRecordCount
          // this.data = res.data
        }
      })
    },
    // 平台
    platformList() {
      searchPlatformAccounts(this.form).then(res => {
        if (res.status === 200) {
          // this.data = res.data
        }
      })
    },
    // 供应商
    supplierList() {
      searchSupplierAccounts(this.form).then(res => {
        if (res.status === 200) {
          this.accountData = res.data.data
          this.totalPage = res.data.totalRecordCount
        }
      })
    },
    // SBU
    SBUList() {
      searchSBUAccounts(this.form).then(res => {
        if (res.status === 200) {
          this.accountData = res.data.data
          this.totalPage = res.data.totalRecordCount
        }
      })
    },
    // 列表
    handleQuery() {
      if (this.form.aType === '0') {
        this.getList()
      } else if (this.form.aType === '1') {
        this.circleList()
      } else if (this.form.aType === '2') {
        // this.platformList()
        this.$message.waning('暂无数据')
      } else if (this.form.aType === '3') {
        this.supplierList()
      } else if (this.form.aType === '4') {
        this.SBUList()
      }
    },
    // 分页
    handleCurrentChange() {
      this.handleQuery()
    }
  },
  mounted() {
    this.handleQuery()
  }
}

// 判断数组中的某个key值都是一样的 (异常处理)
function sameArrLabel(arr, labelArr) {
  if (arr instanceof Array) {
    if (labelArr.length) {
      const len = arr.length
      if (len === 1) {
        return true
      } else {
        let flag = true
        const arrTemp = []
        for (let j = 0; j < labelArr.length; j++) {
          let flagInsert = true
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i][labelArr[j]] !== arr[i + 1][labelArr[j]]) {
              flagInsert = false
              break
            }
          }
          arrTemp.push(flagInsert)
        }
        for (let m = 0; m < arrTemp.length; m++) {
          if (arrTemp[m] === false) {
            flag = false
            break
          }
        }
        return flag
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
</script>

<style scoped lang="scss">
.search {
  margin: 20px 0;
}
.searchInput.el-input {
  max-width: 400px;
}
.page {
  text-align: center;
  margin: 30px auto;
}
</style>
