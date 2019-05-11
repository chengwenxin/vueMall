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
          <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <div style="padding-top:10px;">
              <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本信息</h1>
              <div style="padding-left:500px; display:inline-block">
                <el-button type="success" @click="edit1 =true">编辑</el-button>
                <el-button type="success" @click="edit1 =false">保存</el-button>
              </div>
            </div>
            <br>
            <!-- 基本信息 -->
            <div v-if="!edit1">
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑'"
                :rules="rules"
                :model="formData"
                ref="information"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学号：" prop="number">{{formData.number}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学院：" prop="college">{{formData.college}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="major">{{formData.major}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="grade">{{formData.grade}}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div v-else>
              <el-form
                label-width="140px"
                style="width:100%;font-size:16px;font-family:'微软雅黑'"
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
                      <el-input v-model="formData.role"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学院：" prop="college">
                      <el-input v-model="formData.college"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="major">
                      <el-input v-model="formData.major"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="grade">
                      <el-input v-model="formData.grade"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 详细信息 -->
          <div
            style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top:20px;"
          >
            <div style="padding-top:10px;">
              <h1 style="color:#438F49;padding-left:20px; display:inline-block">详细信息</h1>
              <div style="padding-left:500px; display:inline-block">
                <el-button type="success" @click="edit =true">编辑</el-button>
                <el-button type="success" @click="edit =false">保存</el-button>
              </div>
            </div>
            <br>
            <el-form
              label-width="140px"
              style="width:100%;font-size:16px;font-family:'微软雅黑'"
              :rules="rules"
              :model="formData"
              ref="information"
            >
              <div v-if="!edit">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="gender">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年龄：" prop="age">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="类别：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="民族：" prop="gender">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="政治面貌：" prop="age">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="生源地：" prop="major">{{formData.major}}</el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="家庭住址：" prop="grade">{{formData.grade}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号：" prop="gender">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话：" prop="age">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="外语语种：" prop="gender">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="外语水平：" prop="age">{{formData.name}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学生类别：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学制：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入学时间：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="毕业时间：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="家庭情况介绍：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级排名：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年级排名：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学分成绩：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="综测成绩：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="挂科情况：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="科研成果：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="违纪情况：" prop="role">{{formData.role}}</el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
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
import { baseInformation } from "../../api";
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
    getList() {
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
    }
  },
  data: function() {
    return {
      formData: {},
      edit: false,
      edit1: false
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
      position: relative;
    }
  }
}
</style>
