'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = webpackCompiler;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _merge = require('../config/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:build:webpack-compiler');
var DEFAULT_STATS_FORMAT = _merge2.default.compiler_stats;

function webpackCompiler(webpackConfig) {
  var statsFormat = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_STATS_FORMAT : arguments[1];

  return new _promise2.default(function (resolve, reject) {
    var compiler = (0, _webpack2.default)(webpackConfig);

    compiler.run(function (err, stats) {
      var jsonStats = stats.toJson();

      debug('Webpack compile completed.');
      debug(stats.toString(statsFormat));

      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.');
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.');
        debug(jsonStats.warnings.join('\n'));
      } else {
        debug('No errors or warnings encountered.');
      }
      resolve(jsonStats);
    });
  });
}
module.exports = exports['default'];