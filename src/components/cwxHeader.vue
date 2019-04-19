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
        { index: "/goodslist", label: "中心简介" },
        { index: "/policy", label: "奖助学金" },
        { index: "/123", label: "助学贷款" },
        { index: "/1231", label: "工作动态" }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
