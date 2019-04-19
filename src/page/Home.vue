<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <div style="width:550px;height:300px;float:left;margin:0 25px;">
          <el-carousel
            trigger="click"
            height="300px"
            width="550px"
          >
            <el-carousel-item v-for="item in images" :key="item.src">
              <router-link :to="item.path"> <img :src="item.src" /></router-link>
            </el-carousel-item>
          </el-carousel>
        </div>
        <cwx-slide-content></cwx-slide-content>
        <cwx-slide-content></cwx-slide-content>
        <cwx-slide-content></cwx-slide-content>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:function(){
    return {
      images:[
        {src:'../../static/1.jpg',path:'/goodslist'},
        {src:'../../static/2.jpg',path:'/goodslist'},
        {src:'../../static/3.jpg',path:'/goodslist'},
      ]
    }
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .main {
      height: 600px;
    }
    .header,
    .main,
    .footer {
      position: relative;
    }
  }
}
</style>
