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
            <el-card>
              <el-form>
                <el-form-item>
                  <el-button type="success" @click="onBackup">备份数据库</el-button>

                  <el-button @click="onRecover" type="success">恢复数据库</el-button>
                </el-form-item>
              </el-form>
            </el-card>
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
import {
  baseInformation,
  updateInformation,
  getCollegeList,
  modifyPassword,
  logoutApi,
  recover,
  backup
} from "../../api";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    this.getList();
  },
  methods: {
    onRecover() {
      recover().then(data => {
        console.log(data);
        this.$message.success("数据库备份成功");
      });
    },
    onBackup() {
      backup().then(data => {
        console.log(data);
        this.$message.success("数据库恢复成功");
      });
    },

    getList() {
      //获取基本信息
      baseInformation()
        .then(data => {
          if (data.status === "1") {
            this.formData = data.content;
          } else {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
      //学院 专业 班级信息
      getCollegeList().then(data => {
        if (data.status === "1") {
          let collegeList = [];
          let majorList = [];
          let gradeList = [];
          this.allCollegeList = data.content;
          data.content.forEach(item => {
            collegeList.push(item.college);
            majorList.push(item.major);
            gradeList.push(item.grade);
          });
          this.collegeList = Array.from(new Set(collegeList));
          this.majorList = Array.from(new Set(majorList));
          this.gradeList = Array.from(new Set(gradeList));
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  },
  data: function() {
    let secondPasswordValid = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请再次输入新密码"));
      } else if (value !== this.formData1.newPassword) {
        cb(new Error("两次输入密码不一致"));
      } else {
        cb();
      }
    };
    return {
      formData1: {
        number: this.$store.state.number,
        password: "",
        newPassword: "",
        secondPassword: ""
      },
      rules: {
        password: {
          required: true,
          message: "请输入原密码"
        },
        newPassword: {
          required: true,
          message: "请输入新密码"
        },
        secondPassword: {
          validator: secondPasswordValid
        }
      },
      allCollegeList: [],
      collegeList: ["信息工程学院", "动物科技学院"],
      majorList: ["电子商务", "软件工程"],
      gradeList: ["1501", "1601", "1701"],
      formData: {
        college: "",
        major: "",
        grade: "",
        gender: "",
        age: "",
        birthday: "",
        nation: "",
        cardId: "",
        phone: "",
        mail: "",
        bankCard: "",
        credibility: "无",
        cheat: "无",
        rent: "无",
        breach: "无",
        political: "",
        studentType: "",
        isFullTime: "",
        foreignLang: "",
        foreignLevel: "",
        foreignGrade: "",
        educationalSystem: "",
        educationalBackground: "",
        enrolmentTime: "",
        graduationTime: "",
        creditScore: "",
        comprehensiveResult: "",
        creditClassRanking: "",
        creditGradeRanking: "",
        comprehensiveClassRanking: "",
        comprehensiveGradeRanking: "",
        result: "",
        address: "",
        family: "",
        isPoor: "",
        applyReason: "",
        others: "",
        home: "",
        failureCourse: ""
      },
      edit1: false,
      edit2: false,
      edit3: false,
      edit4: false
    };
  }
};
</script>
<style lang="scss" scoped>
.el-form-item__label,
.el-form-item__content {
  font-size: 18px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>

<style lang="scss" scoped>
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
      .el-date-editor.el-input {
        width: 179.33px;
      }
      position: relative;
      .shadow {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        margin-top: 20px;
      }
    }
  }
}
</style>
