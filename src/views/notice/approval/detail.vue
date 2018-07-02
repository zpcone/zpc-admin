<template>
  <div class="checkStatusManage">
    <div class="checkStatusTitle">
      <span>当前状态：{{getData.statues | statusFilter}}</span>
      <span>申请时间：{{getData.subTime | timeFilter}}</span>
      <span>申请人：{{getData.createBy}}</span>
    </div>
    <div class="checkStatusBody">
      <div class="detailWrap">
        <span class="labelSpan">模板类型</span>
        <span style="displa:inline-block;border:3px solid #1C9AD2;padding:5px 10px;color:#1C9AD2;">{{getData.templateType | typeFilter}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">应用渠道</span>
        <!-- 1 我茂  2 社交 -->
        <span style="padding:5px 10px;">{{getData.templateSystem | channelFilter}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">模板名称</span>
        <span style="padding:5px 10px;">{{getData.templateName}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">签名</span>
        <span style="padding:5px 45px;">{{getData.messageSignatures}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">短信内容</span>
        <div class="messageContent">
          <span>{{getData.messageContext}}</span>
        </div>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">疲劳控制</span>
        <!-- <span style="padding:5px 20px;">{{tiredControl}}</span> -->
        <span style="padding:5px 20px;">{{getData.control}}</span>
      </div>
      <div style="margin-top:50px;">
        <el-button style="margin:0 30px 0 50px;" type="success" @click="approve">通过</el-button>
        <el-button type="info" @click="turnDown">拒绝</el-button>
      </div>
    </div>
    <!-- 拒绝弹出框 -->
    <el-dialog title="请填写拒绝原因" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="margin-left:100px;">
        <el-form-item :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">内容有违禁字段</el-radio> <br>
            <div style="margin:20px 0;"></div>
            <el-radio :label="2">内容格式不符</el-radio> <br>
            <div style="margin:20px 0;"></div>
            <el-radio :label="3">内容重新定义</el-radio>
            <div style="margin:20px 0;"></div>
            <el-radio :label="4">自定义原因</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="form.turnDown" v-if="form.radio == '4'">
          <el-input
            placeholder="不超过20个字符"
            v-model="form.turnDown"
            clearable>
          </el-input>
          <!-- <el-input v-if="isDefinition"
            :disabled="true"
            placeholder="不超过20个字符"
            v-model="form.inputContent"
            clearable>
          </el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDialog()">确 定</el-button>
        <el-button @click="cancelDialog()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 提交审核，模板审核
  import { getoudittemplate, auditTemplate} from '@/api/notice'
  import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        getData: '',
        dialogFormVisible: false,
        form: {
          radio: '',
          turnDown: ''
        },
        passCheck: {}
        // formLabelWidth: '120px'
      }
    },
    filters:{
      typeFilter(val){
        if (val == '1') {
          return '通知'
        } else if (val == '2') {
          return '验证码'
        } else if (val == '3') {
          return '营销'
        }
      },
      channelFilter(val){
        if (val == '1') {
          return '我茂'
        } else if (val == '2') {
          return '我鸽'
        }
      },
      timeFilter(val){
        return parseTime(val)
      },
      statusFilter(val){
        if (val == '1') {
          return '待提交'
        } else if (val == '2') {
          return '审核中'
        }else if (val == '3') {
          return '已通过'
        }else if (val == '4') {
          return '已驳回'
        }
      }
    },
    mounted () {
      console.log(this.$route.params.id)
      var obj = {}
      obj.id = this.$route.params.id
      obj.templateSystem = '1'
      getoudittemplate(obj)
        .then( response => {
          this.passCheck.id = response.id
          this.passCheck.lastUpdBy = '1'
          this.passCheck.templateStatus = '3'
          this.passCheck.templateSystem = '2'
          this.getData = response
          console.log(response)
        })
        .catch( () => {

        })
    },
    methods:{
      // 弹出框确定事件
      saveDialog () {
        if (this.form.radio == '1') {
          this.passCheck.turnDown = '内容有违禁字段'
        }
        if (this.form.radio == '2') {
          this.passCheck.turnDown = '内容与格式不符'
        }
        if (this.form.radio == '3') {
          this.passCheck.turnDown = '内容重新定义'
        }
        if (this.form.radio == '4') {
          this.passCheck.turnDown = this.form.turnDown
        }
        // 判断如果没有写原因的就不执行请求
        if (!this.form.radio || !this.passCheck.turnDown) {
          this.$message({
            message: '请填写拒绝原因!',
            type: 'info'
          })
          return
        }
        this.isNoCheck ()
        this.dialogFormVisible = false
      },
      // 弹出框取消事件
      cancelDialog () {
         this.dialogFormVisible = false
         console.log('取消')
      },
      // 点击通过
      approve () {
        this.isCheck ()
      },
      // 点击拒绝
      turnDown () {
        this.dialogFormVisible = true
        this.passCheck.templateStatus = '4'

      },
      isNoCheck () {
        auditTemplate (this.passCheck)
        .then(response => {
          this.$message({
            message: '已拒绝!',
            type: 'success'
          })
        })
        .catch( () => {
          this.$message({
            message: '拒绝失败!',
            type: 'error'
          })
        })
      },
      isCheck () {
        auditTemplate (this.passCheck)
        .then(response => {
          this.$message({
            message: '已通过!',
            type: 'success'
          })
        })
        .catch( () => {
          this.$message({
            message: '通过失败!',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .checkStatusManage{
    padding: 0 20px;
    .checkStatusTitle{
      margin: 20px 0;
      height:50px;
      background: #D7D7D7;
      display: flex;
      span{
        text-align: center;
        line-height: 50px;
        flex: 1;
      }
    }
    .checkStatusBody{
      .detailWrap{
        margin-top:50px;
        .messageContent{
          border:3px solid gray;
          display: inline-block;
          height:200px;
          width:400px;
          padding: 20px;
          background: #999;
        }
        .labelSpan{
          font-weight: bold;
          font-size: 18px;
          margin:0 20px 0 30px;
        }
      }
    }
  }
</style>
