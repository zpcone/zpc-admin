import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
// 线上地址
const searchRoleUrl = urlCrowd + 'role/searchRoleListByPage'
const addRoleUrl = urlCrowd + 'role/saveRole'
const editRoleUrl = urlCrowd + 'role/updateRole'
const detailRoleUrl = urlCrowd + 'role/getRoleInfo'
const delRoleUrl = urlCrowd + 'role/deleteRole'
const searchConfigUrl = urlCrowd + 'role/getFlSysConfigureByCode'
const setConfigUrl = urlCrowd + 'role/saveRoleToUpConfigure'

// 晶晶本地地址
// const searchRoleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/searchRoleListByPage'
// const addRoleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/saveRole'
// const editRoleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/updateRole'
// const detailRoleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/getRoleInfo'
// const delRoleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/deleteRole'
// const searchConfigUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/getFlSysConfigureByCode'
// const setConfigUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/role/saveRoleToUpConfigure'

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

// 查询-观摩会员升级行为会员的规则配置
export function searchConfig (params) {
  return request({
    url: searchConfigUrl,
    method: 'post',
    data: params
  })
}

// 设置-观摩会员升级行为会员的规则配置
export function setConfig (params) {
  return request({
    url: setConfigUrl,
    method: 'post',
    data: params
  })
}
