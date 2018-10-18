import Vue from 'vue'
import Vuex from 'vuex'

// vuex 系统模块
import UserStore from './modules/store-user' // 系统用户
import SystemStore from './modules/store-system' // 系统配置
import ErrorLogStore from './modules/store-errorlog' // 错误日志
import RouterStore from './modules/store-router' // 菜单模块

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    UserStore,
    SystemStore,
    ErrorLogStore,
    RouterStore
  }
})

export default store
