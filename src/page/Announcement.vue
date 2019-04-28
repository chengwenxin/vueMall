<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="通知公告"></cwx-sort-main>
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
import { getAnnouncementList } from "../api/scholar.js";
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getAnnouncementList()
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

</style>
