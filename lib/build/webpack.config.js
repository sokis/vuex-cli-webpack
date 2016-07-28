'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _cssnano = require('cssnano');

var _cssnano2 = _interopRequireDefault(_cssnano);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loadConfig = require('../utils/load-config');

var _loadConfig2 = _interopRequireDefault(_loadConfig);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:webpack:config');
var paths = _config2.default.utils_paths;

var _config$globals = _config2.default.globals;
var __DEV__ = _config$globals.__DEV__;
var __PROD__ = _config$globals.__PROD__;
var __TEST__ = _config$globals.__TEST__;


debug('Create configuration.');
var webpackConfig = {
	name: 'client',
	target: 'web',
	devtool: _config2.default.compiler_devtool,
	resolve: {
		root: paths.client(),
		extensions: ['', '.css', '.js', '.json', '.vue'],
		alias: {
			"store": paths.client('vuex'),
			"components": paths.client('components')
		},
		modulesDirectories: ['node_modules']
	},
	module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
var APP_ENTRY_PATHS = ['babel-polyfill', paths.client('main.js')];

webpackConfig.entry = {
	app: __DEV__ ? APP_ENTRY_PATHS.concat('webpack-hot-middleware/client?path=' + _config2.default.compiler_public_path + '__webpack_hmr') : APP_ENTRY_PATHS,
	vendor: _config2.default.compiler_vendor
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
	filename: '[name].[' + _config2.default.compiler_hash_type + '].js',
	path: paths.dist(),
	publicPath: _config2.default.compiler_public_path
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [new _webpack2.default.DefinePlugin(_config2.default.globals), new _htmlWebpackPlugin2.default({
	template: paths.client('index.html'),
	hash: false,
	favicon: paths.client('static/favicon.ico'),
	filename: 'index.html',
	inject: 'body',
	minify: {
		collapseWhitespace: true
	}
})];

if (__DEV__) {
	debug('Enable plugins for live development (HMR, NoErrors).');
	webpackConfig.plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin());
} else if (__PROD__) {
	debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
	webpackConfig.plugins.push(new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
		compress: {
			unused: true,
			dead_code: true,
			warnings: false
		}
	}));
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
	webpackConfig.plugins.push(new _webpack2.default.optimize.CommonsChunkPlugin({
		names: ['vendor']
	}));
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
[ NOTE ]
We no longer use eslint-loader due to it severely impacting build
times for larger projects. `npm run lint` still exists to aid in
deploy processes (such as with CI), and it's recommended that you
use a linting plugin for your IDE in place of this loader.

If you do wish to continue using the loader, you can uncomment
the code below and run `npm i --save-dev eslint-loader`. This code
will be removed in a future release.
*/
// webpackConfig.module.preLoaders = [{
//   test: /\.(js|vue)$/,
//   loader: 'eslint',
//   exclude: /node_modules/
// }]

// webpackConfig.eslint = {
//   configFile: paths.base('.eslintrc'),
//   emitWarning: __DEV__
// }


// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
	test: /\.(js)$/,
	exclude: /node_modules/,
	loader: 'babel'
}, {
	test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
	loader: 'url',
	query: {
		limit: 10000,
		name: '[name].[ext]?[hash:7]'
	}
}, {
	test: /\.vue$/,
	loader: 'vue'
}, {
	test: /\.json$/,
	loader: 'json'
}];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
var BASE_CSS_LOADER = function (loaders) {
	if (!__PROD__) {
		return loaders.join('!');
	}

	var _loaders = (0, _toArray3.default)(loaders);

	var first = _loaders[0];

	var rest = _loaders.slice(1);

	return _extractTextWebpackPlugin2.default.extract(first, rest.join('!'));
}(['vue-style-loader', 'css?sourceMap&-minimize']);

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
var PATHS_TO_TREAT_AS_CSS_MODULES = []
// 'react-toolbox', (example)


// If config has CSS modules enabled, treat this project's styles as CSS modules.
;if (_config2.default.compiler_css_modules) {
	PATHS_TO_TREAT_AS_CSS_MODULES.push(paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
	);
}

var isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
var cssModulesRegex = new RegExp('(' + PATHS_TO_TREAT_AS_CSS_MODULES.join('|') + ')');

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
	var cssModulesLoader = [BASE_CSS_LOADER, 'modules', 'importLoaders=1', 'localIdentName=[name]__[local]___[hash:base64:5]'].join('&');

	webpackConfig.module.loaders.push({
		test: /\.css$/,
		include: cssModulesRegex,
		loaders: ['style', cssModulesLoader, 'postcss']
	});
}

// Loaders for files that should not be treated as CSS modules.
var excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;
webpackConfig.module.loaders.push({
	test: /\.css$/,
	exclude: excludeCSSModules,
	loaders: ['style', BASE_CSS_LOADER, 'postcss']
});

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfig.vue = {
	postcss: function postcss(pack) {
		// use webpack context
		return [require('postcss-import')({
			root: _config.utils_paths.client('styles'),
			path: _config.utils_paths.client('styles'),
			addDependencyTo: pack
		}), require('postcss-url')(), require('postcss-custom-properties')({
			variables: require(_config.utils_paths.client('styles/variables'))
		}), require('postcss-mixins')({
			mixinsDir: _config.utils_paths.client('styles/mixins')
		}), require('postcss-cssnext')(), require('postcss-browser-reporter')(), require('postcss-reporter')()];
	},
	autoprefixer: false
};

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
	debug('Apply ExtractTextPlugin to CSS loaders.');
	webpackConfig.module.loaders.filter(function (loader) {
		return loader.loaders && loader.loaders.find(function (name) {
			return (/css/.test(name.split('?')[0])
			);
		});
	}).forEach(function (loader) {
		var _loader$loaders = (0, _toArray3.default)(loader.loaders);

		var first = _loader$loaders[0];

		var rest = _loader$loaders.slice(1);

		loader.loader = _extractTextWebpackPlugin2.default.extract(first, rest.join('!'));
		(0, _deleteProperty2.default)(loader, 'loaders');
	});

	webpackConfig.plugins.push(new _extractTextWebpackPlugin2.default('[name].[contenthash].css', {
		allChunks: true
	}));
}

// load config 
exports.default = (0, _webpackMerge2.default)(webpackConfig, (0, _loadConfig2.default)(paths.conf('webpack.config')));
module.exports = exports['default'];