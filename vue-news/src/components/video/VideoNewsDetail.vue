<template>
  <transition name="video-move">
    <div class="video-detail">
      <video class="video" :src="videoUrl" playsinline="true" controls :poster="url">
        your browser does not support the video tag
      </video>
      <div class="comment-container">
        <p class="comment-title">全部评论（{{data.comment_count}}）</p>
        <div class="comment"  ref="comment">
          <ul id="commentList" class="comment-list" ref="commentList">
            <li class="comment-item" v-for="(item, index) in comments" :key="index">
              <div class="avatar">
                <img class="avatar-img" :src="_imgUrl(item.userAvatar)" width="30" height="30">
              </div>
              <div class="message">
                <p class="name">{{item.userNickname}}</p>
                <p class="text">{{base.Base64.decode(item.comment)}}</p>
                <p class="time">{{_timeToDate(item.createAt)}}</p>
              </div>
              <div class="like">
                <span class="count">{{item.likeCount}}</span>
                <span class="like-img"></span>
              </div>
            </li>
            <div ref="fill"></div>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="icon" style="margin-left: 1rem;margin-right: 0.5rem">
          <img src="../../images/comments.png" width="20" height="20" alt="">
        </div>
        <input type="text" placeholder="写评论...">
        <div class="icon" style="width:10%;margin-left: 0.5rem;margin-right: 0.5rem;display: flex;justify-content: center;align-items: center;">
          <img src="../../images/comments.png" width="20" height="20" alt="">
          <span style="margin-left: 2px"></span>
        </div>
        <div class="send" style="width: 2rem;height: 1.5rem;border: 1px solid #ccc;display: flex;justify-content: center;align-items: center;border-radius: 2px">
          <span style="font-size: 12px">发送</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Base64 from 'js-base64'
    export default {
      data(){
        return {
          data: {},
          videoUrl:"",
          url:"",
          comments: [],
          base: Base64
        }
      },
      methods: {
        _imgUrl (userAvatar) {
          let url = userAvatar ?  this.$cfig.host + this.$cfig.static + userAvatar
            : require('../../images/tags.png')
          return url
        },
        _timeToDate (time) {
          let date1 = time/(1000*60);
          let date2 = new Date(Date()).getTime()/(1000*60);
          let _time='';
          if(date2-date1<1)
            _time='刚刚';
          else if(60>date2-date1>=1)
            _time=parseInt((date2-date1))+'分钟前';
          else if(24>(date2-date1)/60>=1)
            _time=parseInt((date2-date1)/60)+'小时前';
          else if(31>(date2-date1)/60/24>=1)
            _time=parseInt((date2-date1)/60/24)+'天前';
          else if(13>(date2-date1)/60/24/30>=1)
            _time=parseInt((date2-date1)/60/24/30)+'月前';
          else if((date2-date1)/60/24/30/12>=1)
            _time=parseInt((date2-date1)/60/24/30/12)+'年前';
          return _time
        }
      },
      created() {
        this.data = this.$route.params.data
        this.videoUrl = this.$cfig.host + this.$cfig.static + this.$route.params.data.videoUrl
        this.url = this.$cfig.host + this.$cfig.static + JSON.parse(this.$route.params.data.tags).pic
        let item = {
          id: this.data.id,
          page: 1,
          limit: 5,
        }
        this.$ajax.get('/spot/dataNews/detail/comment/list', {params: item})
          .then(res => {
            this.comments = res.data.data.list
            console.log(this.comments);
            this.$nextTick(() => {
              let listHeight = this.$refs.commentList.getBoundingClientRect().bottom - this.$refs.commentList.getBoundingClientRect().height
              if (this.$refs.commentList.clientHeight <= listHeight) {
                this.$refs.fill.style.height = listHeight - this.$refs.commentList.clientHeight + 5 + 'px'
              }
              this.$refs.comment.style.height = listHeight + 'px'
              this.scroll = new BScroll(this.$refs.comment, {
                click: true
              })
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
</script>

<style lang="stylus" scoped>
  .video-detail
    position fixed
    z-index 150
    top 50px
    width 100%
    bottom 0
    background-color black
    transform translate3d(0,0,0)
    &.video-move-enter-active, &.video-move-leave-active
      transition all .5s linear
    &.video-move-enter
      transform translate3d(100%,0,0)
    &.video-move-leave-to
      transform translate3d(-100%,0,0)
    .video
      width 100vw
      height 60vw
      background-color black
    .comment-container
      padding 10px 8px 0 8px
      overflow hidden
      color #fff
      .comment-title
        font-size 16px
      .comment
        height 100px
        margin-top 8px
        overflow hidden
        .comment-item
          display flex
          position relative
          padding-top 5px
          padding-bottom 10px
          .avatar
            flex 0 0 30px
            height 100%
            .avatar-img
              height 30px
              width 30px
              border-radius 50%
          .message
            flex 1
            margin-left 8px
            vertical-align top
            padding-bottom 8px
            border-bottom 1px solid #fff
            display inline-block
            height 100%
            .name
              font-size 14px
            .text
              padding 10px 0
              font-size 12px
            .time
              font-size 10px
          .like
            position absolute
            top 0
            right 0
            font-size 0
            .count
              display inline-block
              font-size 14px
              margin-right 8px
            .like-img
              width 14px
              height 14px
              display inline-block
              background-image url("../../images/zanss.png")
              background-size 14px 14px
              background-repeat no-repeat
    .footer
      width: 100%;
      height: 2.5rem;
      background: #fff;
      position: fixed;
      bottom: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      input
        width: 62%;
        height: 2rem;
        border: 0;
        outline: none;
        padding-left: 5px;
        border-radius: 2px;

</style>
