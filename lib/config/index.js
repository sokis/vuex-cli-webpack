'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _yargs = require('yargs');

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint key-spacing:0 spaced-comment:0 */
var localip = _ip2.default.address();
var debug = (0, _debug3.default)('app:config');
debug('Creating default configuration.');

var threshold = 0;

// ========================================================
// Default Configuration
// ========================================================
var config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: process.env.PWD,
  dir_client: 'src',
  dir_dist: 'dist',
  // dir_server: 'server',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: localip, // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,
  server_mock: !!_yargs.argv.mock,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: ['history', 'plato-request', 'vue', 'vue-router', 'vuex', 'vuex-localstorage', 'vuex-promise'],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [{ type: 'text-summary' }, { type: 'lcov', dir: 'coverage' }],
  coverage_check: {
    global: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    },
    each: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    }
  }
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': (0, _stringify2.default)(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !_yargs.argv.no_debug,
  '__COVERAGE__': !_yargs.argv.watch && config.env === 'test',
  '__BASENAME__': (0, _stringify2.default)(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
var pkg = require(config.path_base + '/package.json');

config.compiler_vendor = config.compiler_vendor.filter(function (dep) {
  if (pkg.dependencies[dep]) return true;

  debug('Package "' + dep + '" was not found as an npm dependency in package.json; ' + 'it won\'t be included in the webpack vendor bundle.\n       Consider removing it from vendor_dependencies in ~/config/index.js');
});

// ------------------------------------
// Utilities
// ------------------------------------
var resolve = _path2.default.resolve;
var base = function base() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _apply2.default)(resolve, null, [config.path_base].concat(args));
};

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
debug('Looking for environment overrides for NODE_ENV "' + config.env + '".');
var environments = require('./environments');
var overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  (0, _assign2.default)(config, overrides(config));
} else {
  debug('No environment overrides found, defaults will be used.');
}

exports.default = config;
module.exports = exports['default'];