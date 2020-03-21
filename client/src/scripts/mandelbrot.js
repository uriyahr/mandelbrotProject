let delegate;
let p5;
export function main(_p5) {
  p5 = _p5;
  let width = 500;
  let height = 500;
  let maxIteration = 200;
  let scaleFactor = 200;

  p5.setup = _ => {
    p5.createCanvas(width, height);
  }

  p5.draw = _ => {
    p5.background(0);
    p5.loadPixels();
    p5.ellipse(10,10,10);
    inMandelbrotSet();
  }
}

function inMandelbrotSet() {
  if (delegate !== undefined) {
    delegate('from inMandelbrotSet');
  }
}
export function setDelegate(_delegate) {
  delegate = _delegate;
}
