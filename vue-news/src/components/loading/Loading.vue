<template>
  <div class="loading">
    <img src="../../images/loading.gif" width="24" height="24" alt="加载图">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    title: String,
    default: '正在加载...'
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      color: rgba(255, 255, 255, 0.5)
      font-size: 12px
</style>
