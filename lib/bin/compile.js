'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
var paths = _config2.default.utils_paths;(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var stats;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          debug('Run compiler');
          _context.next = 4;
          return (0, _webpack2.default)(_webpack4.default);

        case 4:
          stats = _context.sent;

          if (stats.warnings.length && _config2.default.compiler_fail_on_warning) {
            debug('Config set to fail on warning, exiting with status code "1".');
            process.exit(1);
          }
          debug('Copy static assets to dist folder.');
          _fsExtra2.default.copySync(paths.client('static'), paths.dist());
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](0);

          debug('Compiler encountered an error.', _context.t0);
          process.exit(1);

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 10]]);
}))();