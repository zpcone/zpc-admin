import request from '@/utils/request'
import { urlCrowd } from '@/api/commUrl'
// 线上地址
const url = urlCrowd

// 朱自强本地地址
// const url = 'http://192.168.0.212:8080/fwas-crowd-admin/sys/'

const searchNoticeUrl = url + 'crowdNoticeRest/getCrowdNoticeInfo'
const addNoticeUrl = url + 'crowdNoticeRest/saveBackendCrowdNotice'
const editNoticeUrl = url + 'crowdNoticeRest/updateBackendCrowdNotice'

const searchDescUrl = url + 'crowdIntroduceRest/getCrowdIntroduce'
const deleteDescUrl = url + 'crowdIntroduceRest/deleteCrowdIntroduce'
const editDescUrl = url + 'crowdIntroduceRest/updateBackendCrowdIntroduce'

const deleteNoticeUrl = url + 'crowdNoticeRest/deleteCrowdNotice'
// 群动态查询
const searchDevelopUrl = url + 'crowdDynamicRest/getCrowdDynamic'
const deleteDevelopUrl = ''

// 单个审核通过和批量审核通过
const approvalUrl = url + 'crowdMasterApprovalRest/CrowdMasterAgree'
// 单个审核拒绝和批量审核拒绝
const refuseUrl = url + 'crowdMasterApprovalRest/CrowdMasterRefuse'
// 进群审核查询
const searchApprovalUrl = url + 'crowdMasterApprovalRest/getBackendCrowdMasterApproval'

/*
 * 公告
 */

// 搜索    已调
export function searchNotice(params) {
  return request({
    url: searchNoticeUrl,
    method: 'post',
    data: params
  })
}

// 新增   已调
export function addNotice(params) {
  return request({
    url: addNoticeUrl,
    method: 'post',
    data: params
  })
}

// 编辑  已调
export function editNotice(params) {
  return request({
    url: editNoticeUrl,
    method: 'post',
    data: params
  })
}

// 删除
export function deleteNotice(params) {
  return request({
    url: deleteNoticeUrl,
    method: 'post',
    data: params
  })
}

/*
 * 简介
 */

// 搜索  已调
export function searchDesc(params) {
  return request({
    url: searchDescUrl,
    method: 'post',
    data: params
  })
}

// 删除  已调
export function deleteDesc(params) {
  return request({
    url: deleteDescUrl,
    method: 'post',
    data: params
  })
}

// 编辑   已调
export function editDesc(params) {
  return request({
    url: editDescUrl,
    method: 'post',
    data: params
  })
}

/*
 * 动态
 */

// 搜索  已调
export function searchDevelop(params) {
  return request({
    url: searchDevelopUrl,
    method: 'post',
    data: params
  })
}

// 删除
export function deleteDevelop(params) {
  return request({
    url: deleteDevelopUrl,
    method: 'post',
    data: params
  })
}

/*
 * 进群审批
 */
// 搜索   已调
export function searchApproval(params) {
  return request({
    url: searchApprovalUrl,
    method: 'post',
    data: params
  })
}

// 批量审核通过  （单个审核通过已调）
export function approval(params) {
  return request({
    url: approvalUrl,
    method: 'post',
    data: params
  })
}

// 批量审核拒绝
export function refuse(params) {
  return request({
    url: refuseUrl,
    method: 'post',
    data: params
  })
}
