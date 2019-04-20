<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="工作动态"></cwx-sort-main>
        <cwx-sort-left></cwx-sort-left>
        <cwx-sort-right>
          <cwx-slide-content-item paddingleft="padding-left:18px" :list="list"></cwx-slide-content-item>
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkingtList } from "../api/scholar.js";
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getWorkingtList()
        .then(data => {
          this.list = data.content || [];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data: function() {
    return {
      list: []
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .main {
     //height: 660px;
    }
    .header,
    .main {
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
