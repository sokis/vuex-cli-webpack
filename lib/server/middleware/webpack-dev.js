'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (compiler, publicPath) {
  debug('Enable webpack dev middleware.');

  var middleware = (0, _webpackDevMiddleware2.default)(compiler, {
    publicPath: publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: _config2.default.compiler_quiet,
    noInfo: _config2.default.compiler_quiet,
    lazy: false,
    stats: _config2.default.compiler_stats
  });

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var hasNext;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _applyExpressMiddleware2.default)(middleware, ctx.req, {
                end: function end(content) {
                  return ctx.body = content;
                },
                setHeader: function setHeader() {
                  ctx.set.apply(ctx, arguments);
                }
              });

            case 2:
              hasNext = _context.sent;

              if (!hasNext) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return next();

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function koaWebpackDevMiddleware(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return koaWebpackDevMiddleware;
  }();
};

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _applyExpressMiddleware = require('../lib/apply-express-middleware');

var _applyExpressMiddleware2 = _interopRequireDefault(_applyExpressMiddleware);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.utils_paths;
var debug = (0, _debug3.default)('app:server:webpack-dev');

module.exports = exports['default'];