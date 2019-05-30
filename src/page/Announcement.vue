<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">
          <el-form :inline="true" :model="queryData" ref="queryDataRef" style="margin-left:40px;">
            <el-form-item label="项目名称：" prop="category">
              <el-select filterable v-model="queryData.category" placeholder="请输入项目名称">
                <el-option
                  v-for="(item,index) in categoryList"
                  :key="index"
                  :label="item.title"
                  :value="item.title"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="院系：" prop="college">
              <el-select clearable filterable v-model="queryData.college" placeholder="请选择院系">
                <el-option
                  v-for="(item,index) in collegeList"
                  :key="index"
                  :label="item.college"
                  :value="item.college"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="年级：" prop="grade">
              <el-select clearable filterable v-model="queryData.grade" placeholder="请选择年级">
                <el-option
                  v-for="(item,index) in gradeList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
              <el-button @click="onReset">重置</el-button>
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
import formatDate from "../utils/formatDate";
export default {
  mounted() {
    this.getList();
  },
  methods: {
    onReset() {
      this.$refs["queryDataRef"].resetFields();
    },
    onSubmit() {
      this.getList();
    },
    parseTime(date) {
      let time =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + (date.getDate() + 1)).slice(-2) +
        " " +
        ("0" + (date.getHours() + 1)).slice(-2) +
        ":" +
        ("0" + (date.getMinutes() + 1)).slice(-2) +
        ":" +
        ("0" + (date.getSeconds() + 1)).slice(-2);
      return time;
    },
    getList() {
      let now = new Date();

      let endTime = this.parseTime(now);
      getAnnouncementList(
        Object.assign(
          { currentPage: this.currentPage, pageSize: this.pageSize, endTime },
          this.queryData
        )
      )
        .then(data => {
          this.list = data.content.filter(
            item => item.detailDate <= formatDate(new Date())
          );
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
      collegeList: JSON.parse(window.localStorage.collegeEnum),
      categoryList: JSON.parse(window.localStorage.categoryEnum),
      // gradeList: JSON.parse(window.localStorage.gradeEnum),
      queryData: {
        category: "",
        college: ""
        // grade: ""
      },
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
