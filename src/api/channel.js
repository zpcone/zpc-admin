import request from '@/utils/request'
import { urlChannel } from '@/api/commUrl'
const url = urlChannel + 'channelrest/'
const listChannelUrl = url + 'list'
const deleteBatchUrl = url + 'deleteBatch'
const getByIdUrl = url + 'getById'
const updateChannelUrl = url + 'update'
const saveChannelUrl = url + 'save'
const updateStatusBatchUrl = url + 'updateStatusBatch'
saveChannel

// 列表
export function listChannel(params) {
  console.log(params)
  return request({
    url: listChannelUrl,
    method: 'post',
    data: params
  })
}

// 批量删除
export function deleteBatch(params) {
  console.log(params)
  return request({
    url: deleteBatchUrl,
    method: 'post',
    data: params
  })
}

// 编辑回显
export function getById(params) {
  console.log(params)
  return request({
    url: getByIdUrl,
    method: 'post',
    data: params
  })
}

// 更新
export function updateChannel(params) {
  console.log(params)
  return request({
    url: updateChannelUrl,
    method: 'post',
    data: params
  })
}

// 新增
export function saveChannel(params) {
  console.log(params)
  return request({
    url: saveChannelUrl,
    method: 'post',
    data: params
  })
}

// 启用 或禁用
export function updateStatusBatch(params) {
  console.log(params)
  return request({
    url: updateStatusBatchUrl,
    method: 'post',
    data: params
  })
}
