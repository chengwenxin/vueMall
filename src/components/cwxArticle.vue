<template>
  <div class="article">
    <template v-if="detail.isApply === 1">
      <input @click="apply" type="button" style="float:right;margin-right:20px;color:#fff;background-color:#078f48;font-size:18px;padding:5px;font-weight:bold;" value="在线申请">
    </template>
      <h1 style="font-size: 22px;font-family:'微软雅黑';color:#078f48;text-align:center;padding-top:20px;font-weight:bold;">{{detail.title}} </h1>
    
    <div class="line"></div>
    <h2 class="cont_h2">
      作者：{{detail.author}} &nbsp;&nbsp;&nbsp;发布日期：{{detail.detailDate}}&nbsp;&nbsp;&nbsp; 浏览次数：{{detail.reading_times}}
    </h2>
    <div class="cont" v-html="detail.content">
      <!-- {{detail.content}} -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["detail"],
  data: function() {
    return {};
  },
  methods:{
    apply(){
      this.$router.push('/apply/' + this.detail.id)
    }
  }
};
</script>
<style lang="scss" scoped>
.article {
  padding: 8px;
  clear: both;
  margin-bottom: 20px;
  .line {
    width: 820px;
    border-bottom: 1px solid #d6d6d6;
    margin-left: 20px;
    margin-top: 30px;
  }
  .cont_h2{
    font-size: 14px;
    font-family: "微软雅黑";
    color: #333333;
    text-align: center;
    font-weight: normal;
    padding-top: 10px;
  }
  .cont {
    clear: both;
    width: 820px;
    color: #333333;
    padding: 20px;
}
}
</style>
