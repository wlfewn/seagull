// 聚合所有路由设置
import Vue from 'vue'
import VueRouter from 'vue-router'

// 系统路由
import RouterFactory from './factory'

Vue.use(VueRouter)

// 暴露路由，供其他地方使用
export const constantRouterMap = RouterFactory.constantRouterMap
export const asyncRouterMap = RouterFactory.asyncRouterMap

// 初始化 vue router
const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap
})

// 暴露路由设置
export default router
