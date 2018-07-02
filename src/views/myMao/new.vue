<template>
  <section>
    <div style="padding: 20px;background: #f1f1f1;margin-top: 10px;">
      <span style="font-size:20px;font-weight:bold;margin-right:30px;">新建会员</span>
      <!-- <el-button type="primary">批量导入用户</el-button> -->
    </div>
    <!--<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />-->
    <div class="form">
      <el-form :model="form" ref="ruleForm" :rules="rules" label-width="140px">
        <el-form-item prop="phone" label="手机号">
          <el-input clearable class="formInput" auto-complete="off" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名">
          <el-input clearable class="formInput" v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input clearable class="formInput" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input clearable class="formInput" type="password" auto-complete="off" v-model="form.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="渠道">
          <el-radio-group v-module="channel">
            <el-radio :label="我鸽">我茂</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-radio-group >
            <el-radio disabled label="普通用户" value="1"></el-radio>
            <el-radio disabled label="商家" value="2"></el-radio>
            <el-radio disabled label="员工" value="3"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="createUser('ruleForm')">创建用户</el-button>
          <el-button type="info" @click="back">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
// ====添加用户
import { addMallMember} from '@/api/members'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var status = false
      var regu = "^[0-9a-zA-Z]{6,16}$"
      var re = new RegExp(regu)
      if (re.test(value)) {
        status = true
      }else{
        status = false
      }
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!status) {
        callback(new Error('6-16位字母或数字密码'))
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
    // 下边是用户名校验
    var validatePass3 = (rule, value, callback) => {
      var status = false
      var regu = "^[0-9a-zA-Z]{8,16}$"
      var re = new RegExp(regu)
      if (re.test(value)) {
        status = true
      }else{
        status = false
      }
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!status) {
        callback(new Error('用户名为8-16的字母或数字'))
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
      channel: '我茂', // 用户渠道
      form: {
        userName: '', // 用户名
        phone: '', // 手机号
        password: '', // 密码
        confirmPassword: '', // 确认密码
        role: 0,
        applicationId: 1
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
    // 点击创建--事件
    createUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addMallMember (this.form)
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
                } else {
                  this.$router.push({
                    path: '/staff/index',
                  })
                }
              })
              .catch (() => {
                this.$message({
                  message: '创建用户失败',
                  type: 'error'
                })
              })
          } else {
            console.log('error submit!!')
            return false;
          }
        })
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
.form {
  margin: 40px 20px;
  .formInput {
    width: 600px;
  }
}
</style>
