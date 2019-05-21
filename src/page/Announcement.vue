<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header ></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">


         <el-form :inline="true" :model="queryData" class="demo-form-inline" style="margin-left:40px;">
            <el-form-item label="项目名称：">
              <el-input v-model="queryData.user" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="院系：">
              <el-select v-model="queryData.region" placeholder="请选择院系">
                <el-option label="信息工程学院" value="shanghai"></el-option>
                <el-option label="动物科技学院" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="年级：">
              <el-select v-model="queryData.region" placeholder="请选择院系">
                <el-option label="大一" value="shanghai"></el-option>
                <el-option label="大二" value="beijing"></el-option>
                <el-option label="研究生" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
            </el-form-item>
          </el-form>


          <cwx-slide-content-item title="通知公告" :list="list"></cwx-slide-content-item>
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
import { getAnnouncementList } from "../api/scholar.js";
import formatDate from "../utils/formatDate"
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getAnnouncementList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.list = data.content.filter(item => (item.detailDate <= formatDate(new Date())))
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
      queryData:{},
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
