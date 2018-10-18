// 引入store.js 操作缓存
import localStore from 'store'

/**
 * 系统属性常量配置
 */
export const AppDeeds = {
  'toggleSidebar': 'TOGGLE_SIDEBAR',
  'closeSidebar': 'CLOSE_SIDEBAR',
  'toggleDevice': 'TOGGLE_DEVICE',
  'setLanguage': 'SET_LANGUAGE',
  'setSize': 'SET_SIZE',
  // get 操作
  'getSidebar': 'GET_SIDEBAR',
  'getDevice': 'GET_DEVICE'
}

const app = {
  state: {
    sidebar: {
      opened: !+localStore.get('sidebarStatus'), // !+ 参考 https://www.zhihu.com/question/268784799/answer/342121526
      withoutAnimation: false
    },
    device: 'desktop',
    language: localStore.get('language') || 'en',
    size: localStore.get('size') || 'medium'
  },
  mutations: {
    [AppDeeds.toggleSidebar]: state => {
      if (state.sidebar.opened) {
        localStore.set('sidebarStatus', 1)
      } else {
        localStore.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    [AppDeeds.closeSidebar]: (state, withoutAnimation) => {
      localStore.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [AppDeeds.toggleDevice]: (state, device) => {
      state.device = device
    },
    [AppDeeds.setLanguage]: (state, language) => {
      state.language = language
      localStore.set('language', language)
    },
    [AppDeeds.setSize]: (state, size) => {
      state.size = size
      localStore.set('size', size)
    }
  },
  getters: {
    [AppDeeds.getSidebar]: (state) => {
      // console.log('state', state)
      return state.sidebar
    },
    [AppDeeds.getDevice]: (state) => {
      return state.device
    }
  }
}

export default app
