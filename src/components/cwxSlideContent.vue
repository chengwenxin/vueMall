<template>
  <div class="cwx-slide-content">
    <div class="head">
      <span>
        <router-link :to="more">更多>></router-link>
      </span>
      <dt>通知公告</dt>
    </div>
    <div class="slide-content">
      <ul>
        <li v-for="item in list.slice(0,7)" :key="item.key">
          <span>{{item.time}}</span>
          <router-link :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      more: "/",
      list: [
        { time: "14/19", title: "今天1天气很好1", path: "/goodslist" ,key:'1'},
        { time: "14/18", title: "今1天天气很好1吗？", path: "/goodslist",key:'11' },
        { time: "1/19", title: "今天1天气很1好1", path: "/goodslist" ,key:'111'},
        { time: "04/18", title: "今1天天气很好1吗？", path: "/goodslist",key:'12' },
        { time: "24/19", title: "今1天天气很好", path: "/goodslist",key:'13' },
        { time: "54/18", title: "今天天1气很好吗？", path: "/goodslist",key:'14' },
        { time: "64/19", title: "今天1天气很1好", path: "/goodslist" ,key:'15'},
        { time: "94/18", title: "今1天天气很好吗？", path: "/goodslist",key:'16' }
      ]
    };
  }
};
</script>
<style lang="scss" >
.cwx-slide-content {
  width: 550px;
  float: left;
  height: 300px;
  margin:0 25px;
  .head {
    width: 550px;
    height: 40px;
    border-bottom: #078f48 solid 3px;
    margin: 0 auto;
    span {
      float: right;
      line-height: 40px;
      padding-right: 10px;
    }
    dt {
      font-size: 18px;
      font-family: 微软雅黑;
      font-weight: bold;
      color: #d0021b;
      line-height: 40px;
      padding-left: 10px;
    }
  }
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
}
</style>
