<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <cwx-sort-main title="学生资助"></cwx-sort-main>
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
import { getScholarDetail ,setReadingTimes} from "../api/scholar.js";
export default {
  mounted() {
    this.ReadingTimes();
    this.getList();
  },
  methods: {
    getList() {
      getScholarDetail({params:{id:this.id}})
        .then(data => {
          this.detail = data.content
        })
        .catch(err => {
          console.log(err);
        });
    },
    //统计文章阅读次数
    ReadingTimes(){
        setReadingTimes({params:{id:this.id}}).then(()=>{}).catch(err=>{})
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
.home {
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
