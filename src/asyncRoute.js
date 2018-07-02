import request from '@/utils/request'
import store from './store'
import { handleBaseUrl } from '@/utils/path' // 拼接引擎接口路径
// import { getUserId } from '@/utils/auth' // 验权

// 获取用户信息及权限路由
class GetUserInfo {
  constructor() {
    this.nameArr = []
  }
  getRouters() {
    if (sessionStorage.getItem('nameArr')) {
      this.nameArr = JSON.parse(sessionStorage.getItem('nameArr'))
      store.dispatch('GenerateRoutes', this.nameArr)
    } else {
      // 调接口请求权限
      getRoute({}).then(res => {
        console.log('路由', res)
        var resArr = res.data
        console.log(this.nameArr)
        this.nameArr = getAllIcons(this.nameArr, resArr) // 获取返回数据中的所有'icon'，name
        sessionStorage.setItem('nameArr', JSON.stringify(this.nameArr))
        store.dispatch('GenerateRoutes', this.nameArr)
      })
    }
  }
  getHandleUser() {
    getUserInfo({}).then((res) => {
      console.log('用户信息', JSON.parse(res))
      var resData = JSON.parse(res).data
      if (resData) {
        store.dispatch('SetUserInfo', resData)
        localStorage.setItem('userInfo', resData) // localStorage 保存用户信息
      }
    })
  }
  start() {
    this.getHandleUser()
    this.getRouters()
  }
}
const startRequest = new GetUserInfo()
startRequest.start()

// 获取所有返回的name值
function getAllIcons(nameArr, arr) {
  arr.forEach((item, index) => {
    if (typeof item.icon !== 'undefined' && item.icon !== null && item.icon !== 'null') {
      nameArr.push(item.icon)
    }
    if (typeof item.list !== 'undefined' && item.list.length > 0) {
      getAllIcons(nameArr, item.list)
    }
  })
  return nameArr
}

/**
 * 获取权限JSon
 * @param params
 */
function getRoute(params) {
  return request({
    url: handleBaseUrl('/sys/menu/nav'),
    method: 'post',
    data: params
  })
}

/**
 * 获取权限JSon
 * @param params
 */
function getUserInfo(params) {
  return request({
    url: handleBaseUrl('/sys/user/info'),
    method: 'post',
    data: params
  })
}
