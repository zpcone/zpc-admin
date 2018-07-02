<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">引擎平台运营系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item prop="picCode">
        <el-input v-model="loginForm.picCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item style="border: none;background: transparent;">
        <img :src="picCodeUrl" style="display: inline-block;width: 65%;height: 46px;"/>
        <el-button type="text" @click="reload" style="display: inline-block;text-align: center;width: 30%;font-size: 16px;position: relative;top: -17px;">点击刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
        <span>{{loginForm}}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { navigationMenu } from '@/api/system/dept'
// 获取登录人信息====
// import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      menuTree: [{
        "icon": "fa fa-cog",
        "menuId": 1,
        "name": "systemAdmin",
        "orderNum": 0,
        "parentId": 0,
        "type": 0
      }],
      loginForm: {
        username: 'admin',
        password: 'admin',
        picCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      picCodeUrl: 'http://192.168.2.1:8092/foriseland-security/captcha.jpg',
      picCodeUrlRe: 'http://192.168.2.1:8092/foriseland-security/captcha.jpg'
    }
  },
  methods: {
    setLoca() {
      localStorage.setItem('menu', JSON.stringify(this.menuTree))
      console.log(localStorage.getItem('menu'))
    },
    // 获取登录人信息
    getUserInfo () {
      // getInfo ({})
      // .then(res => {
      //   console.log(res)
      //   console.log('获取信息成功')
      // })
      // .catch(() => {
      //   console.log('获取信息失败')
      // })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('Login', this.loginForm).then(() => {
      //       this.loading = false
      //       this.$router.push({ path: '/' })
      //     }).catch(() => {
      //       this.$router.push({ path: '/' })
      //       this.loading = false
      //     })
      //   } else {
      //     this.$router.push({ path: '/' })
      //     return false
      //   }
      // })
    },
    reload(){
      this.picCodeUrl = this.picCodeUrl + '?rnd=' + Math.random()
    },
    getMenu() {
      navigationMenu({})
      .then(res => {
        console.log(res)
      })
      .catch(() => {

      })
    }
  },
  beforeCreate () {
    // this.getMenu()
    // this.setLoca()

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
