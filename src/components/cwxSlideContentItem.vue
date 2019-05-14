<template>
    <div class="slide-content">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          :style="paddingleft"
        >
          <span>{{item.update_date}}</span>
          <router-link :to="item.path+'/'+item.id">
          <div  v-if="item.content === '0'" style="color:#078F48;">
          {{item.title}}
            </div> 
            <div v-else>
          {{item.title}}

              </div>         
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  props:{
    list:{
      type:Array,
      default:function(){
        return []
      }
    },
    paddingleft:{
      type:String,
      default:function(){
        return 'padding-left:10px'
      }
    }
  }
};
</script>
<style lang="scss" >
  .slide-content {
    ul {
      margin: 0px;
      padding: 0px;
      span {
        float: left;
        font-size: 15px;
        padding-right: 20px;
        color: #078f48;
      }
      li {
        list-style: none;
        background: url(../../static/bg_time1.png) no-repeat 2% 50%;
        border-bottom: 1px dashed #d8d8d8;
        font-size: 14px;
        line-height: 35px;
        border-bottom: 1px dashed #d8d8d8;
        padding-left: 10px;
        list-style-type: none;
        line-height: 35px;
      }
    }
}
</style>
