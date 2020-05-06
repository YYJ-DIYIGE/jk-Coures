<template>
  <div class="page-container">
    <img class="no" src="../assets/no.png" />
    <div class="text">暂无更多</div>
  </div>
</template>
<script>
export default {
  name: "NoList",
};
</script>
<style lang="less" scoped>
.page-container {
  text-align: center;
  .no {
    margin-top: 170px;
    width: 100px;
    height: 70px;
  }
  .text {
    font-size: 10px;
    color: #a29a9a;
  }
}
</style>
