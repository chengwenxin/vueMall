<template>
  <div class="introduction">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="中心简介"></cwx-sort-main>
        <cwx-sort-left></cwx-sort-left>
        <cwx-sort-right>
          <cwx-article :detail="detail"></cwx-article>
        </cwx-sort-right>
      </div>
      <div class="footer">
        <cwx-footer></cwx-footer>
      </div>
    </div>
  </div>
</template>
<script>
import { getIntroductionDetail ,IntroductionReadingTimes} from "../api/scholar.js";
export default {
  mounted() {
    this.ReadingTimes();
    this.getList();
  },
  methods: {
    getList() {
      getIntroductionDetail({params:{id:this.id}})
        .then(data => {
          this.detail = data.content
        })
        .catch(err => {
          console.log(err);
        });
    },
    //统计文章阅读次数
    ReadingTimes(){
        IntroductionReadingTimes({}).then(()=>{}).catch(err=>{})
    }
  },
  data: function() {
    return {
      detail:{},
      list: [],
      id:this.$route.params.id
    };
  }
};
</script>
<style lang="scss" scoped>
.introduction {
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
