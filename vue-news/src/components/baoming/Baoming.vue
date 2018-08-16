<template>
  <div ref="bm" class="baoming">
    <ul class="content">
      <li v-for="n in 100">
        {{n}}
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Baoming",
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.bm, {})
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .baoming
    height: 500px
    overflow hidden
    content
      height: 100px
      li
        height: 10px
</style>
