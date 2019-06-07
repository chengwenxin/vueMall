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
                </span> ，按奖助学金项目名称、院系、年级
                <router-link class="router-class" to="/policy">查询可申请项目</router-link>，了解基本申请条件和申请时间等相关信息
              </span>
            </template>
          </el-step>
          <el-step title="步骤 2" status="success">
            <template slot="description">
              <router-link class="router-class" to="/register">注册账户</router-link>后
              <router-link class="router-class" to="/login">登录</router-link>学生用户系统,
              完善个人基本信息，即可进入在线申请入口
            </template>
          </el-step>
          <el-step title="步骤 3" status="success">
            <template slot="description">
             进入在线申请系统,
              <router-link class="router-class" to="/policy">选择想要申请的奖助学金</router-link>,填写定制的申请条件 
            </template>
          </el-step>

          <el-step title="步骤 4" status="success">
            <template slot="description">
                勾选同意
                  <router-link class="router-class" to='/policy'>《西北农林科技大学诚信协议书》</router-link>后即可提交申请
            </template>
          </el-step>
          <el-step title="步骤 5" status="success">
            <template slot="description">
              申请成功后可在
              <router-link class="router-class" to="/profile/applyStatus">申请状态栏</router-link>
              查看个人申请进度
            </template>
          </el-step>
          <el-step title="步骤 6" status="success">
            <template slot="description">
              审核通过后会收到
              <router-link class="router-class" to="/profile/applyStatus">消息提醒</router-link>，
              <router-link class="router-class" to="/announcement">获奖名单公示</router-link>，
              无异议后，等待奖助学金发放
              <!-- 了解具体申请要求，确定申请资助项目及具体申请条件 -->
            </template>
          </el-step>

          <!-- <el-step title="步骤 4"   status="success">
              <template slot="description">
            </template>
          </el-step>-->
        </el-steps>
        <router-link :to="toPath">
          <!-- <el-button
            style="background:#438F49;color:#fff;font-size:24px;margin-left:0px;width:500px;margin-top:10px;"
          >
            在线申请入口 &nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-button> -->

           <div
            style="float:left;margin-top:5px;width:550px;height:120px;background:url('../../static/applySearch1.jpg') no-repeat;"
          >
            <div
              style="margin-top: 26px;
    margin-left: 70px;
    font-size: 36px;
    color: #fff;
    font-weight: 500;"
            >奖助学金在线申请入口 <img style="width:60px;margin-right:45px;margin-top:-5px;height:60px;float:right;" src="../../static/applySearchEntry.png"></img></div>
          </div>

        </router-link>
      </div>
    </div>
    <div v-else>
      <!-- <cwx-slide-content-item :list="list"></cwx-slide-content-item> -->
      <div v-if="title === '获奖通知公告'">
        <router-link to="/announcement">
          <div
            style="float:left;width:160px;height:180px;background:url('../../static/announcementSearch.png') no-repeat;"
          >
            <div
              style="margin-top: 150px;
    margin-left: 10px;
    font-size: 20px;
    color: #438F48;
    font-weight: 500;"
            >公示检索入口<img style="width:20px;height:20px;margin-right:7px;margin-top:3px;float:right;" src="../../static/entry.png"></img></div>
          </div>
        </router-link>
        <div style="float:left;width:390px;">
          <h3
            style="margin-left: 5px;
    font-size: 18px;
    color: orangered;
    font-weight: 600;"
          >最新通知：</h3>
          <ul>
            <li v-for="item in list" :key="item.id" :style="paddingleft">
              <span>{{item.update_date}}</span>
              <router-link :to="item.path+'/'+item.id">
                <div v-if="item.content === '0'" style="color:#438F49;">{{item.title}}</div>
                <div v-else>{{item.title}}</div>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/announcement">
          <!-- <el-button
            style="background:#438F49;color:#fff;font-size:24px;margin-left:0px;width:500px;margin-top:10px;"
          >
            公示检索入口 &nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-button>-->
        </router-link>
      </div>
      <div v-else>
        <router-link to="/policy">
          <div
            style="float:left;margin-top:5px;width:550px;height:220px;background:url('../../static/policySearch1.jpg') no-repeat;"
          >
            <div
              style="margin-top: 26px;
    margin-left: 70px;
    font-size: 36px;
    color: rgb(36, 123, 21);
    font-weight: 800;"
            >奖助学金项目检索入口<img style="width:50px;margin-right:60px;height:50px;float:right;" src="../../static/entry.png"></img></div>
          </div>
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
  height: 250px;
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
  ul {
    margin: 0px;
    padding: 0px;
    span {
      float: left;
      font-size: 15px;
      padding-right: 20px;
      color: #438f49;
    }
    li {
      list-style: none;
      background: url(../../static/bg_time1.png) no-repeat 2% 50%;
      border-bottom: 1px dashed #d8d8d8;
      font-size: 14px;
      line-height: 35px;
      border-bottom: 1px dashed #d8d8d8;
      padding-left: 10px;
      list-style-type: none;
      line-height: 35px;
    }
  }
}
</style>
