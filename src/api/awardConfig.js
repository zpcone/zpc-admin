import request from '@/utils/request'
import { urlUserAction } from '@/api/commUrl'
// const url = 'fwas.rewardConfiguration.admin/rewardConfiguration/'
// const url = 'rewardConfiguration/'
// const url = 'http://dev.guo.womaoapp.com:8080/fwas-rewardConfiguration-admin/sys/rewardConfiguration/'
// const url1 = 'http://dev.guo.womaoapp.com:8080/fwas-rewardConfiguration-admin/sys/behaviorManager/'
const url = urlUserAction + 'rewardConfiguration/'
const url1 = urlUserAction + 'behaviorManager/'
// 查询用户行为奖励配置
export function searchAwardCon(params) {
  return request({
    url: url + 'getRewardConfigurationList',
    method: 'post',
    data: params
  })
}

// 模块分类集合
export function moduleClassify(params) {
  return request({
    url: url1 + 'getRewardTypeList',
    method: 'post',
    data: params
  })
}

// 用户行为配置
export function configurationReward(params) {
  return request({
    url: url + 'configurationReward',
    method: 'post',
    data: params
  })
}
