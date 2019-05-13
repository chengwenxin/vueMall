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
            <!-- 基本信息 -->
            <div class="shadow">
              <div style="padding-top:10px;"> 
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本信息</h1>
                <!-- <div style="padding-left:500px; display:inline-block">
                  <el-button type="success" @click="edit1 = true">编辑</el-button>
                  <el-button type="success" @click="onSubmit('edit1')">保存</el-button>
                </div> -->
              </div>
              <br>
              <!-- <div v-if="edit1">
                <el-form
                  label-width="100px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="学号：" prop="number">
                        <el-input v-model="formData.number" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formData.name" disabled></el-input>
                      </el-form-item>
                    </el-col>
                     <el-col :span="8">
                      <el-form-item label="身份：" prop="role">
                        <el-select v-model="formData.role">
                          <el-option v-for="item in ['本科生','研究生']" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                     <el-row>
                    <el-col :span="8">
                      <el-form-item label="学院：" prop="college">
                        <el-select v-model="formData.college">
                          <el-option v-for="item in collegeList" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="年级：" prop="grade">
                        <el-select v-model="formData.grade">
                          <el-option v-for="item in gradeList" :key="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div> -->
              <!-- <div v-else> -->
                <div>
                <el-form
                  label-width="100px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="帐号：" prop="number">{{formData.number}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                    </el-col>
                        <el-col :span="8">
                      <el-form-item label="身份：" prop="role">{{formData.role}}</el-form-item>
                    </el-col>
                  </el-row>
                   <div v-if="this.formData.role === '辅导员'">
                        <el-row>
                    <el-col :span="8">
                      <el-form-item label="学院：" prop="college">{{formData.college}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="年级：" prop="grade">{{formData.grade}}</el-form-item>
                    </el-col>
                  </el-row>
                   </div>
                </el-form>
              </div>
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
import { baseInformation, updateInformation ,getCollegeList} from "../../api";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  mounted() {
    if (window.localStorage.getItem("isLogin") !== "1") {
      this.$message.error("当前未登录,请先登录！");
      this.$router.push("/login");
    }
    this.getList();
  },
  methods: {
    onSubmit(edit) {
      if (this[edit]) {
        this[edit] = false;
        console.log(this.formData)
        for(let i in this.formData){
          if(this.formData[i] === null){
            this.formData[i] = ''
          }
        }
        updateInformation(this.formData).then(data => {
          if (data.status === "1") {
            this.$message.success("信息保存成功！");
          }
        });
      }
    },
    getList() {
      //获取基本信息
      baseInformation()
        .then(data => {
          if (data.status === "1") {
            this.formData = data.content;
            this.$store.commit("role", data.content);
            this.menuList();
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
            let collegeList=[]
            let majorList=[]
            let gradeList=[]
            this.allCollegeList = data.content
            data.content.forEach(item => {
              collegeList.push(item.college)
              majorList.push(item.major)
              gradeList.push(item.grade)
            });
            this.collegeList=Array.from(new Set(collegeList))
            this.majorList =Array.from(new Set(majorList))
            this.gradeList = Array.from(new Set(gradeList))
          } else {
            this.$message.error(data.msg);
          }
        })
    }
  },
  data: function() {
    return {
      allCollegeList:[],
        collegeList: ["信息工程学院", "动物科技学院"],
      majorList: ["电子商务", "软件工程"],
      gradeList: ["1501", "1601", "1701"],
      formData: {
        college:'',
        major:'',
        grade:'',
        gender:'',
        age:'',
        birthday:'',
        nation:'',
        cardId:'',
        phone:'',
        mail:'',
        bankCard:'',
        credibility:'无',
        cheat:'无',
        rent:'无',
        breach:'无',
        political:'',
        studentType:'',
        isFullTime:'',
        foreignLang:'',
        foreignLevel:'',
        foreignGrade:'',
        educationalSystem:'',
        educationalBackground:'',
        enrolmentTime:'',
        graduationTime:'',
        creditScore:'',
        comprehensiveResult:'',
        creditClassRanking:'',
        creditGradeRanking:'',
        comprehensiveClassRanking:'',
        comprehensiveGradeRanking:'',
        result:'',
        address:'',
        family:'',
        isPoor:'',
        applyReason:'',
        others:'',
        home:'',
        failureCourse:'',
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
      .el-date-editor.el-input{
        width:179.33px;
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
