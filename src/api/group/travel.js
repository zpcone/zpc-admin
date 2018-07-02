import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const searchTravelUrl = urlCrowd + 'crowdTravel/searchBackendSupremeCrowdsList'
const searchsencondLevellUrl = urlCrowd + 'pigeonry/searchSecondLevelCategoryList'
const setTopTravelUrl = urlCrowd + 'crowdTravel/updateGroup'
const moveTravelUrl = urlCrowd + 'crowdTravel/deleteColumnAndCrowd'
const cancelSetTopTravelUrl = urlCrowd + 'crowdTravel/cancelGroupTop'
const moveToTravelUrl = urlCrowd + 'crowdTravel/saveColumnAndCrowd'
const searchLifeTravelUrl = urlCrowd + 'pigeonry/searchSecondLevelCategoryListByPage'
const handleGroupUrl = urlCrowd + 'pigeonry/searchFLCrowdListByPage'
const citylistUrl = urlCrowd + 'pigeonry/getAreaList'

// 大旅游页面刷新二级栏目动态显示
export function searchsencondLevel (params) {
  return request({
    url: searchsencondLevellUrl,
    method: 'post',
    data: params
  })
}

// 搜索按钮渲染列表
export function searchTravel (params) {
  return request({
    url: searchTravelUrl,
    method: 'post',
    data: params
  })
}

// 置顶
export function setTopTravel (params) {
  return request({
    url: setTopTravelUrl,
    method: 'post',
    data: params
  })
}

// 取消置顶
export function cancelSetTopTravel (params) {
  return request({
    url: cancelSetTopTravelUrl,
    method: 'post',
    data: params
  })
}

// 将群移至当前栏目
export function moveToTravel (params) {
  return request({
    url: moveToTravelUrl,
    method: 'post',
    data: params
  })
}

// 将群移除当前栏目
export function moveTravel (params) {
  return request({
    url: moveTravelUrl,
    method: 'post',
    data: params
  })
}

// 生活分类管理搜索按钮渲染列表
export function searchLifeTravel (params) {
  return request({
    url: searchLifeTravelUrl,
    method: 'post',
    data: params
  })
}

// 公共群页面刷新  渲染列表
export function handleGroup (params) {
  return request({
    url: handleGroupUrl,
    method: 'post',
    data: params
  })
}

// 城市下拉列表动态展示
export function citylist (params) {
  return request({
    url: citylistUrl,
    method: 'post',
    data: params
  })
}
