<template>
  <div class="creatNewTemplate">
    <div class="switchBtn">
      <!-- 通知类消息 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="通知类消息" name="1">
          <el-form :model="noteInform" :rules="rules" ref="noteInform" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="消息系统" prop="templateSystem">
              <el-select v-model="noteInform.templateSystem" clearable placeholder="请选择" style="width:300px;">
                <el-option label="社交" value="1"></el-option>
                <el-option label="电商" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="渠道" prop="list">
               <el-checkbox-group v-model="noteInform.list">
                <el-checkbox :disabled="anShow || iosShow || innerShow" @change = "messChange" label="1" name="短信">短信</el-checkbox>
                <el-checkbox :disabled="isShow" @change = "otherChange" label="2" name="IOS">IOS</el-checkbox>
                <el-checkbox :disabled="isShow" @change = "otherChange" label="3" name="安卓">安卓</el-checkbox>
                <!-- <el-checkbox :disabled="isShow" @change = "otherChange" label="5" name="站内信">站内信</el-checkbox> -->
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="informClassIcon" label="通知图标" prop="templatePicture">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                with-credentials
                name="file"
                :action="uploadUrl()"
                :data="getdata"
                :on-error="uploadError"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                enctype="multipart/form-data">
                <div class="loadingIcon">
                  <span v-if="showNoticeUploading" class="loadingtip el-icon-loading"></span>
                  <img v-if="imageUrl" :src="noticeImageUrl" class="avatar">
                  <i v-if="!showNoticeUploading && !imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="noteInform.templateName" placeholder="请输入模板名称" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item v-if="messageGeted" label="短信签名" prop="messageSignatures">
              <el-input v-model="noteInform.messageSignatures" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item v-if="messageGeted" label="短信内容" prop="messageContext" style="width:500px;">
              <el-input type="textarea" placeholder="请输入短信内容" v-model="noteInform.messageContext"></el-input>
            </el-form-item>
            <el-form-item v-if="messageGeted" label="疲劳度控制" prop="control" style="width:400px;">
               <el-input-number v-model="noteInform.control" @change="handleChange" :min="1" :max="15" label="描述文字"></el-input-number>
              <!-- <el-input resize="none" type="textarea" placeholder="请输入短信内容" v-model="noteInform.messageContext"></el-input> -->
            </el-form-item>
            <el-form-item v-if="!messageGeted" label="模板标题" prop="messageSignatures">
              <el-input v-model="noteInform.messageSignatures" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item v-if="!messageGeted" label="模板内容" prop="messageContext" style="width:400px;">
              <el-input type="textarea" v-model="noteInform.messageContext"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="noteInformSubmit('noteInform')">保存</el-button>
              <el-button @click="noteInformReset('noteInform')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 验证码短信 -->
        <el-tab-pane label="验证码消息" name="2">
          <el-form :model="codeInform" :rules="rules" ref="codeInform" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="消息系统" prop="templateSystem">
              <el-select v-model="codeInform.templateSystem" clearable placeholder="请选择" style="width:300px;">
                <el-option label="社交" value="1"></el-option>
                <el-option label="电商" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="渠道" prop="list">
               <el-checkbox-group v-model="codeInform.list">
                <el-checkbox label="1" name="type">短信</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="模板名称" prop="templateName" style="width:400px;">
              <el-input v-model="codeInform.templateName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item label="短信签名" prop="messageSignatures" style="width:400px;">
              <el-input v-model="codeInform.messageSignatures" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="短信内容" prop="messageContext" style="width:400px;">
              <el-input placeholder="请输入短信内容" type="textarea" v-model="codeInform.messageContext"></el-input>
            </el-form-item>
            <el-form-item label="疲劳度控制" prop="control;" style="width:400px;">
               <el-input-number v-model="codeInform.control" @change="handleChange" :min="1" :max="15" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codeInformSubmit('codeInform')">保存</el-button>
              <el-button @click="codeResetForm('codeInform')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>



        <!-- 营销消息 -->
        <el-tab-pane label="营销消息" name="3">
          <el-form :model="marketingInform" :rules="rules" ref="marketingInform" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="消息系统" prop="templateSystem">
              <el-select v-model="marketingInform.templateSystem" style="width:300px;" clearable placeholder="请选择">
                <el-option label="社交" value="1"></el-option>
                <el-option label="电商" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="渠道" prop="list">
               <el-checkbox-group v-model="marketingInform.list">
                <el-checkbox :disabled="markIosShow || markIosShow || markAnZhuoShow" @change = "mark_mess" label="1" name="type">短信</el-checkbox>
                <el-checkbox :disabled="markMessShow" @change = "mark_ios" label="2" name="type">IOS</el-checkbox>
                <el-checkbox :disabled="markMessShow" @change = "mark_ios" label="3" name="type">安卓</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="marketingInform.templateName" style="width:300px;" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item v-if="noticeIcon" label="通知图标" prop="templatePicture">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                with-credentials
                name="file"
                :data="getdata"
                :action="uploadUrl()"
                :on-error="uploadError"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                enctype="multipart/form-data">
                <div class="loadingIcon">
                  <span v-if="showMarkingUploading" class="loadingtip el-icon-loading"></span>
                  <img v-if="markingpic" :src="marketImageUrl" class="avatar">
                  <i v-if="!showMarkingUploading && !markingpic" class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item :label="titleLabel" prop="messageSignatures">
              <el-input v-model="marketingInform.messageSignatures" placeholder="请输入标题" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item :label="contentLabel" prop="messageContext" style="width:400px;">
              <el-input type="textarea" placeholder="请输入模板内容" v-model="marketingInform.messageContext"></el-input>
            </el-form-item>
            <el-form-item v-if="!noticeIcon" label="疲劳度控制" prop="control" style="width:400px;">
               <el-input-number v-model="marketingInform.control" @change="handleChange" :min="1" :max="15" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="后续动作" prop="templateFollowUp">
              <el-radio-group v-model="marketingInform.templateFollowUp">
                <el-radio label="1" @change	= openUse >打开应用</el-radio>
                <el-radio label="2">打开链接</el-radio>
                <el-input style="width:300px;margin-left:20px;" v-model="marketingInform.url" placeholder="请输入链接" v-if="marketingInform.templateFollowUp == '2'"></el-input>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="marketingInformSubmit('marketingInform')">保存</el-button>
              <el-button @click="marketingResetForm('marketingInform')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { addTemplate} from '@/api/notice'
  import { commUrlPic } from '@/api/commUrl'
  export default{
    // 新建模板接口
    data(){
      return{
        getdata:{
          channelId: '2'
        },
        showMarkingUploading:false,
        informUploadUrl: '',
        informClassIcon: false, //  通知类---短信时-图标是否显示
        messageGeted: true,
        showUploading: false,
        showNoticeUploading: false,
        isShow: false,
        anShow: false,
        iosShow: false,
        innerShow: false,
        markMessShow: false,
        markIosShow: false,
        markAnZhuoShow: false,
        marketImageUrl: '',
        noticeImageUrl: '',
  // 短信通知form
        activeName: '1',
        noteInform: {
          control: '7',
          createdBy: '1',
          list: [],
          templateType: '1', // 模板类型(1通知2验证码3营销)
          templateName: '', // 模板名称
          templateSystem: '2',  //应用系统分类(1电商2社交)
          messageContext: '',  /*短信内容*/
          messageSignatures: ''/*消息签名*/
        },
  // 验证码 消息form
        codeInform: {
          control: '7',
          createdBy: '1',
          list: [],
          templateType: '2', // 模板类型(1通知2验证码3营销)
          templateName: '', // 模板名称
          templateSystem: '2',  //应用系统分类(1电商2社交)
          messageContext: '',  /*短信内容*/
          messageSignatures: '',/*消息签名*/
          templatePicture: ''
        },
  // 营销 消息form
        marketingInform: {
          control: '7',
          createdBy: '1',
          templateFollowUp: '',
          url: '',
          list: [],
          templateType: '3', // 模板类型(1通知2验证码3营销)
          templateName: '', // 模板名称
          templateSystem: '2',  //应用系统分类(1电商2社交)
          messageContext: '',  /*短信内容*/
          messageSignatures: '',/*消息签名*/
          templatePicture: ''  /*通知图标*/
        },
        rules: {
          templateSystem: [
            { required: true, message: '请选择系统消息', trigger: 'change' }
          ],
          list: [
            { required: true, message: '请选择渠道类型', trigger: 'change' }
          ],
          templateName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          messageSignatures: [
            { required: true, message: '请输入短信签名', trigger: 'change' }
          ],
          messageContext: [
            { required: true, message: '请输入短信内容', trigger: 'change' }
          ],
          templateFollowUp: [
            { required: true, message: '请选择后续动作', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      noticeIcon: function() {
        if (this.markMessShow) {
          return false
        } else {
          return true
        }
       },
       'titleLabel': function() {
         if (this.marketingInform.list.length > 0 && this.marketingInform.list.indexOf('1') >= 0) {
           return '短信签名'
         } else if (this.marketingInform.list.length > 0 && this.marketingInform.list.indexOf('1') < 0) {
           return '模板标题'
         } else {
           return '短信签名'
         }
       },
       'contentLabel': function() {
         if (this.marketingInform.list.length > 0 && this.marketingInform.list.indexOf('1') >= 0) {
           return '短信内容'
         } else if (this.marketingInform.list.length > 0 && this.marketingInform.list.indexOf('1') < 0) {
           return '模板内容'
         } else {
           return '短信内容'
         }
       }
    },
    methods:{
      uploadUrl() {
        return commUrlPic
      },
      // 上传失败的回调
      uploadError () {
        this.$message.error('上传失败，请重新上传')
        if (this.activeName == '1') {
          this.showNoticeUploading = false
        } else if (this.activeName == '3') {
          this.showMarkingUploading = false
        }
      },
      // 上传图片-成功
      handleAvatarSuccess(res, file) {
        if (this.activeName == '1') {
          this.imageUrl = URL.createObjectURL(file.raw)
          this.showNoticeUploading = false
          this.noticeImageUrl = res.data
          this.noteInform.templatePicture = res.data
        } else if (this.activeName == '3') {
          this.markingpic = URL.createObjectURL(file.raw)
          this.showMarkingUploading = false
          this.marketImageUrl = res.data
          this.marketingInform.templatePicture = res.data
        }
      },
      // 图片长传-之前
       beforeAvatarUpload(file) {
         if (this.activeName == '1') {
          this.noticeImageUrl = ''
          this.imageUrl = ''
          this.showNoticeUploading = true
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
            return
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
            return
          }
         } else if (this.activeName == '3') {
          this.marketImageUrl = ''
          this.markingpic = ''
          this.showMarkingUploading = true
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M;
         }
      },
      // 通知类消息  保存
      noteInformSubmit(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          _this.noteInform.templateSystem = '2'
          if (valid) {
            _this.noteInform.templateType = _this.activeName
            _this.noteInform.templateSystem = '2'
            var index = _this.noteInform.list.indexOf('1')
            if (index < 0 ) {
              // if (!_this.noteInform.templatePicture) {
              //   _this.$message({
              //     message: '请上传通知图标!',
              //     type: 'info'
              //   })
              // } else
              //  {
                _this.noteInform.templateTitele = _this.noteInform.messageSignatures
                delete _this.noteInform.messageSignatures
                delete _this.noteInform.control
                _this.send(_this.noteInform)
              // }
            } else if (index >= 0) {
              delete _this.noteInform.templateTitele
              delete _this.noteInform.templatePicture
              _this.send(_this.noteInform)
            }
          } else {
              _this.$message({
                message: '请输入完整内容!',
                type: 'info'
              })
            return false
          }
        })
      },
      // 验证码类型 ----保存
      codeInformSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.codeInform.templateType = this.activeName
            this.codeInform.templateSystem = '2'
            this.send(this.codeInform)
          }else {
              this.$message({
                message: '请输入完整内容!',
                type: 'error'
              })
            return false
          }
        })
      },
     // 营销类消息进行验证的方法
      verification (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.marketingInform.templateType = this.activeName
            this.marketingInform.templateSystem = '2'
            this.send(this.marketingInform)
          }else {
              this.$message({
                message: '请输入完整内容!',
                type: 'error'
              })
            return false
          }
        })
      },
      // 营销类消息 ----保存
      marketingInformSubmit(formName) {
        console.log(this.marketingInform)
        this.noteInform.templateSystem = '2'
        var index = this.marketingInform.list.indexOf('1')
        if (index < 0) {
          // if (!this.marketingInform.templatePicture) {
          //   this.$message({
          //     message: '请上传通知图标!',
          //     type: 'info'
          //   })
          // } else
          //  {
            _this.marketingInform.templateTitele = _this.marketingInform.messageSignatures
            delete this.marketingInform.messageSignatures
            delete this.marketingInform.control
            this.send(this.marketingInform)
          // }
        } else if (index >= 0) {
          delete this.marketingInform.templateTitele
          delete this.marketingInform.templatePicture
          this.send(this.marketingInform)
        }
      },
      // 循环判断处理
      circulation (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == '短信') {
            arr[i] = '1'
          } else if (arr[i] == 'IOS') {
            arr[i] = '2'
          } else if (arr[i] == '安卓') {
            arr[i] = '3'
          } else if (arr[i] == '站内信') {
            arr[i] = '5'
          }
        }
      },
      // 调用接口发送请求
      send (data) {
        addTemplate(data)
        .then(response => {
          // this.$router.push('/noticeManageOneWrapper/notice/index')
          this.$message({
            message: '成功保存模板!',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '保存模板失败!',
            type: 'error'
          })
        })
      },
      // 点击打开应用 重置url
      openUse () {
        this.marketingInform.url = ''
      },
      // 点击重置
      noteInformReset(formName) {
        this.$router.go(-1)
        // this.isShow = true
        // this.anShow = true
        // this.iosShow = true
        // this.innerShow = true
        // this.$refs[formName].resetFields()
      },
      codeResetForm(formName) {
        this.$refs[formName].resetFields()
      },
      marketingResetForm(formName) {
        this.markMessShow = false
        this.markIosShow = false
        this.markAnZhuoShow = false
        this.$refs[formName].resetFields()
      },
      handleClick(tab, event) {
      },
  // 下边是对checkbox选中时候对 选中的选项显示判断
      messChange (data) {
        this.informClassIcon = false
        this.messageGeted = true
        this.noteInform.messageContext = ''
        this.noteInform.templateName = ''
        this.noteInform.messageSignatures = ''
        if (data) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      otherChange (data) {
        this.messageGeted = false
        this.informClassIcon = true
        if (data) {
        //   if (this.noteInform.list.forEach(ele => {

        // })) {}
          this.anShow = true
        } else {
          if (this.noteInform.list.length > 0) {
            return
          } else {
          this.anShow = false
          }
        }
      },
      // iosChange (data) {
      //   if (data) {
      //     this.iosShow = true
      //   } else {
      //     this.iosShow = false
      //   }
      // },
      // innerChange (data) {
      //   if (data) {
      //     this.innerShow = true
      //   } else {
      //     this.innerShow = false
      //   }
      // },
      mark_mess (data) {
        if (data) {
          this.markMessShow = true
        } else {
          this.markMessShow = false
        }
      },
      mark_ios (data) {
        if (data) {
          this.markIosShow = true
        } else {
          if (this.marketingInform.list.length > 0) {
            return
          } else {
            this.markIosShow = false
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .creatNewTemplate{
    padding: 0 20px;
    .switchBtn{
      margin: 20px 0 20px 30px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    // border: 1px dashed #d9d9d9 !important;
    width:50px;
    height:50px;
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  .loadingtip{
    position: relative;
    left:0px;
    top:8px;
    font-size: 20px;
  }
  .loadingIcon{
    width:51px;
    height:51px;
    display: inline-block;
    border: 1px dashed #d9d9d9;
  }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409EFF;
  // }
  // .avatar-uploader-icon {
  //   border: 1px dashed #d9d9d9 !important;
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 50px;
  //   height: 50px;
  //   line-height: 50px;
  //   text-align: center;
  // }
  // .avatar {
  //   width: 51px;
  //   height: 51px;
  //   display: block;
  // }
  // .loadingtip{
  //   position: relative;
  //   font-size: 18px;
  //   left:-39px;
  //   top:-5px;
  // }
</style>
