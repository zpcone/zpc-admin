<template>
  <div class="templateManage">
    <el-form :inline="true" :rules="rules" ref="idForm" :model="selectTemplateFrom" class="demo-form-inline" style="margin-left:50px;">
      <el-form-item label="选择模板ID">
        <el-input v-model="selectTemplateFrom.templateId" placeholder="请输入模板id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectTemClick('idForm')">浏览</el-button>
      </el-form-item>
    </el-form>
    <!-- ================== -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="消息内容" prop="messageContext">
        <el-input style="width:400px;" type="textarea" disabled v-model="ruleForm.messageContext"></el-input>
      </el-form-item>
      <el-form-item label="目标用户" prop="targetUser">
        <el-radio-group @change="selectUserTarget" v-model="ruleForm.targetUser">
          <el-radio label="1" @change = "allUser">全部用户</el-radio>
          <el-radio label="2">待定用户</el-radio>
        </el-radio-group>
        <form name="orderform" style="display:inline-block;" :action="getExceUrl()" method="post">
           <input v-show="false" style="visiable:hidden;" type="text" name="channelType" v-model="channelNumber">
          <el-button  style="margin-left:15px;" v-if="isShowUpload" display="inline-block" class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="getExcelTem">获取excel示例</el-button>
        </form>
      </el-form-item>
        <el-upload style="margin-left:330px;"
          class='ensure ensureButt'
          :action="uploadExcelUrl()"
          :data="getdata"
          name="fileName"
          :onError="uploadError"
          :onSuccess="uploadSuccess"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv"
          :beforeUpload="beforeAvatarUpload"
          :auto-upload="true"
        >
        <el-button style="height:40px;" v-if="isShowUpload" size="small" type="primary">上传文价</el-button>
      </el-upload>
      <el-form-item label="推送渠道" prop="list">
        <el-checkbox-group v-model="ruleForm.list">
          <el-checkbox label="1" name="type" disabled>短信</el-checkbox>
          <el-checkbox label="2" name="type" disabled>IOS</el-checkbox>
          <el-checkbox label="3" name="type" disabled>安卓</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="推送时间" prop="messageType">
        <el-radio-group v-model="ruleForm.messageType">
          <el-radio label="2" @change="immediatelyPush">立即推送</el-radio>
          <el-radio label="1">定时推送</el-radio>
          <el-date-picker @change="dateChange" v-show="ruleForm.messageType == '1'" type="date" placeholder="选择日期" v-model="timePicker" style="width: 200px;margin-left:20px;"></el-date-picker>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="后续动作" prop="templateFollowUp">
        <el-radio-group v-model="ruleForm.templateFollowUp">
          <el-radio disabled label="1">打开应用</el-radio>
          <el-radio disabled label="2">打开链接</el-radio>
          <!-- <el-input style="width:300px;margin-left:20px;" v-model="marketingInform.url" placeholder="请输入链接" v-if="marketingInform.templateFollowUp == '2'"></el-input> -->
          <el-input v-if="ruleForm.templateFollowUp == '2'" :disabled="true" style="width:300px;margin-left:20px;" v-model="url" placeholder="请输入链接"></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="消息失效时间" required>
        <el-col :span="11">
          <el-form-item prop="expirationTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.expirationTime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定发送</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// 消息发送 选择模板 获取excel模板
  import { savetask, chooseTemplate, getExcel} from '@/api/notice'
  import { excelUrl, uploadExcelUrl } from '@/api/commUrl'
  export default{
    data(){
      return{
        channelNumber: '',
        timePicker: '',
        url: '',
        isShowUpload: false,
        getdata:{
          channelType: '1'
        },
        // upLoadData: {
        //     fileName: '2132'
        // },
        selectTemplateFrom: {
          templateId: ''
        },
        ruleForm: {
          templateSystem: '1',
          templateId: '', // 模板id
          messageContext: '', //  消息内容
          templateFollowUp: '', // 打开链接
          targetUser: '', // 目标用户
          pushTime: '', // 推送时间
          createdby: '', // 创建人
          list: [], // 渠道id
          expirationTime: '', // 过期时间
          messageType: '', // 消息类型
          context: '', // 消息内容
          user: '' // 目标用户
        },
        // fileList: [], // 文件上传
        rules: {
          targetUser: [
            { required: true, message: '请选择用户', trigger: 'change' }
          ],
          templateId: [
            { required: true,message: '请选择模板id', trigger: 'change' }
          ],
          templateFollowUp: [
            { required: true, message: '请选择后续动作', trigger: 'change' }
          ],
          expirationTime: [
            { required: true, message: '请选择过期时间', trigger: 'change' }
          ],
          messageType: [
            { required: true, message: '请选择过期时间', trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      'ruleForm.list': function() {
        if (this.ruleForm.list.includes('1')) {
          this.channelNumber = '1'
        } else {
          this.channelNumber = '2'
        }
      }
    },
    methods:{
    uploadExcelUrl(){
      return uploadExcelUrl
    },
    getExceUrl() {
      return excelUrl
      // console.log('获取地址')
    },
    // 选中立即推动
    immediatelyPush (val) {
      this.ruleForm.pushTime = ''
    },
    // 时间变化的时候触发
    dateChange (val) {
      this.ruleForm.pushTime = val
    },
    selectUserTarget () {
      console.log(this.ruleForm.targetUser)
      if (this.ruleForm.targetUser == 2){
        this.isShowUpload = true
      } else {
        this.isShowUpload = false
      }
    },
          // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件')
      console.log(response)
      this.ruleForm.user = response
      console.log(this.ruleForm)
    },
    // 上传错误
    uploadError (response, file, fileList) {
      console.log('上传失败，请重试！')
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload (file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log('上传模板只能是 xls、xlsx、格式!')
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 && isLt2M
    },
      // 下载excel模板
      getExcelTem () {
        if (this.ruleForm.list.length <= 0) {
          this.$message.warning('请先获取示例渠道')
          return
        }
        document.orderform.submit()
      },
      // 选择模板查询   去俩边空字符串
      selectTemClick (formName) {
        if (!this.selectTemplateFrom.templateId) {
          this.$message({
            message: '请选择模板id!',
            type: 'error'
          })
        } else {
          var newStr = this.selectTemplateFrom.templateId.replace(/(^\s*)|(\s*$)/g, "")
          var obj = {
            templateId: newStr,
            templateSystem: '1'
          }
          this.send (obj)
        }
      },
      // 调用选择模板接口
      send (obj) {
        chooseTemplate (obj)
        .then(response => {
          console.log(response)
          this.url = response.url
          var arr = response.list
           for(var i= 0;i< arr.length;i++){
              if (arr[i] == 1){
                arr[i] = '1'
              } else if (arr[i] == 2) {
                arr[i] = '2'
              } else if (arr[i] == 3) {
                arr[i] = '3'
              }
            }
          if (!response.templateFollowUp) {
            response.templateFollowUp = '1'
          }
          console.log(response)
          this.ruleForm = response
          this.$message({
            message: '成功选择模板!',
            type: 'success'
          })
          console.log(response)
        })
        .catch( () => {
          this.$message({
            message: '选择模板失败!',
            type: 'info'
          })
        })
      },
      // 调用发送消息接口
      saveSendMessage () {
        this.ruleForm.createdby = '1'
        // var obj = {}
        // obj.id = this.ruleForm.id
        // obj.targetUser = this.ruleForm.targetUser
        // obj.createdby = '1'
        // obj.list = this.ruleForm.list
        // obj.expirationTime = this.ruleForm.expirationTime
        // obj.templateType = this.ruleForm.templateType
        // obj.messageContext = this.ruleForm.messageContext
        // obj.user = this.ruleForm.user
        // obj.pushTime = ''
        savetask (this.ruleForm)
        .then(response => {
          this.$message({
            message: '发送成功!',
            type: 'success'
          })
          console.log(response)
        })
        .catch( () => {
          this.$message({
            message: '发送失败!',
            type: 'info'
          })
        })
      },
      // 表单提交
      submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.expirationTime) {
              if (this.ruleForm.targetUser == '2') {
                if (this.ruleForm.user) {
                  this.saveSendMessage ()
                } else {
                  this.$message({
                    message: '请选择上传文件!',
                    type: 'error'
                  })
                  return
                }
              } else {
                if (this.ruleForm.messageType == '1' && this.ruleForm.pushTime || this.ruleForm.messageType == '2') {
                  this.saveSendMessage ()
                } else {
                  this.$message({
                    message: '请选择推送时间!',
                    type: 'error'
                  })
                }
              }
            } else {
              this.$message({
                message: '请选择失效时间!',
                type: 'error'
              })
              return
            }
            console.log(this.ruleForm)
          } else {
            this.$message({
              message: '请选择参数!',
              type: 'error'
            })
            return false
          }
        })
      },
      // 选择全部用户时触发
      allUser () {
        this.url = ''
        console.log('全部用户')
      },
      // 点击重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped lang="scss">
  .ensure{
    display: inline-block;
    margin-left:20px;
  }
  .templateManage{
    padding: 20px 20px;
  }
</style>
