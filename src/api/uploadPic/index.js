import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCircle
// 上传图片
export function uploadPic(params) {
  return request({
    url: url + 'uploadFile',
    method: 'post',
    data: params
  })
}
