import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mandelbrot2 from '@/components/Mandelbrot2'
import p5Mandelbrot from '@/components/p5Mandelbrot'
import d3Test from '@/components/d3Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mandelbrot2',
      component: Mandelbrot2
    },
    {
      path: '/d3',
      name: 'd3Test',
      component: d3Test
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
