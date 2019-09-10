import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
import Test3 from 'components/test3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/test3',
      name: 'test3',
      component: Test3
    }
  ]
})
