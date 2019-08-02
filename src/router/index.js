import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/page/Recommend'     //首页
import Singerlist from '@/page/Singerlist'
import Toplists from '@/page/toplists'
import Search from '@/page/search'

import Singer from '@/components/Singer'
import Mysonglist from '@/components/mysonglist'
import Album from '@/components/Album'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      name:'recommend',
      component:Recommend,
      children: [
        {
          path:'/recommend/Mysonglist',
          name:'Mysonglist',
          component:Mysonglist,
        }
      ]
    },
    {
      path:'/Singerlist',
      name:'Singerlist',
      component:Singerlist,
      children:[
        {
          path:'/singerlist/Singer',
          name:'Singer',
          component:Singer
        },
        {
          path:'/Album',
          name:'Album',
          component:Album
        }
      ]
    },
    {
       path:'/Toplists',
        name:'Toplists',
        component:Toplists,
    },
    {
      path:'/Search',
      name:'Search',
      component:Search,
    },

  ]
})
