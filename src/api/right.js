import request from '@/utils/request'
import { urlPrivilege, urlCrowd } from '@/api/commUrl'

const url = urlPrivilege
// const url = 'http://192.168.0.227:8080/admin'
//李义广本地地址
//const url = 'http://192.168.0.215:8080/fwas-privilege-admin/sys'


// 左侧（一级二级）特权数据列表展示
export function getTreeData(params) {
  return request({
    url: url + '/privilegeTypeRest/menu',
    method: 'post',
    data: params
  })
}

// 一级列表显示
export function firstList(params) {
  return request({
    url: url + '/privilegeRest/list',
    method: 'post',
    data: params
  })
}

// 限制条件显示
export function limitList(params) {
  return request({
    url: url + '/privilegeConditionsRest/list',
    method: 'post',
    data: params
  })
}

// 一级菜单添加
export function addFirstLevel(params) {
  return request({
    url: url + '/privilegeRest/save',
    method: 'post',
    data: params
  })
}

// 二级菜单添加
export function addSecondLevel(params) {
  return request({
    url: url + '/privilegeTypeRest/save',
    method: 'post',
    data: params
  })
}

// 特权条件添加--添加一级菜单
export function addLimit(params) {
  return request({
    url: url + '/privilegeConditionsRest/save',
    method: 'post',
    data: params
  })
}

// 新增限制条件上传文件单独接口
export function addSecondLevelAll(params) {
  return request({
    url: urlCrowd + 'crowdInfo/uploadFile',
    // 图片地址单调（正确）  https://qa-apiengine.womaoapp.com/crowd/sys/crowdInfo/uploadFile
    // 现在错的：qa-apiengine.womaoapp.com/fwas-crowd-admin/sys/crowdInfo/uploadFile
    method: 'post',
    data: params
  })
}

// 新增限制条件保存
export function addSecondLevelAllWithoutFile(params) {
  return request({
    url: url + '/privilegeConditionsRest/saveAll',
    method: 'post',
    data: params
  })
}

// 根据一级查询 二级
export function getByPrivilegeId(params) {
  return request({
    url: '/privilegeTypeRest/getByPrivilegeId',
    method: 'post',
    data: params
  })
}

// 特权详情
export function detail(params) {
  return request({
    url: url + '/privilegeConditionsRest/getById',
    method: 'post',
    data: params
  })
}

// 批量启用和禁用
export function openMore(params) {
  return request({
    url: url + '/privilegeConditionsRest/updateStatus',
    method: 'post',
    data: params
  })
}

// 编辑
export function edit(params) {
  return request({
    url: url + '/privilegeConditionsRest/update',
    method: 'post',
    data: params
  })
}

// 用户id列表查询（只是调试时候用一下，以后就从别的页面查询复制过来，用作特权赠送）
export function searchId(params) {
  return request({
    url: url + '/userSearchRest/search',
    method: 'post',
    data: params
  })
}

// 赠送特权
export function sendPriv(params) {
  return request({
    url: url + '/memberPrivilegeConditionsRest/save',
    //  url: 'http://192.168.0.227:8082/admin/memberPrivilegeConditionsRest/save',
    method: 'post',
    data: params
  })
}

// 用户日志查询
export function userLog(params) {
  return request({
    url: url + '/memberPrivilegeConditionsLogRest/list',
    //  url: 'http://192.168.0.232:8080/memberPrivilegeConditionsLogRest/list',
    method: 'post',
    data: params
  })
}

// export function testPri(channelId) {
// return request({
//  url: 'http://192.168.0.227:8080/admin/privilegeTypeRest/menu',
//  method: 'get',
//  params: {
//    channelId: channelId
//  }
// })
// }
