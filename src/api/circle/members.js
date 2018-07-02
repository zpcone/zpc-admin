import request from '@/utils/request'

const searchUrl = ''
const kickOutUrl = ''
const warningUrl = ''
const resumptionUrl = ''
const detailUrl = ''
const editSaveUrl = ''

// 搜索
export function search(params) {
  return request({
    url: searchUrl,
    method: 'post',
    data: params
  })
}

// 踢出圈
export function kickOut(params) {
  return request({
    url: kickOutUrl,
    method: 'post',
    data: params
  })
}

// 发出警告
export function warning(params) {
  return request({
    url: warningUrl,
    method: 'post',
    data: params
  })
}

// 设置履职周期
export function resumption(params) {
  return request({
    url: resumptionUrl,
    method: 'post',
    data: params
  })
}

// 详情
export function detail(params) {
  return request({
    url: detailUrl,
    method: 'post',
    data: params
  })
}

// 保存编辑
export function editSave(params) {
  return request({
    url: editSaveUrl,
    method: 'post',
    data: params
  })
}
