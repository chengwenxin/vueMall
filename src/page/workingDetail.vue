<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <cwx-header></cwx-header>
      </div>
      <div class="main">
        <!-- <cwx-sort-main title="工作动态"></cwx-sort-main> -->
        <!-- <cwx-sort-left></cwx-sort-left> -->
        <cwx-sort-right width="width:1198px;border-left:1px dashed #438F48;">
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
import { getWorkingtDetail ,setReadingTimes} from "../api/scholar.js";
export default {
  mounted() {
    this.ReadingTimes();
    this.getList();
  },
  methods: {
    getList() {
      getWorkingtDetail({params:{id:this.id}})
        .then(data => {
          this.detail = data.content
        })
        .catch(err => {
          console.log(err);
        });
    },
    //统计文章阅读次数
    ReadingTimes(){
        setReadingTimes({params:{id:this.id,table:'working'}}).then(()=>{}).catch(err=>{})
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
    .main {
     //height: 660px;
    }
    .header,
    .main {
      position: relative;
    }
  }
}

</style>
