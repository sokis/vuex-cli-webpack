'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  try {
    debug('Run compiler');
    var stats = (0, _webpack2.default)(_webpack4.default);
    if (stats.warnings.length && _config2.default.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".');
      process.exit(1);
    }
    debug('Copy static assets to dist folder.');
    _fsExtra2.default.copySync(paths.client('static'), paths.dist());
  } catch (e) {
    debug('Compiler encountered an error.', e);
    process.exit(1);
  }
};

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _webpack = require('../build/webpack.compiler');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../build/webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:bin:compile');
var paths = _config2.default.utils_paths;

module.exports = exports['default'];