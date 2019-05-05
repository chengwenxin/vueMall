<template>
  <div class="profile">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="个人中心"></cwx-sort-main>
        <cwx-sort-left :menu="menu"></cwx-sort-left>
        <cwx-sort-right>
          <div>
            <el-tabs type="border-card" @tab-click="tabClick">
              <el-tab-pane label="资助政策">
                <div class="tab-item">
                  <cwx-table :formdata="policyList" @refresh="getList"  type="资助政策"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="工作动态">
                <div class="tab-item">
                  <cwx-table :formdata="workingtList" @refresh="getList"    type="工作动态"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="通知公告">
                <div class="tab-item">
                  <cwx-table :formdata="AnnouncementList"  @refresh="getList"   type="通知公告"></cwx-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="中心简介">
                <div class="tab-item">
                  <cwx-table :formdata="introduction"  @refresh="getList"   type="中心简介"></cwx-table>
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
import {
  getScholarList,
  getAnnouncementList,
  getWorkingtList,
  getIntroductionDetail
} from "../../api/scholar";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getScholarList()
        .then(data => {
          if (data.status === "1") {
            this.policyList = data.content;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
      getAnnouncementList().then(data => {
        this.AnnouncementList = data.content;
      });

      getWorkingtList().then(data => {
        this.workingtList = data.content;
      });

      getIntroductionDetail().then(data => {
        this.introduction = data.content;
      });
    },
    tabClick(val) {
      console.log(val);
    }
  },
  data: function() {
    return {
      policyList: [],
      AnnouncementList: [],
      workingtList: [],
      introduction: [],
    };
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
