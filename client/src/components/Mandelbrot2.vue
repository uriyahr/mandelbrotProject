<template>
  <div>
    <canvas
      class="mbCanvas"
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      ></canvas>
    <input
      type="range"
      name="range"
      min="0"
      max="255"
      step="1"
      v-model="colorValue"
      v-on:change="draw()"
    />
    <span v-text="colorValue"></span>
  </div>
</template>
<script>
export default {
  name: "Mandelbrot2",
  props: {
    msg: String,
  },
  data: function () {
    return {
      colorValue: 0,
      maxIteration: 200,
      canvasWidth: 800,
      canvasHeight: 800,
      scaleFactor: 250,
      panX: 2,
      panY: 1.5
    }
  },
  computed: {
    calculatedColorValue: function () {
      return this.colorValue;
    }
  },
  methods: {
    inMandelbrotSet(xAxis, yAxis) {
      var realCompResult = xAxis;
      var imaginaryCompResult = yAxis;
      for(var i = 0; i < this.maxIteration; i++){
        var tempRealComp = realCompResult * realCompResult - imaginaryCompResult * imaginaryCompResult + xAxis;
        var tempImagComp = 2 * realCompResult * imaginaryCompResult + yAxis;
        realCompResult = tempRealComp;
        imaginaryCompResult = tempImagComp;

        if(realCompResult * imaginaryCompResult > 5) {
          return (i/this.maxIteration * 100); // is in the set
        }
      }
      return 0;
    },
    draw() {
      var canvas = document.getElementById("canvas");
      if(canvas.getContext) {var ctx = canvas.getContext('2d');}
      for(var x = 0; x < this.canvasWidth; x++){
        for(var y=0; y < this.canvasHeight; y++) {
          var belongsTo = this.inMandelbrotSet((x/this.scaleFactor-this.panX), (y/this.scaleFactor - this.panY));
          if(belongsTo == 0){
            // black pixel
            ctx.fillStyle = '#000';
            ctx.fillRect(x,y,1,1);
          }else {
            ctx.fillStyle = 'hsla('+ this.calculatedColorValue+ ', 100%, ' + belongsTo + '%, 0.8)';
            ctx.fillRect(x,y,1,1);
          }
        }
      }
    }
  }
}
</script>
<style>
body {
  background-color: #1e1e1e;
}
</style>