<template>
  <div class="header">
    <el-header
      style="background:url('../../static/bg_head.png') no-repeat;width:1200px;height:167px;"
    ></el-header>
    <el-menu
      mode="horizontal"
      router
      style="height:60px;"
      background-color="#007536"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item
        v-for="item in menus"
        :key="item.index"
        route
        style="font-size:16px;font-weight:bold;"
        :index="item.index"
      >{{item.label}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      menus: [
        { index: "/home", label: "首页" },
        { index: "/center", label: "中心简介" },
        { index: "/announcement", label: "通知公告" },
        { index: "/working", label: "工作动态" },
        { index: "/policy", label: "资助政策" }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
