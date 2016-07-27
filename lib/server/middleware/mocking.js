'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:mocking');

exports.default = function (_ref) {
  var root = _ref.root;
  var matcher = _ref.matcher;
  var reducer = _ref.reducer;

  debug('Enable mocking middleware.');

  var lastMatcher = function lastMatcher() {
    return true;
  };
  var lastReducer = function lastReducer(dest) {
    return dest;
  };

  if (matcher) {
    if (typeof matcher === 'function') {
      lastMatcher = matcher;
    } else if (matcher.constructor === RegExp) {
      lastMatcher = function lastMatcher(url) {
        return matcher.test(url);
      };
    }
  }

  if (reducer) {
    if (typeof reducer === 'function') {
      lastReducer = reducer;
    } else if (reducer.constructor === RegExp) {
      lastReducer = function lastReducer(url) {
        return url.replace(reducer, '');
      };
    }
  }

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var dest;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!lastMatcher(ctx.url)) {
                _context.next = 9;
                break;
              }

              dest = (0, _path.join)(lastReducer(ctx.path), ctx.method + '.json');

              if (!_fs2.default.existsSync((0, _path.join)(root, dest))) {
                _context.next = 9;
                break;
              }

              ctx.status = 403;
              _context.next = 6;
              return (0, _koaSend2.default)(ctx, dest, { root: root });

            case 6:
              if (!_context.sent) {
                _context.next = 9;
                break;
              }

              debug('Mock file found: %s', dest);
              return _context.abrupt('return');

            case 9:
              _context.next = 11;
              return next();

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};

module.exports = exports['default'];