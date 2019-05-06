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
          <el-pagination
            :total="totalCount"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="total,sizes, prev, pager, next ,jumper"
          ></el-pagination>
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
      getWorkingtList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.list = data.content;
          this.totalCount = data.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.getList();
    }
  },
  data: function() {
    return {
      list: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10
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
</style>
