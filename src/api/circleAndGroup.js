import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCrowd

// 马保玉本地地址  勿删！
// const url ='http://192.168.1.144:8080/fwas-crowd-admin/sys'

// 圈群的分组文件夹---查找渲染列表
export function getList(params) {
  return request({
    url: url + '/crowdGroup/getcrowdGroupList',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---新建文件夹
export function newFolder(params) {
  return request({
    url: url + '/crowdGroup/addCrowdGroup',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---查询所有文件夹列表
export function searchFolder(params) {
  return request({
    url: url + '/crowdGroup/getGroupList',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---首页点击查看的会员列表
export function memberList(params) {
  return request({
    url: url + '/crowdGroup/getGroupAngMemberDetail',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---会员列表中的查看-关联会员的圈群列表
export function cAndGList(params) {
  return request({
    url: url + '/crowdGroup/getCCAngMemberDetail',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---会员列表中的查看-关联会员的圈群列表--所有成员对群圈的分组管理按钮展示
export function cAndGMange(params) {
  return request({
    url: url + '/crowdGroup/getCCAndGroupCount',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---会员列表中的查看-关联会员的圈群列表--所有成员对群圈的分组管理按钮展示的弹框
export function cAndGAllMange(params) {
  return request({
    url: url + '/crowdGroup/getCCAndmenberList',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---删除文件夹
export function delFol(params) {
  return request({
    url: url + '/crowdGroup/deleteCrowdGroup',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---置顶
export function upFol(params) {
  return request({
    url: url + '/crowdGroup/toTopGroup',
    method: 'post',
    data: params
  })
}

// 圈群的分组文件夹---取消置顶
export function downFol(params) {
  return request({
    url: url + '/crowdGroup/cancelToTopGroup',
    method: 'post',
    data: params
  })
}

// 会员对圈群的分组
export function memberForCircleAndGroup(params) {
  return request({
    url: url + '/crowdGroup/getGroupListByMember',
    method: 'post',
    data: params
  })
}
