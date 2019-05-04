<template>
  <div class="header">
    <el-header
      style="background:url('../../static/bg_head.png') no-repeat;width:1200px;height:167px;"
    >
      <div style="width: 305px;float: right;">
        <div style="width: 305px;float:right;padding-top: 15px;">
          <p style="font-size: 16px;float: right;line-height: 15px;padding-right:35px">
            <router-link to='/login' style="color:#fff" class="login">登录</router-link>
          </p>
          <p style="font-size: 16px;float: right;line-height: 15px;">         
            <router-link to='/register' style="color:#fff" class="register">注册 |&nbsp;</router-link>
          </p>
        </div>
      </div>
    </el-header>
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
        style="font-size:20px;font-weight:bold;width:200px;text-align:center"
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
        { index: "/", label: "首      页" },
        { index: "/introduction", label: "中 心 简 介" },
        { index: "/announcement", label: "通 知 公 告" },
        { index: "/working", label: "工 作 动 态" },
        { index: "/policy", label: "资 助 政 策" },
        { index: "/profile", label: "个 人 中 心" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.header {

}
</style>
