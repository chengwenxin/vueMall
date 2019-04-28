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
            <el-table :data="formdata" border stripe mutiple>
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column align="center" prop="number" label="序号">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
            </el-table>
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
import { profileApplyList } from "../../api/scholar.js";
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      profileApplyList()
        .then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data: function() {
    return {
      formdata: [],
      menu: [
        { label: "个人信息", path: "/profile" },
        { label: "申请状态", path: "/profile/applystatus" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
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
    }
  }
}

</style>
