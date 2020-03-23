let delegate;
let p5;
let width = 100;
let height = 100;
let iterations = 10;
let Complex = require('Complex');

export function main(_p5) {
  p5 = _p5;

  p5.setup = _ => {
    p5.createCanvas(width, height);
    p5.noLoop();
  }

  p5.draw = _ => {
    p5.background('#ffffff');
    p5.loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let inSet = inMandelbrotSet(x,y);
        let index = (x + y * width) + 4;
        if(inSet == 0){
         p5.pixels[index] = color(255, 255, 255); // white
        }else {
          p5.pixels[index] = Math.random(244); // random color
        }
      }
    }
    p5.updatePixels();
   }
}

function inMandelbrotSet(xPixel, yPixel) {
  if (delegate !== undefined) {
    /** mandel code
     * check z: f(z) = z^2 + c, where c is a complex number
     *   how to generate z: n = iterations through loop
     *   how to generate c: x+yi where i is an imaginary number
     *
     * case 1 (distance of z == abs(z) gets arbitarily large)
     * case 2 (distance of z == abs(z) is bounded a.k.a never gets larger than 2)
     * if case2 (z is in the set)
     * else case 1(z is not in the set)
     *
     * colors: indicate how unstable z is based on cartesian coordinates
     *
     */
    for (let z = 0; z < iterations; z++) {
      let complexComp = new Complex(xPixel, yPixel).abs(); //x + yi
      console.log(complexComp)
      let checkPixel = (z * z) + complexComp;
      if (Math.abs(checkPixel) > 5) {
        return (z);
      }
    }
    return 0;
  }
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}
