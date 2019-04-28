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
              <el-form label-width="60px">
                <div
                  style="display:inline-block;text-align:center;padding:20px 0px 20px 100px;font-size:20px;"
                >
                  <img src="../../static/yhdl.png" style="padding-right:15px;">用户登录
                </div>
                <el-form-item label="账户" data="loginForm">
                  <el-input v-model="loginForm.number" placeholder="学号/职工号"></el-input>
                </el-form-item>
                <el-form-item label="密 码">
                  <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label-width="100px">
                  <el-button type="primary" @click="userLogin">登 录</el-button>
                  <el-button type="primary" @click="register">注 册</el-button>
                </el-form-item>
                <div style="padding-left:50px;">
                  <span>
                    <span style="font-weight:bold;">登录说明：</span>用户名为工号/学号，登录密码与校园网密码相同。【注意】如果用户为新教工或新生，初始密码为本人身份证后六位数字（不包括字母），建议师生及时修改密码并完善个人资料。
                  </span>
                </div>
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
import { login } from "../api/scholar";
export default {
  data: function() {
    return {
      loginForm: {
        number: "",
        password: ""
      }
    };
  },
  methods: {
    userLogin() {
      login(this.loginForm)
        .then(data => {
          if (data.status === "1") {
            this.$message.success(data.msg);
            this.$router.push("./profile");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    register() {
      this.$router.push("/register");
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
        padding: 20px;
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
