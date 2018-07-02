import request from '@/utils/request'
import { urlSystem } from '@/api/commUrl'
const url = urlSystem
// 获取登录人信息
export function getDept(params) {
  return request({
    url: url + 'user/info',
    method: 'post',
    data: params
  })
}
// 查找当前用户所有部门集合
// http://dev.oss.womaoapp.com/fwas-security-admin
export function getNowUserToWhereDepart(params) {
  return request({
    url: url + 'dept/select',
    method: 'post',
    data: params
  })
}
// // 查询当前用户所有部门集合
// export function getPresentAllDepartment(params) {
//   return request({
//     url: url + 'searchUserDeptIdList',
//     method: 'post',
//     data: params
//   })
// }

// 获取用户的信息
export function getUserInfo(params) {
  return request({
    url: url + 'user/userinfo',
    method: 'post',
    data: params
  })
}

// 保存用户
export function saveUser(params) {
  return request({
    url: url + 'user/save',
    method: 'post',
    data: params
  })
}

// 修改用户
export function updateUser(params) {
  return request({
    url: url + 'update',
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

// 查询所有用户
export function getAllUser(params) {
  return request({
    url: url + 'user/list',
    method: 'post',
    data: params
  })
}

// 查询角色列表
export function searchRoleList(params) {
  return request({
    url: url + 'role/select',
    method: 'post',
    data: params
  })
}

// 角色查询getSearchFromName
export function getSearchFromName(params) {
  return request({
    url: url + 'role/select',
    method: 'post',
    data: params
  })
}

// // 查询角色信息
export function getRoleSingleInfo(params) {
  return request({
    url: url + 'role/info',
    method: 'post',
    data: params
  })
}

// 查询角色信息
export function getRoleInfo(params) {
  return request({
    url: url + 'role/info',
    method: 'post',
    data: params
  })
}

// 删除角色
export function removeRole(params) {
  return request({
    url: url + 'role/delete',
    method: 'post',
    data: params
  })
}

// 修改角色
export function updateRole(params) {
  return request({
    url: url + 'role/update',
    method: 'post',
    data: params
  })
}

// 添加角色
export function addRole(params) {
  return request({
    url: url + 'role/save',
    method: 'post',
    data: params
  })
}

// 导航菜单
export function navigationMenu(params) {
  return request({
    url: url + 'menu/nav',
    method: 'post',
    data: params
  })
}

// 所有菜单列表
export function allMenuList(params) {
  return request({
    url: url + 'menu/list',
    method: 'post',
    data: params
  })
}

// 菜单信息
export function menuInfo(params) {
  return request({
    url: url + 'menu/info',
    method: 'post',
    data: params
  })
}

// 新增菜单
export function saveMenu(params) {
  return request({
    url: url + 'menu/save',
    method: 'post',
    data: params
  })
}

// 更新菜单
export function updateMenu(params) {
  return request({
    url: url + 'menu/update',
    method: 'post',
    data: params
  })
}

// 删除菜单
export function deleteMenu(params) {
  return request({
    url: url + 'menu/delete',
    method: 'post',
    data: params
  })
}

// 部门列表
export function departmentList(params) {
  return request({
    url: url + 'dept/list',
    method: 'post',
    data: params
  })
}

// 选择部门
export function selectDepartment(params) {
  return request({
    url: url + 'dept/select',
    method: 'post',
    data: params
  })
}

// 上级部门
export function superDepartment(params) {
  return request({
    url: url + 'dept/info',
    method: 'post',
    data: params
  })
}

// 部门信息============????????
export function departmentInfo(params) {
  return request({
    url: url + 'dept/info',
    method: 'post',
    data: params
  })
}

// 保存部门
export function saveDepartment(params) {
  return request({
    url: url + 'dept/save',
    method: 'post',
    data: params
  })
}

// 修改部门
export function updateDepartment(params) {
  return request({
    url: url + 'dept/update',
    method: 'post',
    data: params
  })
}

// 删除部门
export function deleteDepartment(params) {
  return request({
    url: url + 'dept/delete',
    method: 'post',
    data: params
  })
}
