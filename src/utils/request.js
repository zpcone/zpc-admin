import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'
import { logOut } from '@/utils/path' // 引用登出函数

// 创建axios实例
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['Authorization'] = store.apiKey
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.withCredentials = true // 配置axios携带cookie
// axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     //  config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
service.interceptors.response.use(
  // ===============
  response => {
    if (response.data.errorCode && response.data.errorCode === '100') {
      Message.error('您无权访问此接口')
      jumpLogin()
    } else if (response.data.errorCode && response.data.errorCode === '101') {
      Message.error('您未登录，请先登录')
      jumpLogin()
    } else if (response.data.errorCode && response.data.errorCode === '102') {
      Message.error('您长时间未操作，请重新登录')
      jumpLogin()
    } else {
      return response.data
    }
    // ===============
    // response => {
    // debugger
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    // const res = response.data
    //  if (res.code !== 20000) {
    //    Message({
    //      message: res.data,
    //      type: 'error',
    //      duration: 5 * 1000
    //    })
    //
    //    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //        confirmButtonText: '重新登录',
    //        cancelButtonText: '取消',
    //        type: 'warning'
    //      }).then(() => {
    //        store.dispatch('FedLogOut').then(() => {
    //          location.reload()// 为了重新实例化vue-router对象 避免bug
    //        })
    //      })
    //    }
    //    return Promise.reject('error')
    //  } else {
    //    return response.data
    //  }
    // return response.data
  },
  error => {
    // console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
    //		resolve()
  }
)
function jumpLogin() {
  logOut()
}

export default service
