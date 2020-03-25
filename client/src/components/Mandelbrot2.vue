<template>
  <div id="div">
    <h2>{{ title }}</h2>
    <!-- <canvas class="mbCanvas" id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas> -->
    <ColorPalette @update-color="updateColor" />
  </div>
</template>
<script>
import ColorPalette from "./ColorPalette";
import * as d3 from 'd3';
export default {
  name: "Mandelbrot2",
  props: ["newColorVal"],
  components: {
    ColorPalette
  },
  data: function() {
    return {
      //updateColorValue: ColorPalette.data().currentColor,
      title: "Mandelbrot Fractal Set",
      colorValue: 180,
      maxIteration: 100,
      canvasWidth: 300,
      canvasHeight: 300,
      scaleFactor: 200,
      panX: 2, //2
      panY: 1.5, //1.5
      chartSize: 300
    };
  },
  computed: {
    // updateColorValue: function() {
    //   this.colorValue = this.ColorPalette.data().currentColor;
    // },
    // calculatedColorValue: function() {
    //   console.log("(from mandel comp) new Color Val",this.updateColorValue);
    //   return this.updateColorValue;
    // }
  },
  watch: {
    colorValue: function() {
      this.draw();
    }
  },
  methods: {
    inMandelbrotSet(xAxis, yAxis) {
      var realCompResult = xAxis;
      var imaginaryCompResult = yAxis;
      for (var i = 0; i < this.maxIteration; i++) {
        var tempRealComp =
          realCompResult * realCompResult -
          imaginaryCompResult * imaginaryCompResult +
          xAxis;
        var tempImagComp = 2 * realCompResult * imaginaryCompResult + yAxis;
        realCompResult = tempRealComp;
        imaginaryCompResult = tempImagComp;
        if (realCompResult * imaginaryCompResult > 5) {
          return (i / this.maxIteration) * 100; // is in the set
        }
      }
      return 0;
    },
    draw() {
      var dataSize = 300;
      var dataSet = d3.range(dataSize).map(
        function(d,i){
          return d3.range(dataSize).map(
            function(d,i){
              return ~~(Math.random()*255);
            })
      });
      //var canvas = document.getElementById("canvas");
      var canvas = d3.select('#div').append('canvas').node();
      if (canvas.getContext) { var ctx = canvas.getContext("2d");}
      var imageData = ctx.getImageData(0,0,canvas.width , canvas.height);
      var buffer = new ArrayBuffer(imageData.data.length);
      var buffer8 = new Uint8ClampedArray(buffer);
      var data = new Uint32Array(buffer);

      // possibly switch y and x in nested for loops
      for (var y = 0; y < canvas.height; ++y) {
        for (var x = 0; x < canvas.width; ++x) {
         // var index = parseInt(((x + y * this.canvasWidth)),10);
          var index = y * canvas.width + x;
          var belongsTo = this.inMandelbrotSet(
            (x / this.scaleFactor - this.panX),
            (y / this.scaleFactor - this.panY)
          );
          if (belongsTo == 0) {
            ctx.fillStyle = '#000';
            data[index] = 0;
            // ctx.putImageData(imageData, x, y);
            //ctx.fillRect(x,y,1,1);
          } else {
            // ctx by pixel
            ctx.fillStyle = '#34eb61'
            data[index] = 50;
            // ctx.putImageData(imageData, x, y);
            //imageData.data[index] = 'hsla('+ this.colorValue + ', 100%, ' + belongsTo + '%, 0.8)';
            //ctx.fillStyle = 'hsla('+ this.colorValue + ', 100%, ' + belongsTo + '%, 0.8)';
            //ctx.fillRect(x,y,1,1);
          }
        }
      }
      console.log(buffer8);
      try {
        imageData.data.set(buffer8);
        ctx.putImageData(imageData,0,0);
      }catch(error){
        console.log(error);
      }
    },
    updateColor(newColor) {
      this.colorValue = newColor;
    }
    // zoomIn(event) {
    //   // get mouse up location
    //   // var x = event.clientX;
    //   // var y = event.clientY;
    //   // pixel location

    //   // transform pizel coordinates to ccartesian coordinates

    //   // mouse release is new center

    // },
    // zoomOut () {

    // },
    // resetMandelbrot () {

    // }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:200&display=swap");
body {
  background-color: #0f111a;
}
h2 {
  color: white;
  text-align: center;
  font-family: "Raleway", sans-serif;
}
button {
  font-family: "Raleway", sans-serif;
  padding: 15px 32px;
  margin: 4px 2px;
}
</style>