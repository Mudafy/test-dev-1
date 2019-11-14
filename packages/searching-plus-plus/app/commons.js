'use strict';

const path = require('path');
const bunyan = require('bunyan');
const config = require('./config');

const commons = module.exports = {};

commons.controller = function controller(controllerName) {
  return require(path.join(__dirname, 'controllers', controllerName));
};

commons.service = function service(serviceName) {
  return require(path.join(__dirname, 'services', serviceName));
};

commons.repository = function repository(repoName) {
  return require(path.join(__dirname, 'repositories', repoName));
};

commons.logger = bunyan.createLogger(config.logging);
