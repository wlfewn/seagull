// 导入store.js 操作缓存
import store from 'store'

/**
 * 系统用户最基础行为常量配置
 */
export const SystemDeed = {
  logout: 'LOGOUT',
  login: 'LOGIN',
  getToken: 'GET_TOKEN',
  // user
  getUser: 'GET_USER',
  getRoles: 'GET_ROLES'
}

// vuex 配置
const sysStore = {
  state: {
    user: {
      name: '',
      avatar: '',
      introduction: '',
      roles: []
    },
    token: ''
  },
  mutations: {
    // 登录
    [SystemDeed.login]: (state, token, user) => {
      // 缓存token
      store.set('token', token)
      state.token = token
      // 拷贝user对象，缓存user信息
      state.user = Object.assign(state.user, user)
      store.set('user', state.user)
    },
    // 登出
    [SystemDeed.logout]: (state) => {
      // 移除token
      store.remove('token')
      state.token = ''
      // 移除用户信息
      store.remove('user')
      state.user = {}
    }
  },
  getters: {
    /**
     * 获取token
     */
    [SystemDeed.getToken]: (state) => {
      if (state.token) {
        return state.token
      }
      const token = store.get('token')
      if (token) {
        state.token = token // 赋值
        return token
      }
      return ''
    },
    /**
     * 获取用户角色
     */
    [SystemDeed.getRoles]: (state) => {
      if (state.user) {
        return state.user.roles
      }
      const user = store.get('user')
      if (user) {
        return user.roles
      }
      return []
    }
  }
}

export default sysStore
