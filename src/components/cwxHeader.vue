<template>
  <div class="header" v-once>
    <el-header v-once
      style="background:url('../../static/bg_head.png') no-repeat;width:1200px;height:80px;"
    >
      <!-- <div style="width: 305px;float: right;">
        <div style="width: 305px;float:right;padding-top: 15px;">
          <p style="font-size: 16px;float: right;line-height: 15px;padding-right:35px">
            <router-link to='/login' style="color:#fff" class="login">登录</router-link>
          </p>
          <p style="font-size: 16px;float: right;line-height: 15px;">         
            <router-link to='/register' style="color:#fff" class="register">注册 |&nbsp;</router-link>
          </p>
        </div>
      </div>-->
      <router-link to="/">
       <div style="width:250px;;margin-left:60px;height:80px;">

       </div>
      </router-link>
    </el-header>
    <div v-if="menu.length> 0">
      <el-menu
        mode="horizontal"
        router
        style="height:60px;"
        background-color="#438f48"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item
          v-for="item in menu"
          :key="item.path"
          route
          style="font-size:20px;width:200px;text-align:center;color:#fff"
          :index="item.path"
        >{{item.label}}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
