<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <!-- <cwx-sort-main title="通知公告"></cwx-sort-main> -->
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
import { getAnnouncementListDetail ,setReadingTimes} from "../api/scholar.js";
export default {
  mounted() {
    this.ReadingTimes();
    this.getList();
  },
  methods: {
    getList() {
      getAnnouncementListDetail({params:{id:this.id}})
        .then(data => {
          this.detail = data.content
        })
        .catch(err => {
          console.log(err);
        });
    },
    //统计文章阅读次数
    ReadingTimes(){
        setReadingTimes({params:{id:this.id,table:'announcement'}}).then(()=>{}).catch(err=>{})
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
<style lang="css">
</style>
<style lang="scss" scoped>
.home {
  background: #fff;
  width: 100%;
  .container {
    padding: 0px;
    width: 1200px;
    .main {
     //height: 660px;
    }
    .header,
    .main{
      position: relative;
    }
  }
}

</style>
