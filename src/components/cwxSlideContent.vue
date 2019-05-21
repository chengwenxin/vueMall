<template>
  <div class="cwx-slide-content">
    <div class="head">
      <span v-if="title!=='在线申请指南'">
        <router-link :to="path">更多>></router-link>
      </span>
      <dt>{{title}}</dt>
    </div>
    <div v-if="title==='在线申请指南'">
      <div style="height: 360px; margin-top:10px;">
        <el-steps direction="vertical">
          <el-step title="步骤 1" status="success">
            <template slot="description">
              <span stype="font-size:14px;">
                查看
                <span class="router-class">
                  <router-link to="/policy">奖助学金政策</router-link>
                </span> ，按学生类别院系、年级
                <router-link class="router-class" to="/policy">查询可申请项目</router-link>，了解资助政策、基本申请条件和申请时间等相关信息
              </span>
            </template>
          </el-step>
          <el-step title="步骤 2" status="success">
            <template slot="description">
              按学生类别、院系、年级
              <router-link class="router-class" to="/policy">查询可申请项目</router-link>
            </template>
          </el-step>
          <el-step title="步骤 3" status="success">
            <template slot="description">
              填写申请信息
              <router-link class="router-class" to="/policy">查询可申请项目</router-link>，
              <!-- 了解具体申请要求，确定申请资助项目及具体申请条件 -->
            </template>
          </el-step>

          <el-step title="步骤 4" status="success">
            <template slot="description">
              <span stype="font-size:14px;">
                查看
                <span class="router-class">
                  <router-link to="/policy">奖助学金政策</router-link>
                </span> ，按学生类别院系、年级
                <router-link class="router-class" to="/policy">查询可申请项目</router-link>，了解资助政策、基本申请条件和申请时间等相关信息
              </span>
            </template>
          </el-step>
          <el-step title="步骤 5" status="success">
            <template slot="description">
              按学生类别、院系、年级
              <router-link class="router-class" to="/policy">查询可申请项目</router-link>
            </template>
          </el-step>
          <el-step title="步骤 6" status="success">
            <template slot="description">
              填写申请信息
              <router-link class="router-class" to="/policy">查询可申请项目</router-link>，
              <!-- 了解具体申请要求，确定申请资助项目及具体申请条件 -->
            </template>
          </el-step>

          <!-- <el-step title="步骤 4"   status="success">
              <template slot="description">
            </template>
          </el-step>-->
        </el-steps>
        <router-link :to="toPath">
          <el-button
            style="background:#438F49;color:#fff;font-size:24px;margin-left:0px;width:500px;margin-top:10px;"
          >
            在线申请入口 &nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <!-- <cwx-slide-content-item :list="list"></cwx-slide-content-item> -->
      <div v-if="title === '获奖通知公告'">
        <router-link to="/announcement">
          <el-button
            style="background:#438F49;color:#fff;font-size:24px;margin-left:0px;width:500px;margin-top:10px;"
          >
            公示检索入口 &nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/policy">
          <el-button
            style="background:#438F49;color:#fff;font-size:24px;margin-left:0px;width:500px;margin-top:10px;"
          >
            项目检索入口 &nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "path", "list"],
  computed: {
    toPath() {
      let role = this.$store.state.role;
      let isLogin = this.$store.state.login;
      if (isLogin) {
        if (role === "学生") {
          return "/profile";
        } else {
          return "/profile/high";
        }
      } else {
        return "/login";
      }
    }
  },
  methods: {},
  data: function() {
    return {};
  }
};
</script>
<style lang="css">
.el-step__title.is-success {
  color: #438f49;
}
.el-step__description.is-success {
  color: #605f5f;
}
.el-step__description {
  padding-right: 10%;
  margin-top: -5px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
}
</style>
<style lang="scss">
.cwx-slide-content {
  width: 550px;
  float: left;
  height: 220px;
  margin: 0 25px;
  .router-class {
    // color:#551A88;
    // color:blueviolet;
    color: #438f49;
    text-decoration: underline;
  }
  .head {
    width: 550px;
    height: 40px;
    border-bottom: #438f49 solid 3px;
    margin: 0 auto;
    span {
      float: right;
      line-height: 40px;
      padding-right: 10px;
    }
    dt {
      font-size: 18px;
      font-family: 微软雅黑;
      font-weight: bold;
      color: #d0021b;
      line-height: 40px;
      padding-left: 10px;
    }
  }
}
</style>
