import request from '@/utils/request'
import { urlWishingLamp } from '@/api/commUrl'
// 许愿灯列表
// const url = 'http://dev.engine.womaoapp.com/fwas-wishingLamp-admin/'
const url = urlWishingLamp

const getLightListUrl = url + 'wishingLampSplitManagement/getSplitManagement'
const addLightUrl = url + 'shareProfitDeploy/saveShareProfitDeployBeanRale'
const editLightUrl = url + 'shareProfitDeploy/updateWishingLampBeanRale'
const changeStatusUrl = url + 'wishingLampSplitManagement/updateRuleStatus'
const getLightDetailUrl = url + 'shareProfitDeploy/getWishingLampBeanRale'
const getDailyLightListUrl = url + 'wishingLampSplitDetailsDay/getSplitDetailsDay'
const getLightRecordUrl = url + 'wishingLampSplitDetailsDay/getSplitDetailsDay'

export function getLightList(params) {
  return request({
    url: getLightListUrl,
    method: 'post',
    data: params
  })
}

export function addLight(params) {
  return request({
    url: addLightUrl,
    method: 'post',
    data: params
  })
}

export function editLight(params) {
  return request({
    url: editLightUrl,
    method: 'post',
    data: params
  })
}

export function changeStatus(params) {
  return request({
    url: changeStatusUrl,
    method: 'post',
    data: params
  })
}

export function getLightDetail(params) {
  return request({
    url: getLightDetailUrl,
    method: 'post',
    data: params
  })
}

// 许愿灯每日分账详情
export function getDailyLightList(params) {
  return request({
    url: getDailyLightListUrl,
    method: 'post',
    data: params
  })
}

// 许愿灯查看分账流水
export function getLightRecord(params) {
  return request({
    url: getLightRecordUrl,
    method: 'post',
    data: params
  })
}
