import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{index:0},
      component: Home
    },
    {
      path: '/result',
      name: 'result',
      meta:{index:1},
      component: Result
    }
  ]
})
