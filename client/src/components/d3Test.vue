<template>
  <div id="divCanvas">
    <button @click="draw()">draw</button>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "d3Test",
  methods: {
    draw() {
      var chartSize = 300;
      var dataSize = 300;
      var dataset = d3.range(dataSize).map(function(d, i) {
        return d3.range(dataSize).map(function(d, i) {
          return ~~(Math.random() * 255);
        });
      });
      var canvas = d3.select("#divCanvas").append("canvas").node();
 //       .append("canvas")
        //.style({
        //  position: "absolute",
        //  width: chartSize + "px",
        //  height: chartSize + "px"
        //})
        //.attr({ width: dataSize, height: dataSize })
        //.node();
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;
      if (canvas.getContext) { var ctx = canvas.getContext("2d");}
      var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      var buf = new ArrayBuffer(imageData.data.length);
      var buf8 = new Uint8ClampedArray(buf);
      var data = new Uint32Array(buf);

      console.log('dataSet:', dataset);
      console.log('canvas:',canvas);
      console.log('canvasWidth:',canvasWidth);
      console.log('canvasHeight:',canvasHeight);
      console.log('imageData:',imageData);
      console.log('buffer:',buf);
      console.log('buffer8:',buf8);
      console.log('data: ', data);

      for (var y = 0; y < canvasHeight; ++y) {
        for (var x = 0; x < canvasWidth; ++x) {
          var value = dataset[y][x];
          data[y * canvasWidth + x] =
            (255 << 24) | // alpha
            ((value / 2) << 16) | // blue
            (value << 8) | // green
            255; // red
        }
      }
      console.log(buf8);
      imageData.data.set(buf8);
      ctx.putImageData(imageData, 0, 0);
    }
  }
};
</script>