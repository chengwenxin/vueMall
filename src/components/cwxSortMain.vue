<template>
  <div class="sort_main">
    <div class="sort_main2">
      <div class="name">{{title}}</div>
      <div class="name_r2">预留面包屑</div>
      <div class="name_right">&nbsp;</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style lang="scss">
.sort_main {
  width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  .sort_main2 {
    height: 49px;
    background-color: #dddddd;
    margin-top: 20px;
    margin: 0px 20px 0px 20px;
    display: block;
    width: 1160px;
    float: left;
    .name {
      color: #fff;
      background-image: url(../../static/lm_name_bk.png);
      line-height: 49px;
      font-size: 20px;
      float: left;
      width: 260px;
      text-align: center;
      font-family: "Microsoft YaHei", "榛戜綋", verdana;
    }
    .name_r2 {
      background-image: url(../../static/lm_name_r.png);
      line-height: 49px;
      padding: 0px 0px 0px 80px;
      float: left;
      display: block;
      font-size: 14px;
      font-family: "Microsoft YaHei", "榛戜綋", verdana;
      color: #7f306a;
      background-repeat: no-repeat;
    }
  }
}
</style>


