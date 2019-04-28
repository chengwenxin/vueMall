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
            <h1 style="text-align:center;color:#438F49;">基本信息</h1>
            <br>
            <div >
            <el-form label-width="100px" style="width:100%;font-size:16px;font-family:'微软雅黑'" :rules="rules" :model="formData" ref="information">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学号：" prop="number">{{formData.number}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                </el-col >
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
          </div>
          <!-- 详细详细 -->
           <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top:20px;">
            <h1 style="text-align:center;color:#438F49;">详细信息</h1>
            <br>
            <div >
            <el-form label-width="100px" style="width:100%;font-size:16px;font-family:'微软雅黑'" :rules="rules" :model="formData" ref="information">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学号：" prop="number">{{formData.number}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名：" prop="name">{{formData.name}}</el-form-item>
                </el-col >
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
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      baseInformation()
        .then(data => {
          if(data.status === '1'){
            this.formData = data.content;
          }else {
            this.$message.error(data.msg)
            this.$router.push('/login')
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
      menu: [{label:'个人信息',path:'/profile'}, {label:'申请状态',path:'/profile/applystatus'}, {label:'发布信息',path:'/profile/editor'}]
    };
  }
};
</script>
<style lang="scss">
.el-form-item__label ,.el-form-item__content {
  font-size:18px;
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
