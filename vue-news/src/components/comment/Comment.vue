<template>
  <div class="comment">
    <!--返回上一层-->
    <v-header></v-header>
    <div>
      <div class="comments">
        <div class="title">
          {{data.title}}
        </div>
      </div>
      <div class="comment-time">
        {{data.publishTime | formatDate}}
      </div>
      <div class="comment-content">
        全部评论(<span>{{data.comment_count}}</span>)
      </div>
      <scroll
        class="list"
        :data="list"
        :beforeScroll="beforeScroll"
        :pullup="pullup"
        :pulldown="pulldown"
        @scrollToEnd="loadMore"
        @pulldown="fetchComm"
      >
        <ul>
          <li class="box" v-for="(item, index) in list" :key="index">
            <div style="position:relative;margin-top: 0.5rem;display: flex;flex-direction: row;width: 100%;">
              <div class="left" style="width:6%;display:flex;justify-items: center">
                <div v-if="item.userAvatar !== null">
                  <img :src="domain + item.userAvatar" width="22" height="22" style="border-radius: 11px"/>
                </div>
                <div v-if="item.userAvatar === null">
                  <img src="../../images/logo.png" width="22" height="22" style="border-radius: 11px"/>
                </div>
              </div>
              <div class="right" style="width:90%;">
                <div class="name" style="font-size: 14px;margin-left: 0.3rem">{{item.userNickname}}</div>
                <div class="zan" style="width:2.3rem;display: flex;flex-direction: row;position: absolute;right: 1rem;top: 0.1rem">
                  <div class="num">{{item.likeCount}}</div>
                  <div @click="zan(item)">
                    <img src="../../images/zans.png" style="position: absolute;right: 0.2rem;top: 0.1rem" width="18" height="18"/>
                  </div>
                </div>
                <div class="content" style="width: 100%;height: 3.15rem;display: flex;justify-content: center">
                  <div class="content-item" style="margin-top: 0.6rem;background: red;width: 98%;height: 3.15rem;font-size: 13px;letter-spacing: 1px">
                    {{base64.Base64.decode(item.comment)}}
                  </div>
                </div>
                <div class="content" style="width: 100%;height: 1.3rem;display: flex;justify-content: center;border-bottom: 1px solid #ccc;">
                  <div class="content-item" style="width: 97%;height: 1.3rem;font-size: 14px;letter-spacing: 1px">
                    <span style="font-size: 0.4rem;color: #ddd;">{{item.updateAt | setTime}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="no-result" v-show="!list.length">
        <p class="no-result-text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate, setTime} from "../../common/js/date"
import Header from '../header/Header'
import Base64 from 'js-base64'
import Scroll from '../scroll/Scroll'
import Loading from '../loading/Loading'
export default {
  name: "Comment",
  created() {
    this.data = this.$route.query.data
    console.log(this.data);
    this.fetchComm()
  },
  data() {
    return {
      showFlag: false,
      data: {},
      base64: Base64,
      domain: 'http://118.126.114.120:9001/static/upload/',
      list: [],
      page: 1,
      limit: 5,
      beforeScroll: true,
      pullup: true,
      pulldown: true,
      hasMore: true
    }
  },
  methods: {
    // 请求评论列表
    fetchComm() {
      this.$ajax.get(`/api/dataNews/detail/comment/list?id=${this.data.id}&page=${this.page}&limit=${this.limit}`).then((res) => {
        console.log(res.data)
        this.list = res.data.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    // 加载更多
    loadMore () {
      if (!this.hasMore) {
        return
      }
      this.page++;
      this.$ajax.get(`/api/dataNews/detail/comment/list?id=${this.data.id}&page=${this.page}&limit=${this.limit}`).then((res) => {
        console.log(res.data)
        this.list = res.data.data.list
        if (this.page > res.data.data.total / this.limit) {
          this.hasMore = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    show() {
      this.showFlag = true
    },
    close() {
      this.showFlag = false
    }
  },
  filters: {
    setTime(item) {
      let date1 = new Date(item).getTime() / (1000 * 60)
      let date2 = new Date(Date()).getTime() / (1000 * 60)
      let _time = ''
      if (date2 - date1 < 1) {
        _time = '刚刚'
      } else if ((date2 - date1) >= 1 && date2 - date1 < 60) {
        _time = parseInt((date2 - date1)) + '分钟'
      } else if (((date2 - date1) / 60) >= 1 && ((date2 - date1) / 60) < 24) {
        _time = parseInt((date2 - date1) / 60) + '小时前'
      } else if (((date2 - date1) / 60 / 24) >= 1 && ((date2 - date1) / 60 / 24) < 31) {
        _time = parseInt((date2 - date1) / 60 / 24) + '天前'
      } else if (((date2 - date1) / 60 / 24 / 30) >= 1 && ((date2 - date1) / 60 / 24 / 30) < 13) {
        _time = parseInt(((date2 - date1) / 60 / 24 / 30)) + '月前'
      } else if (((date2 - date1) / 60 / 24 / 30 / 12) >= 1) {
        _time = parseInt((date2 - date1) / 60 / 24 / 30 / 12) + '年前'
      }
      return _time
    },
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    'v-header': Header,
    Loading,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .comment
    position: fixed
    z-index: 800
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .comments
      width: 100%
      display: flex
      align-items: center
      padding: 5px
      .title
        color:#000
        font-size: 1.1rem
        font-family: Microsoft Yahei,Helvetica,sans-serif
        text-align: left
        font-weight: 400
    .comment-time
      font-size: 0.7rem
      color: #c2c5ca
      padding: 5px
    .comment-content
      padding-left: 5px
    .list
      width: 97%
      height: 720px
      overflow: hidden
      margin-left: 1.5%
    .no-result
      text-align: center
      .no-result-text
        margin-top: 30px
        font-size: 14px
        color: #000
</style>
