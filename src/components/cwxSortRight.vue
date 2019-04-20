<template>
  <div class="sort_right">
    <div class="sort_rightcont">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.sort_right {
  position: relative;
  width: 856px;
  min-height: 600px;
  margin-right: 20px;
  float: left;
  background-color: #ffffff;
  display: block;
  margin: 20px;
    border-left: 1px dashed;
  border-bottom: 1px dashed;
  border-right: 1px dashed;
  border-color: #2569af;
  .sort_rightcont {
    padding: 8px;
    clear: both;
    margin-bottom: 20px;
  }
}
</style>
