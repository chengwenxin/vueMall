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
                ref="tableRef"
              >
                <el-form-item label="项目名称：" prop="category">
                  <el-select
                    clearable
                    filterable
                    v-model="queryData.category"
                    placeholder="请选择项目名称"
                  >
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
                <el-form-item>
                  <el-button type="text" @click="isDown=!isDown">
                    更多查询
                    <i :class="{'el-icon-arrow-down':isDown,'el-icon-arrow-up':!isDown}"></i>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" style="background:#438F48;">检索</el-button>
                  <el-button type="primary" @click="onReset" style="background:#438F48;">重置</el-button>
                </el-form-item>

                <div v-show="!isDown">
                  <el-form-item label="复审状态：" prop="secondAuditStatus">
                    <el-select
                      v-model="queryData.secondAuditStatus"
                      clearable
                      placeholder="请选择复审状态"
                    >
                      <el-option label="复审通过" value="复审通过"></el-option>
                      <el-option label="复审驳回" value="复审驳回"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="专业：" prop="major">
                    <el-input v-model="queryData.major" clearable placeholder="请输入专业"></el-input>
                  </el-form-item>
                  <el-form-item label="班级：" prop="grade">
                    <el-input v-model="queryData.grade" clearable placeholder="请输入班级"></el-input>
                  </el-form-item>

                  <el-form-item label="学号：" prop="number">
                    <el-input v-model="queryData.number" clearable placeholder="请输入学号"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名：" prop="name">
                    <el-input v-model="queryData.name" clearable placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </div>
                <el-row>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="releaseVisible = true"
                      style="background:#438F48;"
                    >发布复审获奖公告</el-button>
                    <el-button
                      type="primary"
                      @click="exportVisible = true"
                      style="background:#438F48;"
                    >导出名单</el-button>
                  </el-form-item>
                </el-row>
              </el-form>

              <div v-if="exportVisible">
                <el-dialog
                  :visible.sync="exportVisible"
                  width="40%"
                  :model="releaseData"
                  :inline="true"
                  center
                >
                  <div slot="title">
                    <span style="color:#fff;font-weight:bold;font-size:24px;">导出获奖名单</span>
                  </div>
                  <el-form label-width="120px">
                    <el-form-item label="导出资助项目：" prop="category">
                      <el-select v-model="exportCategory" style="width:300px;">
                        <el-option
                          v-for="(item,index) in categoryList"
                          :key="index"
                          :label="item.title"
                          :value="item.title"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="exportVisible = false">取 消</el-button>
                    <el-button type="success" @click="exportFile">发 布</el-button>
                  </span>
                </el-dialog>
              </div>

              <div v-if="releaseVisible">
                <el-dialog
                  :visible.sync="releaseVisible"
                  width="50%"
                  :model="releaseData"
                  :inline="true"
                  center
                >
                  <div slot="title">
                    <span style="color:#fff;font-weight:bold;font-size:24px;">发布复审获奖公告</span>
                  </div>
                  <el-form :model="releaseData" label-width="120px">
                    <el-form-item label="资助项目：" prop="category">
                      <el-select v-model="releaseData.category" style="width:300px;">
                        <el-option
                          v-for="(item,index) in categoryList"
                          :key="index"
                          :label="item.title"
                          :value="item.title"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="标题：" prop="title">
                      <el-input
                        v-model="releaseData.title"
                        style="width:300px;"
                        placeholder="请输入标题"
                      ></el-input>
                    </el-form-item>-->
                    <el-form-item label="作者：" prop="author">
                      <el-input v-model="releaseData.author" style="width:300px;"></el-input>
                    </el-form-item>

                    <el-form-item label="发布日期：" prop="detailDate">
                      <el-date-picker
                        style="width:300px;"
                        clearable
                        type="date"
                        value-format="yyyy-MM-dd"
                        v-model="releaseData.detailDate"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="公示期：" prop="validTime">
                      <el-date-picker
                        :clearable="false"
                        type="datetimerange"
                        v-model="releaseData.validTime"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="院系：" prop="college">
                      <el-select
                        clearable
                        multiple
                        v-model="releaseData.college"
                        placeholder="请选择院系"
                      >
                        <el-option
                          v-for="(item,index) in collegeList"
                          :key="index"
                          :label="item.college"
                          :value="item.college"
                        ></el-option>
                      </el-select>
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
              <el-dialog :visible.sync="secondVisible" width="50%" :close-on-click-modal="false">
                <div slot="title">
                  <span style="color:#fff;font-weight:bold;font-size:24px;">复审</span>
                </div>
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
import {
  auditList,
  secondAuditReplace,
  addAnnouncementTable
} from "../../api/scholar";
import formatDate from "../../utils/formatDate";
import mixins from "./mixins";
import AnnouncementVue from "../Announcement.vue";
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
    // 文件导出功能
    exportFile() {
      exportExcel({ category: this.exportCategory,status:'复审通过' }).then(data => {
        if (data.status === "1") {
          this.filePath = data.path;
          this.$message.success("导出成功！");
          let a = document.createElement("a");
          a.href = this.filePath;
          document.body.appendChild(a);
          a.download = this.filePath;
          a.click();
          this.exportVisible = false
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
          //学号  项目名称  就可以联查
          //将获奖的信息插入表内    项目 金额 （奖助学条件定制表）  学院  学号（个人信息表）   审核表   三个表联查！！！
          // window.localStorage.setItem("scholarList", JSON.stringify(list));
          let date = new Date();
          addAnnouncementTable({ list, year: date.getFullYear() })
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });

          Object.assign(this.releaseData, {
            update_date,
            type: "通知公告",
            content: "0",
            title: this.releaseData.category + "复审名单公示"
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
    onSubmit() {
      this.getList(
        this.queryData.category,
        this.queryData.number,
        this.queryData.name,
        this.queryData.major,
        this.queryData.grade,
        this.queryData.college,
        this.queryData.secondAuditStatus
      );
    },
    onReset() {
      this.$refs["tableRef"].resetFields();
    },

    getList(
      category = "",
      number = "",
      name = "",
      major = "",
      grade = "",
      college = "",
      secondAuditStatus = ""
    ) {
      auditList({
        role: "2",
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        category,
        number,
        name,
        major,
        grade,
        college,
        secondAuditStatus
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
      exportVisible: false,
      exportCategory: "",
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
      isDown: true,
      queryData: {
        major: "",
        grade: "",
        number: "",
        name: "",
        category: "",
        firstAuditStatus: "",
        secondAuditStatus: ""
      },
      formdata: [],
      formatDate: formatDate,
      releaseVisible: false,
      releaseData: {},
      collegeList: JSON.parse(window.localStorage.collegeEnum),
      categoryList: JSON.parse(window.localStorage.categoryEnum)
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