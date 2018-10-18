import { asyncRouterMap, constantRouterMap } from '@/router'
import localStore from 'store' // 缓存操作
import { isEmpty } from '@scripts/utils/object-util'

// 注意，vuex并没有缓存数据功能，vuex提供的是组件之间的高效通信

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 常量配置
export const RouterDeeds = {
  'setRouters': 'SET_ROUTERS',
  'getRouters': 'GET_ROUTERS',
  'generateRoutes': 'GENERATE_ROUTES',
  'initRouters': 'INIT_ROUTERS'
}

// console.log('constantRouterMap', constantRouterMap)
const permissionRouter = {
  state: {
    // routers: constantRouterMap, 这种做法首先获取的constantRouterMap为undefined
    routers: [],
    addRouters: []
  },
  mutations: {
    [RouterDeeds.setRouters]: (state, routers) => {
      // console.log('setRouters', state)
      state.addRouters = routers
      state.routers = state.routers.concat(routers)
      localStore.set('routers', state.routers)
    }
  },
  getters: {
    [RouterDeeds.getRouters]: (state) => {
      let routers = state.routers
      if (isEmpty(routers)) { // vuex 没有内容
        routers = localStore.get('routers') // 去缓存数据
      }
      return routers
    }
  },
  actions: {
    [RouterDeeds.generateRoutes]({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit(RouterDeeds.setRouters, accessedRouters)
        resolve()
      })
    },
    /**
     * 初始化路由信息
     */
    [RouterDeeds.initRouters]({ commit }) {
      // console.log('constantRouterMap', constantRouterMap)
      commit(RouterDeeds.setRouters, constantRouterMap)
    }
  }
}

export default permissionRouter
