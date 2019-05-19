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
            <div style="margin:10px;">
              <el-button @click="releaseVisible = true" type="success">发布获奖公告</el-button>

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
                      <el-select v-model="releaseData.category">
                        <el-option
                          v-for="item in ['最新政策','123','1']"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标题：" prop="title">
                      <el-input v-model="releaseData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作者：" prop="author">
                      <el-input v-model="releaseData.author"></el-input>
                    </el-form-item>

                    <el-form-item label="发布日期：" prop="detailDate">
                      <el-date-picker
                        :clearable="false"
                        type="date"
                        value-format="yyyy-MM-dd"
                        v-model="releaseData.detailDate"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="releaseVisible = false">取 消</el-button>
                    <el-button type="success" @click="releaseListClick">发 布</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
            <!-- <el-table :data="formdata" border stripe mutiple>
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column align="center" prop="number" label="序号">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column sortable align="center" prop="category" label="资助项目"></el-table-column>
              <el-table-column sortable align="center" prop="number" label="申请学号"></el-table-column>
              <el-table-column sortable align="center" prop="name" label="申请人"></el-table-column>
              <el-table-column
                sortable
                align="center"
                prop="applyDate"
                label="申请时间"
                min-width="200"
              >
              </el-table-column>
              <el-table-column sortable align="center" prop="firstAuditStatus" label="初核状态"></el-table-column>
              <el-table-column sortable align="center" prop="firstAudit" label="初审人"></el-table-column>
              <el-table-column
                align="center"
                prop="firstResponse"
                label="初审回复"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                sortable
                align="center"
                prop="firstAuditDate"
                label="初审时间"
                min-width="200"
              ></el-table-column>
              <el-table-column sortable align="center" prop="secondAuditStatus" label="复核状态"></el-table-column>
              <el-table-column sortable align="center" prop="secondAudit" label="复审人"></el-table-column>
              <el-table-column
                align="center"
                prop="secondResponse"
                label="复审回复"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                sortable
                align="center"
                prop="secondAuditDate"
                label="复审时间"
                min-width="200"
              ></el-table-column>
              <el-table-column align="center" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="secondAudit(scope.row)">复审</el-button>
                </template>
              </el-table-column>
            </el-table>-->
            <cwx-audit-table :formdata="formdata" type="secondAudit" @secondAudit="secondAudit"></cwx-audit-table>

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
import { addPolicy } from "../../api";
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
    }
  },
  methods: {
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
      // let content = "";
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
              this.$message.success(data.msg);
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
        secondAudit: this.name
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
      auditList({ role: "2" })
        .then(data => {
          if (data.status === "1") {
            this.formdata = data.content.filter(
              item => item.firstAuditStatus === "初审通过"
            );
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
      secondVisible: false,
      params: {
        type: "",
        title: "",
        author: "",
        detailDate: "",
        content: "",
        secondResponse: ""
      },
      formdata: [],
      formatDate: formatDate,
      releaseVisible: false,
      releaseData: {}
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