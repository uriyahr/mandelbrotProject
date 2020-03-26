<template>
  <div id="div">
    <h2>{{ title }}</h2>
    <div id="options">
      <input type="number" v-model="scaleFactor"/>
      <input type="number" v-model="panX"/>
      <input type="number" v-model="panY"/>
    </div>
    <div id="container">
    </div>
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
      size: window.innerWidth,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      scaleFactor: 100,
      panX: 2, //2
      panY: 1.5, //1.5
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
          return (i / iteration) * 100 ;
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
      var canvas = d3.select('#container').append('canvas').attr('width', this.canvasWidth).attr('height', this.canvasHeight).node();
      if (canvas.getContext) { var ctx = canvas.getContext("2d");}
      var imageData = ctx.getImageData(0,0,this.canvasWidth, this.canvasHeight);
      var buffer = new ArrayBuffer(imageData.data.length);
      var buffer8 = new Uint8ClampedArray(buffer);
      var data = new Uint32Array(buffer8);
      // possibly switch y and x in nested for loops
      for (var y = 0; y < this.canvasWidth; y++) {
        console.log(y, this.canvasHeight);
        for (var x = 0; x < this.canvasWidth; x++) {
          let belongsTo = await this.inMandelbrotSet((x / this.scaleFactor - this.panX),(y / this.scaleFactor - this.panY));
          if (belongsTo == 0) {
            data[y * this.canvasWidth + x] = 0x00000000;
          } else {
            let hue = this.colorValue;
            let saturation = 1;
            var color = await this.hslToHex(hue,saturation,belongsTo);
            //console.log(newHex);
            data[y * this.canvasWidth + x] = (255 << 24) | // alpha
            (color.b << 16) | // blue
            (color.g << 8) | // green
            color.r; // red;
          }
        }
      }

      console.log('canvas:',canvas);
      console.log('canvasWidth:',this.canvasWidth);
      console.log('canvasHeight:', this.canvasHeight);
      console.log('imageData:',imageData);
      console.log('buffer:',buffer);
      console.log('data: ', data);

     // console.log(data);
      imageData.data.set(data);
      ctx.putImageData(imageData, 0, 0);
    },
    async hslToHex(h,s,l) {
      // convert  (this.colorValue, 100%, lightValue, 0.8) to 0xHEX
      // take in hue, saturation, light, etc --> convert to hex --> convert to integer
      //console.log('in hslToHex...');

      let hue = h;
      let saturation = s;
      let light = l / ((this.maxIteration / 200) * 500);
      //console.log(hue, saturation, light);
      //console.log(hue,saturation,light);
      let c = (1 - Math.abs(2 * light - 1)) * saturation,
          x = c * (1 - Math.abs(hue / 60) % 2 - 1),
          m = light - c/2,
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
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      //console.log('rgb', r,g,b);
      return {
        r: r,
        g: g,
        b: b,
      }
      // let hex = await this.rbgToHex(r,g,b); // converting rbg to hex
      // return hex;
    },
    rbgToHex(rVal,gVal,bVal){
      return ((255 << 24) | (bVal << 16) | (gVal << 8) | rVal);
      // return (255 << 24) |
      // (bVal << )
      // console.log('in rbgToHex...');
      // console.log(r,g,b);
      // let r = rVal.toString(16);
      // let g = gVal.toString(16);
      // let b = bVal.toString(16);

      // if(r.length == 1){ r = '0' + r;}
      // if(g.length == 1){ g = '0' + g;}
      // if(b.length == 1){ b = '0' + b;}
      // let hex = '0x' + r + g + b;
      // console.log('rbgToHex',hex);
      // 0xFFFFFF
      // "0xFFFFF"
      // return hex;
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
  },
  mounted() {
    this.draw();
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

#options {
  z-index: 100;
}

#container {
  position: fixed;
  z-index: -100;
  left: 0px;
  top: 0px;
}
</style>