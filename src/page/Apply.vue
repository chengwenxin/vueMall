<template>
  <div class="policy">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="学生资助"></cwx-sort-main>
        <div style="float:left;width:100%;min-height:645px;">
          <div style="width:90%;margin:0 auto;padding-top:20px;">
            <el-steps :active="active" finish-status="success">
              <el-step title="步骤 1"></el-step>
              <el-step title="步骤 2"></el-step>
              <el-step title="步骤 3"></el-step>
              <el-step title="步骤 4"></el-step>
              <el-step title="步骤 5"></el-step>
              <el-step title="步骤 6"></el-step>
            </el-steps>
            <div v-if="active > -1" style="width:100%;height:500px;border:1px solid ;margin-top:20px;">what</div>
            <div style="width:100%;text-align:center">
              <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
            </div>
          </div>
        </div>
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
    getList() {},
    next() {
      if (this.active++ > 5) {
        this.active = 0;
      }
    }
  },
  data: function() {
    return {
      list: [],
      active: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.policy {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .header,
    .main {
      position: relative;
    }
  }
}
</style>
