import request from '@/utils/request'
import { urlCircle, urlCrowd } from '@/api/commUrl'
// 圈组基本信息管理页面接口----开发人：郝东强
// const url = 'http://192.168.0.212:8089/fwas-crowd-admin/crowdNoticeRest/'
// const searchUrl = ''
// const frozenUrl = ''
// const unfrozenUrl = ''
// const fissionUrl = ''
// const relateUrl = ''
// const detailUrl = ''
// const getpicsUrl = ''
// const editSaveUrl = ''
// 下边是郭春杰的接口===================================
// const urlG = 'http://192.168.1.40:8080/fwas-circle-admin/sys/circleInfo/'
// const urlM = 'http://192.168.1.40:8080/fwas-circle-admin/sys/circleMember/'
// const urlL = 'http://192.168.1.40:8080/fwas-circle-admin/sys/filterLable/'
// const urlT = 'http://192.168.1.40:8080/fwas-circle-admin/sys/memberToCircle/'
// const urlPic = 'http://192.168.1.40:8080/fwas-circle-admin/sys/circleInfo/uploadCircleFile'
const urlPic = urlCrowd + 'crowdInfo/uploadFile'
const urlG = urlCircle + 'circleInfo/'
const urlM = urlCircle + 'circleMember/'
const urlL = urlCircle + 'filterLable/'
const urlT = urlCircle + 'memberToCircle/'
// 1. 查询圈主转让信息列表排序
export function getCircleInfoManage(params) {
  return request({
    url: urlG + 'getCircleAndGroupPageList',
    method: 'post',
    data: params
  })
}
// POST /circleMember/getMemberBasicInfo
// 2.查询圈子的基本信息
export function getCircleBasicManage(params) {
  return request({
    url: urlG + 'getCircleBasicInfo',
    method: 'post',
    data: params
  })
}

// 2.查询圈成员列表
export function getCircleMember(params) {
  return request({
    url: urlM + 'queryCircleMemberList',
    method: 'post',
    data: params
  })
}

// 添加圈成员
export function addCircleMember(params) {
  return request({
    url: urlM + 'addCircleMember',
    method: 'post',
    data: params
  })
}

// 搜索成员-
export function searchMember(params) {
  return request({
    url: urlM + 'getMemberBasicInfo',
    method: 'post',
    data: params
  })
}

// 踢出圈成员
export function kickOutMember(params) {
  return request({
    url: urlM + 'kickedOutCircleMembers',
    method: 'post',
    data: params
  })
}

// 加入黑名单
export function joinBlack(params) {
  return request({
    url: urlM + 'joinMemberBlack',
    method: 'post',
    data: params
  })
}

// 3.查询圈成员详情信息
export function getCircleDetail(params) {
  return request({
    url: urlM + 'lookCircleMemberInfo',
    method: 'post',
    data: params
  })
}

// 圈动态/circleInfo/queryCircleDynamicList
export function circleCondition(params) {
  return request({
    url: urlG + 'queryCircleDynamicList',
    method: 'post',
    data: params
  })
}

// 1.查询会员自定义滤镜标签
export function searchMemberDefineFilterLable(params) {
  return request({
    url: urlL + 'getMemberDefineFilterLableList',
    method: 'post',
    data: params
  })
}

// 会员自定义滤镜标签置顶
export function memberDefineFilterLableTop(params) {
  return request({
    url: urlL + 'setMemberDefineFilterLableTop',
    method: 'post',
    data: params
  })
}

// 获得系统自定义滤镜标签列表
export function getLabelSysCuom(params) {
  return request({
    url: urlL + 'getCircleSystemFilterList',
    method: 'post',
    data: params
  })
}

// 会员对圈的信息管理
export function memberToCircleManage(params) {
  return request({
    url: urlT + 'queryMemberToCircleMsgList',
    method: 'post',
    data: params
  })
}

// 1.圈内已有滤镜圈置顶
export function searchHaveFilterTop(params) {
  return request({
    url: urlL + 'setFilterCrowdTop',
    method: 'post',
    data: params
  })
}

// 1.圈内已有滤镜圈
export function searchHaveFilter(params) {
  return request({
    url: urlL + 'queryCircleFilterCrowdList',
    method: 'post',
    data: params
  })
}

// 3.基于商品创建圈子
export function getBaseOnShopCreateCir(params) {
  return request({
    url: urlG + 'createCircleBaseGoods',
    method: 'post',
    data: params
  })
}

// 4.基于店铺创建圈子
export function getBaseOnStoreCreateCir(params) {
  return request({
    url: urlG + 'createCircleBaseGoods',
    method: 'post',
    data: params
  })
}

// 5.基于场景创建圈子
export function getBaseOnSenceCreateCir(params) {
  return request({
    url: urlG + 'createCircleBaseScene',
    method: 'post',
    data: params
  })
}

// 6.基于同路人创建圈子
export function getBaseOnCommPeopleCreateCir(params) {
  return request({
    url: urlG + 'saveFellowTravellerCircle',
    method: 'post',
    data: params
  })
}

// 7.自定义创建圈
export function customCreateCircle(params) {
  return request({
    url: urlG + 'customCreateCircle',
    method: 'post',
    data: params
  })
}

// 上传图片
export function uploadcircle(params) {
  return request({
    url: urlPic,
    method: 'post',
    data: params
  })
}

// .圈标签
export function getCircleLabel(params) {
  return request({
    url: urlG + 'getCircleLableListByName',
    method: 'post',
    data: params
  })
}

// 圈类型
export function getLabelType(params) {
  return request({
    url: urlG + 'getCircleTypeListByName',
    method: 'post',
    data: params
  })
}

// 8.基于滤镜创建圈
export function createFilterCircle(params) {
  return request({
    url: urlG + 'createFilterCircle',
    method: 'post',
    data: params
  })
}

// 9.冻结圈
export function updateCircleFreeze(params) {
  return request({
    url: urlG + 'updateCircleFreeze',
    method: 'post',
    data: params
  })
}

// 10.解冻圈
export function updateUnCircleFreeze(params) {
  return request({
    url: urlG + 'updateCircleUnFreeze',
    method: 'post',
    data: params
  })
}
// 11.水平手动裂变圈
export function levelHandChange(params) {
  return request({
    url: urlG + 'parallelFissionCircle',
    method: 'post',
    data: params
  })
}
// 12.纵向裂变-列表
export function getVerticalChangeList(params) {
  return request({
    url: urlG + 'searchVerticalFissionToCircleList',
    method: 'post',
    data: params
  })
}
// 12.纵向裂变-弹框内-接口
export function verticalChange(params) {
  return request({
    url: urlG + 'verticalFissionCircle',
    method: 'post',
    data: params
  })
}
// 13圈组信息管理-创建方式
export function circleCreatFunc(params) {
  return request({
    url: urlG + 'getCircleCreateType',
    method: 'post',
    data: params
  })
}
// 14 关联商品列表
export function relevanceShopList(params) {
  return request({
    url: urlG + 'toAssociatedProductList',
    method: 'post',
    data: params
  })
}
// 15 编辑圈成员
export function editCircleMember(params) {
  return request({
    url: urlM + 'editCircleMemberInfo',
    method: 'post',
    data: params
  })
}
// 获取黑名单列表
export function getBlackList(params) {
  return request({
    url: urlM + 'queryBlackMemberList',
    method: 'post',
    data: params
  })
}
// 历史角色查看
export function historyLook(params) {
  return request({
    url: urlT + 'queryCircleMemberHistory',
    method: 'post',
    data: params
  })
}
// 群信息管理---- 编辑详情里面的修改头像
export function changePic(params) {
  return request({
    url: urlPic,
    method: 'post',
    data: params
  })
}

// 圈组信息  关联商品弹框里的  商品关联 2018.6.6 xiu
export function saveProduct(params) {
  return request({
    url: urlG + 'associatedProduct',
    method: 'post',
    data: params
  })
}

// 圈组信息  关联商品弹框里的  取消商品关联   2018.6.6 xiu
export function cancelProduct(params) {
  return request({
    url: urlG + 'cancelAssociatedProduct',
    method: 'post',
    data: params
  })
}

// 圈组信息   详情  保存按钮   2018.6.7 xiu
export function circleDetailSave(params) {
  return request({
    url: urlG + 'updateCircleInfoById',
    method: 'post',
    data: params
  })
}

// 批量导入用户
export function daoruUserExcel(params) {
  return request({
    url: urlM + 'batchImportMembers',
    method: 'post',
    data: params
  })
}
