<template>
  <div class="awardWrapper">
    <div class="awardHead">
      <el-form :inline="true" ref="form" :model="form" label-width="90px">
        <el-form-item label="查找行为">
          <el-input v-model="form.behaviorName" placeholder="请输入关键字">
          </el-input>
        </el-form-item>
        <el-form-item label="渠道类型:">
            <el-select :disabled="isShowChannelId" v-model="form.channelId" placeholder="请选择">
              <el-option
                v-for="item in channelType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <!-- <el-radio-group v-model="form.channelId"> -->
          <!-- <el-radio-group :disabled="isShowChannelId" v-model="form.channelId">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">电商</el-radio-button>
            <el-radio-button label="2">社交</el-radio-button>
          </el-radio-group> -->
          <!-- <el-button :class="{ bgcolor:btnChangeColor == index}" v-for="(item,index) in channelType" :key="index" @click="changeChannel(index)" size="medium">{{item}}</el-button> -->
          <!-- <el-button type="primary" plain size="medium">社交</el-button> -->
          <!-- <el-button type="primary" plain size="medium">电商</el-button> -->
        </el-form-item>
        <el-form-item label="模块分类">
          <!-- <el-select clearable v-model="form.moduleCode" placeholder="活动区域"> -->
            <el-cascader
              clearable
              :options="options"
              v-model="selectedOptions"
              @change="handleChangeTest">
            </el-cascader>
            <!-- <el-option label="区域一" value="1"></el-option> -->
            <!-- <el-option label="区域二" value="2"></el-option> -->
          <!-- </el-select> -->
        </el-form-item>
        <el-form-item label="奖励数量：">
          <el-input-number size="medium" v-model="form.rewardCountStart"></el-input-number>
          <span>-</span>
          <el-input-number size="medium" v-model="form.rewardCountEnd"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="awardTable">
      <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="channelId"
          label="渠道类型"
          :formatter="channelFormatter">
        </el-table-column>
        <el-table-column
          prop="moduleName"
          label="模块分类">
        </el-table-column>
        <el-table-column
          prop="behaviorName"
          label="行为名称">
        </el-table-column>
        <el-table-column
          prop="rewardType"
          label="奖励类型">
        </el-table-column>
        <el-table-column
          prop="rewardCount"
          sortable
          label="奖励数量">
        </el-table-column>
        <el-table-column
          prop="rewardDayLimit"
          sortable
          label="日奖励次数上限">
        </el-table-column>
        <el-table-column
          prop="lastUpd"
          label="修改时间">
        </el-table-column>
      </el-table>
    </div>
    <div style="float:left;margin-top:20px;">
      <el-button type="primary" plain  @click="configAward">配置奖励</el-button>
    </div>
    <div class="block"  style="margin-top:20px; float:right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="toatlPage">
      </el-pagination>
    </div>
    <el-dialog close-on-click-modal="false" title="配置奖励" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="dialogForm">
        <el-form-item label="奖励趣币数量" :label-width="formLabelWidth">
          <el-input type="number" v-model="dialogForm.rewardCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日奖励次数上限" :label-width="formLabelWidth">
          <el-input type="number" v-model="dialogForm.rewardDayLimit" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// =========查询 =============分类=============配置
import { searchAwardCon, moduleClassify, configurationReward} from '@/api/awardConfig'
export default {
  components:{},
  props:{},
  data(){
    return {
      isShowChannelId: false,
      moduleClassIds: '', // 一级id标识
      btnChangeColor: 0,
      channelType: [
        '全部','电商','社交'
      ],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      multipleSelection: [],
      toatlPage: 20,
//       ids
// lastUpdBy
// rewardCount
// rewardDayLimit
      channelType: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '电商'
      }, {
        value: '2',
        label: '社交'
      }],
      dialogForm: {
        ids: '',
        lastUpdBy: '1',
        rewardCount: '',
        rewardDayLimit: ''
      },
      tableData: [],
  //     /**0表示升序 1表示降序
	//  * 奖励数量排序规则
	//  */
	// private String rewardCountSort;
	// /**
	//  * 日奖励次数上限排序规则
	//  */
	// private String rewardDayLimitSort;
      form: {
        rewardCountSort: '', // 奖励数量排序规则0表示升序 1表示降序
        rewardDayLimitSort: '', // 日奖励次数上限排序规则0表示升序 1表示降序
        behaviorName: '', // 行为名称
        channelId: '0', // 渠道
        moduleCode: '', // 模块编码
        rewardCountStart: '', // 查询奖励开始数量
        rewardCountEnd: '', // 查询奖励结束数量
        pageIndex: '1', // 当前页
        pageSize: 5 // 一页多少条
      },
      // 级联数据
       options: [],
        selectedOptions: [],
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleChangeTest(data) {
      if (data.length > 0) {
        this.moduleClassIds = data[0]
        this.form.moduleCode = data[1]
        var a = this.moduleClassIds.substring(0, 1)
        this.form.channelId = String(a)
        this.isShowChannelId = true
      } else {
        this.isShowChannelId = false
        this.form.channelId = '0'
        this.form.moduleCode = ''
      }
      console.log(a)
      console.log(this.form.moduleCode)
      // console.log(data)
    },
    // 点击按钮改变渠道类型
    changeChannel(index) {
      this.btnChangeColor = index
      console.log(index)
      // if (index == 0){
      //   this.form.channelId = ''
      // } else {
      //   this.form.channelId = String(index)
      // }
      this.form.channelId = String(index)
      this.classifyRequest()
    },
    // 点击配置奖励
    configAward () {
      if (this.multipleSelection.length > 0) {
        this.dialogForm.ids = this.multipleSelection
        this.dialogFormVisible = true
      } else {
        this.$message({
          message: '请选择配置项。',
          type: 'warning'
        })
      }
    },
    // 取消弹出框
    cancelDialog () {
      this.dialogFormVisible = false
      this.$message({
        message: '取消配置。',
        type: 'info'
      })
    },
    // 弹出框确定
    saveDialog () {
      console.log(this.dialogForm)
      this.config()
    },

    // 配置奖励调用接口
    config() {
      configurationReward(this.dialogForm)
      .then(res => {
        this.dialogFormVisible = false
        this.send()
        this.$message({
          message: '配置成功。',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '配置失败。',
          type: 'error'
        })
      })
    },
    // 点击查询事件
    onSubmit () {
      if (this.form.rewardCountEnd >= 0 && this.form.rewardCountStart >= 0) {
        if (this.form.rewardCountEnd < this.form.rewardCountStart) {
          this.$message({
            message: '请重定义奖励数量',
            type: 'info'
          })
        } else {
          this.send()
        }
      } else {
        this.$message({
          message: '奖励数量不能为负值。',
          type: 'info'
        })
      }
      console.log(this.form)
    },
    //调用查询接口
    send() {
      if (this.form.rewardCountEnd == '0' && this.form.rewardCountStart == '0') {
        this.form.rewardCountEnd = ''
        this.form.rewardCountStart = ''
      }
      searchAwardCon (this.form)
      .then(res => {
        this.tableData = res.data
        this.toatlPage = Number(res.totalSize)
        this.$message({
          message: '查询成功。',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '查询失败。',
          type: 'error'
        })
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      console.log(`每页 ${val} 条`)
      this.send ()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      console.log(`当前页: ${val}`)
      this.send ()
    },
    // 勾选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach(ele => {
        this.multipleSelection.push(ele.id)
      })
      console.log(this.multipleSelection)
    },
    // 列表数据格式化
    channelFormatter (row, column) {
      if (row.channelId == '1') {
        return '电商'
      } else if (row.channelId == '2') {
        return '社交'
      }
    },
    // 处理级联的方法
    classLinkInner (item) {
      item.forEach(element => {
        if (element.mrchildren && element.moduleCode && element.moduleName) {
          element.value = element.moduleCode
          element.label = element.moduleName
          element.children = element.mrchildren
          if (element.children.length == 0) {
            element.children = null
          }
          this.classLinkInner(element.mrchildren)
        }
      })
    },
    // 模块分类接口
    classifyRequest(){
      moduleClassify ({channelId: this.form.channelId})
      .then(res => {
        console.log(res.data)
        this.options = res.data
        var arr = []
        this.options.forEach(ele => {
          if (ele.modeList.length > 0) {
            ele.modeList[0].moduleCode = ele.channelId +'_' + ele.modeList[0].moduleCode
            arr.push(ele.modeList[0])
            // options.push(ele.modeList)
            this.classLinkInner (ele.modeList)
          }
        })
        console.log(arr)
        this.classLinkInner(arr)
        this.options = arr
        // this.classLink(res.data)
        console.log('递归')
        this.$message({
          message: '成功获取分类。',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '获取分类失败。',
          type: 'error'
        })
      })
    },
  },
  mounted(){
    this.classifyRequest()
    this.send()
  }
}
</script>
<style lang="scss" scoped>
  .bgcolor{
      background: #CCCCCC !important;
      // color:white;
  }
  .awardWrapper{
    padding:20px;
    .awardHead{
      padding-top:25px;
      // height:50px;
      background: #F2F2F2;
    }
  }
</style>
