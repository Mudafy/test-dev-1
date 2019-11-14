'use strict';

var config = require('../config');

if (config.NODE_ENV === 'production') {
  module.exports = function webpackMiddleware(req, res, next) {
    return next();
  };
}

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfigs = require('../../webpack.config');

var compiler = webpack(webpackConfigs);


var webpackDevServerMiddileware = webpackDevMiddleware(compiler, {
  publicPath: '/public/',
  stats: { colors: true },
  noInfo: true,
  inline: true,
});

var webpackHotMW = webpackHotMiddleware(compiler);

module.exports = function webpackMiddleware(req, res, next) {
  const callback = (err) => {
    if (err) { next(err); }
    return webpackHotMW(req, res, next);
  }
  webpackDevServerMiddileware(req, res, callback);
};

