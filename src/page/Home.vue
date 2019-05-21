<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header ></cwx-header>
      </div>
      <div class="mainer">
        <!-- <div style="width:550px;height:300px;float:left;margin:0 25px;">
          <el-carousel trigger="click" height="300px" width="550px">
            <el-carousel-item v-for="item in images" :key="item.src">
              <router-link :to="item.path">
                <img :src="item.src">
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </div> -->
        <div style="width:50%;min-height:460px;float:left;">
       
          <cwx-slide-content title="获奖通知公告" path="/announcement" :list="announcementList.slice(0,5)"></cwx-slide-content> 
          <cwx-slide-content title="奖助学金政策" path="/policy" :list="scholarList.slice(0,5)"></cwx-slide-content>
        </div>
       <div style="width:50%;min-height:460px;float:left;">
        <cwx-slide-content title="在线申请指南" path="/working" :list="workingList.slice(0,5)"></cwx-slide-content>
         </div>       
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getScholarList,
  getAnnouncementList,
  getWorkingtList
} from "../api/scholar.js";
import  formatDate from '../utils/formatDate'
export default {
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getScholarList()
        .then(data => {
          this.scholarList = data.content.filter(item => (item.detailDate < formatDate(new Date()))) ;
        })
        .catch(err => {
          console.log(err);
        });
      getAnnouncementList()
        .then(data => {
          this.announcementList = data.content.filter(item => (item.detailDate < formatDate(new Date())))
        })
        .catch(err => {
          console.log(err);
        });
      getWorkingtList()
        .then(data => {
          this.workingList = data.content.filter(item => (item.detailDate < formatDate(new Date())))
        })
        .catch(err => {
          console.log(err);
       });
    }
  },
  data: function() {
    return {
      scholarList: [],
      announcementList: [],
      workingList: [],
      images: [
        { src: "../../static/1.jpg", path: "/working/detail/144" },
        { src: "../../static/2.jpg", path: "/working/detail/143" },
        { src: "../../static/3.jpg", path: "/working/detail/142" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    margin: 0 auto;
    .mainer {
     min-height: 40px;
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
