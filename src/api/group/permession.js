import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const searchRoleUrl = urlCrowd + 'role/searchRoleListByPage'
const addRoleUrl = urlCrowd + 'role/saveRole'
const editRoleUrl = urlCrowd + 'role/updateRole'
const detailRoleUrl = urlCrowd + 'role/getRoleInfo'
const delRoleUrl = urlCrowd + 'role/deleteRole'
/*
 * 权限管理（暂不实现）
 */

/*
 * 角色管理
 */
// 新增
export function addRole (params) {
  return request({
    url: addRoleUrl,
    method: 'post',
    data: params
  })
}

// 搜索
export function searchRole (params) {
  return request({
    url: searchRoleUrl,
    method: 'post',
    data: params
  })
}

// 编辑
export function editRole (params) {
  return request({
    url: editRoleUrl,
    method: 'post',
    data: params
  })
}

// 详情
export function detailRole (params) {
  return request({
    url: detailRoleUrl,
    method: 'post',
    data: params
  })
}

// 删除
export function delRole (params) {
  return request({
    url: delRoleUrl,
    method: 'post',
    data: params
  })
}
