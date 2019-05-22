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
              <el-form
                :inline="true"
                :model="queryData"
                class="demo-form-inline"
                style="margin-left:40px;"
              >
                <el-form-item label="项目名称：" prop="category">
                  <el-select clearable v-model="queryData.category" placeholder="请选择项目名称">
                    <el-option
                      v-for="(item,index) in categoryList"
                      :key="index"
                      :label="item.title"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="初审状态：">
              <el-select v-model="queryData.firstAuditStatus" clearable  placeholder="请选择初审状态">
                <el-option label="初审通过" value="初审通过"></el-option>
                <el-option label="初审驳回" value="初审驳回"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="复审状态：">
             <el-select v-model="queryData.secondAuditStatus" clearable placeholder="请选择复审状态">
                <el-option label="复审通过" value="复审通过"></el-option>
                <el-option label="复审驳回" value="复审驳回"></el-option>
              </el-select>
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
            this.totalCount = data.totalCount;
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
      categoryList:JSON.parse(window.localStorage.categoryEnum),
      formdata: [],
      formatDate: formatDate,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      queryData: {}
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
