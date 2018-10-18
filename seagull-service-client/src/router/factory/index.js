import SystemRouter from '../router-system'
/* Layout */
import Layout from '@/layout/index'

class RouterFactory {
  /**
   * 合并不需要权限控制部分router
   */
  get constantRouterMap() {
    return SystemRouter
  }
  /**
   * 合并需要权限控制部分router
   */
  get asyncRouterMap() {
    return []
  }
  /**
   * 创建父类路由
   * @param routerPath router path
   * @param redirect 重定向 path
   * @param meta 元数据信息
   * @param createChildrenInterface 创建子类方法
   */
  createParent(routerPath = '', redirect = '', meta = {}, createChildrenFun) {
    const children = createChildrenFun() || []
    return {
      path: routerPath,
      component: Layout,
      redirect: redirect,
      meta: meta,
      children: children
    }
  }
  /**
   * 创建子类路由
   * @param routerPath router path
   * @param meta 元数据信息
   * @param componentPath 组件相对pages 路径
   */
  create(routerPath = '', meta = {}, componentPath) { // componentImport
    return {
      path: routerPath,
      meta: meta,
      component: function(resolve) {
        require(['@/pages' + componentPath], resolve)
      }
    }
  }
}

export default new RouterFactory()