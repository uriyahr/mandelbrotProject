<template>
  <div>
    <h4> p5 Reconfig </h4>
    <div id="p5Canvas"></div>
  </div>
</template>
<script>
var mandelbrot = require('../scripts/mandelbrot.js')
export default {
  name: 'p5Mandelbrot',
  data: function () {
    return {

    }
  },
  mounted() {
    const P5 = require('p5');
    new P5(mandelbrot.main);
    mandelbrot.setDelegate();
    // use p5 as an instance mode
    // const P5 = require('p5');
    // new P5(script);
  }
}
</script>
<style>

</style>