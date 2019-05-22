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
                <el-form-item label="项目名称：">
                  <el-select clearable v-model="queryData.category" placeholder="请选择项目名称">
                    <el-option
                      v-for="(item,index) in categoryList1"
                      :key="index"
                      :label="item.title"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="院系：">
                  <el-select clearable v-model="queryData.college" placeholder="请选择院系">
                    <el-option
                      v-for="(item,index) in collegeList"
                      :key="index"
                      :label="item.college"
                      :value="item.college"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名：">
                  <el-input v-model="queryData.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="releaseVisible"
                    style="background:#438F48;"
                  >发布获奖公告</el-button>
                  <el-button type="primary" @click="exportFile" style="background:#438F48;">导出</el-button>
                </el-form-item>
              </el-form>

              <!-- <el-button @click="releaseVisible = true" type="success">发布获奖公告</el-button>
              <el-button type="success" @click="exportFile">导 出</el-button>-->
              <!-- <a href="http://127.0.0.1:8081/api/file/what.xlsx" ref="filePath">下载</a> -->
              <div v-if="releaseVisible">
                <el-dialog
                  title="发布获奖公告"
                  :visible.sync="releaseVisible"
                  width="50%"
                  :model="releaseData"
                  :inline="true"
                >
                  <el-form :model="releaseData" label-width="120px">
                    <el-form-item label="资助项目：" prop="category">
                      <el-select v-model="releaseData.category" style="width:300px;">
                        <el-option
                          v-for="item in categoryList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标题：" prop="title">
                      <el-input
                        v-model="releaseData.title"
                        style="width:300px;"
                        placeholder="请输入标题"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="作者：" prop="author">
                      <el-input v-model="releaseData.author" style="width:300px;"></el-input>
                    </el-form-item>

                    <el-form-item label="发布日期：" prop="detailDate">
                      <el-date-picker
                        style="width:300px;"
                        :clearable="false"
                        type="date"
                        value-format="yyyy-MM-dd"
                        v-model="releaseData.detailDate"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="公示期：" prop="author">
                      <el-input v-model.number="releaseData.publicDay" style="width:100px;"></el-input>天
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="releaseVisible = false">取 消</el-button>
                    <el-button type="success" @click="releaseListClick">发 布</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
            <cwx-audit-table :formdata="formdata" type="secondAudit" @secondAudit="secondAudit"></cwx-audit-table>
            <el-pagination
              :total="totalCount"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              @current-change="currentChange"
              @size-change="sizeChange"
              layout="total,sizes, prev, pager, next ,jumper"
            ></el-pagination>

            <div v-if="secondVisible">
              <el-dialog
                :visible.sync="secondVisible"
                title="复审"
                width="50%"
                :close-on-click-modal="false"
              >
                <el-form :model="params" label-width="140px">
                  <el-form-item prop="secondAuditStatus" label="初审状态:">
                    <el-select v-model="params.secondAuditStatus">
                      <el-option v-for="item in ['复审通过','复审驳回']" :key="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="secondResponse" label="初审回复:" show-overflow-tooltip>
                    <el-input
                      v-model="params.secondResponse"
                      type="textarea"
                      :autosize="{minRows:3}"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="secondVisible = false">取 消</el-button>
                  <el-button type="success" @click="secondAuditSubmit">确 定</el-button>
                </span>
              </el-dialog>
            </div>
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
import { addPolicy, exportExcel } from "../../api";
import { auditList, secondAuditReplace } from "../../api/scholar";
import formatDate from "../../utils/formatDate";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    this.getList();
    this.releaseData = Object.assign({}, this.releaseData, {
      detailDate: this.defaultValue(),
      author: this.name
    });
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    number() {
      return this.$store.state.number;
    },
    role() {
      return this.$store.state.role;
    }
  },
  methods: {
    onSubmit() {},
    // 文件导出功能
    exportFile() {
      exportExcel({ category: this.queryData.category }).then(data => {
        if (data.status === "1") {
          this.filePath = data.path;
          this.$message.success("导出成功！");
          let a = document.createElement("a");
          a.href = this.filePath;
          document.body.appendChild(a);
          a.download = this.filePath;
          a.click();
        }
      });
    },
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.query();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    //默认日期
    defaultValue() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
      return "" + year + "-" + month + "-" + day;
    },
    //发布提交
    releaseListClick() {
      this.releaseVisible = false;
      let update_date = this.releaseData.detailDate.slice(5);
      let list = [];
      let isList = false;
      list = this.formdata.filter(item => item.firstAuditStatus === "初审通过");
      isList = list.every(item => item.secondAuditStatus !== "");
      if (isList) {
        list = list.filter(
          item =>
            item.secondAuditStatus === "复审通过" &&
            item.category === this.releaseData.category
        );
        if (list.length > 0) {
          window.localStorage.setItem("scholarList", JSON.stringify(list));
          Object.assign(this.releaseData, {
            update_date,
            type: "通知公告",
            content: "0"
          });
          addPolicy(this.releaseData)
            .then(data => {
              this.$message.success("发布成功！");
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        } else {
          this.$message.error("发布名单为空，无法发布！");
        }
      } else {
        this.$message.error("还有申请未复审，无法发布！");
      }
    },
    secondAuditSubmit() {
      let secondAuditDate = new Date();
      secondAuditDate = formatDate(secondAuditDate);
      this.params = Object.assign({}, this.params, {
        secondAuditDate,
        secondAudit: this.name,
        secondAuditNumber: this.number
      });
      secondAuditReplace(this.params)
        .then(data => {
          this.getList();
          this.secondVisible = false;
          this.$message.success("复审完成");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //弹窗
    secondAudit(val) {
      this.secondVisible = true;
      this.params = val;
    },
    getList() {
      auditList({
        role: "2",
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
        .then(data => {
          if (data.status === "1") {
            this.formdata = data.content;
            this.totalCount = data.totalCount;
            let categoryList = [];
            this.formdata.forEach(item => {
              categoryList.push(item.category);
            });
            this.categoryList = Array.from(new Set(categoryList));
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
      filePath: "",
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      secondVisible: false,
      params: {
        type: "",
        title: "",
        author: "",
        detailDate: "",
        content: "",
        secondResponse: ""
      },
      queryData: {
        category:'',
        college:'',
        name:''
      },
      categoryList: [],
      formdata: [],
      formatDate: formatDate,
      releaseVisible: false,
      releaseData: {},
      collegeList: JSON.parse(window.localStorage.collegeEnum),
      categoryList1: JSON.parse(window.localStorage.categoryEnum)
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
<style>
.el-dialog__header {
  background: #67c23a;
  color: #ffffff;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 20px;
  color: #ffffff;
}
</style>