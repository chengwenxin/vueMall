<template>
  <div class="login-form">
    <div class="container">
      <div class="header">
        <cwx-header ></cwx-header>
      </div>
      <div class="main">
        <div class="banner" style="display:inline-block">
          <div style="float:left">
            <img src="../../static/banner1.jpg">
          </div>
          <div class="right">
            <div class="right-content">
              <div v-if="isLogin ==='1'" style="text-align:center">
                <h1 style="color:#438F49;font-weight:bold;margin:50px 0px;">当前已登录</h1>
                <el-button @click="logout" type="success">登 出</el-button>
              </div>
              <div v-else>
                <el-form label-width="80px" :model="loginForm" ref="loginForm" :rules="rules">
                  <div
                    style="display:inline-block;text-align:center;padding:20px 0px 20px 100px;font-size:20px;"
                  >
                    <img src="../../static/yhdl.png" style="padding-right:15px;">用户登录
                  </div>
                  <el-form-item label="账 户：" prop="number">
                    <!-- <el-input v-model.trim="loginForm.number" placeholder="学号/职工号"></el-input> -->
                    <el-autocomplete
                    style="width:199px;"
      v-model="loginForm.number"
      :fetch-suggestions="querySearch"
      placeholder="请输入账户"
      @select="autoSelect"
      clearable
    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="密 码：" prop="password" >
                    <el-input v-model.trim="loginForm.password" clearable  type="password" placeholder="请输入密码" style="width:199px;"></el-input>
                  </el-form-item>
                  <!-- 验证码 -->
                  <el-form-item label="验证码：" prop="checkCode" >
                    <el-col :span="11">
                      <el-input v-model.number="loginForm.checkCode" placeholder="请输入验证码"></el-input>
                    </el-col>
                    <el-col :span="13">
                      <el-button type="text" ><span style="color:#606266;font-size:18px;">{{checkCoder}}</span></el-button>
                      <el-button type="text" @click="codeRandom">再换一张</el-button>
                      
                    </el-col>
                  </el-form-item>
                  <!-- 找回密码 -->
                  <el-popover placement="left">
                    <span>忘了就忘了吧</span>
                    <div slot="reference" style="margin-left:80px;">
                      <el-button type="text">忘记密码？</el-button>
                    </div>
                  </el-popover>
                  <el-form-item label-width="100px">
                    <el-button type="success" @click="onSubmit">登 录</el-button>
                    <el-button type="success" @click="register">注 册</el-button>
                  </el-form-item>
                  <!-- <div style="padding-left:50px;">
                    <span>
                      <span style="font-weight:bold;">登录说明：</span>用户名为工号/学号，登录密码与校园网密码相同。【注意】如果用户为新教工或新生，初始密码为本人身份证后六位数字（不包括字母），建议师生及时修改密码并完善个人资料。
                    </span>
                  </div>-->
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
import { login, logoutApi ,exportExcel} from "../api";
import { auditList } from "../api/scholar";
import formatDate from "../utils/formatDate";
import { mapState } from "vuex";
export default {
  data: function() {
     var validatorCheckCode = (rule, value, callback) => {
        // if (value === '') {
        //   callback(new Error('请输入验证码'));
        // } else if (value !== this.checkCoder) {
        //   callback(new Error('验证码输入错误!'));
        // } else {
          callback();
        // }
      };
    return {
      numbers:[
        {value:'2015012744'},
        {value:'2015012745'},
        {value:'2015012746'},
        {value:'2015012747'},
        {value:'1234567890'},
        {value:'2015123456'},
        {value:'2015123457'},
      ],
      applyNotice: [],
      loginForm: {
        number: "",
        password: "",
        checkCode:null
      },
      checkCoder: Math.round(Math.random()*899999 + 100000),
      rules: {
        number: {
          required: true,
          message: "请输入账号",
          trigger: "change"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        },
        checkCode:[{
        validator:validatorCheckCode
        }]
      }
    };
  },
watch: {
　　'$route' (to, from) {
　　this.$router.go(0);
　　}
},
  computed: {
    ...mapState({
      isLogin: state => state.login,
      role: state => state.role
    }),
    
  },
  methods: {
    autoSelect(val){
       this.loginForm.number =val.value
       this.loginForm.password =val.value
       this.loginForm.checkCode = this.checkCoder
    },
     createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().includes(queryString.toLowerCase()));
        };
      },
     querySearch(queryString, cb) {
        var numbers = this.numbers;
        console.log(numbers)
        var results = queryString ? numbers.filter(this.createFilter(queryString)) : numbers;
        console.log(results)
        cb(results);
      },
    codeRandom(){
      this.checkCoder = Math.round(Math.random()*899999 + 100000)
    },
    //登录成功后 获取审核的数据 过滤出审核通过的notice   0 表示学生
    getAuditList() {
      auditList({ role: "0" ,pageSize:100,currentPage:1})
        .then(data => {
          if (data.status === "1") {
            let time = this.$store.state.lastLoginTime;
            time = new Date(time);
            this.applyNotice = data.content.filter(
              item => item.secondAuditDate > formatDate(time)
            );
            this.applyNotice.forEach(item => {
              let type = "success";
              if (item.secondAuditStatus !== "复审通过") {
                type = "error";
              }
              this.open(
                "资助项目:" + item.category,
                item.secondAuditStatus,
                type,
                0
              );
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClick() {
      this.$router.push("/profile/applystatus");
    },
    open(msg, title = "登录成功", type = "success", duration = "2000") {
      const h = this.$createElement;
      this.$notify({
        title,
        message: h(
          "a",
          {
            on: {
              click: this.onClick
            }
          },
          msg
        ),
        type,
        duration
      });
    },
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.userLogin();
        } else {
          return false;
        }
      });
    },
    userLogin() {
      login(this.loginForm)
        .then(data => {
          if (data.status === "1") {
            // 获取上次登录时间
            this.$store.commit(
              "lastLogin",
              window.sessionStorage.getItem(data.content.number)
            );
            // 存储每次登陆时间
            window.sessionStorage.setItem(data.content.number, new Date());
            this.getAuditList();
            //改变登录状态
            this.$store.commit("changeLogin", 1);
            //存储 number  role  name等信息
            this.$store.commit("setBase", data.content);

            if (this.role === "学生") {
              this.open("请尽快完善个人信息");
              this.$router.push("/profile");
            } else if (this.role === "辅导员") {
              this.open("请您尽快审核学生资助申请");
              this.$router.push("/profile/auditstatus");
            } else if (this.role === "学生处") {
              this.open("请您尽快审核学生资助申请");
              this.$router.push("/profile/secondauditstatus");
            }else {
              this.open("欢迎回来");
              this.$router.push("/profile/high");
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      this.$router.push("/register");
    },
    logout() {
      logoutApi()
        .then(() => {
          this.$store.commit("changeLogin", 0);
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
      min-height: 440px;
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
