<template>
  <div class="article">
    <template v-if="detail.isApply === '允许申请'">
      <el-button type="success"  @click="apply" style="float:right;margin-right:20px;">在线申请</el-button>
      <!-- <input @click="apply" type="button" style="float:right;margin-right:20px;color:#fff;background-color:#438F49;font-size:18px;padding:5px;font-weight:bold;" value="在线申请"> -->
    </template>
      <h1 style="font-size: 22px;font-family:'微软雅黑';color:#438F49;text-align:center;padding-top:20px;font-weight:bold;">{{detail.title}} </h1>
    
    <div class="line"></div>
    <h2 class="cont_h2">
      作者：{{detail.author}} &nbsp;&nbsp;&nbsp;发布日期：{{detail.detailDate}}&nbsp;&nbsp;&nbsp; 浏览次数：{{detail.reading_times}}
    </h2>
    <div class="cont" v-html="detail.content" >
    </div>
  </div>
</template>
<script>
import { auditList } from '../api/scholar'
export default {
  props: ["detail","width"],
  data: function() {
    return {};
  },
  methods:{
    apply(){
      auditList({category:this.detail.title}).then(data=>{
         if(data.status === '0'){
            this.$message.error(data.msg)
            this.$router.push('/login')
        }else if(data.status === "1"){
          this.$router.push('/apply/' + this.detail.id + '/' + this.detail.title)
        }else if(data.status === "2"){
          this.$message.error(data.msg)
        }
      }).catch(err =>{
        console.log(err)
      })
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
