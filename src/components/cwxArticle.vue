<template>
  <div class="article">
    <!-- <template v-if="detail.isApply === '允许申请'"> -->
    <!-- <el-button type="success" @click="apply" style="float:right;margin-right:20px;">在线申请</el-button> -->
    <!-- <input @click="apply" type="button" style="float:right;margin-right:20px;color:#fff;background-color:#438F49;font-size:18px;padding:5px;font-weight:bold;" value="在线申请"> -->
    <!-- </template> -->
    <h1
      style="font-size: 22px;font-family:'微软雅黑';color:#438F49;text-align:center;padding-top:20px;font-weight:bold;"
    >{{detail.title}}</h1>

    <div class="line"></div>
    <h2
      class="cont_h2"
    >作者：{{detail.author}} &nbsp;&nbsp;&nbsp;发布日期：{{detail.detailDate}}&nbsp;&nbsp;&nbsp; 浏览次数：{{detail.reading_times}}</h2>
    <div v-if="detail.content === '0'" style="width:100%;padding:30px;">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%" stripe>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="category" label="资助项目"></el-table-column>
        <el-table-column align="center" prop="money" label="资助金额" width="100">
        </el-table-column>
                <el-table-column align="center" prop="college" label="学院" width="120"></el-table-column>
        <el-table-column align="center" prop="major" label="专业" width="120"></el-table-column>
        <el-table-column align="center" prop="grade" label="班级" width="120"></el-table-column>
        <el-table-column align="center" prop="sno" label="学号" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column align="left" prop="secondAuditStatus" label="审核详情" width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row,scope.$index)">审核详情</el-button>

            <div v-if="auditVisible[scope.$index]">
              <el-dialog width="50%" :visible.sync="auditVisible[scope.$index]" center>
                <div slot="title">
                  <span style="color:#fff;font-weight:bold;font-size:24px;">审核详情</span>
                </div>
                <!-- {{AuditDetailList.name}} -->
                <div class="block">
                  <el-timeline align="left">
                    <el-timeline-item :timestamp="AuditDetailList.applyDate" placement="top">
                      <el-card>
                        <h3 class="h3-class">提交申请</h3>
                        <p>{{AuditDetailList.name}} 提交了资助申请</p>
                      </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="AuditDetailList.firstAuditDate" placement="top">
                      <el-card>
                        <h3 class="h3-class">初审详情</h3>
                        <p>{{AuditDetailList.firstAudit}} 初审了 {{AuditDetailList.name}} 的申请</p>
                        <p>初审结果：{{AuditDetailList.firstAuditStatus}}</p>
                        <p>初审回复：{{AuditDetailList.firstResponse}}</p>
                      </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="AuditDetailList.secondAuditDate" placement="top">
                      <el-card>
                        <h3 class="h3-class">复审详情</h3>
                        <p>{{AuditDetailList.secondAudit}} 复审了 {{AuditDetailList.name}} 的申请</p>
                        <p>复审结果：{{AuditDetailList.secondAuditStatus}}</p>
                        <p>复审回复：{{AuditDetailList.secondResponse}}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="font-size:16px;text-align:right;">
        <div style="width:500px;float:right;">
          <br>
          <p style="font-size:18px;font-weight:bold;">
            特此公示。公示期为
            <span style="color:red;">{{detail.startTime}}</span> 起至
            <span style="color:red;">{{detail.endTime}}</span>
          </p>
          <br>
          <p>如有疑问，请于公示期内联系学生处</p>
          <p>联系地址：北校区三号部1号楼115室</p>
          <p>联系电话：55664312</p>
          <p style="padding-right:28px;">联系人：张大彪</p>
          <br>
          <p>西北农林科技大学学生处</p>
          <p style="padding-right:28px;">{{rdate}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="cont" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import { auditList } from "../api/scholar";
import { applyDetail, getScholarship, queryAnnouncementTable ,applyDetailList,queryAuditList} from "../api";

export default {
  props: ["detail", "width"],
  data: function() {
    return {
      tableData: [],
      auditVisible: [false],
      loading:false,
      AuditDetailList:[]
    };
  },
  computed: {
    // rdate() {
    //   let date = this.detail.detailDate.split("-");
    //   return date[0] + "年" + date[1] + "月" + date[2] + "日";
    // },
    // ldate() {
    //   let week = [
    //     "星期日",
    //     "星期一",
    //     "星期二",
    //     "星期三",
    //     "星期四",
    //     "星期五",
    //     "星期六"
    //   ];
    //   let date = this.detail.detailDate.split("-");
    //   let today = new Date();
    //   today.setFullYear(date[0]);
    //   today.setMonth(date[1]);
    //   today.setDate(Number(date[2]) + 3);
    //   return (
    //     today.getFullYear() +
    //     "年" +
    //     today.getMonth() +
    //     "月" +
    //     today.getDate() +
    //     "日" +
    //     "(" +
    //     week[today.getDay()] +
    //     ")"
    //   );
    // }
  },
  watch: {
    detail() {
      if (this.detail.content === "0") {
        console.log(this.detail);
        this.getList();
      }
    }
  },
  methods: {
    getList() {
      let start = this.detail.title.indexOf('(')+1
      let end = this.detail.title.length -1 
      this.loading = true
      // 查出获奖学号
      queryAnnouncementTable({ category: this.detail.category }).then(data => {
        console.log("学号：", data);
        //查出奖学金信息
        let tableData = []
        getScholarship({ category: this.detail.category }).then(data1 => {
          let money =  data1.content[0].money
          // data.content.forEach((item,index) => {
            //多次查  或者查一次
            applyDetailList({
              snoList:data.content,
              category: this.detail.category,
            }).then(data2 => {
              data2.content.forEach(item =>{
                tableData.push(Object.assign({},item,{money}))
              })
              if(start > 0){
               let  college = this.detail.title.slice(start,end)
               this.tableData = tableData.filter(item => item.college === college)
              }else{
              this.tableData = tableData
              }
              this.loading=false
            });
        
        });
      });
    },
    handleClick(val,id) {
      this.$set(this.auditVisible, id, true);
      let {category,sno} = val
      queryAuditList({category,sno}).then(data =>{
         this.AuditDetailList = data.content
        //  this.$set(this.AuditDetailList,data.content,true)
      })
    },
    apply() {
      auditList({ category: this.detail.title })
        .then(data => {
          if (data.status === "0") {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.status === "1") {
            this.$router.push(
              "/profile/apply/" + this.detail.id + "/" + this.detail.title
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
  .h3-class {
    margin-bottom: 5px;
    color: #438f49;
  }
  .line {
    width: 1130px;
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
    width: 1100px;
    color: #333333;
    padding: 20px;
  }
}
</style>
