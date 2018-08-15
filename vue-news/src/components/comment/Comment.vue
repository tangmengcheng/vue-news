<template>
  <div class="comment" v-show="showFlag">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="content">
      评论
    </div>
  </div>
</template>

<script>
import Header from '../header/Header'
export default {
  name: "Comment",
  props: {
    data: {}
  },
  mounted() {
    console.log(this.data);
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    close() {
      this.showFlag = false
    }
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .comment
    position: fixed
    left: 0
    top: 0
    z-index: 300
    width: 100%
    height: 100%
    background: #fff
</style>
