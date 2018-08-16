<template>
  <div class="detail">
    <v-header></v-header>
    <div>
      <img :src="domain + data.url" alt="">
    </div>
  </div>
</template>

<script>
import Header from '../header/Header'
export default {
  name: "BmDetail",
  data() {
    return {
      domain: 'http://118.126.114.120:9001/static/upload/',
      data: {}
    }
  },
  components: {
    'v-header': Header
  },
  created() {
    console.log(this.$route.query.data);
    this.data = this.$route.query.data
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail
    position: fixed
    z-index: 900
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
</style>
