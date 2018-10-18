import RouterFactory from './factory'
// 常量配置
import { RoleAdmin } from './constants'

// 定义登录路径
export const LOGIN_PAGE = '/login' // 登录路由
export const HOME_PAGE = '/' // 主页路由

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
const configRole = [RoleAdmin]
// 
const parentMeta = {
  title: 'demo', 
  icon: '404', 
  roles: configRole
}

const systemRouter = RouterFactory.createParent(HOME_PAGE, '/401', parentMeta, () => {
  return [
    RouterFactory.create('/401', {title: '401', noCache: true, roles: configRole}, '/system/error-page/401.vue'),
    RouterFactory.create('/404', {title: '404', noCache: true, roles: configRole}, '/system/error-page/404.vue')
  ]
})

const loginRouter = RouterFactory.create(LOGIN_PAGE, {title: '登录', noCache: true}, '/system/login.vue')

export default [systemRouter, loginRouter]
