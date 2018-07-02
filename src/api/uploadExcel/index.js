/*
* 此文件已经废弃  地址已经引用到 commUrl文件夹下边的index.js文件中
*/

import { url } from '@/api/commUrl'
// 页面内部上传下载模板地址
const excelUrl = url + 'fwas.message.admin/sys/fileDown/excel'  // 我茂消息发送--获取excel示例--消息管理
const shopManageExcel = url + 'fwas-label-admin/sys/categoryLabel/categoryExportExcel'  // 类目查询中的“批量导出”-标签管理
const uploadExcelUrl = url + 'fwas.message.admin/sys/excelInfo/importExcel'  // 消息管理中“消息发送的文件上传公用地址”--消息管理
// const userUploadExcelUrl = url + 'fwas-circle-admin/sys/circleMember/batchImportMembers'  // 批量上传
const userUploadExcelUrl = 'fwas-circle-admin/sys/circleMember/batchImportMembers'  // 批量上传
const peopleManageUploadExcelUrl = url + 'fwas-label-admin/sys/peopleLabel/treeExportExcel'  // 人标签查询中 上传
// 下边是接口地址

export { excelUrl, shopManageExcel, uploadExcelUrl, userUploadExcelUrl, peopleManageUploadExcelUrl }
