import Vue from 'vue';
import Router from 'vue-router';
import Video from '@/components/video/Video';
import News from '@/components/news/News';
import BaoMing from '@/components/baoming/Baoming';
import NewsDetail from '@/components/newsdetail/NewsDetails';
import Comment from '@/components/comment/Comment';
import VideoNewDetail from '@/components/video/VideoNewsDetail';
import BaoMDetail from '@/components/baoming/BmDetail';
import '../../static/css/reset.css'
import '../common/stylus/icon.styl'
Vue.use(Router)
Vue.config.productionTip = false;
export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/video'
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      children: [
        {
          path: ':id',
          name: 'comment',
          component: Comment
        },
        {
          path: '/detail:id',
          name: 'newsdetail',
          component: NewsDetail
        }
      ]
    },
    {
      path: '/baoming',
      name: 'baoming',
      component: BaoMing,
      children: [
        {
          path: '/detail:id',
          name: 'bmdetail',
          component: BaoMDetail
        }
      ]
    },
    {
      path: '/video/detail',
      name: 'videoDetail',
      component: VideoNewDetail
    }
  ]
})
