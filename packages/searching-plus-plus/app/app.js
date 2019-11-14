'use strict';

require('babel-register');
// REQUIRES
if (process.NODE_ENV != 'production') {
  var chokidar = require('chokidar');

  const cssModulesRequireHook = require('css-modules-require-hook');

  cssModulesRequireHook({ generateScopedName: '[path][name]-[local]' });

  const watcher = chokidar.watch('./');

  watcher.on('ready', function () {
    watcher.on('all', function () {
      console.log('Reloading');
      Object.keys(require.cache).forEach(function (id) {
        if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
}

var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var cluster = require('cluster');
var jwt = require('express-jwt');
var http = require('http');

var routes = require('./routes.js');
var config = require('./config.js');

var bunyan = require('bunyan');
var loggerBunyan = require('express-bunyan-logger');
var messageHandler = require('./middlewares/errors');
var staticFilesMiddleware = require('./middlewares/staticFilesMiddleware');
var reactMiddleware = require('./middlewares/reactMiddleware');
var webpackMiddleware = require('./middlewares/webpackMiddleware');

/// MAIN APPLICATION

var app = express();
var logger = bunyan.createLogger(config.logging);

var accessLoggerConfig = { ...config.logging, excludes: '*' };

app.use(cors(config.cors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwt(config.jwt));

// Message handling system
app.use(loggerBunyan(accessLoggerConfig));

app.use(messageHandler(config.logging));
app.use(loggerBunyan.errorLogger(accessLoggerConfig));

app.use(webpackMiddleware);
app.use('/public', staticFilesMiddleware);
app.use('/api/v1', routes);

var path = require('path');
// enable for client-side-rendering
//app.get('/', express.static(path.resolve(__dirname, '../client')));
app.get('/', reactMiddleware);

function serve(application) {

  var server = http.createServer(application);

  if (process.env.NODE_ENV === 'production') {
    new cluster({
      port: config.api.port,
      pids: config.api.clusterPidsDir,
      monPort: config.api.clusterMonitoringPort

    }).listen(function (cb) {
      logger.info('Cluster node ready on port', config.api.port);
      cb(server);
    });

  } else {
    server.listen(config.api.port, function (err) {
      if (err) {
        logger.error(err);
        throw err;
      }
      logger.info('Express server listening on port', config.api.port);
    });
  }
}

serve(app);
