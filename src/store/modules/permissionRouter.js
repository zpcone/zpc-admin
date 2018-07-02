import router, { constantRouterMap, initRoutes } from '@/router'

const permissionRouter = {
  state: {
    getPermissionRoutes: false, // 获取权限路由，true为已获取，false为未获取
    initialRoutes: [],
    addRoutes: [],
    showRoutes: []
  },
  mutations: {
    'SET_ROUTERS': (state, router) => {
      state.initialRoutes = initRoutes
      state.addRoutes = router
      state.showRoutes = state.initialRoutes.concat(state.addRoutes)
      // state.showRoutes = constantRouterMap
      state.getPermissionRoutes = true
    }
  },
  actions: {
    GenerateRoutes({ commit }, nameArr) { // nameArr 为权限接口返回数据中要展示的name值的数组
      if (nameArr.length > 0) {
        const accessedRouters = constantRouterMap.filter(v => {
          if (getAuth(nameArr, v.name)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (getAuth(nameArr, child.name)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        accessedRouters.push(
          // 404
          {
            path: '*',
            redirect: '/404',
            hidden: true
          }
        )
        router.addRoutes(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
      } else {
        commit('SET_ROUTERS', constantRouterMap)
      }
    }
  }
}

function getAuth(nameArr, name) {
  return nameArr.indexOf(name) !== -1
}

export default permissionRouter
