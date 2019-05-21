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
              <el-dialog
                :visible.sync="firstVisible"
                title="初审"
                width="50%"
                :close-on-click-modal="false"
              >
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
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { auditList, firstAuditReplace } from "../../api/scholar";
import formatDate from "../../utils/formatDate";
import mixins from "./mixins";
import socketMixins from "./socketMixins";
export default {
  mixins: [mixins, socketMixins],
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

    getList() {
      auditList({
        role: "1",
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
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      firstVisible: false,
      params: {},
      formdata: [],
      formatDate: formatDate,
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