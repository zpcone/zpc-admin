<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// =====获取登陆人信息
import { getUserData, test, getUserInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([

      'name',
      'roles'
    ])
  },
  methods: {
    getDataInfo () {
      getUserData({})
      .then(res => {
        console.log(JSON.parse(res))
        var user =  JSON.parse(res)
        // localStorage.setItem('userInfo', JSON.stringify(res.data)) // 本地保存登录用户信息
        if (user.data) {
          this.$message.success('成功获取用户信息')
        } else {
          window.location.href = 'http://dev.oss.womaoapp.com/fwas-security-admin/logout'
        }
        console.log(res)
      })
      .catch(() => {
        this.$message.error('获取用户信息失败')
        // console.log(window.location.href)
        window.location.href = 'http://dev.oss.womaoapp.com/fwas-security-admin/logout'
      })
    },
    change() {
      // this.testDemo()
      // console.log(getToken('JSESSIONID'))
      this.getUserInfo()
    },
    // 测试
    // testDemo() {
    //   test()
    //   .then(res => {
    //     console.log('成功')
    //   })
    // },
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
    }
  },
  mouted () {
    // var a = this.$router.currentRoute.query.id
    // alert(a)
    // this.getDataInfo()
    // alert('hello')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
