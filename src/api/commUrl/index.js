const urlDev = 'http://dev.womaoapp.com/'
const urlQa = 'http://dev.womaoapp.com/'
export const url = process.env.NODE_ENV === 'development' ? urlDev : urlQa
// 下边是每个模块组件的接口的地址
export const urlCrowd = 'fwas-crowd-admin/sys/' // 群的地址
export const urlCircle = 'fwas-circle-admin/sys/' // 圈的地址
export const urlrewardConfiguration = 'fwas-rewardConfiguration-admin/sys/' // 行为奖励配置地址
export const urlUserAction = 'fwaf-userAction-admin/sys/' // 用户行为
export const urlLabel = 'fwas-label-admin/sys/' // 标签地址
export const urlSystem = 'http://dev.oss.womaoapp.com/fwas-security-admin/sys/' // 系统管理
export const urlPay = 'fwas-pay-admin/sys/' // 账户地址
export const urlChannel = 'fwas.channel.admin/sys/' // 待定
export const urlComplaints = 'fas-complaints-admin/sys/' // 投诉
export const urlFinance = 'fwas-finance-admin/sys/' // 结算 账户
export const urlSbu = 'fwas-sbu-admin/sys/' // sbu
export const urlWishingLamp = 'fwas-wishingLamp-admin/sys/' // 许愿灯
export const urlMember = 'fwas-member-admin/sys/' // 会员管理
export const urlMessage = 'fwas.message.admin/sys/' // 消息url
export const urlPrivilege = 'fwas-privilege-admin/sys/' // 我茂特权
export const urlShare = 'fwas.share.admin/sys/' // 分享
export const urlSplitAccount = 'fwas-splitAccount-admin/sys/' // 分账
// 下边是文件上传下载的地址
export const excelUrl = url + 'fwas.message.admin/sys/fileDown/excel'  // 我茂消息发送--获取excel示例--消息管理
export const shopManageExcel = url + 'fwas-label-admin/sys/categoryLabel/categoryExportExcel'  // 类目查询中的“批量导出”-标签管理
export const uploadExcelUrl = url + 'fwas.message.admin/sys/excelInfo/importExcel'  // 消息管理中“消息发送的文件上传公用地址”--
// const userUploadExcelUrl = url + 'fwas-circle-admin/sys/circleMember/batchImportMembers'  // 批量上传
export const userUploadExcelUrl = url + 'fwas-circle-admin/sys/circleMember/batchImportMembers'  // 批量上传
export const peopleManageUploadExcelUrl = url + 'fwas-label-admin/sys/peopleLabel/treeExportExcel'  // 人标签查询中 上传
// 下边是公用的图片的地址
export const commUrlPic = url + 'fwas-crowd-admin/sys/crowdInfo/uploadFile'  // 人标签查询中 上传

