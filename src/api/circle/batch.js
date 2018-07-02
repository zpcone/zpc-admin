import request from '@/utils/request'
import { urlCrowd, urlCircle } from '@/api/commUrl'


//const url = 'fwas-circle-admin/sys/'

// 郭春杰本地
// const url = 'fwas-circle-admin/sys/'
// 张月本地地址
// const url = 'http://192.168.1.12:9090/fwas-circle-admin/sys/'
// 晶晶本地地址
// const url = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/'
/*
 * 圈公告批量管理
 */

// 城市下拉框---晶晶
export function cityList(params) {
  return request({
    url: urlCrowd + 'pigeonry/getAreaList',
    method: 'post',
    data: params
  })
}

// 场景类型下拉框---晶晶
export function senceType(params) {
  return request({
    url: urlCrowd + 'crowdCircleCategory/findCategoryListByType',
    method: 'post',
    data: params
  })
}

// 二级分类下拉框---晶晶
export function sencondClass(params) {
  return request({
    url: urlCrowd + 'crowdCircleCategory/findCategoryListByUpCategoryId',
    method: 'post',
    data: params
  })
}

// 搜索---郝东强
export function search(params) {
  return request({
    url: urlCircle + 'circleManage/queryCircleBulletinBatch',
    method: 'post',
    data: params
  })
}

// 发布公告---郝东强
export function newNotic(params) {
  return request({
    url: urlCircle + 'circleManage/insertCircleNoticeBatch',
    method: 'post',
    data: params
  })
}

// 删除---郝东强
export function deleteNotice(params) {
  return request({
    url: urlCircle + 'circleManage/deleteCircleNoticeBatch',
    method: 'post',
    data: params
  })
}

// 查询---郝东强
export function viewNotice(params) {
  return request({
    url: urlCircle + 'circleManage/queryCircleBriefBatch',
    method: 'post',
    data: params
  })
}
