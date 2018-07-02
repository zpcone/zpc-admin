import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { Message } from 'element-ui'
import { getSessionId, getUserId } from '@/utils/auth'
// import { getToken } from '@/utils/auth' // 验权
// import { navigationMenu } from './api/system/dept' // 引用接口文件--获取菜单列表接口
import { logOut } from '@/utils/path' // 登出

router.beforeEach((to, from, next) => {
  NProgress.start()
  // setLoca()
  // var status = false
  // navigationMenu({})
  // .then(res => {
  //   console.log(res)
  //   status = true
  // })
  // .catch(() => {

  // })
  // setLoca()
  //
  // if ((getSessionId() && getUserId()) || (getSessionId() && !store.state.permissionRouter.getPermissionRoutes)) {
     if (true) {
    // if (to.path === '/dashboard') {
    //   next()
    // } else {
    //   if (getUserId()) {
    //     next()
    //   } else {

    //     logoOut()
    //   }
    // }
    next()
  } else {
    // console.log('登出')
    logOut()
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
