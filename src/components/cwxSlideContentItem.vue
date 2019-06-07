<template>
  <div class="slide-content">
    <div v-if="title==='奖助学金政策'">
      <el-table :data="list" border stripe>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="项目名称" show-overflow-tooltip width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePolicyTo(scope.row.id)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="college" label="可申请院系" width="120"></el-table-column>
        <el-table-column align="center" prop="grade" label="可申请年级" width="120"></el-table-column>
        <el-table-column align="center" prop="startTime" label="申请开始时间" width="120"></el-table-column>
        <el-table-column align="center" prop="endTime" label="申请截止时间" sortable width="140"></el-table-column>
        <el-table-column align="center" prop="auditTime" label="评审时间" width="120"></el-table-column>
        <el-table-column align="center" prop="announcementTime" label="名单公示时间" width="120"></el-table-column>
        <el-table-column align="center" prop="detailDate" label="发布日期" width="120"></el-table-column>
        <el-table-column align="center" label="操作" sortable>
          <template slot-scope="scope">
            <div v-if="applyButton(scope.row) === '在线申请'">
              <el-button
                size="small"
                type="success"
                @click="handleApply(scope.row)"
              >{{applyButton(scope.row)}}</el-button>
            </div>
            <div v-else>
              <el-button size="small" disabled>{{applyButton(scope.row)}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="currentPath">
      <el-table :data="list" border stripe>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="项目名称" show-overflow-tooltip width="458">
          <template slot-scope="scope">
            <el-button type="text" @click="handleAnnouncentTo(scope.row.id)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="college" label="院系" width="120"></el-table-column>
        <el-table-column align="center" prop="startTime" label="公示开始时间" width="150"></el-table-column>
        <el-table-column align="center" prop="endTime" label="公示截止时间" width="150"></el-table-column>
        <el-table-column align="center" prop="author" label="发布人" width="100"></el-table-column>
        <el-table-column align="center" prop="detailDate" label="发布日期" width="150"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { auditList } from "../api/scholar";
export default {
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    title: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.state.login;
    },
        college() {
      return this.$store.state.college;
    },
        grade() {
      return this.$store.state.grade;
    },
      role() {
      return this.$store.state.role;
    },
    currentPath() {
      return this.$route.path === "/announcement";
    }
  },
  methods: {
    applyButton(val) {
      let { id, title, startTime, endTime } = val;
      let now = new Date();
      let temp = this.parseTime(now);
      if (temp > startTime && temp < endTime) {
        let temp="15;16;17;18"
         if(this.role !=='学生'){
           return "在线申请";
         }else if(val.college.includes(this.college) && val.grade.includes(this.grade)){
           return "在线申请";
         }else if(val.college.includes(this.college) && val.grade==="所有"){
           return "在线申请";
         }
         else if(val.college==='所有' || val.grade==="所有"){
           return "在线申请";
         }else if(val.grade.includes("本科生") && temp.includes(this.grade)){
           return "在线申请";
         }
         else{
            return "无资格申请"            
         }

      } else if (temp < startTime) {
        return "申请未开始";
      } else if (temp > endTime) {
        return "申请已截止";
      } else {
        return "无法申请";
      }
    },
    handleAnnouncentTo(id) {
      this.$router.push("/announcement/detail/" + id);
    },
    handlePolicyTo(id) {
      this.$router.push("/policy/detail/" + id);
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
    handleApply(val) {
      let { id, title } = val;
      auditList({ category: title })
        .then(data => {
          if (data.status === "0") {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.status === "1") {
            this.$router.push("/profile/apply/" + id + "/" + title);
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
<style lang="scss" >
.slide-content {
  ul {
    margin: 0px;
    padding: 0px;
    span {
      float: left;
      font-size: 15px;
      padding-right: 20px;
      color: #438f49;
    }
    li {
      list-style: none;
      background: url(../../static/bg_time1.png) no-repeat 2% 50%;
      border-bottom: 1px dashed #d8d8d8;
      font-size: 14px;
      line-height: 35px;
      border-bottom: 1px dashed #d8d8d8;
      padding-left: 10px;
      list-style-type: none;
      line-height: 35px;
    }
  }
}
</style>
