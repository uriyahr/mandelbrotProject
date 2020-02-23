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
    <canvas id="canvas"></canvas><br/>
    <button>Incremenet Zoom</button>
    <button>Decrement Zoom</button>
    <button>Reset Mandelbrot</button>
    <p>Zoom Scale Factor</p>
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
    // function mandelIteration(cx, cy, maxIter) {
    //   var x = 0.0;
    //   var y = 0.0;
    //   var xx = 0;
    //   var yy = 0;
    //   var xy = 0;

    //   var i = maxIter;
    //   while (i-- && xx + yy <= 4) {
    //     xy = x * y;
    //     xx = x * x;
    //     yy = y * y;
    //     x = xx - yy + cx;
    //     y = xy + xy + cy;
    //   }
    //   return maxIter - 1;
    // }
    // function mandelbrot(canvas, xmin, xmax, ymin, ymax, iterations) {
    //   var width = canvas.width;
    //   var height = canvas.height;

    //   var ctx = canvas.getContext('2d');
    //   var img = ctx.getImageData(0, 0, width, height);
    //   var pix = img.data;

    //   for (var ix = 0; ix < width; ++ix) {
    //     for (var iy = 0; iy < height; ++iy) {
    //       var x = xmin + ((xmax - xmin) * ix) / (width - 1);
    //       var y = ymin + ((ymax - ymin) * iy) / (height - 1);
    //       var i = mandelIteration(x, y, iterations);
    //       var ppos = 4 * (width * iy + ix);

    //       if (i > iterations) {
    //         pix[ppos] = 0;
    //         pix[ppos + 1] = 0;
    //         pix[ppos + 2] = 0;
    //       } else {
    //         var c = (3 * Math.log(i)) / Math.log(iterations - 1.0);
    //         if (c < 1) {
    //           pix[ppos] = 225 * c;
    //           pix[ppos + 1] = 0;
    //           pix[ppos + 2] = 0;
    //         } else if (c < 2) {
    //           pix[ppos] = 255;
    //           pix[ppos + 1] = 255 * (c - 1);
    //           pix[ppos + 2] = 0;
    //         } else {
    //           pix[ppos] = 255;
    //           pix[ppos + 1] = 255;
    //           pix[ppos + 2] = 255 * (c - 2);
    //         }
    //       }
    //       pix[ppos + 3] = 255;
    //     }
    //   }
    //   ctx.putImageData(img, 0, 0);
    // }
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d')
    canvas.width = 900;
    canvas.height = 900;
    canvas.fillStyle = 'rgb(200, 0, 0)';


    // mandelbrot(canvas, -2, 1, -1, 1, 1000);


  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=EB+Garamond&display=swap");
body {
  background-color: #1e1e1e;
}
canvas {
  border: 1px solid white;
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
</style>
