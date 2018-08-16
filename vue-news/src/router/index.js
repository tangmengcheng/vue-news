import Vue from 'vue';
import Router from 'vue-router';
import Video from '@/components/video/Video';
import News from '@/components/news/News';
import BaoMing from '@/components/baoming/Baoming';
import Comment from '@/components/comment/Comment';
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
        }
      ]
    },
    {
      path: '/baoming',
      name: 'baoming',
      component: BaoMing
    }
  ]
})
