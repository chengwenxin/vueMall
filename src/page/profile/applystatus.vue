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
            <div style="margin:5px;">
  <el-form :inline="true" :model="queryData" class="demo-form-inline" style="margin-left:40px;">
            <el-form-item label="项目名称：">
              <el-select v-model="queryData.region" placeholder="请选择项目">
                <el-option label="信息工程学院" value="shanghai"></el-option>
                <el-option label="动物科技学院" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="院系：">
              <el-select v-model="queryData.region" placeholder="请选择院系">
                <el-option label="信息工程学院" value="shanghai"></el-option>
                <el-option label="动物科技学院" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名：">
               <el-input v-model="queryData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
            </el-form-item>
          </el-form>

</div>


            <cwx-audit-table :formdata="formdata"></cwx-audit-table>
            <el-pagination
              :total="totalCount"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              @current-change="currentChange"
              @size-change="sizeChange"
              layout="total,sizes, prev, pager, next ,jumper"
            ></el-pagination>
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
import { auditList } from "../../api/scholar";
import formatDate from "../../utils/formatDate";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    this.getList();
  },
  methods: {
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.query();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    //格式化申请日期
    // formateDate(applyDate){
    //   let date = new Date(applyDate)
    //   return date.toLocaleString()
    // },
    getList() {
      auditList({
        role: "0",
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
        .then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.totalCount

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
      formatDate: formatDate,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      queryData:{}
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
    }
  }
}
</style>
