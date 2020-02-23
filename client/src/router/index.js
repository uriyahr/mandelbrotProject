import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mandelbrot from '@/components/Mandelbrot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mandelbrot',
      component: Mandelbrot
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
