<template>
  <div class="register-form">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <div class="banner" style="display:inline-block;height:500px;">
          <div style="float:left">
            <img src="../../../static/banner1.jpg" height="500px" width="800px">
          </div>
          <div class="right">
            <div class="right-content">
              <el-form label-width="100px" :rules="rules" :model="formData" ref="registerref">
                <el-form-item label="学 院" prop="college">
                  <el-select v-model="formData.college" placeholder="请选择学院" style="width:200px">
                    <el-option v-for="(item,index) in collegeList" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                  <el-select v-model="formData.grade" placeholder="年级" style="width:200px">
                    <el-option
                      v-for="(item,index) in ['14','15','16','17','18']"
                      :key="index"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="账 户" prop="number">
                  <el-input v-model.trim="formData.number" placeholder="学号/职工号" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="姓 名" prop="name">
                  <el-input v-model.trim="formData.name" placeholder="学号/职工号" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="密 码" prop="password">
                  <el-input
                    v-model.trim="formData.password"
                    placeholder="请输入密码"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码确认" prop="passwordsecond">
                  <el-input
                    v-model.trim="formData.passwordsecond"
                    placeholder="请再次输入密码"
                    style="width:200px"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="账户类型" prop="role">
                  <el-select v-model="formData.role" placeholder="请选择账户类型" style="width:200px">
                    <el-option v-for="(item,index) in roleList" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="100px" size="medium">
                  <el-button @click="resetForm">重置</el-button>
                  <el-button type="success" @click="onSubmit">分 配</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { register, getCollegeList } from "../../api";
export default {
  data: function() {
    let secondPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        college: [
          {
            message: "请选择学院",
            required: true
          }
        ],
        name: [
          {
            message: "请输入姓名",
            required: true
          }
        ],
        number: [
          {
            message: "请输入账号",
            required: true
          }
        ],
        grade: [
          {
            message: "请选择班级",
            required: true
          }
        ],
        major: [
          {
            message: "请选择专业",
            required: true
          }
        ],
        role: [
          {
            message: "请选择账户类型",
            required: true
          }
        ],
        password: [
          {
            message: "请输入密码",
            required: true
          }
        ],
        passwordsecond: [
          {
            message: "请再次输入密码",
            required: true
          },
          {
            validator: secondPassword
          }
        ]
      },
      formData: {
        number: "",
        password: "",
        passwordsecond: "",
        college: "",
        grade: "",
        major: "",
        name: "",
        role: "学生"
      },
      collegeList: [],
      gradeList: [],
      majorList: [],
      roleList: ["学生", "辅导员", "学生处"]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getCollegeList().then(data => {
        console.log(data);
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
      });
    },
    resetForm() {
      this.$refs["registerref"].resetFields();
    },
    onSubmit() {
      this.$refs["registerref"].validate(valid => {
        if (valid) {
          this.userRegiter();
        } else {
          return false;
        }
      });
    },
    userRegiter() {
      register(this.formData)
        .then(data => {
          if (data.status === "1") {
            this.$message.success('分配成功');
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.register-form {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    margin: 0 auto;
    .main {
      min-height: 660px;
      .right {
        padding: 7px;
        width: 400px;
        height: 500px;
        background-color: #eee;
        float: left;
        .right-content {
          padding: 10px;
          width: 386px;
          height: 486px;
          background-color: #fbfbfb;
          float: left;
          border-radius: 20px;
          border: #ddd 1px solid;
        }
      }
    }
    .header,
    .main {
      position: relative;
    }
    .header {
      margin-bottom: 10px;
    }
  }
}
</style>
