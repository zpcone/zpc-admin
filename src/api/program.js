import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCrowd
//王伟本地地址
//const url = 'http://192.168.0.228:8080/fwas-crowd-admin/sys/'

//群圈栏目管理---查询栏目信息列表
export function searchColumn(params) {
  return request({
    url: url + 'crowdColumn/getCrowdColumnInfo',
    method: 'post',
    data: params
  })
}

//群圈栏目管理---创建一级栏目
export function newColumn(params) {
  return request({
    url: url + 'crowdColumn/saveCrowdColumn',
    method: 'post',
    data: params
  })
}

//群圈栏目管理---编辑按钮
export function editColumn(params) {
  return request({
    url: url + 'crowdColumn/updateColumnName',
    method: 'post',
    data: params
  })
}

//群圈栏目管理---权重按钮
export function setWeight(params) {
  return request({
    url: url + 'crowdColumn/updateColumnWeight',
    method: 'post',
    data: params
  })
}

//群圈栏目管理---停用启用
export function setStatus(params) {
  return request({
    url: url + 'crowdColumn/updateStatus',
    method: 'post',
    data: params
  })
}
