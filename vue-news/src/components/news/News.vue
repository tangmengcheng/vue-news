<template>
    <div class="news">
      <div ref="news">
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
                    <div>
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
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      page: 1,
      limit: 7,
      data: [],
      category: 'welfare',
      domain: 'http://118.126.114.120:9001/static/upload/',
      commentObj: {}
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
    // 跳转到评论页
    selectItem(item) {
      this.$router.push({
        path: `/news/${item.id}`
      })
      // this.commentObj = item
      // this.$refs.comment.show()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
