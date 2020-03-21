<template>
  <div>
    <h4> p5 Reconfig </h4>
    <div id="p5Canvas"></div>
  </div>
</template>
<script>
export default {
  name: 'p5Mandelbrot',
  data: function () {
    return {

    }
  },
  mounted() {
    const script = function(p5) {
      p5.setup = _ => {
        p5.createCanvas(500,500);
      }
      p5.draw = _ => {
        p5.background(0);
      }
    }
  }
}
</script>
<style>

</style>