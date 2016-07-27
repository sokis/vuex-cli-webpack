'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _http = require('http');

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var debug = (0, _debug3.default)('app:server:error');
  debug('Enable error middleware.');
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              _context.next = 11;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](0);

              ctx.app.emit('error', _context.t0, ctx);

              ctx.status = ctx.status || 500;
              ctx.type = 'application/json';
              ctx.body = {
                code: _http.STATUS_CODES[ctx.status],
                message: _context.t0.message
              };

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 5]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

module.exports = exports['default'];