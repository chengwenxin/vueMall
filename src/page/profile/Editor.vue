
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
          <div v-show="!isScan">
            <el-form :model="formData" :inline="true">
              <el-form-item label="类型" prop="type">
                <el-select v-model="formData.type">
                  <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题：" prop="title">
                <el-input v-model="formData.title"></el-input>
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
              <template v-if="this.formData.type === '资助政策'">
                <el-form-item label="申请状态：" prop="title">
                  <el-select v-model="formData.isApply" @change="applyChange">
                    <el-option
                      v-for="item in applyList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>

              <el-form-item>
                <el-button @click="scan" type="success">预览</el-button>
                <el-button @click="submit" type="success">提交</el-button>
              </el-form-item>
              <div v-if="isApply === '允许申请' && this.formData.type === '资助政策'" style="width:100px;height:100px;">
                {{isApply}}
                定制申请信息
              </div>
              <el-form-item>
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
      isScan: false,
      formData: {
        type: "",
        author: "",
        title: "",
        update_date: "",
        detailDate: "",
        content: "",
        isApply: ""
      },
      isApply: "不能申请",
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

  mounted() {
    this.formData = Object.assign({}, this.formData, {
      detailDate: this.defaultValue()
    });
  },
  methods: {
    applyChange(val) {
      this.isApply = val;
    },
    defaultValue() {
      let date = new Date();
      let year = date.getUTCFullYear();
      let month =
        date.getUTCMonth() < 9
          ? "0" + (date.getUTCMonth() + 1)
          : date.getUTCMonth() + 1;
      let day =
        date.getUTCDate() < 9 ? "0" + date.getUTCDate() : date.getUTCDate();
      return "" + year + "-" + month + "-" + day;
    },
    submit() {
      let update_date = this.formData.detailDate.slice(5);
      Object.assign(this.formData, { update_date });
      addPolicy(this.formData)
        .then(data => {
          this.$message.success(data.msg);
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