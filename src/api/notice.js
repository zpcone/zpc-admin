import request from '@/utils/request'
import { urlMessage, urlCrowd } from '@/api/commUrl'
const url = urlMessage + 'template/' // 模板
const url1 = urlMessage + 'audit/' // 审核
const url2 = urlMessage + 'task/' // 消息
const urlT = urlCrowd+ "crowdInfo/uploadFile/"

//雷俊本地地址
//const url = 'http://192.168.0.220:8080/fwas.message.admin/sys/template/'
//const url1 = 'http://192.168.0.220:8080/fwas.message.admin/sys/audit/'
//const url2 = 'http://192.168.0.220:8080/fwas.message.admin/sys/task/'

// 消息模板搜索
export function searchTemplate(params) {
  return request({
    url: url + 'searchTemplate',
    method: 'post',
    data: params
  })
}
// 调取模板示例
export function getExcel(params) {
  return request({
    url: urlMessage + 'fileDown/excel',
    method: 'get',
    params
  })
}

// 删除模板
export function deleteTemplate(params) {
  return request({
    url: url + 'deleteTemplate',
    method: 'post',
    data: params
  })
}

// 查询模板
export function getTemplate(params) {
  return request({
    url: url + 'getTemplate',
    method: 'post',
    params
  })
}

// 修改模板
export function updateTemplate(params) {
  return request({
    url: url + 'updateTemplate',
    method: 'post',
    data: params
  })
}

// 新建模板
export function addTemplate(params) {
  return request({
    url: url + 'addTemplate',
    method: 'post',
    data: params
  })
}

// 选择模板
export function chooseTemplate(params) {
  return request({
    url: url + 'chooseTemplate',
    method: 'post',
    data: params
  })
}
// 模板审核
export function auditTemplate(params) {
  return request({
    url: url1 + 'auditTemplate',
    method: 'post',
    data: params
  })
}

// 待审核查询
export function getMember(params) {
  return request({
    url: url1 + 'searchaddittemplate',
    method: 'post',
    data: params
  })
}

// 去审核查询
export function getoudittemplate(params) {
  return request({
    url: url1 + 'getoudittemplate',
    method: 'post',
    data: params
  })
}

// 已审核查询
export function searchaudittemplate(params) {
  return request({
    url: url1 + 'searchaudittemplate',
    method: 'post',
    data: params
  })
}

// 保存消息任务
export function savetask(params) {
  return request({
    url: url2 + 'savetask',
    method: 'post',
    data: params
  })
}

// 消息列表记录查询
export function searchflowtask(params) {
  return request({
    url: url2 + 'searchflowtask',
    method: 'post',
    data: params
  })
}

// 消息列表详情记录查询
export function searchflowtaskdetail(params) {
  return request({
    url: url2 + 'searchflowtaskdetail',
    method: 'post',
    data: params
  })
}
// 已审核查询
export function getMessageAuditReview(params) {
  return request({
    url: url1 + 'getMessageAuditReview',
    method: 'post',
    data: params
  })
}
// 推送列表取消
// task/updateCannelTaskStatus
export function cancelPush(params) {
  return request({
    url: url2 + 'updateCannelTaskStatus',
    method: 'post',
    data: params
  })
}
// 图片上传
export function imgUpload(params) {
  return request({
    url: urlT,
    method: 'post',
    data: params
  })
}
