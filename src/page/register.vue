<template>
  <div class="login-form">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <div class="banner" style="display:inline-block">
          <div style="float:left">
            <img src="../../static/banner1.jpg">
          </div>
          <div class="right">
            <div class="right-content">
              <el-form label-width="100px" :rules="rules" :model="formData" ref="registerref">
                <!-- <div
                  style="display:inline-block;text-align:center;padding:0px 0px 0px 100px;font-size:20px;"
                >
                  <img src="../../static/yhdl.png" style="padding-right:15px;">用户注册
                </div>-->
                <el-form-item label="学 院" prop="college">
                  <el-select v-model="formData.college" placeholder="请选择学院" style="width:200px">
                    <el-option v-for="(item,index) in collegeList" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-row>
                  <el-col>
                    <el-form-item label="专业班级" prop="major">
                      <el-select v-model="formData.major" placeholder="请选择专业" style="width:200px">
                        <el-option v-for="(item,index) in majorList" :key="index" :value="item"></el-option>
                      </el-select>
                      <el-select v-model="formData.grade" placeholder="请选择班级" style="width:200px">
                        <el-option v-for="(item,index) in gradeList" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col >
                    <el-form-item label="" prop="grade" >
                      <el-select v-model="formData.grade" placeholder="请选择班级" style="width:200px">
                        <el-option v-for="(item,index) in gradeList" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>-->
                </el-row>
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
                <el-form-item label="密码确认" prop="passwordsecond">
                  <el-input
                    v-model.trim="formData.passwordsecond"
                    placeholder="请再次输入密码"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="账户类型" prop="role">
                  <el-select v-model="formData.role" placeholder="请选择账户类型" style="width:200px">
                    <el-option v-for="(item,index) in roleList" :key="index" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="100px" size="medium">
                  <el-button @click="resetForm('formData')">重置</el-button>
                  <el-button type="success" @click="onSubmit">注 册</el-button>
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
import { register } from "../api";
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
        name:"",
        role:""
      },
      collegeList: ["信息工程学院", "动物科技学院"],
      gradeList: ["1501", "1601", "1701"],
      majorList: ["电子商务", "软件工程", "动物科技"],
      roleList: ["学生", "辅导员", "学生处"]
    };
  },
  methods: {
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
            this.$message.success(data.msg);
            this.$router.push("./login");
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
.login-form {
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
        height: 413.99px;
        background-color: #eee;
        float: left;
        .right-content {
          padding: 10px;
          width: 386px;
          height: 400px;
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
