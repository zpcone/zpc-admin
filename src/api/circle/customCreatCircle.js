import request from '@/utils/request'
import { urlCircle, urlCrowd } from '@/api/commUrl'
// 自定义常创建圈-页面
const url = urlCircle + 'circleInfo/'
const urlPic = urlCrowd + 'crowdInfo/'
// const url = 'fwas-circle-admin/sys/circleInfo/'

// const urlG = '/sys/circleInfo/'
// const url1 = 'fwas-circle-admin/sys/circleInfo/'

// const url1 = 'fwas-circle-admin/sys/circleInfo/'

// 圈创建--基于商品--圈子类型获取
export function getCircleType(params) {
  return request({
    url: url + 'getCircleTypeListByName',
    method: 'post',
    data: params
  })
}

// 圈创建--基于商品--圈子标签获取
export function getCircleLable(params) {
  return request({
    url: url + 'getCircleLableListByName',
    method: 'post',
    data: params
  })
}

// 圈创建--基于商品创建
export function creatCircleByPro(params) {
  return request({
    url: url + 'createCircleBaseGoods',
    method: 'post',
    data: params
  })
}

// 圈创建--基于商品创建--圈子头像
export function uploadcircle(params) {
  return request({
    url: urlPic + 'uploadFile',
    method: 'post',
    data: params
  })
}

// 圈创建--基于场景创建
export function creatCircleByScene(params) {
  return request({
    url: url + 'createCircleBaseScene',
    method: 'post',
    data: params
  })
}

// 圈创建--基于同路人创建
export function creatCircleByRoad(params) {
  return request({
    url: url + '/saveFellowTravellerCircle',
    method: 'post',
    data: params
  })
}
// 搜索商品或者类目-选择商品名称
export function searchShopOrClass(params) {
  return request({
    url: url + 'searchCategoryOrProductList',
    method: 'post',
    data: params
  })
}
// 基于商品-选择商品
export function selectShop(params) {
  return request({
    url: url + 'queryskuByName',
    method: 'post',
    data: params
  })
}
// 基于商品-选择类目
export function selectClass(params) {
  return request({
    url: url + 'queryCategoryByName',
    method: 'post',
    data: params
  })
}
