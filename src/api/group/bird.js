import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCrowd

// 晶晶本地地址
// const url = 'http://192.168.1.147:8089/fwas-crowd-admin/sys/'
// 王伟本地地址
// const url = 'http://192.168.0.228:8080/fwas-crowd-admin/sys/'



// 创建鸽舍圈上传头像单独地址
export function uploadFilePort(params) {
  return request({
    url: url + 'crowdInfo/uploadFile',//图片地址单调  https://qa-apiengine.womaoapp.com/crowd/sys/crowdInfo/uploadFile
    method: 'post',
    data: params
  })
}

// 二级栏目动态显示--公用
export function searchsencondLevel(params) {
  return request({
    url: url + 'crowdColumn/searchSecondLevelCategoryColumns',
    method: 'post',
    data: params
  })
}

// 设置搜索标题
export function searchTitle(params) {
  return request({
    url: url + 'crowdCircleCategory/searchFlCategoryTitleList',
    method: 'post',
    data: params
  })
}

// 新增下级分类
export function addNextClass(params) {
  return request({
    url: url + 'crowdCircleCategory/saveChildCrowdCircleCategory',
    method: 'post',
    data: params
  })
}

// 新增标题
export function addTitle(params) {
  return request({
    url: url + 'crowdCircleCategory/saveFlCategoryTitle',
    method: 'post',
    data: params
  })
}

// 城市下拉列表动态展示--公用
export function citylist(params) {
  return request({
    url: url + 'pigeonry/getAreaList',
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

// 鸽舍推荐管理--权重修改确定按钮
export function weight(params) {
  return request({
    url: url + 'loftRecommend/updateColumnWeight',
    method: 'post',
    data: params
  })
}

// 鸽舍管理--推荐管理--搜索
export function birdRecommend(params) {
  return request({
    url: url + 'loftRecommend/getLoftRecommendInfo',
    method: 'post',
    data: params
  })
}

// 鸽舍推荐管理--列表权重按钮渲染权重数值
export function weightView(params) {
  return request({
    url: url + 'loftRecommend/getColumnWeight',
    method: 'post',
    data: params
  })
}

// 鸽舍推荐管理--移除精品鸽舍
export function removeBird(params) {
  return request({
    url: url + 'loftRecommend/delColumnRelationship',
    method: 'post',
    data: params
  })
}

// 鸽舍--行业分类管理--搜索
export function searchBird(params) {
  return request({
    url: url + 'pigeonry/searchSecondLevelCategoryListByPage',
    method: 'post',
    data: params
  })
}

// 鸽舍--行业分类管理--权重按钮--三级分类管理的权重按钮
export function weightBird(params) {
  return request({
    url: url + 'pigeonry/updateCategoryWeight',
    method: 'post',
    data: params
  })
}

// 行业分类下---三级分类管理--搜索
export function searchThreeLevel(params) {
  return request({
    url: url + 'pigeonry/searchThreeLevelCategoryList',
    method: 'post',
    data: params
  })
}

// 行业分类下--将三级分类移动至指定栏目
export function saveColumn(params) {
  return request({
    url: url + 'pigeonry/saveColumnAndCategory',
    method: 'post',
    data: params
  })
}


// 三级分类下的鸽舍群管理列表查询
export function birdCircle(params) {
  return request({
    url: url + 'pigeonry/searchFlCircleListByPage',
    method: 'post',
    data: params
  })
}

// 创建鸽舍圈
export function creatBirdCircle(params) {
  return request({
    url: url + 'pigeonry/saveGSFlCircle',
    method: 'post',
    data: params
  })
}





// 行业分类下拉列表动态展示----暂时去掉
export function industry(params) {
  return request({
    url: url + 'pigeonry/searchSecondLevelCategoryList',
    method: 'post',
    data: params
  })
}
