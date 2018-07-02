// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        setToken('admin')
        commit('SET_TOKEN', 'admin')
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', 'admin')
        commit('SET_NAME', 'admin')
        commit('SET_AVATAR', '')
        resolve()
      })
    },
    // 设置用户userId
    SetUserInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // 设置用户id
        commit('SET_USERID', payload.username)
        // 设置用户名
        commit('SET_NAME', payload.username)
        // 设置用户权限
        commit('SET_ROLES', payload.roleIdList)
        setUserId(payload.username)
        resolve()
      })
    },
    // 登出
    LogOut({ commit, state }) {
      console.log('sadsadsa')
      return new Promise((resolve, reject) => {
        //      logout(state.token).then(() => {
        //        commit('SET_TOKEN', '')
        //        commit('SET_ROLES', [])
        //        removeToken()
        //        resolve()
        //      }).catch(error => {
        //        reject(error)
        //      })

        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      console.log('123456')
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
