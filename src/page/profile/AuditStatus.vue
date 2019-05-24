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
                ref="tableRef"
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
                <el-form-item label="专业：" prop="major">
                  <el-input v-model="queryData.major" clearable placeholder="请输入专业"></el-input>
                </el-form-item>
                <el-form-item label="班级：" prop="grade">
                  <el-input v-model="queryData.grade" clearable placeholder="请输入班级"></el-input>
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
                  <el-form-item label="初审状态：" prop="firstAuditStatus">
                    <el-select v-model="queryData.firstAuditStatus" clearable placeholder="请选择初审状态">
                      <el-option label="初审通过" value="初审通过"></el-option>
                      <el-option label="初审驳回" value="初审驳回"></el-option>
                    </el-select>
                  </el-form-item>
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
                    >发布获奖公告</el-button>
                    <el-button
                      type="primary"
                      @click="exportVisible = true"
                      style="background:#438F48;"
                    >导出</el-button>
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
            </div>

            <cwx-audit-table :formdata="formdata" type="firstAudit" @firstAudit="firstAudit"></cwx-audit-table>
            <el-pagination
              :total="totalCount"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              @current-change="currentChange"
              @size-change="sizeChange"
              layout="total,sizes, prev, pager, next ,jumper"
            ></el-pagination>

            <div v-if="firstVisible">
              <el-dialog :visible.sync="firstVisible" width="50%" :close-on-click-modal="false">
                <div slot="title">
                  <span style="color:#fff;font-weight:bold;font-size:24px;">初审</span>
                </div>
                <el-form :model="params" label-width="140px">
                  <el-form-item prop="firstAuditStatus" label="初审状态:">
                    <el-select v-model="params.firstAuditStatus">
                      <el-option v-for="item in ['初审通过','初审驳回']" :key="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="firstResponse" label="初审回复:" show-overflow-tooltip>
                    <el-input
                      v-model="params.firstResponse"
                      type="textarea"
                      :autosize="{minRows:3}"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="firstVisible = false">取 消</el-button>
                  <el-button type="success" @click="firstAuditSubmit">确 定</el-button>
                </span>
              </el-dialog>
            </div>
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
                <span style="color:#fff;font-weight:bold;font-size:24px;">发布获奖公告</span>
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
                  <el-input v-model="releaseData.title" style="width:300px;" placeholder="请输入标题"></el-input>
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
                  <el-select clearable v-model="releaseData.college" placeholder="请选择院系" disabled>
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
  firstAuditReplace,
  addAnnouncementTable
} from "../../api/scholar";
import formatDate from "../../utils/formatDate";
import mixins from "./mixins";
import socketMixins from "./socketMixins";
export default {
  mixins: [mixins, socketMixins],
  mounted() {
    this.getList();
    this.releaseData = Object.assign({}, this.releaseData, {
      detailDate: this.defaultValue(),
      author: this.name,
      college: this.college
    });
    console.log(this.releaseData);
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    college() {
      return this.$store.state.college;
    }
  },
  methods: {
    // 文件导出功能
    exportFile() {
      exportExcel({ category: this.exportCategory,college:this.college ,status:'初审通过'}).then(data => {
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
      list = this.formdata;
      isList = list.every(item => item.firstAuditStatus !== "");
      console.log(list);
      if (isList) {
        list = list.filter(
          item =>
            item.firstAuditStatus === "初审通过" &&
            item.category === this.releaseData.category
        );
        console.log(list);
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
            title:
              this.releaseData.category + "初审名单公示(" + this.college + ")"
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
    //切换分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.query();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    firstAuditSubmit() {
      let firstAuditDate = new Date();
      firstAuditDate = formatDate(firstAuditDate);
      this.params = Object.assign({}, this.params, { firstAuditDate });
      firstAuditReplace(this.params)
        .then(data => {
          this.getList();
          this.firstVisible = false;
          this.$message.success("初审完成");
          //实时推送
          this.firstAuditSend(this.params);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //弹窗
    firstAudit(val) {
      this.firstVisible = true;
      this.params = val;
    },
    onSubmit() {
      this.getList(
        this.queryData.category,
        this.queryData.number,
        this.queryData.name,
        this.queryData.major,
        this.queryData.grade,
        this.queryData.firstAuditStatus,
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
      firstAuditStatus = "",
      secondAuditStatus = ""
    ) {
      auditList({
        role: "1",
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        category,
        number,
        name,
        major,
        grade,
        firstAuditStatus,
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
      releaseData: {
        title: ""
      },
      releaseVisible: false,
      categoryList: JSON.parse(window.localStorage.categoryEnum),
      isDown: true,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      firstVisible: false,
      params: {
        firstResponse: ""
      },
      formdata: [],
      formatDate: formatDate,
      queryData: {
        major: "",
        grade: "",
        number: "",
        name: "",
        category: "",
        firstAuditStatus: "",
        secondAuditStatus: ""
      }
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