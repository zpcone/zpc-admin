import request from '@/utils/request'

//左腾本地地址
// const url = 'http://192.168.0.213/'
const url = ''


/*
 1、总览图页面
 */

// 总览图查看-1
export function getTotalLookOne(params) {
  return request({
    //  url: url + 'sys/recommendBM/findOverViewECPerson',
    url: url + 'sys1/recommendBM/findOverViewECPerson',
    method: 'post',
    data: params
  })
}

// 总览图查看-2
export function getTotalLookTwo(params) {
  return request({
    //  url: url + 'sys/recommendBM/findOverViewECCommodity',
    url: url + 'sys1/recommendBM/findOverViewECCommodity',
    method: 'post',
    data: params
  })
}

// 总览图查看-3
export function getTotalLookThree(params) {
  return request({
    //  url: url + 'sys/recommendBM/findOverViewSocialPerson',
    url: url + 'sys1/recommendBM/findOverViewSocialPerson',
    method: 'post',
    data: params
  })
}

// 总览图查看-4
export function getTotalLookFour(params) {
  return request({
    //  url: url + 'sys/recommendBM/findOverViewSocialCircle',
    url: url + 'sys1/recommendBM/findOverViewSocialCircle',
    method: 'post',
    data: params
  })
}



/*
 2、商品列表查看页面
 */

// 商品列表查看页面---页面刷新获取品牌下拉框
export function getbrand(params) {
  return request({
    //  url: url + 'sys/recommendBM/findBrand',
    url: url + 'sys1/recommendBM/findBrand',
    method: 'post',
    data: params
  })
}

// 商品列表查看页面---已、二、三级品类联动
export function brandLinkage(params) {
  return request({
    //  url: url + 'sys/recommendBM/findCategoryByParentId',
    url: url + 'sys1/recommendBM/findCategoryByParentId',
    method: 'post',
    data: params
  })
}

// 商品列表查看页面---查询列表
export function searchList(params) {
  return request({
    //  url: url + 'sys/recommendBM/findCommodityList',
    url: url + 'sys1/recommendBM/findCommodityList',
    method: 'post',
    data: params
  })
}

// 商品列表查看页面---开启和关闭推荐按钮
export function openAndClosePort(params) {
  return request({
    //  url: url + 'sys/recommendBM/findCommodityList',
    url: url + 'sys1/recommendBM/setOperate',
    method: 'post',
    data: params
  })
}


/*
3、推荐点击排行页面
 */

// 推荐点击排行--查看页面---柱状图1
export function recommendBMOne(params) {
  return request({
    //  url: url + 'sys/recommendBM/findTopCategory',
    url: url + 'sys1/recommendBM/findTopCategory',
    method: 'post',
    data: params
  })
}

// 推荐点击排行--查看页面---柱状图2
export function recommendBMTwo(params) {
  return request({
    //  url: url + 'sys/recommendBM/findTopBrand',
    url: url + 'sys1/recommendBM/findTopBrand',
    method: 'post',
    data: params
  })
}

// 推荐点击排行--查看页面---柱状图3
export function recommendBMThree(params) {
  return request({
    //  url: url + 'sys/recommendBM/findTopCommodity',
    url: url + 'sys1/recommendBM/findTopCommodity',
    method: 'post',
    data: params
  })
}


/*
4、猜你喜欢页面
 */

// 猜你喜欢页面
export function guessYouLikePort(params) {
  return request({
    //  url: url + 'sys/recommendBM/findGuessYouLike',
    url: url + 'sys1/recommendBM/findGuessYouLike',
    method: 'post',
    data: params
  })
}


/*
5、手动配置模块
 */

// 查询
export function listShow(params) {
  return request({
    //  url: url + 'sys/recommendBM/findGuessYouLike',
    url: url + 'sys1/recommendBM/findConfig',
    method: 'post',
    data: params
  })
}

// 保存
export function saveList(params) {
  return request({
    //  url: url + 'sys/recommendBM/findGuessYouLike',
    url: url + 'sys1/recommendBM/setConfig',
    method: 'post',
    data: params
  })
}

/*
6、社交许愿灯配置模块  页面刷新  回显数据
 */

// 页面渲染
export function searchLightList(params) {
  return request({
    //  url: url + 'sys/recommendBM/findGuessYouLike',
    url: url + 'sys1/recommendBM/findLampConfig',
    method: 'post',
    data: params
  })
}

// 保存按钮
export function saveLightList(params) {
  return request({
    //  url: url + 'sys/recommendBM/findGuessYouLike',
    url: url + 'sys1/recommendBM/setLampConfig',
    method: 'post',
    data: params
  })
}
