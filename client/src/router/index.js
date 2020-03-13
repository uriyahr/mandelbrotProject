import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mandelbrot2 from '@/components/Mandelbrot2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mandelbrot2',
      component: Mandelbrot2
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
