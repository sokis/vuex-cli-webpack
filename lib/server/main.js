'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var app = new _koa2.default();

  app.use((0, _koaLogger2.default)());
  app.use((0, _error2.default)());

  // Enable koa-proxy if it has been enabled in the config.
  if (_config2.default.proxy && _config2.default.proxy.enabled) {
    app.use((0, _koaConvert2.default)((0, _koaProxy2.default)(_config2.default.proxy.options)));
  } else if (_config2.default.server_mock) {
    // mocking .
    app.use((0, _mocking2.default)({
      root: paths.base(),
      matcher: /^\/apis\//,
      reducer: null
    }));
  }

  // // This rewrites all routes requests to the root /index.html file
  // // (ignoring file requests). If you want to implement isomorphic
  // // rendering, you'll want to remove this middleware.
  // app.use(convert(historyApiFallback({
  //   verbose: false
  // })))

  // ------------------------------------
  // Apply Webpack HMR Middleware
  // ------------------------------------
  if (_config2.default.env === 'development') {
    var compiler = (0, _webpack2.default)(_webpack4.default);

    // Enable webpack-dev and webpack-hot middleware
    var publicPath = _webpack4.default.output.publicPath;


    app.use((0, _webpackDev2.default)(compiler, publicPath));
    app.use((0, _webpackHmr2.default)(compiler));

    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use((0, _koaStatic2.default)(paths.client('static')));
  } else {
    debug('Server is being run outside of live development mode, meaning it will ' + 'only serve the compiled application bundle in ~/dist. Generally you ' + 'do not need an application server for this and can instead use a web ' + 'server such as nginx to serve your static files. See the "deployment" ' + 'section in the README for more information on deployment strategies.');

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use((0, _koaStatic2.default)(paths.dist()));
  }

  app.listen(port);
  debug('Server is now running at http://' + host + ':' + port + '.');
  debug('Server accessible via localhost:' + port + ' if you are using the project defaults.');
};

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaProxy = require('koa-proxy');

var _koaProxy2 = _interopRequireDefault(_koaProxy);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../build/webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _koaConnectHistoryApiFallback = require('koa-connect-history-api-fallback');

var _koaConnectHistoryApiFallback2 = _interopRequireDefault(_koaConnectHistoryApiFallback);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _webpackDev = require('./middleware/webpack-dev');

var _webpackDev2 = _interopRequireDefault(_webpackDev);

var _webpackHmr = require('./middleware/webpack-hmr');

var _webpackHmr2 = _interopRequireDefault(_webpackHmr);

var _mocking = require('./middleware/mocking');

var _mocking2 = _interopRequireDefault(_mocking);

var _error = require('./middleware/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server');

var paths = _config2.default.utils_paths;
var port = _config2.default.server_port;
var host = _config2.default.server_host;

module.exports = exports['default'];