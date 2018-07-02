import request from '@/utils/request'
import { urlWishingLamp } from '@/api/commUrl'
// 许愿灯列表
// const url = 'http://dev.engine.womaoapp.com/fwas-wishingLamp-admin/'
// const url = 'http://192.168.2.6:32936/fwas-wishingLamp-admin/'
const url = urlWishingLamp
export function lightList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageList',
    method: 'post',
    data: params
  })
}

// 许愿灯详情
export function lightDetail(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageAllDetail',
    method: 'post',
    data: params
  })
}

// 接灯人列表 receiveLighterList
export function receiveLighterList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageReceiveLighterList',
    method: 'post',
    data: params
  })
}

// 信使列表
export function messagerList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageMessengerList',
    method: 'post',
    data: params
  })
}

// 推荐人列表
export function recommendList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageRecommendList',
    method: 'post',
    data: params
  })
}

// 点灯人列表
export function lighterList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageLighterList',
    method: 'post',
    data: params
  })
}

// 接灯圈
export function circleReceiveLightList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageCircleReceiveLightList',
    method: 'post',
    data: params
  })
}

// 点灯圈
export function circleLighterLis(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageCircleLighterList',
    method: 'post',
    data: params
  })
}

// 接灯群
export function crowdReceiveLight(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageCrowdReceiveLightList',
    method: 'post',
    data: params
  })
}

// 点灯群
export function crowdLighterList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageCrowdLighterList',
    method: 'post',
    data: params
  })
}

// 已删除许愿灯列表
export function delLightList(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageDeleteList',
    method: 'post',
    data: params
  })
}

// 删除许愿灯
export function delLight(params) {
  return request({
    url: url + 'wishingLampManage/DeleteWishingLampManage',
    method: 'post',
    data: params
  })
}

// 保存删除原因（其他）
export function saveRemoveReason(params) {
  return request({
    url: url + 'wishingLampManage/saveRemoveWishingLampReason',
    method: 'post',
    data: params
  })
}

// 删除原因的列表
export function getRemoveList(params) {
  return request({
    url: url + 'wishingLampManage/getRemoveWishingLampReason',
    method: 'post',
    data: params
  })
}

// 恢复许愿灯
export function recoverLight(params) {
  return request({
    url: url + 'wishingLampManage/RecoverWishingLampManage',
    method: 'post',
    data: params
  })
}

// 订单查询
export function orderList(params) {
  return request({
    url: url + 'wishingOrderRest/wishingLampOrderList',
    method: 'post',
    data: params
  })
}

// 退款
export function applyCencel(params) {
  return request({
    url: url + 'wishingOrderRest/wishingLampApplyRefund',
//  url: 'http://192.168.0.232:8080/sys/wishingOrderRest/wishingLampApplyRefund',
    method: 'post',
    data: params
  })
}

// 许愿灯管理--- 导出
export function lightExport(params) {
  return request({
    url: url + 'wishingOrderRest/orderExportExcel',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}

// 订单详情
export function orderDetails(params) {
  return request({
    url: url + 'wishingOrderRest/wishingLampOrderDetails',
    method: 'post',
    data: params
  })
}

// 信使奖励列表查询
export function messengerAwardList(params) {
  return request({
    url: url + 'wishingLampManage/wishingOrderRest/orderManageMessengerAwardList',
    method: 'post',
    data: params
  })
}

// 推荐人奖励列表查询
export function refereeAwardList(params) {
  return request({
    url: url + 'wishingOrderRest/orderManageRefereeAwardList',
    method: 'post',
    data: params
  })
}

// 点灯人列表查询
export function lighterAwardList(params) {
  return request({
    url: url + 'wishingLampManage/wishingOrderRest/orderManageLighterAwardList',
    method: 'post',
    data: params
  })
}

// 接灯圈奖励列表查询
export function circleReceiveLightAwardList(params) {
  return request({
    url: url + 'wishingOrderRest/orderManageCircleReceiveLightAwardList',
    method: 'post',
    data: params
  })
}

// 点灯群奖励查询
export function circleLighterAwardList(params) {
  return request({
    url: url + 'wishingOrderRest/orderManageCircleLighterAwardList',
    method: 'post',
    data: params
  })
}

// 新增发布类型
export function addPublish(params) {
  return request({
    url: url + 'wishingLampManage/saveAttributePublishType',
    method: 'post',
    data: params
  })
}

// 发布类型LIst
export function getPublish(params) {
  return request({
    url: url + 'wishingLampManage/getPublishType',
    method: 'post',
    data: params
  })
}

// 发布类型修改
export function updatePublish(params) {
  return request({
    url: url + 'wishingLampManage/updateAttributePublishType',
    method: 'post',
    data: params
  })
}

export function lightFlow(params) {
  return request({
    url: url + 'wishingLampManage/wishingLampManageLightLampFlow',
    method: 'post',
    data: params
  })
}


