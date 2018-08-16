<template>
  <div>
    <scroll
      class="news"
      ref="news"
      :data="data"
      :beforeScroll="beforeScroll"
      :pullup="pullup"
      :pulldown="pulldown"
      @scrollToEnd="loadMore"
      @pulldown="loadData"
    >
      <ul>
        <li class="box" v-for="(item, index) in data" :key="index" @click="selectItem(item)">
          <div class="wrapper">
            <div class="left-wrapper">
              <div class="box-text">{{item.title}}</div>
              <div class="bottom-wrapper">
                <div class="box-time">
                  {{
                  new Date(item.publishTime).getMonth() + 1 + '月' + new Date(item.publishTime).getDate() + '日'
                  }}
                </div>
                <div class="box-img">
                  <div @click="goTo(item)">
                    <img src="../../images/comment.png" alt="">
                  </div>
                  <div class="txt">{{item.comment_count}}</div>
                </div>
              </div>
            </div>
            <div class="right-wrapper">
              <img :src="domain+item.videoUrl" alt="">
            </div>
          </div>
        </li>
        <loading v-show="hasMore" title="正在加载..."></loading>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from '../scroll/Scroll'
import Loading from '../loading/Loading'
export default {
  name: "News",
  data() {
    return {
      page: 1,
      limit: 7,
      data: [],
      category: 'welfare',
      domain: 'http://118.126.114.120:9001/static/upload/',
      commentObj: {},
      beforeScroll: true,
      pullup: true,
      pulldown: true,
      hasMore: true
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$ajax.get(`/spot/dataNews/list.json?page=${this.page}&limit=${this.limit}&category=${this.category}`).then((res) => {
        if (res.data.success) {
          this.data = this.data.concat(res.data.data.list)
        }
        // console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    },
    // 加载更多
    loadMore() {
      if (!this.hasMore) {
        return
      }
      this.page++;
      this.$ajax.get(`/spot/dataNews/list.json?page=${this.page}&limit=${this.limit}&category=${this.category}`).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.data = this.data.concat(res.data.data.list)
          if (this.page > res.data.data.total / this.limit) {
            this.hasMore = false
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    // 跳转到评论页
    goTo(item) {
      this.$router.push({
        path: `/news/${item.id}`,
        name: 'comment',
        query: {data: item}
      })
    },
    // 跳转到详情页
    selectItem(item) {
      this.$router.push({
        path: `/news/detail/${item.id}`,
        name: 'newsdetail',
        query: {data: item}
      })
    }
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .news {
    height: 700px
    overflow: hidden
    margin-top: 10%
  }
  .box-img {
    display: flex;
    flex-direction: row;
    width: 20%;
    height: 17px;
    position: absolute;
    right: 4px;
    vertical-align: middle;
  }
  .box-img .txt {
    font-size: 12px;
    height: 16px;
    line-height 16px
  }
  .box-img img {
    width: 44%;
    height: 16px;
    margin-right: 2px;
  }
  .bottom-wrapper {
    width: 100%;
    height: 15%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .box-time {
    font-size: 12px;
    float: left;
  }
  .box-text {
    font-size: 16px;
  }
  .box {
    flex-direction: column;
    width: 93.5%;
    height: 7rem;
    border-bottom: 1px solid #dadada;
    padding: 0.6rem 0.8rem;
  }
  .left-wrapper {
    width: 65%;
    height: 7rem;
    float: left;
    position: relative;
  }
  .right-wrapper {
    width: 35%;
    height: 7rem;
    float: right;
  }
  .right-wrapper img {
    width: 100%;
    height: 7rem;
  }
</style>
