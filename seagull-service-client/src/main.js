import Vue from 'vue'
import router from '@/router'
import store from '@/stores'
import APP from './APP'
import localStore from 'store' // 缓存操作

import './mock' // simulation data
import './filter/filter-router' // 权限拦截器
// ################### 全局属性 #########################
// import StringUtil from '@scripts/utils/string-util'
import '@/icons' // global icon
import '@/assets/scss/global/index.scss' // global css

// #####################################################

import Element from 'element-ui'
import i18n from '@scripts/lang' // Internationalization

Vue.use(Element, {
  size: localStore.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// ################### 全局属性挂载 #########################

// Vue.prototype.$StringUtil = StringUtil

// #####################################################

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { APP },
  template: '<APP />'
})


