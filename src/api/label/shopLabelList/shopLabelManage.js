import request from '@/utils/request'
import { urlLabel } from '@/api/commUrl'
// 商品标签管理--郭雪刚--更改url====
const url = urlLabel + 'categoryLabel/'
// const url = 'http://192.168.1.149:8080/fwas-label-admin/sys/categoryLabel/'
// 查询分类下拉列表
export function shopClassOption(params) {
  return request({
    url: url + 'queryCategory',
    method: 'post',
    data: params
  })
}

// 查询类目列表
export function shopClassList(params) {
  return request({
    url: url + 'queryCategoryDetail',
    method: 'post',
    data: params
  })
}

// 商品标签批量导出
export function shopLabelBatchExport(params) {
  return request({
    url: url + 'categoryExportExcel',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}

// 设置滤镜
export function setToFiletr(params) {
  return request({
    url: url + 'setShowFlag',
    method: 'post',
    data: params
  })
}
// 商品列表sku查询
export function shopListSku(params) {
  return request({
    url: url + 'querysku',
    method: 'post',
    data: params
  })
}

// 类目查询新加接口
// http://192.168.1.149:8080/fwas.label.admin/categoryLabel/queryPropersDetail
export function getListSearch(params) {
  return request({
    url: url + 'queryPropersDetail',
    method: 'post',
    data: params
  })
}

var urlL = 'fwas-label-admin/sys/scenarioLabel/'
// 李义广接口  场景标签页面========
// 省市县三级联动
export function getProvinceOption(params) {
  return request({
    url: urlL + 'cityList',
    method: 'post',
    data: params
  })
}

// 查询二级标签列表
export function getTableList(params) {
  return request({
    url: urlL + 'list',
    method: 'post',
    data: params
  })
}

// 查询一级场景签列表
export function getOneList(params) {
  return request({
    url: urlL + 'labelType',
    method: 'post',
    data: params
  })
}

// 修改二级场景标签
export function updateTwoLabel(params) {
  return request({
    url: urlL + 'update',
    method: 'post',
    data: params
  })
}
