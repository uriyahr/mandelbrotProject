# mandelbrotProject

# Client
  npm install -g @vue/cli-init
  vue init webpack client
  vue-cli setup

  npm install
  npm run dev
# Server
  mkdir server
  npm install -f
  npm install --save nodemon eslint
  -- change tests in package.json to ______
      "start": "./node_modules/nodemon/bin/nodemon.js src/app.js --exec 'npm run lint && node'",
    "lint": "eslint \"**/*.js\""
  node ./node_mod/eslint/bin/eslint.js --init
  ESLINT setup
  create /src
  add app.js
  Head into app.js
    define web application
    console.log('hello')
  in server run npm start...

# Start Mandelbrot
  Mandelbrot Fractal Zoom

# ESLint is the Enemey
  ...Eventually Removed ESLINT from code
  In client/build/webpack.base.conf.js

  comment out
  // const createLintingRule = () => ({
  //   test: /\.(js|vue)$/,
  //   loader: 'eslint-loader',
  //   enforce: 'pre',
  //   include: [resolve('src'), resolve('test')],
  //   options: {
  //       formatter: require('eslint-friendly-formatter'),
  //     emitWarning: !config.dev.showEslintErrorsInOverlay
  //   }
  // })

  and

        // ...(config.dev.useEslint ? [createLintingRule()] : []),








