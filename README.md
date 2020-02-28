# mandelbrotProject

## Client
  ```terminal
  npm install -g @vue/cli-init
  vue init webpack client
  vue-cli setup
  ```
  ```
  npm install
  npm run dev
  ```
## Server
  ```
  mkdir server
  npm install -f
  npm install --save nodemon eslint
  ```
  If an error occurs with ESLint when running npm start, a few lines in package.json may need to be changed to
  ```
  "start": "./node_modules/nodemon/bin nodemon.js src/app.js --exec 'npm run lint && node'",
  "lint": "eslint \"**/*.js\"",
  ```
  node ./node_mod/eslint/bin/eslint.js --init
## ESLINT setup
  Go ahead and go into your server
  ```terminal
  mkdir src
  touch app.js
  ```
  In app.js we are going to define a simple web application.

  As a test to be sure everything is working
  ```javascript
  console.log('hello')
  ```
  head into the server
  ```terminal
  npm start
  ```

## ESLint is the Enemey
  After workign with ESLint for a while I decided to remove it from my project because of it being a bit of a hassle. For those intersted in removing it...

  Head into build/webpack.base.conf.js and remove/comment
  ```javascript
  const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
  })

  (config.dev.useEslint ? [createLintingRule()] : []),
  ```


# Mandelbrot Set
  ... research ..... code examples ... how it could be done,

  1. Set Up the Canvas
     This is where we will plot our Mandelbrot Set

    ```javascript
    var canvas = document.getElementById('canvas');
    if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
    canvas.width = 600;
    canvas.height = 600;
    ```

  ## Default Fractal Setting
    maxIterations: 200
    Scale Factor: 200
    default increase/decrease change ___
    panX: 2
    panY: 1.5

    X-Axis:
    increasing panX shifts the mandelbrot to the right
    decreasing panX shifts the mandelbrot to the left

    mandelbrotVisibleXAxis(panX >= -0.4 and panX <= 5.3)
    xAxis from -0.4 to 5.3

    Y-Axis:
    increasing panY shifts the mandelbrot down
    decreasing panY shifts the mandelbrot up

    mandelbrotVisbibleYAxis(panY <= 3.7 and panY > -0.7)
    yAxis from -0.7 to 3.7

    if(the scaleFactor(zoom) is increased) {
      increase maxIterations by approx  __
    }
    onClick increaseZoom scaleFactor = scaleFactor+50?
    oncClick decreaseZoom scaleFactor = scaleFactor-50;
    mouseOverCanvas(){
      return x,y
    }
    ALTER(based on x,y change)
    panX,panY = mouseOverCanvas()
    Update drawMandelbrot











