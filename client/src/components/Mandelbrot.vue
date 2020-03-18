<template>
  <div>
    <div class="introMsg">
      <ul>
        <li v-for="intro in introMsg" :key="intro">
          <vue-typer
            :text="intro.text"
            :pre-type-delay="intro.preTypeDelay"
            :type-delay="intro.typeDelay"
            :repeat="intro.repeat"
          />
        </li>
      </ul>
    </div>
    <canvas class="mbCanvas" id="canvas"></canvas>
    <h1 class="color-value"></h1>
    <input
      type="range"
      name="range"
      value="1"
      min="1"
      max="255"
      step="1"
      class="color-slider"
      v-model="colorValue" />
    <div class="controls">
      <button>Incremenet Zoom</button>
      <button>Decrement Zoom</button>
      <button>Reset Mandelbrot</button>
    </div>
  </div>
</template>

<script>
import { VueTyper } from "vue-typer";
export default {
  name: "Mandelbrot",
  props: {
    msg: String
  },
  components: {
    "vue-typer": VueTyper
  },
  data: function() {
    return {
      colorValue: 0,
      scaleFactor: 200,
      panX: 2,
      panY: 1.5,
      introMsg: [
        {
          text: "THE MANDELBROT SET",
          preTypeDelay: 0, // 17990
          typeDelay: 100,   // 130
          repeat: 0
        }
    },
  },
  computed: {
    currentColorValue: function () {
      return this.colorValue;
    }
  },
  mounted() {
    const track = document.querySelector(".color-slider");
    const color_value_el = document.querySelector(".color-value");
    var changeBgTo = color => (track.style.background = color);
    var canvas = document.getElementById("canvas");
    var value;

    if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }

    canvas.width = 800;
    canvas.height = 800;
    var scaleFactor = 250; // to data
    var panX = 2;
    var panY = 1.5;

   track.addEventListener("input", () => {
      var colorCode = '#fff';
      value = parseInt(track.value);

      changeBgTo(value);
      color_value_el.innerText = value;
      color_value_el.style.opacity = 1;
      track.style.boxShadow = '0 5px 15px rbga(255, 255, 255, 0.15)';


    })

    function inMandelbrotSet(xAx, yAx) {
      var realCompResult = xAx;
      var imaginaryCompResult = yAx;
      var maxIter = 400;
      for(var i = 0; i < maxIter; i++) {
        // calculating real and imaginary components of result seperatley
        var tempRealComp = realCompResult * realCompResult - imaginaryCompResult * imaginaryCompResult + xAx;
        var tempImagComp = 2 * realCompResult * imaginaryCompResult + yAx;
        realCompResult = tempRealComp;
        imaginaryCompResult = tempImagComp;

        if(realCompResult * imaginaryCompResult > 5) {
          return (i/maxIter * 100); // in set
        }
      }
        return 0;
    }
    console.log(this.currentColorValue);
     for(var x = 0; x < canvas.width; x++) {
      for(var y = 0; y < canvas.height; y++){
        var belongsTo = inMandelbrotSet((x/scaleFactor - panX), (y/scaleFactor - panY));
        if (belongsTo == 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y,1,1); // black pixel
        } else {
          ctx.fillStyle = 'hsla('+ this.currentColorValue + ', 100%, ' + belongsTo + '%, 0.8)';
          ctx.fillRect(x,y,1,1);
        }
      }
    }


    track.addEventListener('change', ()=> {
      setTimeout(() => {
        color_value_el.style.opacity = 0;
        track.style.boxShadow = '0 5px 15px rbga(255, 255, 255, 0)';
      },1000);
    })

   // track coordinates on mandelbrot canvas
    function getCoord(canvas, event){
      console.log("X Coord:", event.clientX);
      if(event.clientX < 0) {
        console.log("X Coord: negative");
      }else {
        console.log("X Coord: positive");
      }
      console.log("Y Coord:", event.clientY);
      if(event.clientY < 0) {
        console.log("Y Coord: negative");
      }else {
        console.log("X Coord: positive");
      }
    }
    canvas.addEventListener("mousedown", function(e) {
        getCoord(canvas,e);
    });
  }
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=EB+Garamond&display=swap"); */
body {
  background-color: #1e1e1e;
}
.mbCanvas {
  border: 1px solid #1e1e1e;
  text-align: center;
}
.vue-typer {
  /* font-family: "EB Garamond", serif; */
  background-color: #1e1e1e;
  width: 10px;
}
.vue-typer .custom.char {
  color: #d4d4bd;
  font-size: 25px;
}
.vue-typer .custom.caret {
  width: 3px;
  background-color: #d4d4bd00;
}
li {
  list-style-type: none;
}
.introMsg {
  padding-left: 300px;
  padding-right: 300px;
}
.controls {
  text-align: center;
}
.color-value {
  font-size: 6em;
  margin-bottom: 70px;
  color: #fff;
  text-shadow: 0 5px 20px rbga(255, 255, 255, 0.1);
  opacity: 0;
  transition: 0.3s linear opacity;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
}
.color-slider {
  -webkit-appearance: none;
  height: 10px;
  width: 75%;
  outline: none;
  background: #2cff7d;
  border-radius: 5px;
  transition: 0.2s linear all;
  box-shadow: 0 5px 15px rbga(255, 255, 255, 0);
}
.color-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  box-shadow: 0px 0px 2px #000000;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #000000;
  cursor: pointer;
}
</style>
