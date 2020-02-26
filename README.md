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

  Head into build/webpack.base.conf.js and remove
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
  ... research ..... code examples ... how it could be done ...

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

  2.






