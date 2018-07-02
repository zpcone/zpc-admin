import request from '@/utils/request'
import { urlSplitAccount } from '@/api/commUrl'

// 商品分账
const url = urlSplitAccount

const getSpiltListUrl = url + 'accountRule/searchAccountRule'
const ruleSwitchUrl = url + 'accountRule/ruleSwitch'
const searchSupplierUrl = url + 'accountRange/searchSupplier'
const searchProductUrl = url + 'accountRange/searchGoods'
const addRuleUrl = url + 'accountRule/rule/add'
const editRuleUrl = url + 'accountRule/rule/modify'
const getRolesUrl = url + 'accountRule/roles'
const sbuAccountUrl = url + 'accountRule/sbuAccount'
const beanAccountUrl = url + 'accountRule/beanAccount'
const checkRuleNameUrl = url + 'accountRule/checkRuleName'
const checkProductUrl = url + 'accountRange/checkObject'
const getDetailUrl = url + 'accountRule/findAccountRuleDetail'
const searchMatchRange = url + 'accountRange/searchMatchRangeList'
const checkMatchRange = url + 'accountRule/checkMatchRangeEnable'

// 分账列表
export function getSpiltList(params) {
  return request({
    url: getSpiltListUrl,
    method: 'post',
    data: params
  })
}

// 停用 启用
export function ruleSwitch(params) {
  return request({
    url: ruleSwitchUrl,
    method: 'post',
    data: params
  })
}

// 匹配供应商查询
export function searchSupplier(params) {
  return request({
    url: searchSupplierUrl,
    method: 'post',
    data: params
  })
}

// 匹配商品查询
export function searchProduct(params) {
  return request({
    url: searchProductUrl,
    method: 'post',
    data: params
  })
}

// 创建规则
export function addRule(params) {
  return request({
    url: addRuleUrl,
    method: 'post',
    data: params
  })
}

// 编辑规则
export function editRule(params) {
  return request({
    url: editRuleUrl,
    method: 'post',
    data: params
  })
}

// 角色查询
export function getRoles(params) {
  return request({
    url: getRolesUrl,
    method: 'post',
    data: params
  })
}

// 查询用户（sbu）
export function sbuAccount(params) {
  return request({
    url: sbuAccountUrl,
    method: 'post',
    data: params
  })
}

// 查询用户（sbu除外）
export function beanAccount(params) {
  return request({
    url: beanAccountUrl,
    method: 'post',
    data: params
  })
}

// 检验规则名称
export function checkRuleName(params) {
  return request({
    url: checkRuleNameUrl,
    method: 'post',
    data: params
  })
}

// 查询规则详情
export function getDetail(params) {
  return request({
    url: getDetailUrl,
    method: 'post',
    data: params
  })
}

// 检验供应商/商品
export function checkProduct(params) {
  return request({
    url: checkProductUrl,
    method: 'post',
    data: params
  })
}

// 根据规则id与类型查询匹配供应商/商品列表
export function searchMatchRangeList(params) {
  return request({
    url: searchMatchRange,
    method: 'post',
    data: params
  })
}

// 启用全部商品规则校验
export function checkMatchRangeEnable(params) {
  return request({
    url: checkMatchRange,
    method: 'post',
    data: params
  })
}
