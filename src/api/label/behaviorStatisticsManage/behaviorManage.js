import request from '@/utils/request'
import { urlrewardConfiguration } from '@/api/commUrl'
// http://192.168.0.231/fwas.rewardConfiguration.admin
// const url = urlrewardConfiguration + 'behaviorManager/'
// const url = 'http://my.womaoapp.com/fwas-pay-admin/sys/'
const url = urlrewardConfiguration + 'rewardConfiguration/'
const url1 = urlrewardConfiguration + 'behaviorManager/'

// 一级模块列表
export function getOneMoudule(params) {
  return request({
    url: url1 + 'getFirstModule',
    method: 'post',
    data: params
  })
}
// http://dev.womaoapp.com/fwas-rewardConfiguration-admin/rewardConfiguration
// 二级模块列表
export function getTwoMoudule(params) {
  return request({
    url: url1 + 'getOtherModule',
    method: 'post',
    data: params
  })
}

// 三级模块列表
export function getThirdMoudule(params) {
  return request({
    url: url1 + 'getOtherModule',
    method: 'post',
    data: params
  })
}

// 行为管理查询
export function searchBehaviorManage(params) {
  return request({
    url: url + 'getBehaviorManagerList',
    method: 'post',
    data: params
  })
}
