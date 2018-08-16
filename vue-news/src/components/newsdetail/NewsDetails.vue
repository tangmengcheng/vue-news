<template>
  <div class="detail">
    <v-header></v-header>
    <div ref="imgs" class="detail-item">
      <div class="box content-padded">
        <div class="distribCol1" style="text-align:justify; text-justify:newspaper; margin-top: 0">
          <div class="title">
            {{data.title}}
          </div>
          <div class="time">
            喜得宝 {{data.publishTime | formatDate}}
          </div>
          <div class="content" v-html="data.content">
          </div>
          <div class="bac">
            <img src="http://118.126.114.120:9001/static/upload/6eaa7785-69f9-435b-9de0-0157c2d90bdc.jpg" width="100%" height="100%" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../header/Header'
import {formatDate} from "../../common/js/date"

export default {
  name: "NewsDetails",
  created() {
    this.data = this.$route.query.data
    this._fetchDetail()
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    _fetchDetail() {
      this.$ajax.get(`/spot/dataNews/detail.json?id=${this.data.id}`).then((res) => {
        console.log(res.data)
        this.data = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail
    position: fixed
    z-index: 800
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .detail-item
      margin-left: 1.5%
      margin-top: 1.5%
      margin-right 1.5%
      .title
        color:#000;
        font-size: 1.1rem;
        font-family: Microsoft Yahei,Helvetica,sans-serif;
        text-align: left;
        font-weight: 700;
      .time
        margin: 0.8rem 0 0.8rem 0;
        font-size: 0.7rem;
        color: #c2c5ca
      .content
        color:#000;
        text-indent: 2em;
        margin: 0.5em 0;
        letter-spacing: 1px;
        line-height: 1.6rem;
        font-family: Microsoft Yahei,Helvetica,sans-serif;
        text-align:justify; text-justify:newspaper;
        & > h4
          text-align: center;
          color:#000;
          font-size: .8rem;
          font-weight: 400;

</style>
