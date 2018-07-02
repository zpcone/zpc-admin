import request from '@/utils/request'
import { urlLabel } from '@/api/commUrl'
// 人标签查询--李义广接口
const url = urlLabel + 'peopleLabel/'
const urlS = urlLabel + 'labelUser/'
const urlD = urlLabel + 'labelUserInfo/'
const urlF = urlLabel + 'labelConfig/'
// 人标签节点添加
export function peopleLabelAdd(params) {
  return request({
    url: url + 'save',
    method: 'post',
    data: params
  })
}

// 人标签子集查询
export function getPeopleChildSearch(params) {
  return request({
    url: url + 'list',
    method: 'post',
    data: params
  })
}

// 人标签节点名称修改
export function peopleLabelUpload(params) {
  return request({
    url: url + 'updatePeopleLabelTree',
    method: 'post',
    data: params
  })
}

// 人标签节点删除
export function peopleLabelDelete(params) {
  return request({
    url: url + 'deletePeopleLabelTree',
    method: 'post',
    data: params
  })
}
// =============================================下边是用户列表页面的接口=======================
// 人签用户基本信息表的列表查询接口
export function peopleLabelBasicInfo(params) {
  return request({
    url: urlD + 'list',
    method: 'post',
    data: params
  })
}

// 查询人签用户基本信息表的详情接口
export function peopleLabelDetailInfo(params) {
  return request({
    url: urlD + 'userDetailed',
    method: 'post',
    data: params
  })
}

// 查询人签用户基本信息表的详情并且把信息拼接在树上
export function peopleUserDetailedTree(params) {
  return request({
    url: urlD + 'userDetailedTree',
    method: 'post',
    data: params
  })
}
// 平台创建标签页面=======页面========页面=======页面====页面==========
// 查询系统标签配置信息列表
export function factorylabelSearch(params) {
  return request({
    url: urlF + 'list',
    method: 'post',
    data: params
  })
}

// 修改系统标签配置信息
export function factorylabelUpload(params) {
  return request({
    url: urlF + 'update',
    method: 'post',
    data: params
  })
}

// 下边用户自定义标签接口部分======页面===页面=====页面===================================
// 查询用户自定义表签列表
export function userDefined(params) {
  return request({
    url: urlS + 'list',
    method: 'post',
    data: params
  })
}

// 李义广新增接口
export function baseLabelNameSearchList(params) {
  return request({
    url: urlD + 'userLabelList',
    method: 'post',
    data: params
  })
}
