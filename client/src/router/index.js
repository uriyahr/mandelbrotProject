import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mandelbrot2 from '@/components/Mandelbrot2'
import p5Mandelbrot from '@/components/p5Mandelbrot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'p5Mandelbrot',
      component: p5Mandelbrot
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
