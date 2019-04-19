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
<style lang="scss">
.sort_right {
  position: relative;
  width: 856px;
  min-height: 500px;
  float: right;
  margin-right: 20px;
  float: left;
  background-color: #ffffff;
  display: block;
  margin: 20px;
  .sort_rightcont {
    padding: 8px;
    clear: both;
    border: 1px dashed;
    border-color: #2569af;
    margin-bottom: 20px;
  }
}
</style>
