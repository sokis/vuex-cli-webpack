"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = applyExpressMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
function applyExpressMiddleware(fn, req, res) {
  var originalEnd = res.end;

  return new _promise2.default(function (resolve) {
    res.end = function () {
      originalEnd.apply(this, arguments);
      resolve(false);
    };
    fn(req, res, function () {
      resolve(true);
    });
  });
}
module.exports = exports["default"];