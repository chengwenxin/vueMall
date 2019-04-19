<template>
  <div class="cwx-slide-content">
    <div class="head">
      <span>
        <router-link :to="path">更多>></router-link>
      </span>
      <dt>{{title}}</dt>
    </div>
    <cwx-slide-content-item :list="list"></cwx-slide-content-item>
  </div>
</template>
<script>
export default {
  props: ["title", "path", "list"],
  computed: {},
  methods: {},
  data: function() {
    return {};
  }
};
</script>
<style lang="scss" >
.cwx-slide-content {
  width: 550px;
  float: left;
  height: 300px;
  margin: 0 25px;
  .head {
    width: 550px;
    height: 40px;
    border-bottom: #078f48 solid 3px;
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
