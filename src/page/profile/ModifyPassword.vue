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
            <!-- 基本信息 -->
            <div class="shadow">
              <div style="padding-top:10px;">
                <h1 style="color:#438F49;padding-left:20px; display:inline-block">修改密码</h1>
              </div>
              <br>
              <div>
                <el-form
                  label-width="100px"
                  style="width:100%;font-size:16px;font-family:'微软雅黑';min-height:100px;margin-left:350px;"
                  :rules="rules"
                  :model="formData"
                  ref="information"
                >
                  <el-row style="margin-bottom:20px;">
                    <el-col :span="8">
                      <el-form-item label="当前帐号：" prop="number">{{formData.number}}</el-form-item>
                      <el-form-item label="原密码：" prop="password">
                        <el-input v-model="formData.password" placeholder="请输入原密码"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码：" prop="newPassword">
                        <el-input v-model="formData.newPassword" placeholder="请输入新密码"></el-input>
                      </el-form-item>
                      <el-form-item label="确认新密码：" prop="secondPassword">
                        <el-input v-model="formData.secondPassword" placeholder="请再次输入新密码"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-button type="success" @click="onReset">重 置</el-button>

                      <el-button @click="onSubmit" type="success">提 交</el-button>
                    </el-form-item>
                  </el-row>
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
import { modifyPassword,logoutApi } from "../../api";
import mixins from "./mixins";
export default {
  mixins: [mixins],

  methods: {
    onSubmit() {
      modifyPassword(this.formData).then(data => {
        if (data.status === "1") {
          this.$message.success("密码修改成功！请重新登录");
          logoutApi()
            .then(() => {
              this.$store.commit("changeLogin", false);
              this.$router.push('/login')
            })
            .catch(err => {
              console.log(err);
            });
        }else if(data.status === '2'){
          this.$message.error("原密码输入错误！请重新输入");
        }
      });
    },
    onReset() {
      this.$refs.information.resetFields();
    }
  },
  data: function() {
    let secondPasswordValid = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请再次输入新密码"));
      } else if (value !== this.formData.newPassword) {
        cb(new Error("两次输入密码不一致"));
      } else {
        cb();
      }
    };
    return {
      formData: {
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
      }
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
