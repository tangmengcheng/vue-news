<template>
  <div id="app">
      <!-- 头部 -->
      <v-header style="position: fixed;top: 0;z-index: 100"></v-header>
      <!-- 三个标签 -->
      <div class="tab">
        <div class="tab-item">
          <router-link to="/video">视频报道</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/news">公益新闻</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/baoming">报名吧</router-link>
        </div>
      </div>
    <!-- 内容 -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/header/Header'
export default {
  name: 'App',
  components: {
    "v-header": Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      position: fixed
      top: 50px
      z-index: 100
      background: #fff
      //border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            font-weight bold
            color: rgb(240, 20, 20)
            border-bottom: 2px solid red
    .content
      margin-top: 93px
</style>
