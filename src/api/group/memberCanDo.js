import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCrowd

// 王伟本地地址
// const url = 'http://192.168.0.228:8080/fwas-crowd-admin/sys/'

// 会员对群信息管理-搜索
export function searchList(params) {
  return request({
    url: url + 'crowdMember/getMemberInCrowdInfo',
    method: 'post',
    data: params
  })
}

// 会员对群信息管理-查看会员角色历史
export function roleHistory(params) {
  return request({
    url: url + 'crowdMember/getSuccessiveRoleType',
    method: 'post',
    data: params
  })
}

// 会员对群信息管理- 查看群成员详情
export function detail(params) {
  return request({
    url: url + 'crowdMember/findCrowdMemberInfo',
    method: 'post',
    data: params
  })
}
