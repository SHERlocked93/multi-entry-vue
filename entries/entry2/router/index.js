import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
import Test2 from 'components/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/test2',
      name: 'test2',
      component: Test2
    }
  ]
})
