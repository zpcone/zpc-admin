import request from '@/utils/request'
import { urlCircle } from '@/api/commUrl'
const url = urlCircle
/*
 * 圈主转让
 */

// 搜索
export function searchList(params) {
  return request({
    url: url + 'circleManage/queryCircleList',
    method: 'post',
    data: params
  })
}

// 排序搜索
export function sortList(params) {
  return request({
    url: url + 'circleManage/queryCircleTransferThePossessionOfList',
    method: 'post',
    data: params
  })
}

// 取消转让
export function cancelChange(params) {
  return request({
    url: url + 'circleManage/updateTransferPossession',
    method: 'post',
    data: params
  })
}

// 转让记录
export function changeHistory(params) {
  return request({
    url: url + 'circleManage/queryHistoryAssignment',
    method: 'post',
    data: params
  })
}

/*
 * 选拔机制
 */

// 搜索
export function searchTrial(params) {
  return request({
    url: searchTrialUrl,
    method: 'post',
    data: params
  })
}

// 发起选拔申请
export function launchTrial(params) {
  return request({
    url: launchTrialUrl,
    method: 'post',
    data: params
  })
}

// 报名开始
export function enrollStartTrial(params) {
  return request({
    url: enrollStartTrialUrl,
    method: 'post',
    data: params
  })
}

// 报名结束
export function enrollEndTrial(params) {
  return request({
    url: enrollEndTrialUrl,
    method: 'post',
    data: params
  })
}

// 开始选拔
export function startSelect(params) {
  return request({
    url: startSelectUrl,
    method: 'post',
    data: params
  })
}

// 结束选拔
export function endSelect(params) {
  return request({
    url: endSelectUrl,
    method: 'post',
    data: params
  })
}

/*
 * 圈账户支付 信息
 */

// 搜索
export function searchAccount(params) {
  return request({
    url: url + 'circleManage/queryAccountsPay',
    method: 'post',
    data: params
  })
}
// 排序
export function sortAccount(params) {
  return request({
    url: url + 'circleManage/queryAccountsPaySort',
    method: 'post',
    data: params
  })
}

// 批量审核 （暂时不做）

/*
 * 聊天路由
 */

// 搜索
export function searchChat(params) {
  return request({
    url: searchChatUrl,
    method: 'post',
    data: params
  })
}

// 批量审核
export function approvalChat(params) {
  return request({
    url: approvalChatUrl,
    method: 'post',
    data: params
  })
}

// 通过
// export function agreeChat(params){
// return request({
//  url: agreeChatUrl,
//  method: 'post',
//  data: params
// })
// }

// 拒绝
export function refuseChat(params) {
  return request({
    url: refuseChatUrl,
    method: 'post',
    data: params
  })
}

/*
 * 公告
 */

// 搜索--输入id
// export function searchNotice (params) {
// return request({
//  url: url + 'circleManage/queryInsertCircleNoticeHistory',
//  method: 'post',
//  data: params
// })
// }

// 不输入id的搜索
// export function searchNoticeWithOutId (params) {
// return request({
//  url: url + 'circleManage/queryCircleNotice',
//  method: 'post',
//  data: params
// })
// }

// 输入id和不输入id合并
export function searchNoticeAll(params) {
  return request({
    url: url + 'circleManage/queryCircleNotice',
    method: 'post',
    data: params
  })
}

// 排序
export function sortNotice(params) {
  return request({
    url: url + 'circleManage/circleNoticeASort',
    method: 'post',
    data: params
  })
}
// 编辑圈公告
export function editNotice(params) {
  return request({
    url: url + 'circleManage/updateCircleNotice',
    method: 'post',
    data: params
  })
}

// 新增
export function addNotice(params) {
  return request({
    url: url + 'circleManage/insertCircleNotice',
    method: 'post',
    data: params
  })
}

// 删除
export function deleteNotice(params) {
  return request({
    url: url + 'circleManage/deleteCircleNotice',
    method: 'post',
    data: params
  })
}

/*
 * 简介
 */

// 搜索
export function searchDesc(params) {
  return request({
    url: url + 'circleManage/queryCircleIntroduce',
    method: 'post',
    data: params
  })
}

// 删除
export function deleteDesc(params) {
  return request({
    url: url + 'circleManage/deleteCircleIntroduce',
    method: 'post',
    data: params
  })
}

// 排序
export function sortDesc(params) {
  return request({
    url: url + 'circleManage/queryCircleProfileSort',
    method: 'post',
    data: params
  })
}

// 编辑
export function editDesc(params) {
  return request({
    url: url + 'circleManage/updateCircleIntroduce',
    method: 'post',
    data: params
  })
}

/*
 * 动态
 */

// 搜索
export function searchDevelop(params) {
  return request({
    url: url + 'circleManage/queryCircleDynamic',
    method: 'post',
    data: params
  })
}

// 删除
export function deleteDevelop(params) {
  return request({
    url: url + 'circleManage/deleteCircleDynamic',
    method: 'post',
    data: params
  })
}

// 排序
export function sortDevelop(params) {
  return request({
    url: url + 'circleManage/CircleDynamicSort',
    method: 'post',
    data: params
  })
}
