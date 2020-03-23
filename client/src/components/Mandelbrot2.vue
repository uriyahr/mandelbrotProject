<template>
  <div>
    <h2> {{ title }}</h2>
    <canvas
      class="mbCanvas"
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      ></canvas>
    <ColorPalette @update-color="updateColor"/>
  </div>
</template>
<script>
import ColorPalette from './ColorPalette'
export default {
  name: "Mandelbrot2",
  props:['newColorVal'],
  components: {
    ColorPalette
  },
  data: function () {
    return {
      //updateColorValue: ColorPalette.data().currentColor,
      title: 'Mandelbrot Fractal Set',
      colorValue:180,
      maxIteration: 100,
      canvasWidth: 500,
      canvasHeight: 500,
      scaleFactor: 200,
      panX: 2, //2
      panY: 1.5 //1.5
    }
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
    inMandelbrotSet (xAxis, yAxis) {
      let realCompResult = xAxis;
      let imaginaryCompResult = yAxis;
      for(var i = 0; i < this.maxIteration; i++){
        let tempRealComp = realCompResult * realCompResult - imaginaryCompResult * imaginaryCompResult + xAxis;
        let tempImagComp = 2 * realCompResult * imaginaryCompResult + yAxis;
        console.log('real comp: ', realCompResult, tempRealComp);
        console.log('imag comp: ', imaginaryCompResult, tempImagComp);
        realCompResult = tempRealComp;
        imaginaryCompResult = tempImagComp;
        if(realCompResult * imaginaryCompResult > 5) {
          return (i/this.maxIteration * 100); // is in the set
        }
      }
      return 0;
    },
    draw () {
      let canvas = document.getElementById("canvas");
      if(canvas.getContext) {var ctx = canvas.getContext('2d');}
      for(let x = 0; x < this.canvasWidth; x++){
        for(let y=0; y < this.canvasHeight; y++) {
          let belongsTo = this.inMandelbrotSet((x/this.scaleFactor-this.panX), (y/this.scaleFactor - this.panY));
          if(belongsTo == 0){
            ctx.fillStyle = '#000';
            ctx.fillRect(x,y,1,1);
          }else {
            ctx.fillStyle = 'hsla('+ this.colorValue + ', 100%, ' + belongsTo + '%, 0.8)';
            ctx.fillRect(x,y,1,1);
          }
        }
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
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200&display=swap');
body {
  background-color: #0f111a;
}
h2 {
  color: white;
  text-align: center;
  font-family: 'Raleway', sans-serif;
}
button {
  font-family: 'Raleway', sans-serif;
  padding: 15px 32px;
  margin: 4px 2px;
}

</style>