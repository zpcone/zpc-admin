import request from '@/utils/request'
import { urlComplaints } from '@/api/commUrl'
// const url = 'http://192.168.2.6:33317/fas.complaints.admin/ComplaintsDispose/'

const url = urlComplaints + 'ComplaintsDispose/'
const getTreeUrl = url + 'getcomplaintsTrees'

// 未处理投诉
export function untreatList(params) {
  return request({
    url: url + 'getNoDisposeComplaintsList',
    method: 'post',
    data: params
  })
}

// 投诉查询详情
export function treatDetail(params) {
  return request({
    url: url + 'getComplaintsByComplaintsId',
    method: 'post',
    data: params
  })
}

// 未处理投诉确认 confirmComplaints
export function confirmUntreat(params) {
  return request({
    url: url + 'confirmComplaints',
    method: 'post',
    data: params
  })
}

// 已处理
export function treatedList(params) {
  return request({
    url: url + 'getDisposeComplaintsList',
    method: 'post',
    data: params
  })
}

// 内容类型<枚举>
export function getTypes(params) {
  return request({
    url: url + 'getComplaintsTypeList',
    method: 'post',
    data: params
  })
}

export function getTree() {
  return request({
    url: getTreeUrl,
    method: 'post',
    data: {}
  })
}

