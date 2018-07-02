import request from '@/utils/request'
import { urlFinance } from '@/api/commUrl'

const url = urlFinance
// const url = 'http://qa.oss.womaoapp.com/fwas-finance-admin/sys/'
// const url = 'http://192.168.0.226:8080/fwas-finance-admin/sys/'

const searchSettlementListUrl = url + 'settlement/searchSettlementListCtr'
const approvalSettmentUrl = url + 'settlement/updateSettlementStatusCtr'

const searchAuditorListUrl = url + 'payment/searchAuditorList'
const searchPaymentListUrl = url + 'payment/searchPaymentList'
const approvalPaymentUrl = url + 'payment/updatePaymentStatusCtr'

const searchPayeeListUrl = url + '/payment/searchPayeeList'
const payForPay = url + 'payment/payForPayment'
const download = url + 'order/downloadExcel'

// 核对发票以及结算信息
// 获取列表
export function searchSettlementList(params) {
  return request({
    url: searchSettlementListUrl,
    method: 'post',
    data: params
  })
}

// 审核
export function approvalSettment(params) {
  return request({
    url: approvalSettmentUrl,
    method: 'post',
    data: params
  })
}

// 详情

// 付款单
// 审核人
export function searchAuditorList() {
  return request({
    url: searchAuditorListUrl,
    method: 'post',
    data: {}
  })
}

// 查询付款单列表
export function searchPaymentList(params) {
  return request({
    url: searchPaymentListUrl,
    method: 'post',
    data: params
  })
}

// 审核
export function approvalPayment(params) {
  return request({
    url: approvalPaymentUrl,
    method: 'post',
    data: params
  })
}

// 付款人
export function searchPayeeList() {
  return request({
    url: searchPayeeListUrl,
    method: 'post',
    data: {}
  })
}

const getOrderListUrl = url + 'order/searchOrderList'
const getOrderRecordUrl = url + 'order/searchOrderWaterList'
const changeOrderStatusUrl = url + 'order/updateOrderStatus'
const getCashAcoountUrl = url + 'order/searchFundWaterList'

// 订单管理 列表
export function getOrderList(params) {
  return request({
    url: getOrderListUrl,
    method: 'post',
    data: params
  })
}

// 订单流水流水
export function getOrderRecord(params) {
  return request({
    url: getOrderRecordUrl,
    method: 'post',
    data: params
  })
}

// 修改订单状态
export function changeOrderStatus(params) {
  return request({
    url: changeOrderStatusUrl,
    method: 'post',
    data: params
  })
}

// 资金流水
export function getCashAcoount(params) {
  return request({
    url: getCashAcoountUrl,
    method: 'post',
    data: params
  })
}

// 下载资金流水查询及对账
export function downloadExcel(params) {
  return request({
    url: download,
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}

// 立即支付
export function payForPayment(params) {
  return request({
    url: payForPay,
    method: 'post',
    data: params
  })
}
