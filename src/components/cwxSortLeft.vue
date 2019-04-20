<template>
  <div class="sort_left">
    <div class="sort_leftcont">
      <ul>
        <li>通知公告</li>
        <li>通知公告</li>
        <li>通知公告</li>
        <li>通知公告</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.sort_left {
  float:left;
  li {
    font-size:18px;
    font-family: "微软雅黑";
    color:#333;
    // font-weight: bold;
    background: #DDDDDD;
    text-align: center;
    line-height: 36px;
    margin-bottom: 10px;
  }
  li:hover {
    background:#078F48;
  }
  width: 260px;
  min-height: 600px;
  float: left;
  margin-left: 20px;
  margin: 20px;
  .sort_leftcont {
    width: 260px;
  }
}
</style>
