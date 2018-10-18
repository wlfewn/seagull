<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permissionRouters" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
// vuex 常量配置
import { AppDeeds } from '@store-module/store-system'
import { RouterDeeds } from '@store-module/store-router'

export default {
  components: { SidebarItem },
  computed: {
    permissionRouters() {
      const permissionRouters = this.$store.getters[RouterDeeds.getRouters]
      console.log('permissionRouters', permissionRouters)
      if (permissionRouters.length) { // 没有内容
        //
      }
      // console.log('permissionRouters', this.$store.getters[RouterDeeds.getRouters])
      return permissionRouters
    },
    sidebar() {
      return this.$store.getters[AppDeeds.getSidebar]
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
