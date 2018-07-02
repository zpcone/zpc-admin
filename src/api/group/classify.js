import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const searchClassifyUrl = urlCrowd + 'crowdCircleCategory/searchCrowdCircleCategoryListByPage'
const changeClassNameUrl = urlCrowd + 'crowdCircleCategory/updateCrowdCircleCategoryName'
const newFirstClassUrl = urlCrowd + 'crowdCircleCategory/saveFirstCrowdCircleCategory'
const addNextClassUrl = urlCrowd + 'crowdCircleCategory/saveChildCrowdCircleCategory'
const setTopNumberUrl = urlCrowd + 'crowdCircleCategory/updateCrowdCircleCategoryToplimit'
const searchByLevelUrl = urlCrowd + 'crowdCircleCategory/searchCategoryLevelList'
const setGtoCnumberUrl = urlCrowd + 'crowdCircleCategory/updateCrowdToCircleNum'
const setFissionUrl = urlCrowd + 'crowdCircleCategory/updateFissionNum'
const searchTitleUrl = urlCrowd + 'crowdCircleCategory/searchFlCategoryTitleList'
const addTitleUrl = urlCrowd + 'crowdCircleCategory/saveFlCategoryTitle'



//晶晶本地地址
//const searchClassifyUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/searchCrowdCircleCategoryListByPage'
//const changeClassNameUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/updateCrowdCircleCategoryName'
//const newFirstClassUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/saveFirstCrowdCircleCategory'
//const addNextClassUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/saveChildCrowdCircleCategory'
//const setTopNumberUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/updateCrowdCircleCategoryToplimit'
//const searchByLevelUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/searchCategoryLevelList'
//const setGtoCnumberUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/updateCrowdToCircleNum'
//const setFissionUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/updateFissionNum'
//const searchTitleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/searchFlCategoryTitleList'
//const addTitleUrl = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/crowdCircleCategory/saveFlCategoryTitle'



/*
 * 群圈分类管理
 */

// 查询全部角色信息  已通
export function searchClassList (params) {
  return request({
    url: searchClassifyUrl,
    method: 'post',
    data: params
  })
}

// 按照级别查询角色信息   已通
export function searchByLevel () {
  return request({
    url: searchByLevelUrl,
    method: 'post'
  })
}

// 列表中分类名称的编辑  已通
export function changeClassName (params) {
  return request({
    url: changeClassNameUrl,
    method: 'post',
    data: params
  })
}

// 新增一级圈分类   已通
export function newFirstClass (params) {
  return request({
    url: newFirstClassUrl,
    method: 'post',
    data: params
  })
}

// 新增下级分类  已通
export function addNextClass (params) {
  return request({
    url: addNextClassUrl,
    method: 'post',
    data: params
  })
}

// 设置人数上限     已通
export function setTopNumber (params) {
  return request({
    url: setTopNumberUrl,
    method: 'post',
    data: params
  })
}

// 批量启用停用  已移至鸽舍页面
//export function openAndClose (params) {
//return request({
//  url: openAndCloseUrl,
//  method: 'post',
//  data: params
//})
//}

// 设置群升级圈人数
export function setGtoCnumber (params) {
  return request({
    url: setGtoCnumberUrl,
    method: 'post',
    data: params
  })
}

// 设置只能裂变规定人数
export function setFission(params) {
  return request({
    url: setFissionUrl,
    method: 'post',
    data: params
  })
}

// 设置搜索标题
export function searchTitle(params) {
  return request({
    url: searchTitleUrl,
    method: 'post',
    data: params
  })
}

// 新增标题
export function addTitle(params) {
  return request({
    url: addTitleUrl,
    method: 'post',
    data: params
  })
}
