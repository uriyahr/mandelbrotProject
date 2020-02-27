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
      scaleFactor: 100,
      panX: 0,
      panY: 0,
      introMsg: [
        {
          text: "THE MANDELBROT SET",
          preTypeDelay: 0, // 17990
          typeDelay: 100,   // 130
          repeat: 0
        },
        // {
        //   text:
        //     "Based on my accumulated knowledge on the infamous set of complex numbers that are not known for diverging… ",
        //   preTypeDelay: 0,
        //   typeDelay: 80,
        //   repeat: 0
        // },
        // {
        //   text: "I present to you",
        //   preTypeDelay: 12990,
        //   typeDelay: 110,
        //   repeat: 0
        // }
      ]
    };
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
    canvas.width = 800;
    canvas.height = 600;
    // document.body.appendChild(canvas);

    // var ctx = canvas.getContext('2d');

    function inMandelbrotSet(xAx, yAx) {
      var realCompResult = xAx;
      var imaginaryCompResult = yAx;
      var maxIter = 200;
      for(var i = 0; i < maxIter; i++) {
        // calc real and imaginary components of result seperatley
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
    var scaleFactor = 3000; // to data
    var panX = 0.7; // to data
    var panY = 0.6; // to data
    for(var x = 0; x < canvas.width; x++) {
      for(var y = 0; y < canvas.height; y++){
        var belongsTo = inMandelbrotSet((x/scaleFactor - panX), (y/scaleFactor - panY));
        // if (belongsTo) { ctx.fillRect(x,y,1,1); } // black pixel
        if (belongsTo == 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y,1,1); // black pixel
        } else {
          // console.log(belongsTo);
          ctx.fillStyle = 'hsla(255, 100%, ' + belongsTo + '%, 0.7)';
          ctx.fillRect(x,y,1,1);
        }
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=EB+Garamond&display=swap");
body {
  background-color: #1e1e1e;
}
.mbCanvas {
  border: 1px solid #1e1e1e;
  text-align: center;
}
.vue-typer {
  font-family: "EB Garamond", serif;
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

</style>
