let p5;
let delegate;
let width = 200;
let height = 200;
let iterations = 100;
let scaleFactor = 50;
let panX = 2;
let panY = 1.5;
let Complex = require("Complex");

export function main(_p5) {
  p5 = _p5;

  p5.setup = _ => {
    p5.createCanvas(width, height);
    p5.noLoop();
  }

  p5.draw = _ => {
    p5.background(2);
    p5.loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = (x + y * width) + 4;
        for (let z = 0; z < iterations; z++) {
          let xComp = x/scaleFactor - panX;
          let yComp = y/scaleFactor - panY;
          let real = xComp * xComp - yComp * yComp + xComp;
          let imaginary = 2 * xComp * yComp + yComp;
          let zComponent = real * imaginary;
          let belongsTo = 0;
          //let complexComp = new Complex(x, y).abs(); //x + yi
          //let checkPixel = (z * z) + complexComp; // z^2 + c
          if (zComponent > 2) {
            belongsTo = x/iterations * 100;
            if (belongsTo == 0) {
              // black pixel
              p5.pixels[index] = p5.color(belongsTo);
            } else {
              // color pixel in set
              p5.pixels[index] = p5.color(0);
            }
          }
        }
      }
      p5.updatePixels();
    }
  }
}
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
function inMandelbrotSet(xPixel, yPixel) {
  if (delegate !== undefined) {

  }
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}
