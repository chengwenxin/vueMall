<template>
  <div class="article">
    <template v-if="detail.isApply === '允许申请'">
      <el-button type="success" @click="apply" style="float:right;margin-right:20px;">在线申请</el-button>
      <!-- <input @click="apply" type="button" style="float:right;margin-right:20px;color:#fff;background-color:#078f48;font-size:18px;padding:5px;font-weight:bold;" value="在线申请"> -->
    </template>
    <h1
      style="font-size: 22px;font-family:'微软雅黑';color:#078f48;text-align:center;padding-top:20px;font-weight:bold;"
    >{{detail.title}}</h1>

    <div class="line"></div>
    <h2
      class="cont_h2"
    >作者：{{detail.author}} &nbsp;&nbsp;&nbsp;发布日期：{{detail.detailDate}}&nbsp;&nbsp;&nbsp; 浏览次数：{{detail.reading_times}}</h2>
    <div v-if="detail.content === '0'" style="width:100%;padding:30px;">
      <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
        <el-table-column align="center" prop="category" label="资助项目" ></el-table-column>
        <el-table-column align="center" prop="number" label="资助金额" width="100">
          <template>
            {{6000}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="number" label="学号" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column align="left" prop="secondAuditStatus" label="审核详情" width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.$index)">审核详情</el-button>
            <div v-if="auditVisible[scope.$index]">
              <el-dialog width="50%" title="审核详情" :visible.sync="auditVisible[scope.$index]" align="center">
                <!-- {{scope.row.name}} -->
                <div class="block">
                  <el-timeline align="left">
                    <el-timeline-item :timestamp="scope.row.applyDate" placement="top">
                      <el-card>
                        <h3 class="h3-class">提交申请</h3>
                        <p>{{scope.row.name}} 提交了资助申请</p>
                      </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="scope.row.firstAuditDate"  placement="top">
                      <el-card>
                        <h3  class="h3-class">初审详情</h3>
                        <p>{{scope.row.firstAudit}} 初审了 {{scope.row.name}} 的申请   </p>
                        <p>初审结果：{{scope.row.firstAuditStatus}}</p>
                        <p>初审回复：{{scope.row.firstResponse}}</p>
                      </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="scope.row.secondAuditDate" placement="top">
                      <el-card>
                        <h3  class="h3-class">复审详情</h3>
                        <p>{{scope.row.secondAudit}} 复审了 {{scope.row.name}} 的申请    </p>
                        <p>复审结果：{{scope.row.secondAuditStatus}}</p>
                        <p>复审回复：{{scope.row.secondResponse}}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div class="cont" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import { auditList } from "../api/scholar";
export default {
  props: ["detail", "width"],
  data: function() {
    return {
      tableData: JSON.parse(window.localStorage.getItem("scholarList")),
      auditVisible: [false]
    };
  },
    methods: {
    handleClick(val){
       this.$set(this.auditVisible,val,true)
    },
    apply() {
      auditList({ category: this.detail.title })
        .then(data => {
          if (data.status === "0") {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.status === "1") {
            this.$router.push(
              "/apply/" + this.detail.id + "/" + this.detail.title
            );
          } else if (data.status === "2") {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.article {
  padding: 8px;
  clear: both;
  margin-bottom: 20px;
  .h3-class{
    margin-bottom:5px;
    color:#078F48; 
  }
  .line {
    width: 820px;
    border-bottom: 1px solid #d6d6d6;
    margin-left: 20px;
    margin-top: 30px;
  }
  .cont_h2 {
    font-size: 14px;
    font-family: "微软雅黑";
    color: #333333;
    text-align: center;
    font-weight: normal;
    padding-top: 10px;
  }
  .cont {
    clear: both;
    width: 820px;
    color: #333333;
    padding: 20px;
  }
}
</style>
