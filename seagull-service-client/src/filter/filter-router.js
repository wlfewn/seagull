import VueStore from '@/stores' // vuex
// 进度条样式
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
// vuex
import { SystemDeed } from '@store-module/store-user'
// 系统路由
import { LOGIN_PAGE } from '@/router/router-system'
import router from '@/router'

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true // admin permission passed directly
  }
  if (!permissionRoles) {
    return true
  }
  return roles.some((role) => permissionRoles.indexOf(role) >= 0)
}

// router拦截器，实现鉴权
// 参考 https://blog.csdn.net/qq673318522/article/details/55506650
// https://github.com/superman66/vue-axios-github/blob/master/src/router.js
router.beforeEach((to, from, next) => {
  // 开始导航条动画
  NProgress.start()
  // console.log('to.meta.title', to.meta.title)
  // 使用vuex 获取路由 title
  VueStore.commit(SystemDeed.setTitle, to.meta.title)
  // 获取路由 path
  // console.log('to', to.path === LOGIN_PAGE)
  if (to.path === LOGIN_PAGE) { // 不需要拦截
    next() // 这里的next设计，与node的express很类似
  } else { // 其他都需要拦截
    // 白名单
    // 判断有没有token 使用 vuex 管理
    // 使用getters 获取token
    const token = VueStore.getters[SystemDeed.getToken]
    if (token) {
      // 判断权限,true 表示 可以通过
      if (hasPermission(VueStore.getters[SystemDeed.getRoles], to.meta.roles)) {
        next()
      } else { // 重定向到拒绝访问页面
        next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
    } else {
      // 去登录页面，传入将跳转的路由path作为参数，登录成功后跳转到该路由
      next({
        path: LOGIN_PAGE,
        query: {redirect: to.fullPath}
      })
    }
  }
})

router.afterEach((to, from) => {
  // 结束导航条动画
  NProgress.done()
})
