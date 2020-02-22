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




