import request from '@/utils/request'
import { urlPay } from '@/api/commUrl'
// const url = 'http://192.168.0.224/fwas-pay-admin/sys/'
// const url = 'http://qa.oss.womaoapp.com/fwas-pay-admin/sys/'
const url = urlPay

const queryAccountUrl = url + 'account/queryAccount'
const searchAccountsList = url + 'account/searchAccounts'
const changeAccountStatusUrl = url + 'account/updateAccount'
const saveProfitBeansUrl = url + 'profitBeans/serial/save'
const saveAccrueBeansUrl = url + 'accrueBeans/serial/save'
const saveAccrueCoinsUrl = url + 'profitCoins/serial/save'
const getProfitBeanRecordUrl = url + 'profitBeans/serial/searchSerials'
const getAccrueBeanRecordUrl = url + 'accrueBeans/serial/searchSerials'
const getProfitCoinRecordUrl = url + 'profitCoins/serial/searchSerials'
const searchRecord = url + 'operRecord/searchOperRecord'
const searchCircle = url + 'accountCircle/searchCircleAccounts'
const updateCircle = url + 'accountCircle/updateAccountCircle'
const searchSBU = url + 'accountSBU/searchSBUAccounts'
const updateSBU = url + 'accountSBU/updateAccountSBU'
const searchSupplier = url + 'accountSupplier/searchSupplierAccounts'
const updateSupplier = url + 'accountSupplier/updateAccountSupplier'
const searchPlatform = url + 'accountPlatform/searchPlatformAccounts'
const updatePlatform = url + 'accountPlatform/updateAccountPlatform'
const searchGoods = url + 'accrueBeans/serial/searchGoodsInfo'

// 查询主体账户
export function queryAccount(params) {
  return request({
    url: queryAccountUrl,
    method: 'post',
    data: params
  })
}

// 查询主体账户列表
export function searchAccounts(params) {
  return request({
    url: searchAccountsList,
    method: 'post',
    data: params
  })
}
// 更新账户状态 禁用/解禁
export function changeAccountStatus(params) {
  return request({
    url: changeAccountStatusUrl,
    method: 'post',
    data: params
  })
}

// 查询供应商列表
export function searchSupplierAccounts(params) {
  return request({
    url: searchSupplier,
    method: 'post',
    data: params
  })
}

// 更新供应商状态
export function updateAccountSupplier(params) {
  return request({
    url: updateSupplier,
    method: 'post',
    data: params
  })
}

// 查询SBU账户
export function searchSBUAccounts(params) {
  return request({
    url: searchSBU,
    method: 'post',
    data: params
  })
}

// 更新SBU账户状态
export function updateAccountSBU(params) {
  return request({
    url: updateSBU,
    method: 'post',
    data: params
  })
}

// 查询平台账户
export function searchPlatformAccounts(params) {
  return request({
    url: searchPlatform,
    method: 'post',
    data: params
  })
}

// 更新平台账户状态
export function updateAccountPlatform(params) {
  return request({
    url: updatePlatform,
    method: 'post',
    data: params
  })
}
// 冻结/解冻 盈豆
// export function changeProfitBean(params) {
//   return request({
//     url: changeProfitBeanUrl,
//     method: 'post',
//     data: params
//   })
// }

// 冻结/解冻 生豆
// export function changeAccrueBean(params) {
//   return request({
//     url: changeAccrueBeanUrl,
//     method: 'post',
//     data: params
//   })
// }

// 冻结/解冻 盈币
// export function changeAccrueCoin(params) {
//   return request({
//     url: changeAccrueCoinUrl,
//     method: 'post',
//     data: params
//   })
// }

// 修改盈豆额
export function saveProfitBeans(params) {
  return request({
    url: saveProfitBeansUrl,
    method: 'post',
    data: params
  })
}

// 修改生豆额
export function saveAccrueBeans(params) {
  return request({
    url: saveAccrueBeansUrl,
    method: 'post',
    data: params
  })
}

// 修改盈币额
saveAccrueCoinsUrl
export function saveAccrueCoins(params) {
  return request({
    url: saveAccrueCoinsUrl,
    method: 'post',
    data: params
  })
}

// 查询 盈豆 流水
export function getProfitBeanRecord(params) {
  return request({
    url: getProfitBeanRecordUrl,
    method: 'post',
    data: params
  })
}

// 查询 生豆 流水
export function getAccrueBeanRecord(params) {
  return request({
    url: getAccrueBeanRecordUrl,
    method: 'post',
    data: params
  })
}

// 查询 盈币 流水
export function getProfitCoinRecord(params) {
  return request({
    url: getProfitCoinRecordUrl,
    method: 'post',
    data: params
  })
}

// 查找 账户 流水
export function searchOperRecord(params) {
  return request({
    url: searchRecord,
    method: 'post',
    data: params
  })
}

// 查询圈子列表
export function searchCircleAccounts(params) {
  return request({
    url: searchCircle,
    method: 'post',
    data: params
  })
}

// 圈子禁用/解禁
export function updateAccountCircle(params) {
  return request({
    url: updateCircle,
    method: 'post',
    data: params
  })
}

// 查看商品信息
export function searchGoodsInfo(params) {
  return request({
    url: searchGoods,
    method: 'post',
    data: params
  })
}

