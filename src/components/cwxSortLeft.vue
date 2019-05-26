<template>
  <div class="sort_left">
    <div class="sort_leftcont">
      <!-- <ul >
         <router-link v-for="item in menu" :key="item.path" :to="item.path"><li>{{item.label}}</li></router-link>
      </ul> -->
 <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fff"
      text-color="#438F49"
      
      >
      <el-menu-item index="2" v-for="item in menu" :key="item.path">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">
         <router-link  :to="item.path">{{item.label}}</router-link>            
        </span>
      </el-menu-item>
    
    </el-menu>


    </div>
  </div>
</template>
<script>
export default {
  props:{
    menu:{
      type:Array,
      default:function(){
        return [{label:'首页',path:'/introduction'},{label:'中心简介',path:'/introduction'}, {label:'通知公告',path:'/announcement'},{label:'工作动态',path:'/working'},{label:'奖助学金项目',path:'/policy'}]
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sort_left {
  float:left;
  li {
    font-size:18px;
    font-family: "微软雅黑";
    color:#438F48;
    // font-weight: bold;
    // text-align: center;
    // line-height: 36px;
    // margin-bottom: 10px;
  }
  li:hover {
    background:#438F49;
  }
  // border-left:1px dashed  #438F48;
  // border-bottom:1px dashed  #438F48;
  min-height: 600px;
  float: left;
  // margin-left: 20px;
  padding-top: 20px;
  .sort_leftcont {
    width: 120px;
    min-height:460px;
  }
}
</style>
