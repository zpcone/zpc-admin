import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
const url = urlCrowd


//王伟本地地址
//const url = 'http://192.168.0.228:8080/fwas-crowd-admin/sys/'

// 群成员---查找
export function searchList(params) {
  return request({
    url: url + 'crowdMember/getCrowdMemberInfo',
    method: 'post',
    data: params
  })
}

// 群组管理 查看群成员详情
export function detail(params) {
  return request({
    url: url + 'crowdMember/findCrowdMemberInfo',
    method: 'post',
    data: params
  })
}

// 踢出群
export function kickOut(params) {
  return request({
    url: url + 'crowdMember/batchTiren',
    method: 'post',
    data: params
  })
}

// 保存编辑信息
export function editSave(params) {
  return request({
    url: url + 'crowdMember/updateCrowdMember',
    method: 'post',
    data: params
  })
}

// 群成员详情-查看会员角色历史
export function roleHistory(params) {
  return request({
    url: url + 'crowdMember/getSuccessiveRoleType',
    method: 'post',
    data: params
  })
}

// 群成员详情-新增
export function newMember(params) {
  return request({
    url: url + 'crowdMember/saveCrowdMember',
    method: 'post',
    data: params
  })
}
