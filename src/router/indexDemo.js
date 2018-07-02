import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import ThreeLayout from '../views/three'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
import { navigationMenu } from '../api/system/dept' // 引用接口文件
Vue.use(Router)

/* Layout */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// function setLoca() {
//   navigationMenu({})
//     .then(res => {
//       console.log('请求')
//       // localStorage.setItem('menu', JSON.stringify(res.data))
//     })
//   // alert('niaho ')
//   // localStorage.setItem('menu', '你好')
//   // console.log(localStorage.getItem('menu'))
// }
// setLoca()
// 最新的router文件
export const constantRouterMap = [
  {
    path: '/login',
    redirect: '/dashboard',
    component: _import('login/index'),
    hidden: true
  },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    meta: { title: '首页', icon: '' },
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        meta: { title: '首页', icon: '' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin',
    name: 'system',
    meta: { title: '系统管理', icon: 'xitong' },
    children: [
      {
        path: 'admin',
        name: 'systemAdmin',
        component: _import('system/admin/index'),
        meta: { title: '管理员管理', icon: 'guanliyuan' }
      },
      {
        path: 'admin/add',
        name: 'systemAdminAdd',
        hidden: true,
        component: _import('system/admin/add'),
        meta: { title: '新增管理员', icon: '' }
      },
      {
        path: 'admin/update/:userId',
        name: 'systemAdminUpdate',
        hidden: true,
        component: _import('system/admin/update'),
        meta: { title: '管理员修改', icon: '' }
      },
      {
        path: 'dept',
        name: 'systemDept',
        component: _import('system/dept/index'),
        meta: { title: '部门管理', icon: 'bumen' }
      },
      {
        path: 'dept/add',
        name: 'systemDeptAdd',
        hidden: true,
        component: _import('system/dept/add'),
        meta: { title: '新增部门', icon: '' }
      },
      {
        path: 'dept/edit',
        name: 'systemDeptEdit',
        hidden: true,
        component: _import('system/dept/edit'),
        meta: { title: '修改部门', icon: '' }
      },
      {
        path: 'role',
        name: 'systemRole',
        component: _import('system/role/index'),
        meta: { title: '角色管理', icon: 'juese' }
      },
      {
        path: 'role/add',
        name: 'systemRoleAdd',
        hidden: true,
        component: _import('system/role/add'),
        meta: { title: '新增角色', icon: '' }
      },
      {
        path: 'role/edit',
        name: 'systemRoleEdit',
        hidden: true,
        component: _import('system/role/edit'),
        meta: { title: '编辑角色', icon: '' }
      },
      {
        path: 'menu',
        name: 'systemMenu',
        component: _import('system/menu/index'),
        meta: { title: '菜单管理', icon: 'caidan' }
      },
      {
        path: 'menu/add',
        name: 'systemMenuAdd',
        hidden: true,
        component: _import('system/menu/add'),
        meta: { title: '菜单添加', icon: 'caidan' }
      },
      {
        path: 'menu/edit',
        name: 'systemMenuEdit',
        hidden: true,
        component: _import('system/menu/edit'),
        meta: { title: '菜单编辑', icon: 'caidan' }
      },
      {
        path: 'sql',
        name: 'systemSQL',
        hidden: true,
        component: _import('system/sql/index'),
        meta: { title: 'SQL监控', icon: 'sql' }
      },
      {
        path: 'log',
        name: 'systemLog',
        hidden: true,
        component: _import('system/log/index'),
        meta: { title: '系统日志', icon: 'rizhi' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'account',
    meta: { title: '账户系统', icon: 'zhanghu' },
    children: [
      {
        path: 'index',
        name: 'accountManage',
        component: _import('account/index'),
        meta: { title: '账户管理', icon: 'zhanghuguanli' }
      },
      {
        path: 'detail',
        name: 'accountDetail',
        // hidden: true,
        component: _import('account/detail'),
        meta: { title: '账户详情', icon: '' }
      },
      {
        path: 'stream',
        name: 'accountStream',
        // hidden: true,
        component: _import('account/stream'),
        meta: { title: '账户流水', icon: '' }
      }
    ]
  },
  {
    path: '/settlement',
    component: Layout,
    name: 'settlement',
    meta: { title: '结算管理', icon: 'jiesuan' },
    children: [
      {
        path: 'back',
        name: 'settlementBack',
        component: ThreeLayout,
        meta: { title: '管理后台', icon: 'xitong' },
        children: [
          {
            path: 'order',
            name: 'settlementOrder',
            component: _import('settlement/order'),
            meta: { title: '订单管理', icon: 'dingdan' }
          },
          {
            path: 'orderglide',
            name: 'settlementOrderGlide',
            component: _import('settlement/orderGlide'),
            hidden: true,
            meta: { title: '订单流水', icon: 'zijin' }
          },
          {
            path: 'cashsearch',
            name: 'settlementCashSearch',
            component: _import('settlement/cashSearch'),
            meta: { title: '资金流水查询以及对账', icon: 'zijinliushui' }
          },
          {
            path: 'cashcount',
            name: 'settlementCashCount',
            component: _import('settlement/cashCount'),
            meta: { title: '资金统计', icon: 'zijintongji' }
          }
        ]
      },
      {
        path: 'finance',
        name: 'settlementFinance',
        component: ThreeLayout,
        meta: { title: '结算', icon: 'jiesuan' },
        children: [
          {
            path: 'bill',
            name: 'settlementBill',
            component: _import('settlement/bill'),
            meta: { title: '财务-核对发票及结算信息', icon: 'fapiao' }
          },
          {
            path: 'paybill',
            name: 'settlementPayBill',
            component: _import('settlement/payBill'),
            meta: { title: '财务-审核付款单', icon: 'fukuandan' }
          },
          {
            path: 'pay',
            name: 'settlementPay',
            component: _import('settlement/pay'),
            meta: { title: '财务-支付', icon: 'zhifu' }
          },
          {
            path: 'billsearch',
            name: 'settlementBillSearch',
            component: _import('settlement/billSearch'),
            meta: { title: '财务-查询付款单', icon: 'zhifu1' }
          }
        ]
      }
    ]
  },
  {
    path: '/split',
    component: Layout,
    redirect: '/split/index',
    name: 'split',
    meta: { title: '分账管理', icon: 'qudao' },
    children: [
      {
        path: 'index',
        name: 'splitmanage',
        component: _import('split/index'),
        meta: { title: '分账管理', icon: 'qudaoguanli' }
      },
      {
        path: 'new',
        name: 'splitmanageNew',
        component: _import('split/new'),
        hidden: true,
        meta: { title: '新增规则', icon: 'qudaoguanli' }
      },
      {
        path: 'view',
        name: 'splitmanageView',
        component: _import('split/view'),
        hidden: true,
        meta: { title: '查看规则', icon: 'qudaoguanli' }
      }
    ]
  },
  {
    path: '/sbu',
    component: Layout,
    redirect: '/sbu/index',
    name: 'sbu',
    meta: { title: 'SBU管理', icon: 'qudao' },
    children: [
      {
        path: 'vp',
        name: 'sbumanageVp',
        component: _import('sbu/vp'),
        meta: { title: 'SBU VP', icon: 'qudaoguanli' }
      },
      {
        path: 'leader',
        name: 'sbumanageLeader',
        component: _import('sbu/leader'),
        meta: { title: 'SBU Leader', icon: 'qudaoguanli' }
      },
      {
        path: 'new',
        name: 'sbumanageNew',
        component: _import('sbu/new'),
        hidden: true,
        meta: { title: '新建SBU', icon: 'qudaoguanli' }
      },
      {
        path: 'member',
        name: 'sbumanageMember',
        component: _import('sbu/member'),
        hidden: true,
        meta: { title: '成员管理', icon: 'qudaoguanli' }
      },
      {
        path: 'assign',
        name: 'sbumanageAssign',
        component: _import('sbu/assign'),
        hidden: true,
        meta: { title: '立即分配收益', icon: 'qudaoguanli' }
      },
      {
        path: 'detail',
        name: 'sbumanageAssignDetail',
        component: _import('sbu/assignDetail'),
        hidden: true,
        meta: { title: '查看分配记录', icon: 'qudaoguanli' }
      },
      {
        path: 'prolist',
        name: 'sbumanageProductList',
        component: _import('sbu/proList'),
        hidden: true,
        meta: { title: '查询供应商及商品信息', icon: 'qudaoguanli' }
      },
      {
        path: 'ratio',
        name: 'sbumanageRatio',
        component: _import('sbu/ratio'),
        hidden: true,
        meta: { title: '针对供应商调整分账比例', icon: 'qudaoguanli' }
      },
      {
        path: 'rule',
        name: 'sbumanageRule',
        component: _import('sbu/rule'),
        hidden: true,
        meta: { title: '规则管理', icon: 'qudaoguanli' }
      },
      {
        path: 'prodetail',
        name: 'sbumanageProductDetail',
        component: _import('sbu/proDetail'),
        hidden: true,
        meta: { title: '查看商品信息', icon: 'qudaoguanli' }
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/index',
    name: 'channel',
    hidden: true,
    meta: { title: '渠道管理', icon: 'qudao' },
    children: [
      {
        path: 'index',
        name: 'channelmanage',
        component: _import('channel/index'),
        meta: { title: '渠道管理', icon: 'qudaoguanli' }
      },
      {
        path: 'create',
        component: _import('channel/create'),
        name: 'channelcreate',
        hidden: true,
        meta: { title: '创建渠道', icon: '' }
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    name: 'group',
    meta: { title: '群管理', icon: 'qun' },
    children: [
      {
        path: 'manage',
        component: ThreeLayout,
        name: 'groupManage',
        meta: { title: '群组管理', icon: 'fenzu' },
        children: [
          {
            path: 'info',
            name: 'groupInfoManage',
            component: _import('group/groupManage/info'),
            meta: { title: '群信息管理', icon: 'xinxi' }
          },
          {
            path: 'info/detail',
            name: 'groupInfoDetail',
            hidden: true,
            component: _import('group/groupManage/infoDetail'),
            meta: { title: '群信息详情', icon: '' }
          },
          {
            path: 'member',
            hidden: true,
            name: 'groupMemberManage',
            component: _import('group/groupManage/members'),
            meta: { title: '群成员管理', icon: 'guanliyuan' }
          },
          {
            path: 'member/detail',
            hidden: true,
            name: 'groupMemberDetail',
            component: _import('group/groupManage/membersDetail'),
            meta: { title: '群成员详情', icon: '' }
          },
          {
            path: 'member/new',
            hidden: true,
            name: 'newGroupMember',
            component: _import('group/groupManage/membersNew'),
            meta: { title: '新增群成员', icon: '' }
          },
          {
            path: 'grouptocircle',
            name: 'groupToCircle',
            component: _import('group/groupBusinessManage/groupToCircle'),
            meta: { title: '群升级圈', icon: 'guanliyuan' }
          },
          {
            path: 'membercando',
            name: 'memberToGroupManage',
            component: _import('group/groupManage/membersCanDo'),
            meta: { title: '会员对群的信息管理', icon: 'shenpi' }
          }
        ]
      },
      {
        path: 'bussiness',
        name: 'groupbussiness',
        component: ThreeLayout,
        meta: { title: '群务管理', icon: 'renwu' },
        children: [
          {
            path: 'notice',
            name: 'groupNoticManage',
            hidden: true,
            component: _import('group/groupBusinessManage/notice'),
            meta: { title: '群公告管理', icon: 'gonggao' }
          },
          {
            path: 'desc',
            name: 'groupDescManage',
            hidden: true,
            component: _import('group/groupBusinessManage/desc'),
            meta: { title: '群简介管理', icon: 'jianjie' }
          },
          {
            path: 'develop',
            hidden: true,
            name: 'groupdevelopManage',
            component: _import('group/groupBusinessManage/development'),
            meta: { title: '群动态管理', icon: 'dongtai' }
          },
          {
            path: 'approval',
            name: 'groupInviteApproval',
            component: _import('group/groupBusinessManage/approval'),
            meta: { title: '进群邀请审批', icon: 'shenpi' }
          }
        ]
      },
      {
        path: 'permession',
        name: 'groupperssion',
        component: ThreeLayout,
        meta: { title: '群权限管理', icon: 'quanxian' },
        children: [
          {
            path: 'permession',
            name: 'perssionManage',
            hidden: true,//暂时注销掉
            component: _import('group/permessionManage/permession'),
            meta: { title: '权限管理', icon: 'quanxian' }
          },
          {
            path: 'role',
            name: 'roleManage',
            component: _import('group/permessionManage/roles'),
            meta: { title: '角色管理', icon: 'juese' }
          },
          {
            path: 'role/new',
            name: 'newRole',
            hidden: true,
            component: _import('group/permessionManage/newRole'),
            meta: { title: '新增角色', icon: '' }
          },
          {
            path: 'role/edit',
            name: 'editRole',
            hidden: true,
            component: _import('group/permessionManage/editRole'),
            meta: { title: '编辑角色', icon: '' }
          },
          {
            path: 'role/view',
            name: 'viewRole',
            hidden: true,
            component: _import('group/permessionManage/viewRole'),
            meta: { title: '查看角色', icon: '' }
          }
        ]
      }
      //    {
      //      path: 'travel',
      //      name: 'grouptravel',
      //      component: ThreeLayout,
      //      meta: { title: '大旅游管理', icon: 'lvyou' },
      //      children: [
      //        {
      //          path: 'recommend',
      //          name: 'travelRecommendManage',
      //          component: _import('group/travel/recommend'),
      //          meta: { title: '推荐管理', icon: 'tuijian' }
      //        },
      //        {
      //          path: 'classfiy',
      //          name: 'travelclassfiyManage',
      //          component: _import('group/travel/classfiy'),
      //          meta: { title: '生活分类管理', icon: 'fenlei' }
      //        },
      //        {
      //          path: 'common',
      //          name: 'travelcommonManage',
      //          hidden: true,
      //          component: _import('group/travel/common'),
      //          meta: { title: '公共群管理', icon: '' }
      //        }
      //      ]
      //    }
    ]
  },
  {
    path: '/circlemanage',
    component: Layout,
    redirect: '/circlemanage/manage/',
    name: 'circlemanage',
    meta: { title: '圈管理', icon: 'quanzi' },
    children: [
      {
        // 圈组 // 系统管理 // 首页 // 账户管理 // 結算 // 分账管理 // SBU // 渠道管理 // 群管理三级分类 //        hidden: true, // 圈管理 三级菜单
        path: 'manage',
        name: 'circleGroupManage',
        component: ThreeLayout,
        meta: { title: '圈组管理', icon: 'qun' },
        children: [
          {
            path: 'info',
            name: 'circleManageInfo',
            component: _import('circle/circleManage/info'),
            meta: { title: '圈组信息管理', icon: 'xinxi' }
          },
          {
            path: 'info/detail',
            name: 'circleManageInfoDetail',
            hidden: true,
            component: _import('circle/circleManage/infoDetail'),
            meta: { title: '圈组信息详情', icon: 'xinxi' }
          },
          {
            path: 'new/byproduct',
            name: 'circleManageNewByProduct',
            //          hidden: true,
            component: _import('circle/circleManage/newCircleByProduct'),
            meta: { title: '圈创建-基于商品', icon: 'xinxi' }
          },
          {
            path: 'new/bypshop',
            name: 'circleManageNewByShop',
            hidden: true,
            component: _import('circle/circleManage/newCircleByShop'),
            meta: { title: '圈创建-基于店铺', icon: 'xinxi' }
          },
          {
            path: 'new/byscene',
            name: 'circleManageNewByScene',
            hidden: true,
            component: _import('circle/circleManage/newCircleByScene'),
            meta: { title: '圈创建-基于场景', icon: 'xinxi' }
          },
          {
            path: 'new/byroad',
            name: 'circleManageNewByRoad',
            hidden: true,
            component: _import('circle/circleManage/newCircleByRoad'),
            meta: { title: '圈创建-基于同路人', icon: 'xinxi' }
          },
          //        {
          //          path: 'new/byglass',
          //          name: 'circleManageNewByGlass',
          //          hidden: true,
          //          component: _import('circle/circleManage/newCircleByGlass'),
          //          meta: { title: '圈创建-基于滤镜', icon: 'xinxi' }
          //        },
          {
            path: 'new/byself',
            name: 'circleManageNewBySelf',
            // hidden: true,
            component: _import('circle/circleManage/newCircleBySelf'),
            meta: { title: '圈创建-自定义', icon: 'xinxi' }
          },
          {
            path: 'labelbyshop',
            name: 'circleManagelabelByShop',
            hidden: true,
            component: _import('circle/circleManage/labelByShop'),
            meta: { title: '滤镜标签管理-电商', icon: 'xinxi' }
          },
          {
            path: 'customFilterApply',
            name: 'customFilterApply',
            hidden: true,
            component: _import('circle/circleManage/customFilterApply'),
            meta: { title: '自定义滤镜申请机制管理', icon: 'xinxi' }
          },
          {
            path: 'member',
            name: 'circleManageMember',
            hidden: true,
            component: _import('circle/circleManage/members'),
            meta: { title: '圈成员管理', icon: 'guanliyuan' }
          },
          {
            path: 'addMember',
            name: 'addMember',
            hidden: true,
            component: _import('circle/circleManage/addCircleMember'),
            meta: { title: '添加圈成员', icon: 'guanliyuan' }
          },
          {
            path: 'member/detail',
            name: 'circleManageMembersDetail',
            hidden: true,
            component: _import('circle/circleManage/membersDetail'),
            meta: { title: '圈成员详情', icon: 'xinxi' }
          },
          {
            path: 'member/edit',
            name: 'circleManageMembersEdit',
            hidden: true,
            component: _import('circle/circleManage/membersEdit'),
            meta: { title: '圈成员编辑', icon: 'xinxi' }
          },
          {
            path: 'personcando',
            name: 'circleManagePersonCanDo',
            component: _import('circle/circleManage/personCanDo'),
            meta: { title: '会员对圈的信息管理', icon: 'shenpi' }
          }
        ]
      },
      {
        // 圈务 // 滤镜标签 电商 自定义 （现暂无社交） // hidden: true, // hidden: true,
        path: 'business',
        name: 'circlebusiness',
        component: ThreeLayout,
        meta: { title: '圈务管理', icon: 'renwu' },
        children: [
          {
            path: 'change',
            name: 'circleBusinessChange',
            hidden: true,//暂时注销掉
            component: _import('circle/circleBusiness/ownerChange'),
            meta: { title: '圈主转让', icon: 'zhuangrang' }
          },
          {
            path: 'change/detail',
            name: 'circleBusinessChangeDetail',
            hidden: true,
            component: _import('circle/circleBusiness/changeDetail'),
            meta: { title: '圈主转让详情', icon: '' }
          },
          {
            path: 'trial',
            name: 'circleBusinessTrial',
            hidden: true,//暂时注销掉
            component: _import('circle/circleBusiness/trialRule'),
            meta: { title: '选拔机制管理', icon: 'xuanba' }
          },
          {
            path: 'pay',
            name: 'circleBusinessPay',
            hidden: true,//暂时注销掉
            component: _import('circle/circleBusiness/pay'),
            meta: { title: '圈账户支付管理', icon: 'zhifu' }
          },
          {
            path: 'chat',
            name: 'circleBusinessChat',
            hidden: true,//暂时注销掉
            component: _import('circle/circleChat/chatRoute'),
            meta: { title: '圈聊天路由管理', icon: 'xiaoxi' }
          },
          {
            path: 'notice',
            name: 'circleBusinessNotice',
            component: _import('circle/circleBusiness/notice'),
            meta: { title: '圈公告管理', icon: 'gonggao' }
          },
          {
            path: 'noticeBatch',
            name: 'circleBusinessNoticeBatch',
            component: _import('circle/circleBusiness/batch'),
            meta: { title: '圈公告批量管理', icon: 'gonggao' }
          },
          {
            path: 'desc',
            name: 'circleBusinessDesc',
            component: _import('circle/circleBusiness/desc'),
            meta: { title: '圈简介管理', icon: 'jianjie' }
          },
          {
            path: 'develop',
            name: 'circleBusinessDevelop',
            component: _import('circle/circleBusiness/development'),
            meta: { title: '圈动态管理', icon: 'dongtai' }
          }
        ]
      },
      {
        // 圈权限
        path: 'permession',
        name: 'circlepermession',
        component: ThreeLayout,
        meta: { title: '圈权限管理', icon: 'quanxian' },
        children: [
          {
            path: 'permession',
            name: 'circlePermessionPermession',
            hidden: true,//暂时注销掉
            component: _import('circle/circlePermession/permession'),
            meta: { title: '权限管理', icon: 'quanxian' }
          },
          {
            path: 'role',
            name: 'circlePermessionRole',
            component: _import('circle/circlePermession/roles'),
            meta: { title: '角色管理', icon: 'juese' }
          },
          {
            path: 'role/new',
            name: 'circlePermessionRoleNew',
            hidden: true,
            component: _import('circle/circlePermession/newRole'),
            meta: { title: '新增角色', icon: '' }
          },
          {
            path: 'role/edit',
            name: 'circlePermessionRoleEdit',
            hidden: true,
            component: _import('circle/circlePermession/editRole'),
            meta: { title: '编辑角色', icon: '' }
          },
          {
            path: 'role/view',
            name: 'circlePermessionRoleView',
            hidden: true,
            component: _import('circle/circlePermession/viewRole'),
            meta: { title: '查看角色', icon: '' }
          }
        ]
      },
      {
        path: 'bird',
        name: 'groupbird',
        component: ThreeLayout,
        meta: { title: '鸽舍管理', icon: 'geshe' },
        children: [
          {
            path: 'recommend',
            name: 'recommendManage',
            component: _import('circle/bird/recommend'),
            meta: { title: '推荐管理', icon: 'tuijian' }
          },
          {
            path: 'classfiy',
            name: 'classfiyManage',
            component: _import('circle/bird/classfiy'),
            meta: { title: '二级分类管理', icon: 'hangye' }
          },
          {
            path: 'three',
            name: 'threeClassfiyManage',
            hidden: true,
            component: _import('circle/bird/three'),
            meta: { title: '三级分类管理', icon: '' }
          },
          {
            path: 'birds',
            name: 'birdGroupManage',
            hidden: true,
            component: _import('circle/bird/birds'),
            meta: { title: '鸽舍圈管理', icon: '' }
          }
        ]
      },
      {
        path: 'scene',
        component: _import('circle/scene/index'),
        name: 'sceneScondCircle',
        meta: { title: '场景圈二级分类管理', icon: 'xinxi' }
      }
    ]
  },
  {
    path: '/circleandgroup',
    component: Layout,
    redirect: '/circleandgroup/folder',
    name: 'circleandgroup',
    meta: { title: '圈群管理', icon: 'quanzi' },
    children: [
      {
        // 分组管理 // 圈群管理
        path: 'team',
        component: ThreeLayout,
        name: 'circleandgroupTeam',
        meta: { title: '圈群分组管理', icon: 'qun' },
        children: [
          {
            path: 'folder',
            name: 'folder',
            component: _import('circleAndGroup/folder'),
            meta: { title: '圈群的分组文件夹', icon: 'fenzu' }
          },
          {
            path: 'folder/manage',
            name: 'folderManage',
            hidden: true,
            component: _import('circleAndGroup/folder/folderManage'),
            meta: { title: '圈群的分组文件夹管理', icon: '' }
          },
          {
            path: 'folder/member',
            name: 'folderMember',
            hidden: true,
            component: _import('circleAndGroup/folder/member'),
            meta: { title: '关联会员列表', icon: '' }
          },
          {
            path: 'folder/circle',
            name: 'folderCircleAndGroup',
            hidden: true,
            component: _import('circleAndGroup/folder/circle'),
            meta: { title: '关联群圈列表', icon: '' }
          },
          {
            path: 'folder/sortManage',
            name: 'folderSortManage',
            hidden: true,
            component: _import('circleAndGroup/folder/sortManage'),
            meta: { title: '所有成员对群圈的分组管理', icon: '' }
          },
          {
            path: 'folder/ManageCircle',
            name: 'folderManageCircle',
            component: _import('circleAndGroup/folder/ManageCircle'),
            meta: { title: '会员对圈群的分组', icon: 'fenzu' }
          }
        ]
      },
      {
        // 栏目管理
        path: 'programa',
        component: ThreeLayout,
        name: 'circleandgroupPrograma',
        meta: { title: '圈群栏目管理', icon: 'lanmu' },
        children: [
          {
            path: 'index',
            name: 'programmanage',
            component: _import('program/index'),
            meta: { title: '圈群栏目管理', icon: 'lanmu' }
          },
          {
            path: 'new',
            component: _import('program/new'),
            name: 'programcreate',
            hidden: true,
            meta: { title: '创建一级栏目', icon: '' }
          }
        ]
      },
      {
        // 分类
        path: 'classify',
        component: ThreeLayout,
        name: 'circleandgroupClassify',
        meta: { title: '圈群分类管理', icon: 'fenlei' },
        children: [
          {
            path: 'index',
            name: 'classifymanage',
            component: _import('classify/index'),
            meta: { title: '圈群分类管理', icon: 'fenlei' }
          },
          {
            path: 'new',
            component: _import('classify/new'),
            name: 'classifycreate',
            hidden: true,
            meta: { title: '创建一级分类', icon: '' }
          }
        ]
      },
      {
        path: 'outofline',
        hidden: true,
        component: _import('circleAndGroup/outOfLine'),
        name: 'outofline',
        meta: { title: '圈群违规动态管理', icon: 'weigui' }
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/folder',
    name: 'staff',
    meta: { title: '会员管理(我鸽)', icon: 'guanliyuan' },
    children: [
      {
        path: 'index',
        name: 'staffList',
        component: _import('members/index'),
        meta: { title: '会员列表', icon: 'liebiao' }
      },
      {
        path: 'detail/:id',
        name: 'staffDetail',
        hidden: true,
        component: _import('members/detail'),
        meta: { title: '会员信息详情', icon: 'rizhi' }
      },
      {
        path: 'limits',
        name: 'staffLimits',
        component: _import('members/limits'),
        meta: { title: '封禁列表', icon: 'jinzhi' }
      },
      {
        path: 'log',
        name: 'staffLog',
        // hidden: true,
        component: _import('members/log'),
        meta: { title: '登录日志', icon: 'rizhi' }
      },
      {
        path: 'new',
        name: 'staffNwn',
        component: _import('members/new'),
        hidden: true,
        meta: { title: '新建会员', icon: 'rizhi' }
      },
      {
        path: 'privateResume',
        name: 'staffPrivateResume',
        component: _import('members/privateResume'),
        hidden: true,
        meta: { title: '个人简历', icon: 'rizhi' }
      },
      {
        path: 'socialRank',
        name: 'staffSocialRank',
        component: _import('members/socialRank'),
        hidden: true,
        meta: { title: '等级配置管理（社交）', icon: 'rizhi' }
      },
      {
        path: 'shopRank',
        name: 'staffShopRank',
        component: _import('members/shopRank'),
        hidden: true,
        meta: { title: '等级配置管理（电商）', icon: 'rizhi' }
      }
    ]
  },
  {
    path: '/myMao',
    component: Layout,
    redirect: '/myMao/folder',
    name: 'myMap',
    meta: { title: '会员管理(我茂)', icon: 'guanliyuan' },
    children: [
      {
        path: 'index',
        name: 'MyMaostaffList',
        component: _import('myMao/index'),
        meta: { title: '会员列表', icon: 'liebiao' }
      },
      {
        path: 'limits',
        name: 'MyMaostaffLimits',
        component: _import('myMao/limits'),
        meta: { title: '封禁列表', icon: 'jinzhi' }
      },
      {
        path: 'log',
        name: 'MyMaostaffLog',
        // hidden: true,
        component: _import('myMao/log'),
        meta: { title: '登录日志', icon: 'rizhi' }
      },
      {
        path: 'new',
        name: 'MyMaostaffNwn',
        component: _import('myMao/new'),
        hidden: true,
        meta: { title: '新建会员', icon: 'rizhi' }
      },
      {
        path: 'detail/:id',
        name: 'MyMaostaffDetail',
        hidden: true,
        component: _import('myMao/detail'),
        meta: { title: '会员信息详情', icon: 'rizhi' }
      },
      {
        path: 'privateResume',
        name: 'MyMaostaffPrivateResume',
        component: _import('myMao/privateResume'),
        hidden: true,
        meta: { title: '个人简历', icon: 'rizhi' }
      },
      {
        path: 'socialRank',
        name: 'MyMaostaffSocialRank',
        component: _import('myMao/socialRank'),
        hidden: true,
        meta: { title: '等级配置管理（社交）', icon: 'rizhi' }
      },
      {
        path: 'shopRank',
        name: 'MyMaostaffShopRank',
        component: _import('myMao/shopRank'),
        hidden: true,
        meta: { title: '等级配置管理（电商）', icon: 'rizhi' }
      }
    ]
  },
  {
    path: '/label',
    component: Layout,
    name: 'labelManage',
    meta: { title: '标签管理', icon: 'biaoqian' },
    children: [
      {
        path: 'shopLabelManage',
        name: 'shop',
        component: ThreeLayout,
        meta: { title: '商品标签管理', icon: 'lanmu' },
        children: [
          {
            path: 'listSearch',
            name: 'listSearch',
            component: _import('label/shopLabelManage'),
            meta: { title: '类目查询', icon: 'lanmu' }
          },
          {
            path: 'shopClassList/:id',
            name: 'shopClass',
            component: _import('label/shopClassList'),
            meta: { title: '类目列表', icon: 'fenlei' }
          },
          {
            path: 'shopList',
            name: 'shopList',
            component: _import('label/shopList'),
            meta: { title: '商品列表', icon: 'liebiao' }
          },
          {
            path: 'shopDetail',
            name: 'detail',
            hidden: true,
            component: _import('label/shopDetail'),
            meta: { title: '商品详情', icon: 'biaoqian' }
          }
        ]
      },
      {
        path: 'peopleManage',
        name: 'people',
        component: ThreeLayout,
        meta: { title: '人标签管理', icon: 'biaoqian' },
        children: [
          {
            path: 'peopleLabelSearch',
            name: 'behavior',
            component: _import('label/peopleManage'),
            meta: { title: '人标签查询', icon: 'biaoqian' }
          },
          {
            path: 'manageList',
            name: 'manageList',
            hidden: true,
            component: _import('label/manageList'),
            meta: { title: '标签列表页', icon: 'liebiao' }
          },
          {
            path: 'peopleLabelBig',
            name: 'peopleLabelBig',
            hidden: true,
            component: _import('label/peopleLabelBig'),
            meta: { title: '人签大图', icon: 'liebiao' }
          },
          {
            path: 'userList',
            name: 'userList',
            component: _import('label/userList'),
            meta: { title: '用户列表', icon: 'guanliyuan' }
          },
          {
            path: 'userDetail/:id/:channelId',
            name: 'userDetail',
            hidden: true,
            component: _import('label/userDetail'),
            meta: { title: '用户详情', icon: 'liebiao' }
          },
          {
            path: 'commonLabel',
            name: 'commonLabel',
            hidden: true,
            component: _import('label/commonLabel'),
            meta: { title: '共同标签', icon: 'biaoqian' }
          }
        ]
      },
      {
        path: 'behaviorStatisticsManage',
        name: 'behaviorStatisticsManage',
        component: ThreeLayout,
        meta: { title: '行为统计管理', icon: 'biaoqiangongchang' },
        children: [
          {
            path: 'behaviorManage',
            name: 'behaviorManage',
            component: _import('label/behaviorManage'),
            meta: { title: '行为管理', icon: 'biaoqian' }
          },
          {
            path: 'behaviorGroupManage',
            name: 'behaviorGroupManage',
            hidden: true, // component: _import('label/behaviorGroupManage'), // 会员管理（我鸽） // hidden: true, // 会员管理-我茂 // hidden: true, // 标签管理 // component: _import('label/shopLabelManage'), // hidden: true, // component: _import('label/peopleManage'), // component: _import('label/factoryLog'), // component: ThreeLayout,
            meta: { title: '行为组管理', icon: 'biaoqian' },
            children: [
              {
                path: 'creatBehaviorGroupDialog',
                name: 'creatBehaviorGroupDialog',
                component: _import('label/creatBehaviorGroupDialog'),
                meta: { title: '创建行为弹出框', icon: 'biaoqian' }
              },
              {
                path: 'behaviorGroupDetail',
                name: 'behaviorGroupDetail',
                component: _import('label/behaviorGroupDetail'),
                meta: { title: '行为组详情', icon: 'biaoqian' }
              }
            ]
          },
          {
            path: 'behaviorUserList',
            name: 'behaviorUserList',
            component: _import('label/behaviorUserList'),
            meta: { title: '行为用户列表', icon: 'biaoqian' }
          },
          {
            path: 'singleUserbehaviorStatistics',
            name: 'singleUserbehaviorStatistics',
            component: _import('label/singleUserbehaviorStatistics'),
            meta: { title: '单一用户行为统计', icon: 'biaoqian' }
          },
          {
            path: 'stageUserbehaviorStatistics',
            name: 'stageUserbehaviorStatistics',
            component: _import('label/stageUserbehaviorStatistics'),
            meta: { title: '平台用户行为统计', icon: 'biaoqian' }
          },
          {
            path: 'userbehaviorDetail',
            name: 'userbehaviorDetail',
            hidden: true,
            component: _import('label/userbehaviorDetail'),
            meta: { title: '用户行为详情', icon: 'biaoqian' }
          },
          {
            path: 'parameterManage',
            name: 'parameterManage',
            hidden: true,
            component: _import('label/parameterManage'),
            meta: { title: '参数管理', icon: 'biaoqian' }
          }
        ]
      },
      {
        path: 'labelFactory',
        name: 'labelFactory',
        component: ThreeLayout,
        meta: { title: '标签工厂', icon: 'biaoqiangongchang' },
        children: [
          {
            path: 'stageCreatLabel',
            name: 'stageCreatLabel',
            component: _import('label/stageCreatLabel'),
            meta: { title: '平台创建标签', icon: 'biaoqian' }
          },
          {
            path: 'userDefinedLabel',
            name: 'userDefinedLabel',
            component: _import('label/userDefinedLabel'),
            meta: { title: '用户自定义标签', icon: 'biaoqian' }
          },
          {
            path: 'scenceLabel',
            name: 'scenceLabel',
            component: _import('label/scenceLabel'),
            meta: { title: '场景标签', icon: 'biaoqian' }
          }
        ]
      }
    ]
  },
  {
    path: '/complain',
    component: Layout,
    redirect: '/complain/index',
    name: 'complain',
    meta: { title: '投诉管理', icon: 'tousu' },
    children: [
      {
        path: 'untreat',
        name: 'untreat',
        component: _import('complain/untreat'),
        meta: { title: '未处理', icon: 'weichuli' }
      },
      {
        path: 'treated',
        name: 'treated',
        component: _import('complain/treated'),
        meta: { title: '已处理', icon: 'yichuli' }
      }
    ]
  },
  // {
  //  path: '/wgright',
  //  component: Layout,
  //  redirect: '/wgright/index',
  //  name: 'wgright',
  //  meta: { title: '我鸽特权配置', icon: 'tequan' },
  //  children: [
  //    {
  //      path: 'index',
  //      name: 'wgrightIndex',
  //      component: _import('wgright/index'),
  //      meta: { title: '特权管理', icon: 'liebiao' }
  //    },
  //    {
  //      path: 'detail',
  //      name: 'wgrightDetail',
  //      hidden: true,
  //      component: _import('wgright/detail'),
  //      meta: { title: '特权管理详情', icon: '' }
  //    },
  //    {
  //      path: 'log',
  //      name: 'wgrightLog',
  //      component: _import('wgright/log'),
  //      meta: { title: '用户日志', icon: 'rizhi' }
  //    }
  //  ]
  // },
  {
    path: '/right',
    component: Layout,
    redirect: '/right/index',
    name: 'right',
    meta: { title: '我茂特权配置', icon: 'tequan' },
    children: [
      {
        path: 'index',
        name: 'rightIndex',
        component: _import('right/index'),
        meta: { title: '特权管理', icon: 'liebiao' }
      },
      {
        path: 'detail',
        name: 'rightDetail',
        hidden: true,
        component: _import('right/detail'),
        meta: { title: '特权管理详情', icon: '' }
      },
      {
        path: 'edit',
        name: 'rightEdit',
        hidden: true,
        component: _import('right/edit'),
        meta: { title: '特权管理编辑', icon: '' }
      },
      {
        path: 'log',
        name: 'rightLog',
        component: _import('right/log'),
        meta: { title: '用户日志', icon: 'rizhi' }
      }
    ]
  },
  {
    path: '/award',
    name: 'award',
    component: Layout,
    title: '用户行为奖励配置',
    meta: {
      icon: ''
    },
    children: [
      {
        path: 'userAward',
        name: 'userAward',
        component: _import('award/userAward'),
        meta: { title: '用户行为奖励配置', icon: 'xingwei' }
      }
    ]
  },
  {
    path: '/light',
    component: Layout,
    redirect: '/ligth/index',
    name: 'ligth',
    meta: { title: '许愿灯管理', icon: 'deng' },
    children: [
      {
        path: 'index',
        name: 'lightIndex',
        component: _import('light/index'),
        meta: { title: '许愿灯列表', icon: 'liebiao' }
      },
      {
        path: 'dellist',
        name: 'lightDelList',
        hidden: true,
        component: _import('light/hasDeleted'),
        meta: { title: '已删除许愿灯列表', icon: '' }
      },
      {
        path: 'detail',
        name: 'lightDetail',
        hidden: true,
        component: _import('light/detail'),
        meta: { title: '许愿灯明细', icon: '' }
      },
      {
        path: 'order',
        name: 'lightorder',
        component: _import('light/order'),
        meta: { title: '订单管理', icon: 'dingdan' }
      },
      {
        path: 'property',
        name: 'lightproperty',
        component: _import('light/property'),
        meta: { title: '属性管理', icon: 'shuxing' }
      }
    ]
  },
  {
    path: '/share',
    component: Layout,
    redirect: '/share/wgindex',
    name: 'share',
    meta: { title: '分享管理', icon: 'fenxiang' },
    children: [
      {
        path: 'wgindex',
        name: 'wgindex',
        component: _import('share/woge/index'),
        meta: { title: '我鸽分享管理', icon: 'shejiao' }
      },
      {
        path: 'wgview',
        name: 'wgview',
        hidden: true,
        component: _import('share/woge/view'),
        meta: { title: '我鸽查看管理', icon: '' }
      },
      {
        path: 'wmindex',
        name: 'wmindex',
        component: _import('share/womall/index'),
        meta: { title: '我茂分享管理', icon: 'dianshang' }
      },
      {
        path: 'wmview',
        name: 'wmview',
        hidden: true,
        component: _import('share/womall/view'),
        meta: { title: '我茂查看管理', icon: '' }
      }
    ]
  }, // 下边是消息管理 // 许愿灯管理
  {
    path: '/noticeManageOneWrapper',
    component: Layout,
    redirect: '/noticeManageOneWrapper/notice/',
    name: 'noticeManageOneWrapper',
    meta: { title: '消息管理', icon: 'xiaoxi' },
    children: [
      {
        path: 'notice',
        component: ThreeLayout,
        name: 'noticeManage',
        meta: { title: '我鸽消息管理平台', icon: 'xiaoxi' },
        children: [
          {
            path: 'index',
            name: 'noticeIndex',
            component: _import('notice/template/index'),
            meta: { title: '模板管理', icon: 'muban' }
          },
          {
            path: 'message',
            name: 'noticeMessage',
            component: _import('notice/template/message'),
            meta: { title: '消息发送', icon: 'tuisong' }
          },
          {
            path: 'pushlist',
            name: 'noticePushList',
            component: _import('notice/template/pushList'),
            meta: { title: '推送列表', icon: 'liebiao' }
          },
          {
            path: 'new',
            name: 'noticeNew',
            hidden: true,
            component: _import('notice/template/new'),
            meta: { title: '新建消息模板', icon: '' }
          },
          {
            path: 'detail/:id',
            name: 'noticeDetail',
            hidden: true,
            component: _import('notice/template/detail'),
            meta: { title: '推送详情', icon: '' }
          },
          {
            path: 'approval',
            name: 'noticeApprovalIndex',
            component: _import('notice/approval/index'),
            meta: { title: '待审核', icon: 'daishenhe' }
          },
          {
            path: 'approvaldetail/:id',
            name: 'noticeApprovalDetail',
            hidden: true,
            component: _import('notice/approval/detail'),
            meta: { title: '待审核详情', icon: '' }
          },
          {
            path: 'checked',
            name: 'noticeChecked',
            component: _import('notice/approval/checked'),
            meta: { title: '已审核', icon: 'yishenhe' }
          },
          {
            path: 'checkedetail/:id',
            name: 'noticeCheckedDetail',
            hidden: true,
            component: _import('notice/approval/checkedDetail'),
            meta: { title: '已审核结果详情', icon: '' }
          }
        ]
      },
      {
        path: 'myMaonoticeManage',
        component: ThreeLayout,
        name: 'noticeManagemyMao',
        meta: { title: '我茂消息管理平台', icon: 'xiaoxi' },
        children: [
          {
            path: 'index',
            name: 'noticeIndexmyMao',
            component: _import('notice/myMaoTemplate/index'),
            meta: { title: '模板管理', icon: 'muban' }
          },
          {
            path: 'message',
            name: 'noticeMessageMao',
            component: _import('notice/myMaoTemplate/message'),
            meta: { title: '消息发送', icon: 'tuisong' }
          },
          {
            path: 'pushlist',
            name: 'noticePushListmyMao',
            component: _import('notice/myMaoTemplate/pushList'),
            meta: { title: '推送列表', icon: 'liebiao' }
          },
          {
            path: 'new',
            name: 'noticeNewmyMao',
            hidden: true,
            component: _import('notice/myMaoTemplate/new'),
            meta: { title: '新建消息模板', icon: 'xiaoxi' }
          },
          {
            path: 'detail',
            name: 'noticeDetailmyMao',
            hidden: true,
            component: _import('notice/myMaoTemplate/detail'),
            meta: { title: '推送详情', icon: '' }
          },
          {
            path: 'approval',
            name: 'noticeApprovalIndexmyMao',
            component: _import('notice/myMaoApproval/index'),
            meta: { title: '待审核', icon: 'daishenhe' }
          },
          {
            path: 'approvaldetail/:id',
            name: 'noticeApprovalDetailmyMao',
            hidden: true,
            component: _import('notice/myMaoApproval/detail'),
            meta: { title: '待审核详情', icon: '' }
          },
          {
            path: 'checked',
            name: 'noticeCheckedmyMao',
            component: _import('notice/myMaoApproval/checked'),
            meta: { title: '已审核', icon: 'yishenhe' }
          },
          {
            path: 'checkedetail/:id',
            name: 'noticeCheckedDetailmyMao',
            hidden: true,
            component: _import('notice/myMaoApproval/checkedDetail'),
            meta: { title: '已审核结果详情', icon: '' }
          }
        ]
      }
    ]
  },
  {
    path: '/accuratePush',
    component: Layout,
    redirect: '/accuratePush/index',
    name: 'accuratePush',
    meta: { title: '精准推送后台(信息架构图)', icon: 'tubiao' },
    children: [
      {
        path: 'lookTotalPic',
        name: 'lookTotalPic',
        component: _import('accuratePush/lookTotalPic'),
        meta: { title: '总览图-查看', icon: 'tubiao' }
      },
      {
        path: 'shopListLook',
        name: 'shopListLook',
        component: _import('accuratePush/shopListLook'),
        meta: { title: '商品列表-查看', icon: 'tubiao' }
      },
      {
        path: 'recommendClickSort',
        name: 'recommendClickSort',
        component: _import('accuratePush/recommendClickSort'),
        meta: { title: '推荐点击排行-查看', icon: 'tubiao' }
      },
      {
        path: 'commParam',
        name: 'commParam',
        hidden: true,
        component: _import('accuratePush/commParam'),
        meta: { title: '公共参数模块-配置', icon: 'tubiao' }
      },
      {
        path: 'guessYouLike',
        name: 'guessYouLike',
        component: _import('accuratePush/guessYouLike'),
        meta: { title: '猜你喜欢模块-查看', icon: 'tubiao' }
      },
      {
        path: 'guessYouLikeConfig',
        name: 'guessYouLikeConfig',
        hidden: true,
        component: _import('accuratePush/guessYouLikeConfig'),
        meta: { title: '手动配置模块-配置', icon: 'tubiao' }
      },
      {
        path: 'systemMatchModuleCon',
        name: 'systemMatchModuleCon',
        component: _import('accuratePush/systemMatchModuleCon'),
        meta: { title: '手动配置模块-配置', icon: 'tubiao' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
] // redirect: '/notice/index', // redirect: '/notice/index', // 精准推送后台

export default new Router({
//   mode: 'history', // 后端支持可开-利用了history.pushState API实现路由的跳转-不需要重新加载页面
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
