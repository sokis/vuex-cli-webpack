'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (compiler, opts) {
  debug('Enable Webpack Hot Module Replacement (HMR).');

  var middleware = (0, _webpackHotMiddleware2.default)(compiler, opts);
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var hasNext;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _applyExpressMiddleware2.default)(middleware, ctx.req, ctx.res);

            case 2:
              hasNext = _context.sent;

              if (!(hasNext && next)) {
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

    function koaWebpackHMR(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return koaWebpackHMR;
  }();
};

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _applyExpressMiddleware = require('../lib/apply-express-middleware');

var _applyExpressMiddleware2 = _interopRequireDefault(_applyExpressMiddleware);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:webpack-hmr');

module.exports = exports['default'];