<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="学生资助"></cwx-sort-main>
        <cwx-sort-left></cwx-sort-left>
        <cwx-sort-right>
          <ul>
            <li
              v-for="item in list.slice(0,10)"
              :key="item.id"
              style="font-size: 14px;color: #000000;text-decoration: none;"
            >
              <span>{{item.update_date}}</span>
              <router-link :to="item.path+'/'+item.id">{{item.title}}</router-link>
            </li>
          </ul>
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.home {
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
