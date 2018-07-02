import request from '@/utils/request'
import { urlMember } from '@/api/commUrl'

const url = urlMember + 'member/'
const urlC = urlMember + 'member/'
const urlZ = urlMember + 'loginLog/'
// const url = 'http://chai.womaoapp.com:8080/fwas-member-admin/sys/member/'
// const urlC = 'http://chai.womaoapp.com:8080/fwas-member-admin/sys/member/'
// const urlZ = 'http://chai.womaoapp.com:8080/fwas-member-admin/sys/loginLog/'
// const url = 'http://zhang.womaoapp.com:8080/fwas-member-admin/sys/member/'
// const urlC = 'http://zhang.womaoapp.com:8080/fwas-member-admin/sys/member/'
// const urlZ = 'http://zhang.womaoapp.com:8080/fwas-member-admin/sys/loginLog/'
// 朱学禹====社交的接口====================
// 上传excel文件
export function uploadExcel(params) {
  return request({
    url: url + 'importExcel',
    method: 'post',
    data: params
  })
}

// 社交--会员管理列表页
export function getSocialMember(params) {
  return request({
    url: url + 'getSocialBackGroundMemberInfo',
    method: 'post',
    data: params
  })
}

// 社交--添加会员-添加用户功能
export function addSocialMember(params) {
  return request({
    url: url + 'addSocialMember',
    method: 'post',
    data: params
  })
}

// 删除用户--社交
export function deleteMemberSocial(params) {
  return request({
    url: url + 'socialDeleteMember',
    method: 'post',
    data: params
  })
}

// 删除用户--电商
export function deleteMember(params) {
  return request({
    url: url + 'mallDeleteMember',
    method: 'post',
    data: params
  })
}

// 封号--电商-公用接口
export function banMember(params) {
  return request({
    url: url + 'mallBanMember',
    method: 'post',
    data: params
  })
}

// 封号--电商-
export function banMemberSocial(params) {
  return request({
    url: url + 'socialBanMember',
    method: 'post',
    data: params
  })
}

// 社交 会员封禁列表查询
export function getSocialBanMember(params) {
  return request({
    url: url + 'getSocialMemberBanInfoList',
    method: 'post',
    data: params
  })
}

// 解封--公用接口-社交
export function unBanMemberSocial(params) {
  return request({
    url: url + 'socialUnBanMember',
    method: 'post',
    data: params
  })
}
// 解封--公用接口-电商
export function unBanMember(params) {
  return request({
    url: url + 'mallUnBanMember',
    method: 'post',
    data: params
  })
}

// 重置密码---电商--
export function resetMemberPassword(params) {
  return request({
    url: url + 'resetMallMemberPassword',
    method: 'post',
    data: params
  })
}

// 重置密码---社交--
export function resetMemberSocialPassword(params) {
  return request({
    url: url + 'resetSocialMemberPassword',
    method: 'post',
    data: params
  })
}
//   ======朱学禹==电商 接口================================================
// 电商---会员管理列表页
export function getMallMember(params) {
  return request({
    url: url + 'getMallBackGroundMemberInfo',
    method: 'post',
    data: params
  })
}
// 电商--添加会员
export function addMallMember(params) {
  return request({
    url: url + 'addMallMember',
    method: 'post',
    data: params
  })
}

// 电商 会员封禁列表查询
export function getMallBanMember(params) {
  return request({
    url: url + 'getMallMemberBanInfoList',
    method: 'post',
    data: params
  })
}
/**
 * 下边是电商的接口======柴亚春
 *
 * @export
 * @param {any} params
 * @returns
 */
// 基本信息（电商）
export function getMallBasicInfo(params) {
  return request({
    url: urlC + 'mallMemberBaseInfo',
    method: 'post',
    data: params
  })
}

// 1.1.1.4. 互动信息--电商
export function mallInteractionInfo(params) {
  return request({
    url: urlC + 'mallMemberInteractiveInformation',
    method: 'post',
    data: params
  })
}

// 1.1.1.6. 其他属性-电商
export function mallOtherAttr(params) {
  return request({
    url: urlC + 'mallMemberOtherAttributes',
    method: 'post',
    data: params
  })
}

// 1.1.1.6. 全部好友（电商）
export function findAllMallFriends(params) {
  return request({
    url: urlC + 'findAllMallFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.6. 一度好友（电商）
export function searchOnePointMallFriends(params) {
  return request({
    url: urlC + 'searchOnePointMallFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.6. 二度好友（电商）
export function searchTwoPointMallFriends(params) {
  return request({
    url: urlC + 'searchTwoPointMallFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.6. 自建分组（电商）
export function selfMallCreatGroup(params) {
  return request({
    url: urlC + 'searchMallGroup',
    method: 'post',
    data: params
  })
}

// 1.1.1.6.  绿名单好友（电商）
export function searchMallGreenFried(params) {
  return request({
    url: urlC + 'searchMallGreenFried',
    method: 'post',
    data: params
  })
}

// 1.1.1.6.  我的分组列表（电商）
export function mallMemberGroupList(params) {
  return request({
    url: urlC + 'mallMemberGroupList',
    method: 'post',
    data: params
  })
}

/**
 * 下边是柴亚春的社交的接口
 *
 * @export
 * @param {any} params
 * @returns
 */
// 基本信息（社交）
export function getSocialBasicInfo(params) {
  return request({
    url: urlC + 'socialMemberBaseInfo',
    method: 'post',
    data: params
  })
}
// 1.1.1.3. 互动信息--（社交）
export function socialInteractionInfo(params) {
  return request({
    url: urlC + 'socialMemberInteractiveInformation',
    method: 'post',
    data: params
  })
}
// 1.1.1.5. 其他属性-社交
export function socialOtherAttr(params) {
  return request({
    url: urlC + 'socailMemberOtherAttributes',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 全部好友-社交
export function findAllSocialFriends(params) {
  return request({
    url: urlC + 'findAllSocialFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 一度好友-社交
export function socialFindOneFriend(params) {
  return request({
    url: urlC + 'searchOnePointSocialFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 二度好友-社交
export function socialFindTwoFriend(params) {
  return request({
    url: urlC + 'searchTwoPointSocialFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 自建分组-社交
export function socialearchSelfGroup(params) {
  return request({
    url: urlC + 'searchSelfBuiltGroup',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 绿名单好友-社交
export function greenSocialFriend(params) {
  return request({
    url: urlC + 'searchGreenSocialFriends',
    method: 'post',
    data: params
  })
}

// 1.1.1.5. 我的分组列表-社交
export function socialGroupList(params) {
  return request({
    url: urlC + 'socailMemberGroupList',
    method: 'post',
    data: params
  })
}

// 个人简历-社交
export function getResume(params) {
  return request({
    url: urlC + 'socailMemberGroupList',
    method: 'post',
    data: params
  })
}

// 登录日志--社交
export function loginLog(params) {
  return request({
    url: urlZ + 'socialList',
    method: 'post',
    data: params
  })
}

// 登录日志--电商
export function loginLogMall(params) {
  return request({
    url: urlZ + 'mallList',
    method: 'post',
    data: params
  })
}
