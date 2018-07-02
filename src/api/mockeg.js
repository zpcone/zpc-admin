import request from '@/utils/request'

export function test(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/list.do',
    method: 'post',
    data: params
  })
}

// 批量删除
export function deleteBatch(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/deleteBatch.do',
    method: 'post',
    data: params
  })
}

//
export function getById(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/getById.do',
    method: 'post',
    data: params
  })
}

export function updateChannel(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/update.do',
    method: 'post',
    data: params
  })
}

export function saveChannel(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/save.do',
    method: 'post',
    data: params
  })
}

export function updateStatusBatch(params) {
  console.log(params)
  return request({
    url: 'http://192.168.3.176:8080/fwas.channel.admin/channelrest/updateStatusBatch.do',
    method: 'post',
    data: params
  })
}

