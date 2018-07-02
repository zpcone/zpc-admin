import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'
// import permissionRouter from './modules/permissionRouter'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shopAttribute: '1',
    editUser: [], // 临时保存编辑用户的信息
    getTreeData: [],
    // roleGetTreeDept: [], // 角色中保存部门tree数据
    getTreeDataMenu: [],
    getUpdataMenu: [], // 保存系统menu中传到edit中的数据
    shopAddAllAttr: [], // 保存商品列表中所有添加的属性
    getAllRoleArr: [] // 保存角色列表
  },
  mutations: {
    // 保存所有的角色
    setgetAllRoleArr(state, getAllRoleArr) {
      state.getAllRoleArr = getAllRoleArr
    },
    // 保存商品列表中所有添加的属性
    setShopAddAllAttr(state, shopAddAllAttr) {
      state.shopAddAllAttr = shopAddAllAttr
    },
    setDetailShopAttribute(state, showShopAttribute) {
      state.shopAttribute = showShopAttribute
    },
    setEditUser: (state, editUser) => {
      state.editUser = editUser
    },
    setGetTreeData: (state, getTreeData) => {
      state.getTreeData = getTreeData
    },
    setGetTreeDataMenu: (state, getTreeDataMenu) => {
      state.getTreeDataMenu = getTreeDataMenu
    },
    setGetUpdataMenu: (state, getUpdataMenu) => {
      state.getUpdataMenu = getUpdataMenu
    }
    // setRoleGetTreeDept: (state, roleGetTreeDept) => {
    //   state.roleGetTreeDept = roleGetTreeDept
    // }
  },
  modules: {
    // permissionRouter,
    app,
    tagsView,
    user
  },
  getters
})

export default store
