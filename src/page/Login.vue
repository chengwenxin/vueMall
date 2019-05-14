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
              <div v-if="isLogin === '1'" style="text-align:center">
                <h1 style="color:#438F49;font-weight:bold;margin:50px 0px;">当前已登录</h1>
                <el-button @click="logout" type="success">登 出</el-button>
              </div>
              <div v-if="isLogin === '0'">
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
                    <el-button type="success" @click="userLogin">登 录</el-button>
                    <el-button type="success" @click="register">注 册</el-button>
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
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { login, logoutApi } from "../api";
import { auditList } from "../api/scholar";
import formatDate from "../utils/formatDate"
export default {
  data: function() {
    return {
      applyNotice:[],
      loginForm: {
        number: "",
        password: ""
      },
      isLogin: "0"
    };
  },
  mounted() {
    this.isLogin =
      window.localStorage.getItem("isLogin") === "0" ||
      window.localStorage.getItem("isLogin") === "1"
        ? window.localStorage.getItem("isLogin")
        : "0";
  },
  methods: {
    getAuditList() {
      auditList({role:'0'})
        .then(data => {
          if(data.status === '1'){
            let time = this.$store.state.lastLoginTime 
            time = new  Date(time)

          this.applyNotice = data.content.filter(item => (item.secondAuditDate < formatDate(time)));
          this.applyNotice.forEach(item =>{
            let type="success"
            if(item.secondAuditStatus !== "复审通过"){
              type="error"
            } 
            //有重叠问题
            this.$nextTick(this.open(item.category,item.secondAuditStatus,type))
          })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClick(){this.$router.push('/profile/applystatus')},
    open(msg,title="登录成功",type="success") {
      const h = this.$createElement
      this.$notify({
        title,
        message:h('a',{
          on:{
            click:this.onClick
          },
        },msg),
        type,
        duration:0,
      });
    },
    userLogin() {
      login(this.loginForm)
        .then(data => {
          if (data.status === "1") {
            // 获取上次登录时间
            this.$store.commit('lastLogin',window.localStorage.getItem(data.content.number))
            this.getAuditList()
            window.localStorage.setItem("isLogin", "1");
            window.localStorage.setItem("number", data.content.number);
            // 存储每次登陆时间
            window.localStorage.setItem(data.content.number, new Date());
            window.localStorage.setItem("name", data.content.name);
            window.localStorage.setItem("role", data.content.role);
            this.isLogin = "1";
            if(window.localStorage.role ==='学生'){
            this.open("请尽快完善个人信息");
             this.$router.push("/profile");
            }else if(window.localStorage.role ==='辅导员'){
            this.open("请您尽快审核学生资助申请");
             this.$router.push("/profile/auditstatus");
            }else if(window.localStorage.role ==='学生处'){
               this.open("请您尽快审核学生资助申请");
             this.$router.push("/profile/secondauditstatus");
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          // this.$message.error(err.msg);
          console.log(err)
        });
    },
    register() {
      this.$router.push("/register");
    },
    logout() {
      logoutApi()
        .then(() => {
          window.localStorage.setItem("isLogin", "0");
          this.isLogin = "0";
        })
        .catch(err => {
          console.log(err);
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
