<template>
  <div class="policy">
    <div class="container">
      <div class="header">
        <cwx-header :menu="policyMenu"></cwx-header>
      </div>
      <div class="main">
        <!-- <cwx-sort-main title="学生资助"></cwx-sort-main> -->
        <!-- <cwx-sort-left></cwx-sort-left> -->
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">

          <el-form :inline="true" ref="queryDataRef" :model="queryData" class="demo-form-inline" style="margin-left:40px;">
            <el-form-item label="项目名称：" prop="category">
              <el-select clearable  v-model="queryData.category" placeholder="请选择项目名称">
                <el-option v-for="(item,index) in categoryList" :key="index" :label="item.title" :value="item.title"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="院系：" prop="college">
              <el-select clearable v-model="queryData.college" placeholder="请选择院系">
                <el-option v-for="(item,index) in collegeList" :key="index" :label="item.college" :value="item.college"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级：" prop="grade">
              <el-select clearable v-model="queryData.grade" placeholder="请选择年级">
                <el-option v-for="(item,index) in ['本科生','研究生','14级','15级','16级','17级','18级']" :key="index" :label="item" :value="item"></el-option>          
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>

          <cwx-slide-content-item title="奖助学金政策" :list="list"></cwx-slide-content-item>

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
import { getScholarList } from "../api/scholar.js";
import formatDate from "../utils/formatDate";
import mixins from './profile/mixins.js'
export default {
  mixins:[mixins],
  computed:{
  policyMenu(){
    let isLogin =  this.$store.state.login
    return isLogin?this.menuc:[]
  }
  },
  mounted() {
    this.getList();
  },
  methods: {
    onReset(){
      this.$refs["queryDataRef"].resetFields();
    },
    //提交搜索
    onSubmit(){
      this.getList()
    },
    getList() {
      getScholarList(Object.assign({ currentPage: this.currentPage, pageSize: this.pageSize },this.queryData))
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
      queryData:{
       category:'',
       college:'',
       grade:''
      },
      list: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      collegeList:JSON.parse(window.localStorage.collegeEnum),
      categoryList:JSON.parse(window.localStorage.categoryEnum),
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
