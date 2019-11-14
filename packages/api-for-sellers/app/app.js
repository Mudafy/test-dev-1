'use strict';

// REQUIRES

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
var messageHandler = require('./middlewares/errors.js');

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

app.use('/api/v1', routes);

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
