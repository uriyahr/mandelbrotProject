<template>
  <div id="div">
    <h2>{{ title }}</h2>
    <input type="number" v-model="scaleFactor"/>
    <input type="number" v-model="panX"/>
    <input type="number" v-model="panY"/>
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
      maxIteration: 400,
      canvasWidth: 500,
      canvasHeight: 500,
      scaleFactor: 50,
      panX: 2, //2
      panY: 1.5, //1.5
      chartSize: 500
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
      var iteration = 200;
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
          let max = 255;
          let value = ((i / this.maxIteration) * 100);
          let alpha = max << 24;
          let blue = Math.round(max * 0) << 16;
          let green = Math.round(max * (1 - value)) << 8;
          let red = Math.round(max * value);

          // ensure that the value being returned is between the value 0 and 255 && hexidecimal 0xff(decimal 255)
          //console.log((i/this.maxIteration) * 100);
          return (i/iteration)* 100 ;
          //alpha | blue | green | red;
          // thank you Andrew :)
            // (255 << 24) | // alpha
            //   ((255 * 0) << 16) | // blue
            //   ((255 * ) << 8) | // green
            //   Math.round(255 * ); // red
        }
      }
      return 0;
    },
    async draw() {
      var chartSize = 500;
      var dataSize = 500;

      // check vars
      var dataSet = d3.range(dataSize).map(
        function(d,i){
          return d3.range(dataSize).map(
            function(d,i){
              return ~~(Math.random()*255);
            })
      });
      var canvas = d3.select('div').append('canvas').node();
      var canvasWidth = 500
      var canvasHeight = 500;
      if (canvas.getContext) { var ctx = canvas.getContext("2d");}
      var imageData = ctx.getImageData(0,0,canvasWidth, canvasHeight);
      var buffer = new ArrayBuffer(imageData.data.length);
      var data = new Uint8ClampedArray(buffer);
      //var data = new Uint32Array(buffer);

      console.log('dataSet:', dataSet);
      console.log('canvas:',canvas);
      console.log('canvasWidth:',canvasWidth);
      console.log('canvasHeight:',canvasHeight);
      console.log('imageData:',imageData);
      console.log('buffer:',buffer);
      console.log('data: ', data);

      // possibly switch y and x in nested for loops
      for (var y = 0; y < canvasWidth; y++) {
        for (var x = 0; x < canvasHeight; x++) {
         // var index = parseInt(((x + y * this.canvasWidth)),10);
          let belongsTo = await this.inMandelbrotSet((x / this.scaleFactor - this.panX),(y / this.scaleFactor - this.panY));

          let hue = this.colorValue;
          let saturation = 100;
          let light = belongsTo;
          let newHex = hslToHex(hue,light,saturation);
          console.log(newHex);
          /**
          if (belongsTo == 0) {
            data[y * canvasWidth + x] = 0;
            // ctx.putImageData(imageData, x, y);
            //ctx.fillRect(x,y,1,1);
          } else {
            // ctx by pixel
            let pixelColorValue = toHex(belongsTo);
            data[y * canvasWidth + x] = 0xa5fc03;
            // ctx.putImageData(imageData, x, y);
            //imageData.data[index] = 'hsla('+ this.colorValue + ', 100%, ' + belongsTo + '%, 0.8)';
            //ctx.fillStyle = 'hsla('+ this.colorValue + ', 100%, ' + belongsTo + '%, 0.8)';
            //ctx.fillRect(x,y,1,1);
          }
          */
        }
      }
      /**
      console.log(data);
      imageData.data.set(data);
      ctx.putImageData(imageData, 0, 0);
      */
    },
    hslToHex(h,s,l) {
      // convert  (this.colorValue, 100%, lightValue, 0.8) to int Value
      // take in hue, saturation, light, etc --> convert to hex --> convert to integer
      let hue = this.colorValue/100;
      let saturation = 1;
      let light = lightValue/100;
      // find hsla to hex
      let c = (1-Math.abs(2*light-1)) * saturation,
          x = c * (1-Math.abs(hue/60) % 2 - 1);
          m = light - c/2;
          r = 0,
          g = 0,
          b = 0;
        if (0 <= hue && hue < 60) {
          r = c; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
          r = x; g = c; b = 0;
        } else if (120 <= hue && hue < 180) {
          r = 0; g = c; b = x;
        } else if (180 <= hue && hue < 240) {
          r = 0; g = x; b = c;
        } else if (240 <= hue && hue < 300) {
          r = x; g = 0; b = c;
        } else if (300 <= hue && hue < 360) {
          r = c; g = 0; b = x;
        }
        r = Math.round((r+m) * 255);
        g = Math.round((g+m)*255);
        b = Math.round((b+m)*255);

        // convert rbg to hex
        let hexValue = rbgToHex(r,g,b);
        console.log(hexValue);
        return rbgToHex(r,g,b);
    },
    rbgToHex(rVal,gVal,bVal){
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);

      if(r.length == 1){ r = '0' + r;}
      if(g.length == 1){ g = '0' + g;}
      if(b.length == 1){ b = '0' + b;}
      let hex = '0x' + r + g + b;
      console.log('rbgToHex',hex);
      return hex;
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