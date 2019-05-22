
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
          <div v-show="!isScan">
            <el-form :model="formData" :inline="true">
              <el-card>
                <div slot="header" class="clearfix">
                  <h1 style="color:#438F49;padding-left:20px; display:inline-block">基本定制</h1>
                </div>
                <el-form-item label="类型" prop="type">
                  <el-select v-model="formData.type">
                    <el-option v-for="item in ['资助政策']" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标题：" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="作者：" prop="author">
                  <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="发布日期：" prop="detailDate">
                  <el-date-picker
                    :clearable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="formData.detailDate"
                  ></el-date-picker>
                </el-form-item>

                <template v-if="formData.type === '资助政策'">
                  <el-form-item prop="title">
                    <el-switch
                      v-model="formData.isApply"
                      active-color="#438F49"
                      active-text="允许申请"
                      inactive-text="不能申请"
                      active-value="允许申请"
                      inactive-value="不能申请"
                      @change="applyChange"
                    ></el-switch>
                  </el-form-item>
                </template>

                <el-form-item>
                  <el-button @click="scan" type="success">预览</el-button>
                  <el-button @click="submit" type="success">提交</el-button>
                </el-form-item>

                <div v-if="this.formData.isApply === '允许申请' && formData.type === '资助政策'">
                  <el-form-item label="申请开始/截止时间时间：" prop="validTime">
                    <el-date-picker
                      :clearable="false"
                      type="datetimerange"
                      v-model="formData.validTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>

                  <el-form-item label="评审时间：" prop="auditTime">
                    <el-date-picker
                    :clearable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="formData.auditTime"
                  ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="名单公示时间：" prop="announcementTime">
                  <el-date-picker
                    :clearable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="formData.announcementTime"
                  ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="可申请院系：" prop="college">
                    <el-select
                      v-model="formData.college"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择可申请院系"
                    >
                      <el-option
                        v-for="(item,index) in collegeList"
                        :key="index"
                        :label="item.college"
                        :value="item.college"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="可申请年级：" prop="grade">
                    <el-select
                      v-model="formData.grade"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择可申请年级"
                    >
                      <el-option
                        v-for="item in ['所有年级','本科生','研究生','14级','15级','16级','17级','18级']"
                        :key="item.value"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-card>
              <div v-if="formData.isApply === '允许申请' && formData.type === '资助政策'">
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">个人信息定制</h1>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">诚信记录定制</h1>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">学习信息定制</h1>
                  </div>
                </el-card>
                <el-card>
                  <div slot="header" class="clearfix">
                    <h1 style="color:#438F49;padding-left:20px; display:inline-block">家庭信息定制</h1>
                  </div>
                </el-card>
              </div>

              <el-form-item>
                <el-upload :on-success="uploadSuccess" multiple action="api/upload">
                  <el-button size="small" type="success">上传文件</el-button>
                </el-upload>
                <template prop="content">
                  <vue-ueditor-wrap
                    v-model="formData.content"
                    :config="myConfig"
                    style="line-height:25px;"
                  ></vue-ueditor-wrap>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="isScan">
            <el-button @click="scan" type="success">返回</el-button>
            <cwx-article :detail="formData"></cwx-article>
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
import { addPolicy } from "../../api";
import VueUeditorWrap from "vue-ueditor-wrap";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  name: "Ueditor",
  components: { VueUeditorWrap },
  data() {
    return {
      temp: "",
      isScan: false,
      formData: {
        type: "",
        author: "",
        title: "",
        update_date: "",
        detailDate: "",
        content: "",
        isApply: "不能申请"
      },
      typeList: ["通知公告", "工作动态", "资助政策"],
      applyList: [
        { value: "允许申请", label: "允许申请" },
        { value: "不能申请", label: "不能申请" }
      ],
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
        // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "/static/ue/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 工具栏是否可以浮动
        autoFloatEnabled: false,
        // 初始容器高度
        initialFrameHeight: 410,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: true
      }
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    collegeList() {
      let collegeEnum = JSON.parse(window.localStorage.collegeEnum);
      collegeEnum.unshift({ college: "所有院系" });
      return collegeEnum;
    }
  },
  mounted() {
    this.formData = Object.assign({}, this.formData, {
      detailDate: this.defaultValue(),
      author: this.name
    });
  },
  methods: {
    uploadSuccess(res, file) {
      this.temp = `<div><br><i class="el-icon-link"></i><a href="${
        res.filename
      }" >${file.name}</a></div>`;
      this.formData.content += this.temp;
    },
    applyChange(val) {
      this.formData.isApply = val;
    },
    defaultValue() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
      return "" + year + "-" + month + "-" + day;
    },
    submit() {
      let update_date = this.formData.detailDate.slice(5);
      Object.assign(this.formData, { update_date });
      addPolicy(this.formData)
        .then(data => {
          this.$message.success("发布成功");
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    scan() {
      this.isScan = !this.isScan;
    }
  }
};
</script>


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