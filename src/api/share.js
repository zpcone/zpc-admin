import request from '@/utils/request'
import { urlShare } from '@/api/commUrl'

const searchUrl = urlShare + 'shareInfo/searchShareInfo'
const searchViewUrl = urlShare + 'shareInfo/searchShareView'
// 查询
export function search(params) {
  return request({
    url: searchUrl,
    method: 'post',
    data: params
  })
}

export function searchView(params) {
  return request({
    url: searchViewUrl,
    method: 'post',
    data: params
  })
}
