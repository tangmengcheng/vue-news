<template>
  <div class="header">
    <div class="back" @click="back">
      <i class="icon-arrow_lift"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    width 100%;
    height 50px;
    background #c11329;
    .back
      position absolute;
      top 5px
      left: 0
      .icon-arrow_lift
        display block
        padding: 10px
        font-size 20px
        color #fff
</style>
