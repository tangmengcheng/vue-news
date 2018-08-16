<template>
  <div>
    <scroll
      class="bm"
      ref="bm"
      :data="data"
      :beforeScroll="beforeScroll"
      :pullup="pullup"
      :pulldown="pulldown"
      @scrollToEnd="loadMore"
      @pulldown="loadData"
    >
      <ul>
        <li v-for="(item, index) of data" :key="index" @click="selectItem(item)">
          <div class="item">
            <img class="img" width="96%" height="200" style="margin-bottom: 5px;border-radius: 5px 5px" :src="domain+item.url" />
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

    name: 'baoming',
    data () {
      return {
        page: 1,
        limit: 4,
        data: [],
        category: 'enroll',
        domain: 'http://118.126.114.120:9001/static/upload/',
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
        this.$ajax.get(`/spot/activity/list.json?page=${this.page}&limit=${this.limit}&classify=${this.category}`).then((res) => {
          if (res.data.success) {
            this.data = this.data.concat(res.data.data.list)
            console.log(res.data.data.navigatePages)
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 加载更多
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++;
        this.$ajax.get(`/spot/activity/list.json?page=${this.page}&limit=${this.limit}&classify=${this.category}`).then((res) => {
          if (res.data.success) {
            this.data = this.data.concat(res.data.data.list)
            console.log(this.data);
            if (this.page > res.data.data.list.length / this.limit) {
              this.hasMore = false
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 跳转到评论页
      selectItem(item) {
        this.$router.push({
          path: `/baoming/detail/${item.id}`,
          name: 'bmdetail',
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

<style lang="stylus" scoped rel="stylesheet/stylus">
  .bm
    height: 720px
    width: 100%
    overflow: hidden
    margin-top: 10%
    .item
      width: 100%
      display: flex
      align-items: center
      justify-content: center

</style>
