import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
// 线上
const url = urlCrowd
// 晶晶本地地址
// const url = 'http://192.168.1.147:8089/urlCrowd + ''
// 场景圈二级分类管理
// 查询
export function searchClassList(params) {
  return request({
    url: url + 'crowdCircleCategory/searchCrowdCircleCategoryListByPage',
    method: 'post',
    data: params
  })
}
// 权重
export function weightClass(params) {
  return request({
    url: url + 'pigeonry/updateCategoryWeight',
    method: 'post',
    data: params
  })
}
// 启用停用
export function openAndClose(params) {
  return request({
    url: url + 'crowdCircleCategory/updateCrowdCircleCategoryUseable',
    method: 'post',
    data: params
  })
}

