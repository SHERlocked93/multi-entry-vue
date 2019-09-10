import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
import Test1 from 'components/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/test1',
      name: 'test1',
      component: Test1
    }
  ]
})
