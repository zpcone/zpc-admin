import request from '@/utils/request'
import { urlFinance } from '@/api/commUrl'
const url = urlFinance
// const url = 'http://qa.oss.womaoapp.com/fwas-finance-admin/sys/'

const findSettlement = url + 'settlement/findSettlementRelation'
const findOrder = url + 'settlement/findOrderId'
const openInvoice = url + 'settlement/openInvoiceInfo'
const findInvoice = url + 'settlement/findInvoiceRes'

// 查询结算单关系
export function findSettlementRelationApi(params) {
  return request({
    url: findSettlement,
    method: 'post',
    data: params
  })
}

// 查询结算单对应主订单信息
export function findOrderIdApi(params) {
  return request({
    url: findOrder,
    method: 'post',
    data: params
  })
}

// 查询开票信息
export function openInvoiceInfoApi(params) {
  return request({
    url: openInvoice,
    method: 'post',
    data: params
  })
}

// 查询开票信息
export function findInvoiceResApi(params) {
  return request({
    url: findInvoice,
    method: 'post',
    data: params
  })
}
