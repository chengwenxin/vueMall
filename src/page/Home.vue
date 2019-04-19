<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <div style="width:550px;height:300px;float:left;margin:0 25px;">
          <el-carousel trigger="click" height="300px" width="550px">
            <el-carousel-item v-for="item in images" :key="item.src">
              <router-link :to="item.path">
                <img :src="item.src">
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </div>
        <cwx-slide-content title="通知公告" path="/" :list="noticeList"></cwx-slide-content>
        <cwx-slide-content title="工作动态" path="/" :list="noticeList"></cwx-slide-content>
        <cwx-slide-content title="资助政策" path="/policy" :list="noticeList"></cwx-slide-content>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { getScholarList } from "../api/scholar.js";
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getScholarList()
        .then(data => {
          this.noticeList = data.content || [];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data: function() {
    return {
      images: [
        { src: "../../static/1.jpg", path: "/goodslist" },
        { src: "../../static/2.jpg", path: "/goodslist" },
        { src: "../../static/3.jpg", path: "/goodslist" }
      ]
    };
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
