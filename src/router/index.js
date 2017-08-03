import Vue from 'vue'
import Router from 'vue-router'
import scroll from '@/components/scroll'
import refresh from '@/components/refresh'
import load from '@/components/load'
import qqboard from '@/components/qq-board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: refresh
    },
    {
      path: '/load',
      name: 'load',
      component: load
    },
    {
      path: '/qqboard',
      name: 'qqboard',
      component: qqboard
    }
  ]
})
