import request from '@/utils/request'
import { urlUserAction } from '@/api/commUrl'
const url = urlUserAction + ''

//周世杰本地地址
//const url = 'http://192.168.1.193/sys/'
//const url = 'http://zhou.womaoapp.com/sys/' 



// const url = 'http://192.168.2.6:34325/fwaf-userAction-admin-1.0.0-SNAPSHOT/sys/'
// const url = 'http://qa.womaoapp.com/fwaf-userAction-admin/sys/'


const actionUserStatistics = url + 'userAction/listActionUserStatistics'
const listUserAction = url + 'userAction/listUserActionStatistics'
const listUserLogs = url + 'userAction/listUserActionLogs'
const listPlatformAction = url + 'userAction/listPlatformActionStatistics'
const getAllModuleLabel = url + 'userAction/getAllModuleLabels'
const findAllBehavior = url + 'userAction/findAllBehaviors'
const userInfo = url + 'userAction/getUserInfo'


// 输入mId  渲染被禁掉的列表
export function getUserInfo(params) {
  return request({
    url: userInfo,
    method: 'post',
    params
  })
}

// 渲染行为名称的下拉
export function findAllBehaviors(params) {
  return request({
    url: findAllBehavior,
    method: 'post',
    data: params
  })
}

// 行为用户列表查询
export function listActionUserStatistics(params) {
  return request({
    url: actionUserStatistics,
    method: 'post',
    data: params
  })
}

// 单一用户行为日志
export function listUserActionLogs(params) {
  return request({
    url: listUserLogs,
    method: 'post',
    data: params
  })
}

// 单一用户行为统计 行为
export function listUserActionStatistics(params) {
  return request({
    url: listUserAction,
    method: 'post',
    data: params
  })
}







// 平台用户行为统计
export function listPlatformActionStatistics(params) {
  return request({
    url: listPlatformAction,
    method: 'post',
    data: params
  })
}

// 多级模块信息查询(一次全部加载)
export function getAllModuleLabels(params) {
  return request({
    url: getAllModuleLabel,
    method: 'post',
    data: params
  })
}



