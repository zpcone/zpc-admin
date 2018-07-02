<template>
  <section>
    <div style="padding: 20px;background: #f1f1f1;margin-top: 10px;">
      <span style="font-size:20px;font-weight:bold;margin-right:30px;">新建会员</span>
    </div>
    <div class="form">
      <el-form :model="form" ref="ruleForm" :rules="rules" label-width="140px">
        <el-form-item prop="phone" label="手机号">
          <el-input class="formInput" auto-complete="off" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名">
          <el-input class="formInput" v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input class="formInput" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input class="formInput" type="password" auto-complete="off" v-model="form.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createUser('ruleForm')">创建用户</el-button>
          <el-button type="info" @click="back">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
// ====添加用户============上传文件========
import { addSocialMember, uploadExcel} from '@/api/members'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var status = false
      var regu = "^[0-9a-zA-Z]{8,16}$"
      var re = new RegExp(regu)
      if (re.test(value)) {
        status = true
      }else{
        status = false
      }
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!status) {
        callback(new Error('8-16位字母或数字密码'))
      } else{
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 下边是用户名的验证
    var validatePass3 = (rule, value, callback) => {
      var status = false
      var regu = "^[0-9a-zA-Z]{6,16}$"
      var re = new RegExp(regu)
      if (re.test(value)) {
        status = true
      }else{
        status = false
      }
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!status) {
        callback(new Error('用户名为6-16的字母或数字'))
      } else {
        callback()
      }
    }
// 手机号校验
    var validatePass4 = (rule, value, callback) => {
      var status = false
      var regu = "^[1][3,4,5,7,8][0-9]{9}$"
      var re = new RegExp(regu)
      if (re.test(value)) {
        status = true
      }else{
        status = false
      }
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!status) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      channel: '我鸽', // 用户渠道
      // getdata:{
      //   channelType: '1'
      // },
      form: {
        userName: '', // 用户名
        phone: '', // 手机号
        password: '', // 密码
        confirmPassword: '', // 确认密码
        role: 0,
        applicationId: 2
      },
      rules: {
        phone: [
          { validator: validatePass4, trigger: 'change' }
        ],
        userName: [
          { validator: validatePass3, trigger: 'change' }
        ],
        password: [
          { validator: validatePass, trigger: 'change'}
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 长传之前的判断
    beforeAvatarUpload () {
      // this.$confirm('确定上传文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   // this.$message({
      //   //   type: 'success',
      //   //   message: '删除成功!'
      //   // });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
    },
    // 上传错误
    uploadError (response, file, fileList) {
      this.$message({
        type: 'error',
        message: '上传失败!'
      });
    },
    // 批量导入事件
    leadInto () {
      console.log('导入')
    },
    // 点击创建--事件
    createUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addSocialMember (this.form)
              .then ( res => {
                if (res.error && res.error == '手机号已使用过') {
                  this.$message({
                    message: '手机号已经占用',
                    type: 'warning'
                  })
                } else if (res.error && res.error == '用户名已存在') {
                  this.$message({
                    message: '用户名已经占用',
                    type: 'warning'
                  })
                }
                // else {
                //   this.$router.push({
                //     path: '/staff/index',
                //   })
                // }
              })
              .catch (() => {
                this.$message({
                  message: '创建用户失败',
                  type: 'error'
                })
              })
          } else {
            return false;
          }
        })
      // this.$router.push('/staff/index')
    },
    // 手机号验证函数
    isPoneAvailable(str) {
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(str)) {
          return false;
      } else {
          return true;
      }
    },
    back() {
      this.$message.info('没有操作')
      this.$router.go(-1)
    },
    beforeXlsUpload(file){
      console.log(file.type)
    },
    submitUpload(){
      this.$refs.uploadXls.submit()
    }

  }
}
</script>

<style scoped lang="scss">
.ensure{
  display: inline-block;
  margin-left:20px;
}
.form {
  margin: 40px 20px;
  .formInput {
    width: 600px;
  }
}
</style>
