// 请求用户权限菜单的接口地址
export function handleBaseUrl(backUrlStr) {
  if (process.env.NODE_ENV === 'development') { // development 开发环境下
    return 'http://dev.oss.womaoapp.com/fwas-security-admin' + backUrlStr
  } else {
    return 'http://dev.oss.womaoapp.com/fwas-security-admin' + backUrlStr
    // return 'http://qa.oss.womaoapp.com/fwas-security-admin' + backUrlStr
  }
}

// 登出函数
export function logOut() {
  // console.log('sjgkl')
  // sessionStorage.removeItem('nameArr')
  process.env.NODE_ENV === 'development' ? location.href = 'http://dev.oss.womaoapp.com/fwas-security-admin/logout' : location.href = 'http://dev.oss.womaoapp.com/fwas-security-admin/logout'
}
