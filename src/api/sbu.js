import request from '@/utils/request'
import { urlSbu } from '@/api/commUrl'

const url = urlSbu
const searchListUrl = url + 'sbuManage/searchSBUListCtr'
const newSbuUrl = url + 'sbuManage/sbuAddCtr'
const getSbuMemberUrl = url + 'sbuMemberManage/getSBUAdMembersCtr'// 添加规则弹框中的列表渲染
const editSbuMemberUrl = url + 'sbuManage/sbuUpdateCtr'
const searchMemberUrl = url + 'sbuMemberManage/searchUserListCtr'
const disableSbuUrl = url + 'sbuManage/sbuDisableCtr'
const enableSbuUrl = url + 'sbuManage/sbuEnableCtr'
const frozenSbuUrl = url + 'sbuManage/sbuFrozenCtr'
const unfrozenSbuUrl = url + 'sbuManage/sbuUNFrozenCtr'
const setOverCountUrl = url + 'sbuManage/sbuSetOverAccountCtr'
const updateAmountUrl = url + 'sbuMemberManage/updateSbuMemberAmount'
const getAmountRecordUrl = url + 'sbuManage/searchSbuSplitAccountList'
const getPersonsUrl = url + '/sbuManage/searchSbuMemberList'
const getSbuNumUrl = url + 'sbuManage/getSBUCntByLoginUserIdCtr'
const getRuleMemListUrl = url + 'sbuRuleManage/getSbuRuleMemberListCtr'
const newRuleUrl = url + 'sbuRuleManage/sbuRuleAddCtr'// 新建sbu规则
const getRulesUrl = url + 'sbuRuleManage/getSbuAdRuleCtr'// 规则管理下面的表格渲染
const editRuleUrl = url + 'sbuRuleManage/sbuRuleUpdateCtr'
const delRuleUrl = url + 'sbuRuleManage/sbuRuleDeleteCtr'
const changeRuleUrl = url + 'sbuSupplier/exchangeSbuSupplierRule'
const getShopRuleUrl = url + 'sbuSupplier/searchSbuSupplierList'
const getSbuRulesUrl = url + 'sbuSupplier/searchRuleList'
const getRuleByIdUrl = url + 'sbuSupplier/searchSbuRuleByRuleId'
const sbuNumUrl = url + 'sbuManage/getSBUCntByLoginUserIdCtr'
const sbuNewMembersUrl = url + 'sbuMemberManage/insertSbuMember'
const deleteMembersUrl = url + 'sbuMemberManage/deleteSbuMember'
const setMembersUrl = url + 'sbuMemberManage/setAdminSbuMember'

// 列表查询
export function searchList(params) {
  return request({
    url: searchListUrl,
    method: 'post',
    data: params
  })
}
// 新建SBU
export function newSbu(params) {
  return request({
    url: newSbuUrl,
    method: 'post',
    data: params
  })
}
// 获取SBU及成员信息
export function getSbuMember(params) {
  return request({
    url: getSbuMemberUrl,
    method: 'post',
    data: params
  })
}
// 修改SBU成员信息
export function editSbuMember(params) {
  return request({
    url: editSbuMemberUrl,
    method: 'post',
    data: params
  })
}
// SBU -新建-成员搜索
export function searchMember(params) {
  return request({
    url: searchMemberUrl,
    method: 'post',
    data: params
  })
}
// SBU 禁用
export function disableSbu(params) {
  return request({
    url: disableSbuUrl,
    method: 'post',
    data: params
  })
}
// 解禁
export function enableSbu(params) {
  return request({
    url: enableSbuUrl,
    method: 'post',
    data: params
  })
}
// 冻结
export function frozenSbu(params) {
  return request({
    url: frozenSbuUrl,
    method: 'post',
    data: params
  })
}
// 解冻
export function unfrozenSbu(params) {
  return request({
    url: unfrozenSbuUrl,
    method: 'post',
    data: params
  })
}
// 设置透支额度
export function setOverCount(params) {
  return request({
    url: setOverCountUrl,
    method: 'post',
    data: params
  })
}
// 立即分配收益
export function updateAmount(params) {
  return request({
    url: updateAmountUrl,
    method: 'post',
    data: params
  })
}
// 查看分配记录
export function getAmountRecord(params) {
  return request({
    url: getAmountRecordUrl,
    method: 'post',
    data: params
  })
}
// 获取VP、leader数量
export function getSbuNum(params) {
  return request({
    url: getSbuNumUrl,
    method: 'post',
    data: params
  })
}
// 修改规则用户成员列表
export function getRuleMemList(params) {
  return request({
    url: getRuleMemListUrl,
    method: 'post',
    data: params
  })
}
// 新建规则
export function newRule(params) {
  return request({
    url: newRuleUrl,
    method: 'post',
    data: params
  })
}
// 获取规则
export function getRules(params) {
  return request({
    url: getRulesUrl,
    method: 'post',
    data: params
  })
}
// 修改规则
export function editRule(params) {
  return request({
    url: editRuleUrl,
    method: 'post',
    data: params
  })
}
// 删除规则
export function delRule(params) {
  return request({
    url: delRuleUrl,
    method: 'post',
    data: params
  })
}
// 更换供应商绑定规则
export function changeRule(params) {
  return request({
    url: changeRuleUrl,
    method: 'post',
    data: params
  })
}
// 查看供应商以及分配规则
export function getShopRule(params) {
  return request({
    url: getShopRuleUrl,
    method: 'post',
    data: params
  })
}

// 查询SBU对应规则
export function getSbuRules(params) {
  return request({
    url: getSbuRulesUrl,
    method: 'post',
    data: params
  })
}

// 根据规则ID 查询规则
export function getRuleById(params) {
  return request({
    url: getRuleByIdUrl,
    method: 'post',
    data: params
  })
}

// 根据sbuid查询SBU成员列表
export function getPersons(params) {
  return request({
    url: getPersonsUrl,
    method: 'post',
    data: params
  })
}

// 页面刷新   显示SBU总数
export function sbuNum(params) {
  return request({
    url: sbuNumUrl,
    method: 'post',
    data: params
  })
}

// 页面刷新   显示SBU总数
export function sbuNewMembers(params) {
  return request({
    url: sbuNewMembersUrl,
    method: 'post',
    data: params
  })
}

// 成员管理页面   删除成员
export function deleteMembers(params) {
  return request({
    url: deleteMembersUrl,
    method: 'post',
    data: params
  })
}

// 成员管理页面   删除成员
export function setMembers(params) {
  return request({
    url: setMembersUrl,
    method: 'post',
    data: params
  })
}
