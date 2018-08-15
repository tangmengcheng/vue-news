<template>
  <div class="video" ref="video">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <div class="content-wrapper">
          <div class="bg-img">
            <p class="title">{{item.title}}</p>
            <img class="bg" :src="_tagsToImg(item.tags)" width="100%" height="100%"/>
            <img class="play" src="../../images/play.png" width="50" height="50"/>
          </div>
          <div class="tip-wrapper">
            <div class="tip">
              <span class="tip-img"></span>
              <span class="tip-title">{{_tagsToName(item.tags)}}</span>
            </div>
            <div class="comment">
              <div @click.stop="goTo(item)">
                <img class="comment-img" src="../../images/comment.png" width="20" height="20"/>
              </div>
              <span class="comment-count">{{item.comment_count}}</span>
              <img class="comment-img" src="../../images/dian.png" width="20" height="20"/>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Video",
  data() {
    return {
      page: 1,
      limit: 5,
      data: [],
      category: 'video',
      domain: 'http://118.126.114.120:9001/static/upload/'
    }
  },
  mounted() {
    this.$ajax.get(`/api/dataNews/list.json?page=${this.page}&limit=${this.limit}&category=${this.category}`).then((res) => {
      if (res.data.success) {
        this.data = res.data.data.list
      }
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    _tagsToImg (tags) {
      let tagsObj = JSON.parse(tags)
      let img = tagsObj.pic
      return this.domain + img
    },
    _tagsToName (tags) {
      let tagsObj = JSON.parse(tags)
      let name = tagsObj.name
      return name
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mint-navbar .page-part {
    position: fixed;
    top: 40px;
  }
  .content-wrapper {
    margin-top: 5px;
    width: 100vw;
  }
  .content-wrapper .bg-img{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 60vw;
  }
  .content-wrapper .bg-img .bg {
    position: absolute;
    top: 0;
    right: 0;
  }
  .content-wrapper .bg-img .title {
    width: 100%;
    margin: 0;
    padding: 5px 10px;
    position: absolute;
    text-align: justify;
    box-sizing: border-box;
    z-index: 20;
    top: 0;
    left: 0;
    color: #fff;
    text-indent: 0;
    background-color: rgba(7, 17, 27, 0.5);
    font-size: 14px;
    line-height: 18px;
  }
  .content-wrapper .bg-img .play {
    z-index: 20;
  }
  .content-wrapper .tip-wrapper {
    position: relative;
    width: 100%;
    height: 40px;
  }
  .content-wrapper .tip-wrapper .tip{
    display: flex;
    font-size: 0;
    align-items: center;
    height: 100%;
  }
  .content-wrapper .tip-wrapper .tip .tip-img {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("../../images/tags.png");
    background-size: 20px 20px;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-left: 12px;
    margin-right: 12px;
  }
  .content-wrapper .tip-wrapper .tip .tip-title {
    display: inline-block;
    font-size: 12px;
  }
  .content-wrapper .tip-wrapper .comment {
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 0;
    height: 100%;
    top: 0;
    right: 16px;
  }
  .content-wrapper .tip-wrapper .comment .comment-img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
  .content-wrapper .tip-wrapper .comment .comment-count {
    display: inline-block;
    border-right: 1px solid rgba(7, 17, 27, 0.5);
    font-size: 14px;
    vertical-align: top;
    padding: 0 10px;
  }
</style>
