// 现在只处理一级二级菜单

export default [
  {
    name: '系统设置', // 菜单名称
    icon: 'el-icon-setting', // 展示图标
    index: '/', // 路由配置
    children: [
      {
        name: '角色列表', // 二级菜单名称
        index: '/role/list' // 二级菜单路由
      }
    ]
  }
]
