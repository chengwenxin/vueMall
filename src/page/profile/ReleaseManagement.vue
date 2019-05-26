<template>
  <div class="profile">
    <div class="container">
      <div class="header">
        <cwx-header :menu="menuc"></cwx-header>
      </div>
      <div class="main">
         <!-- <cwx-sort-main title="个人中心"></cwx-sort-main> -->
        <!-- <cwx-sort-left :menu="menu"></cwx-sort-left> -->
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">
          <div>
            <el-tabs type="border-card" @tab-click="tabClick">
              <el-tab-pane label="奖助学金项目">
                <div class="tab-item">
                  <cwx-table type="奖助学金项目"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="工作动态">
                <div class="tab-item">
                  <cwx-table type="工作动态"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="通知公告">
                <div class="tab-item">
                  <cwx-table type="通知公告"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="中心简介">
                <div class="tab-item">
                  <cwx-table type="中心简介"></cwx-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
  data: function() {
    return {};
  },
  methods: {
    tabClick(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" >
body .el-table th.gutter {
  display: table-cell !important;
}
.profile {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .header,
    .main {
      position: relative;
      .tab-item {
        width: 100%;
        min-height: 560px;
      }
    }
  }
}
</style>
