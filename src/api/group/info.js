import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
// 线上地址
const url = urlCrowd + 'crowdInfo/'
// 群升级圈页面-查询、单个通过拒绝、批量通过拒绝---线上
const getToCircleUrl = urlCrowd + 'crowdToCircleApply/getCrowdToCircleApplyList'
const singleArUrl = urlCrowd + 'crowdToCircleApply/saveAuditInfo'
const batchArUrl = urlCrowd + 'crowdToCircleApply/saveAuditInfoByList'

// 马保玉本地地址（勿删）
// const url = 'http://192.168.1.144:8080/fwas-crowd-admin/sys/crowdInfo/'
// 群升级圈页面-查询、单个通过拒绝、批量通过拒绝---马保玉本地
// const getToCircleUrl = 'http://192.168.1.144:8080/fwas-crowd-admin/sys/crowdToCircleApply/getCrowdToCircleApplyList'
// const singleArUrl = 'http://192.168.1.144:8080/fwas-crowd-admin/sys/crowdToCircleApply/saveAuditInfo'
// const batchArUrl = 'http://192.168.1.144:8080/fwas-crowd-admin/sys/crowdToCircleApply/saveAuditInfoByList'
// 群信息管理
const dissolutionUrl = url + 'dispersedCrowd'
const frozenUrl = url + 'frozenCrowd'
const unfrozenUrl = url + 'thawCrowd'
const upgradeUrl = url + 'CrowdToCircle'
const querySortUrl = url + 'queryDidcByType'
const detailUrl = url + 'getCrowdInfoDetail'
const saveDetailUrl = url + 'saveCrowdInfo'
const SortListUrl = url + 'getCrowdInfo'
const changePicUrl = url + 'uploadFile'
const laberVerifyUrl = url + 'verifyCircleNameAvailable'
const getPicsUrl = url + ''
const editSaveUrl = url + ''
// 群信息管理--查找按钮和页面刷新加载数据列表 （已调）
export function searchPort(params) {
  return request({
    url: url + 'getCrowdInfo',
    method: 'post',
    data: params
  })
}

// 群组管理-群升级圈-查找
export function getToCircle(params) {
  return request({
    url: getToCircleUrl,
    method: 'post',
    data: params
  })
}

// 群组管理-群升级圈-单个同意拒绝
export function singleAr(params) {
  return request({
    url: singleArUrl,
    method: 'post',
    data: params
  })
}

// 群组管理-群升级圈-批量同意拒绝
export function batchAr(params) {
  return request({
    url: batchArUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理--解散（已调）
export function dissolution(params) {
  return request({
    url: dissolutionUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理--冻结（已调）
export function frozen(params) {
  return request({
    url: frozenUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理--解冻（已调）
export function unfrozen(params) {
  return request({
    url: unfrozenUrl,
    method: 'post',
    data: params
  })
}

// 群组====群升级成为圈
export function upgrade(params) {
  return request({
    url: upgradeUrl,
    method: 'post',
    data: params
  })
}

// 群组===群升级成为圈==标签不重名校验
export function laberVerify(params) {
  return request({
    url: laberVerifyUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理----群详情
export function detail(params) {
  return request({
    url: detailUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理----群详情编辑
export function saveDetail(params) {
  return request({
    url: saveDetailUrl,
    method: 'post',
    data: params
  })
}

// 图片空间
export function getPics(params) {
  return request({
    url: getPicsUrl,
    method: 'post',
    data: params
  })
}

// 修改群信息 群名称和群头像
export function editSave(params) {
  return request({
    url: editSaveUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理---- 排序列表渲染
export function querySort(params) {
  return request({
    url: querySortUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理---- 排序列表渲染
export function SortList(params) {
  return request({
    url: SortListUrl,
    method: 'post',
    data: params
  })
}

// 群信息管理---- 编辑详情里面的修改头像
export function changePic(params) {
  return request({
    url: changePicUrl,
    method: 'post',
    data: params
  })
}
