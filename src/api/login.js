import request from '@/utils/request'
import { urlSystem } from '@/api/commUrl'
const url = urlSystem
// const url = 'http://test.womaoapp.com:8080/sys/'
// const url = 'https://apiengine.womaoapp.com/security/sys/'
export function login(username, password, captcha) {
  return request({
    url: url + 'sys/login',
    method: 'post',
    data: {
      username: username,
      password: password,
      captcha: captcha
    }
  })
}

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: url + 'user/info',
    method: 'post',
    data: params
  })
}

// 获取所有用户信息
export function getAllUserInfo(params) {
  return request({
    url: url + 'user/list',
    method: 'post',
    data: params
  })
}
// 登出--退出登录
export function logout(params) {
  return request({
    url: 'http://dev.oss.womaoapp.com/fwas-security-admin/logout',
    method: 'post',
    data: params
  })
}
// 获取用户人登录信息
export function getUserData(params) {
  return request({
    url: url + 'user/info',
    method: 'post',
    data: {}
  })
}
// 查询角色列表
export function getRoleList(params) {
  return request({
    url: url + 'role/list ',
    method: 'post',
    data: {}
  })
}

// 查找当前用户所有部门集合
export function getNowUserToWhereDepart(params) {
  return request({
    url: url + 'dept/select',
    method: 'post',
    data: params
  })
}

// 添加用户
export function addUser(params) {
  return request({
    url: url + 'user/save',
    method: 'post',
    data: params
  })
}

// 删除用户
export function deleteUser(params) {
  return request({
    url: url + 'user/delete',
    method: 'post',
    data: params
  })
}

// 编辑用户
export function editUser(params) {
  return request({
    url: url + 'user/update',
    method: 'post',
    data: params
  })
}

// 获取用户的子部门集合
export function getChildrenIdsList(params) {
  return request({
    url: url + 'user/userinfo',
    method: 'post',
    data: params
  })
}
